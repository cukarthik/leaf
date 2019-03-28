/* Copyright (c) 2019, UW Medicine Research IT
 * Developed by Nic Dobbins and Cliff Spital
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */ 

import { Concept } from "../../../models/admin/Concept";
import { ConceptSqlSet } from "../../../models/admin/Concept";
import { SqlConfiguration } from "../../../models/admin/Configuration";
import AdminState from "../../../models/state/AdminState";

export interface EditorPaneProps { 
    data: AdminState;
    dispatch: any;
    toggleSqlPreview: (show: boolean) => any;
    togglePanelPreview: (show: boolean) => any;
    toggleOverlay: (show: boolean) => any;
}

export interface SectionProps {
    changeHandler: (val: any, propName: string) => any;
    concept?: Concept;
    dispatch: any;
    sqlSets: Map<number,ConceptSqlSet>;
    sqlConfig: SqlConfiguration;
    toggleSqlPreview: (show: boolean) => any;
    togglePanelPreview: (show: boolean) => any;
    toggleOverlay: (show: boolean) => any;
}

export interface PropertyProps {
    changeHandler: (val: any, propName: string) => any;
    label?: string;
    locked?: boolean;
    focusToggle?: (show: boolean) => void;
    propName: string;
    subLabel?: string;
    type?: string;
    value?: any;
}