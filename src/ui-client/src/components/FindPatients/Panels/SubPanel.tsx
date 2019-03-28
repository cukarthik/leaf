/* Copyright (c) 2019, UW Medicine Research IT
 * Developed by Nic Dobbins and Cliff Spital
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */ 

import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd'
import { connect } from 'react-redux';
import { addPanelItem } from '../../../actions/panels';
import { Concept } from '../../../models/concept/Concept';
import { Panel as PanelModel } from '../../../models/panel/Panel';
import { PanelItem as PanelItemModel } from '../../../models/panel/PanelItem';
import { SubPanel as SubPanelModel } from '../../../models/panel/SubPanel';
import PanelItem from './PanelItem';
import { compose } from 'redux';
import PanelItemOr from './PanelItemOr';
import SubPanelDashBorder from './SubPanelDashBorder';
import SubPanelHeader from './SubPanelHeader';

interface Props {
    panel: PanelModel,
    subPanel: SubPanelModel,
    index: number,
    canDrop?: boolean,
    isOver?: boolean,
    connectDropTarget?: ConnectDropTarget
    dispatch?: any
}

interface State { }

const panelTarget = {
    drop(props: Props, monitor: DropTargetMonitor) {
        const { dispatch, subPanel } = props;
        const concept: Concept = monitor.getItem();
        dispatch(addPanelItem(concept, subPanel.panelIndex, subPanel.index));
    }
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

class SubPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { connectDropTarget, isOver, canDrop, subPanel, index, panel } = this.props;
        const totalPanelItems = subPanel.panelItems.length;
        const wrapperClasses = 'subpanel-wrapper ' + (totalPanelItems > 0 ? 'has-data' : '');
        const classes = [ 'subpanel' ];
        const items = [];
        let panelItem: PanelItemModel;

        // Set classes
        if (totalPanelItems === 0) { classes.push('no-data'); }
        if (isOver && canDrop )    { classes.push('can-drop'); }
        if (canDrop)               { classes.push('show-dash-border'); }
        if (subPanel.index === 0)  { classes.push('subpanel-first'); }

        // Set PanelItems and -or- objects
        for (let i = 0; i < totalPanelItems; i++) {
            panelItem = subPanel.panelItems[i];
            items.push(<PanelItem key={panelItem.id} panelItem={panelItem}/>);

            // Add -or- if necessary
            if (subPanel.panelItems[i+1] &&         // Followed by another panelItem
                !subPanel.panelItems[i+1].hidden && // and the following panelItem isn't hidden
                (i > 0 || !panelItem.hidden)        // and this panelItem isn't the first OR is shown
            ) { 
                items.push(<PanelItemOr key={`_or_${panelItem.id}`}/>); 
            }
        }

        return (
            connectDropTarget &&
            connectDropTarget(
                <div className={wrapperClasses}>
                    {/* Header - only set if subpanel is not the first */}
                    {index !== 0 &&
                    <SubPanelHeader index={index} panel={panel} 
                    />}
                    <div className={classes.join(' ')}>
                        {/* Dashed borders that move when user is dragging a concept */}
                        <SubPanelDashBorder />
                        {/* Main subpanel body with panel items */}
                        <div className="subpanel-body">
                            {items}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return { 
        dispatch
    };
};

const SubPanelContainer = compose(
    connect(null, mapDispatchToProps),
    DropTarget('CONCEPT', panelTarget, collect)
)(SubPanel) as any;
export default SubPanelContainer;