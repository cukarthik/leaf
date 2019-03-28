﻿// Copyright (c) 2019, UW Medicine Research IT
// Developed by Nic Dobbins and Cliff Spital
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
using System;
using Model.Compiler;
using Model.Cohort;
using DTO.Compiler;
using System.Collections.Generic;

namespace DTO.Cohort
{
    public class PatientCountDTO
    {
        public string QueryId { get; set; }
        public PreflightCheckDTO Preflight { get; set; }
        public PatientCountResultDTO Result { get; set; }

        public PatientCountDTO(PreflightResources preflight)
        {
            Preflight = new PreflightCheckDTO(preflight);
        }

        public PatientCountDTO(PreflightResources preflight, PatientCount count) : this(preflight)
        {
            QueryId = count.QueryId.ToString();
            Result = new PatientCountResultDTO
            {
                Value = count.Value,
                SqlStatements = count.SqlStatements
            };
        }
    }
}