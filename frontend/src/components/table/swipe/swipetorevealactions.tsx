import React, { useState, ReactNode, CSSProperties, useId } from 'react';
import { useSwipeable } from 'react-swipeable';
import './styles.css';
import { AccordionInfo } from '../accordion';
import PencilIcon from '@heroicons/react/24/outline/PencilSquareIcon'
type Props = {
    children: ReactNode;
    actionButtons: {
        content: ReactNode;
        onClick: () => void;
        role?: string;
    }[];
    actionButtonMinWidth: number;
    height?: string;
    containerStyle?: CSSProperties;
    onOpen?: () => void;
    onClose?: () => void;
    hideDotsButton?: boolean;
    dotsBtnAriaLabel?: string;
    name: string;
    expirationInfo: string;
    image: any;
    purchase: number;
};

const SwipeToRevealActions: React.FC<Props> = ({
    children,
    actionButtons,
    containerStyle,
    actionButtonMinWidth,
    hideDotsButton,
    dotsBtnAriaLabel = 'Click to reveal actions',
  onOpen,
  onClose,
  name,
  expirationInfo,
  image,
  purchase,
}: Props) => {
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const handlers = useSwipeable({
        onSwiped: () => handlePanEnd(),
        onSwipeStart: (eventData) => handlePanStart(eventData),
        onSwiping: (eventData) => handleSwipe(eventData),
        trackMouse: true,
    });
    const id = useId();

    function handlePanStart(e: any) {
        if (e.dir === 'Down' || e.dir === 'Up') {
            setIsScrolling(true);
        }
    }

    function handlePanEnd() {
        setIsScrolling(false);
    }

    function handleSwipe(e: any) {
        if (!isScrolling) {
            if (e.dir === 'Left' && !isExpanded) {
                setIsExpanded(true);
                if (onOpen) {
                    onOpen();
                }
            } else if (e.dir === 'Right' && isExpanded) {
                setIsExpanded(false);
                if (onClose) {
                    onClose();
                }
            }
        }
    }

    function handleActionClicked(callback: () => void) {
        callback();
        setIsExpanded(false);
    }

    return (
        <div className="rstra-container min-h-fit" style={{...containerStyle }}>
            <div {...handlers}>
                <div className="flex flex-row">
                    <AccordionInfo className="rstra-content-container"
                      style={{
                          transform: `translateX(${isExpanded ? `-${actionButtons.length * actionButtonMinWidth}px` : '0px'})`,
                      }} name={name} expirationInfo={expirationInfo} image={image} purchase={purchase}> 
                    </AccordionInfo>
                    <div className="rstra-actions-container flex-none items-center justify-center" style={{
                        display: 'flex',
                        opacity: isExpanded ? 1 : 0,
                        transform: `translateX(${isExpanded ? 0 : '100%'})`,
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }} id={id}>
                        {/* {children} */}
                        {actionButtons.map((action, index) => (
                            <div key={`actionKey_${index}`} className="pl-">
                                <button
                                    className="rstra-action-button"
                                    style={{
                                        minWidth: actionButtonMinWidth
                                    }}
                                    role={action.role || 'button'}
                                >
                                    {action.content}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwipeToRevealActions;