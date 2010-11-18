var SlideDeck = (function () {


        // Set CSS on a deck

        var setStyle = function (element, index, start, styles) {

            if (index < start) {
                element.className = styles.past;
            }

            if (index === start) {
                element.className = styles.current;
            }

            if (index > start) {
                element.className = styles.future;
            }

        };


        // Find all first level children in the slidedeck, push them in a stack and apply css styles
    
        var readFirstLevelChildren = function (element, start, styles) {

            var children = [];

            var domWalker = function (currentElement) {
                if (currentElement.nodeType === 1) {
                    children.push(currentElement);
                    setStyle(currentElement, children.length, start, styles);
                }
                var nextElement = currentElement.nextSibling;
                if (nextElement !== null) {
                    arguments.callee(nextElement);
                }
            }(element.firstChild);

            return children;
        };


        // The Deck object

        var Deck = function (elements, start, styles) {

            this.styles   = styles || {past : 'past', future : 'future', current : 'current'};
            this.index    = (start - 1);
            this.decks    = readFirstLevelChildren(elements.deck, start, this.styles);
        };


        Deck.prototype = {


            // Move to the next deck in the slidedeck
            
            next : function (callback) {

                var obj = this;

                if (obj.index < (obj.decks.length - 1)) {

                    obj.decks[obj.index].className = obj.styles.past;
                    obj.index = obj.index + 1;
                    obj.decks[obj.index].className = obj.styles.current;

                    if (callback) {
                        callback(obj.index === (obj.decks.length - 1));             // Calculate "almost at the end"
                    }

                }

            },


            // Move to the previous deck in the slidedeck

            previous : function (callback) {

                var obj = this;

                if (obj.index > 0) {

                    obj.decks[obj.index].className = obj.styles.future;
                    obj.index = obj.index - 1;
                    obj.decks[obj.index].className = obj.styles.current;

                    if (callback) {
                        callback((obj.index - 1) === 0);                            // Calculate "almost at the beginning"
                    }

                }
                
            },


            // Append a new deck to the slidedeck

            append : function (element, callback) {

                var obj = this;

                obj.decks.push(element);
                setStyle(element, (obj.decks.length - 1), obj.index, obj.styles);

                if (callback) {
                    callback();
                }

            }
            
        };


        return Deck;

    }()

);
