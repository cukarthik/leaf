-- Copyright (c) 2019, UW Medicine Research IT
-- Developed by Nic Dobbins and Cliff Spital
-- This Source Code Form is subject to the terms of the Mozilla Public
-- License, v. 2.0. If a copy of the MPL was not distributed with this
-- file, You can obtain one at http://mozilla.org/MPL/2.0/.
﻿USE [LeafDB]
GO
/****** Object:  UserDefinedTableType [app].[SqlSelectors]    Script Date: 3/28/19 1:44:09 PM ******/
CREATE TYPE [app].[SqlSelectors] AS TABLE(
	[Column] [nvarchar](100) NOT NULL,
	[Type] [nvarchar](20) NOT NULL,
	[Phi] [bit] NOT NULL,
	[Mask] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Column] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO