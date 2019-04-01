/* Copyright (c) 2019, UW Medicine Research IT, University of Washington
 * Developed by Nic Dobbins and Cliff Spital, CRIO Sean Mooney
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */ 

import React from 'react';
import { Section } from './Section';
import { SectionProps } from '../Props';
import { ConstraintType, ConceptConstraint } from '../../../../models/admin/Concept';
import { Constraint } from './Constraint';

interface Props {
    data: SectionProps;
}

export class Constraints extends React.PureComponent<Props> {
    private className = 'concept-editor';
    private propName = 'constraints';
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { adminConcept } = this.props.data;
        const c = this.className;

        return (
            <Section header='Access Restrictions'>
                <div className={`${c}-constraints`}>
                    <p>Restrict access to this Concept by specific users or groups</p>
                    <small>Any restrictions placed will be inherited by all descendant Concepts</small>
                    <div className={`${c}-constraints-container`}>
                        {adminConcept!.constraints.map((constraint, i) => 
                            <Constraint 
                                constraint={constraint} index={i} key={i}
                                changeHandler={this.handleConstraintChange} deleteHandler={this.handleConstraintDelete} 
                            />
                        )}
                    </div>
                </div>
                <div className={`${c}-constraints-addnew`} onClick={this.handleAddNewClick}>+ Add New Restriction</div>
            </Section>
        );
    }

    private handleConstraintDelete = (idx: number) => {
        const { changeHandler, adminConcept } = this.props.data;
        const constraints = adminConcept!.constraints.slice();
        constraints.splice(idx, 1);
        changeHandler(constraints, this.propName);
    }

    private handleConstraintChange = (idx: number, newConstraint: ConceptConstraint) => {
        const { changeHandler, adminConcept } = this.props.data;
        const constraints = adminConcept!.constraints.slice();
        constraints.splice(idx, 1, newConstraint);
        changeHandler(constraints, this.propName);
    }

    private handleAddNewClick = () => {
        const { changeHandler, adminConcept } = this.props.data;
        const newConstraint: ConceptConstraint = { conceptId: adminConcept!.id, constraintId: ConstraintType.User, constraintValue: '' };
        const constraints = adminConcept!.constraints.slice();
        constraints.push(newConstraint);
        changeHandler(constraints, this.propName);
    }
};