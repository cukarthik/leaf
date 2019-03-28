﻿// Copyright (c) 2019, UW Medicine Research IT
// Developed by Nic Dobbins and Cliff Spital
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
using System;
using Model.Network;

namespace DTO.Network
{
    public class NetworkRespondentDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public NetworkRespondentDTO()
        {

        }

        public NetworkRespondentDTO(NetworkEndpoint ne)
        {
            Id = ne.Id;
            Name = ne.Name;
            Address = ne.Address.AbsoluteUri;
        }
    }
}