import React, { useState, ReactNode, CSSProperties, useId } from 'react';
import { useSwipeable } from 'react-swipeable';
import './styles.css';
import { AccordionInfo } from '../accordion';
import { Accordion } from '@radix-ui/react-accordion';
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
};

const SwipeToRevealActions: React.FC<Props> = ({
    children,
    actionButtons,
    containerStyle,
    actionButtonMinWidth,
    height = '56px',
    hideDotsButton,
    dotsBtnAriaLabel = 'Click to reveal actions',
  onOpen,
  onClose,
  name,
  expirationInfo
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
                // LEFT SWIPE...
                setIsExpanded(true);
                if (onOpen) {
                    onOpen();
                }
            } else if (e.dir === 'Right' && isExpanded) {
                // RIGHT SWIPE...
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
        <div className="rstra-container" style={{ height, ...containerStyle }}>
            <div {...handlers}>
                <div>
                    <AccordionInfo className="rstra-content-container"
                      style={{
                          height,
                          transform: `translateX(${isExpanded ? `-${actionButtons.length * actionButtonMinWidth}px` : '0px'})`,
                      }} name={name} expirationInfo={expirationInfo}>

                    </AccordionInfo>
                    <div className="rstra-actions-container" style={{ height: height, display: isExpanded ? 'flex' : 'none' }} id={id} role="region">
                        {actionButtons.map((action, index) => (
                          <div key={`actionKey_${index}`} style={{ height }}>
                              <button
                                className="rstra-action-button"
                                onClick={() => handleActionClicked(action.onClick)}
                                style={{
                                    height,
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