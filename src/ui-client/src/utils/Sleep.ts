/* Copyright (c) 2019, UW Medicine Research IT
 * Developed by Nic Dobbins and Cliff Spital
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */ 

// Use like sleep() in C#
// Adapted from https://davidwalsh.name/javascript-sleep-function
export function sleep (milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
