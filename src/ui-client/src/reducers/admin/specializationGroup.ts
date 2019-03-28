/* Copyright (c) 2019, UW Medicine Research IT
 * Developed by Nic Dobbins and Cliff Spital
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */ 

import AdminState from "../../models/state/AdminState";
import { AdminSpecializationGroupAction } from "../../actions/admin/specializationGroup";

export const setAdminConceptSpecializationGroups = (state: AdminState, action: AdminSpecializationGroupAction) => {
    const groups = action.groups!;
    for (const grp of groups) {
        const set = state.sqlSets.sets.get(grp.sqlSetId);
        if (set) {
            set.specializationGroups.set(grp.id, grp);
        }
    }
    return Object.assign({}, state);
};

export const removeAdminConceptSpecializationGroup = (state: AdminState, action: AdminSpecializationGroupAction) => {
    const grp = action.group!;
    const set = state.sqlSets.sets.get(grp.sqlSetId);
    if (set) {
        set.specializationGroups.delete(grp.id);
    }
    return Object.assign({}, state);
};