﻿// Copyright (c) 2019, UW Medicine Research IT
// Developed by Nic Dobbins and Cliff Spital
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
using System;
using Model.Authentication;
using Model.Options;
using Dapper;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Services.Jwt
{
    public class TokenBlacklistService : ITokenBlacklistService
    {
        const string queryBlacklist = @"auth.sp_BlacklistToken";
        const string queryRefresh = @"auth.sp_RefreshTokenBlacklist";

        readonly AppDbOptions opts;
        readonly TokenBlacklistCache blacklistCache;
        readonly ILogger<TokenBlacklistService> logger;

        public TokenBlacklistService(IOptions<AppDbOptions> dbOpts, TokenBlacklistCache blacklistCache, ILogger<TokenBlacklistService> logger)
        {
            opts = dbOpts.Value;
            this.blacklistCache = blacklistCache;
            this.logger = logger;
        }

        public async Task Blacklist(BlacklistedToken token)
        {
            logger.LogInformation("Blacklisting Token: {@Token}", token);
            blacklistCache.Blacklist(token);
            using (var cn = new SqlConnection(opts.ConnectionString))
            {
                await cn.OpenAsync();

                await cn.ExecuteAsync(
                    queryBlacklist,
                    new { idNonce = token.IdNonce, exp = token.Expires },
                    commandType: CommandType.StoredProcedure,
                    commandTimeout: opts.DefaultTimeout
                );
            }
        }

        public async Task<IEnumerable<BlacklistedToken>> GetBlacklist()
        {
            logger.LogInformation("Getting fresh TokenBlacklist");
            using (var cn = new SqlConnection(opts.ConnectionString))
            {
                await cn.OpenAsync();

                return await cn.QueryAsync<BlacklistedToken>(
                    queryRefresh,
                    commandType: CommandType.StoredProcedure,
                    commandTimeout: opts.DefaultTimeout
                );
            }
        }
    }
}
