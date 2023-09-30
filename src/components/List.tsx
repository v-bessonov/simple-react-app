import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Entity} from "../types/types";

interface ListProps<T extends Entity> {
    items: T[],
    emptyItemsMessage: string,
    renderItem: (item: T) => React.ReactNode
}

export default function List<T extends Entity>(props: ListProps<T>) {
    const {items, emptyItemsMessage, renderItem} = props;
    if (!items.length) {
        return <h1 style={{textAlign: 'center'}}>
            {emptyItemsMessage}
        </h1>
    }

    return (
        <div>
            <TransitionGroup>

                {items.map((item,index) => {
                    return <CSSTransition
                        key={item.id}
                        timeout={500}
                        classNames="item"
                    >
                        {renderItem(item)}
                    </CSSTransition>
                })}
            </TransitionGroup>

        </div>
    )
};