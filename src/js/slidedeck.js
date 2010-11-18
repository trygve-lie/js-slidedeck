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

            // TODO: A better recursive function: https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope/arguments/callee

            var walker = function (currentElement) {
                if (currentElement.nodeType === 1) {
                    children.push(currentElement);
                    setStyle(currentElement, children.length, start, styles);
                }
                var nextElement = currentElement.nextSibling;
                if (nextElement !== null) {
                    walker(nextElement);
                }
            };

            walker(element.firstChild);

            return children;
        };



        // The Deck object

        var Deck = function (start, elements, styles) {

            this.styles   = styles;
            this.decks    = readFirstLevelChildren(elements.deck, start, styles);
            this.index    = (start - 1);

        };



        Deck.prototype = {

            next : function (callback) {

                if (this.index < (this.decks.length - 1)) {

                    if (callback) {
                        callback(this.index, this.decks.length);
                    }

                    this.decks[this.index].className = this.styles.past;
                    this.index = this.index + 1;
                    this.decks[this.index].className = this.styles.current;
                }

            },

            previous : function (callback) {

                if (this.index > 0) {

                    if (callback) {
                        callback(this.index, this.decks.length);
                    }

                    this.decks[this.index].className = this.styles.future;
                    this.index = this.index - 1;
                    this.decks[this.index].className = this.styles.current;
                }
                
            },

            append : function(element) {

                this.decks.push(element);
                setStyle(element, (this.decks.length - 1), this.index, this.styles);

            }
            
        };


        return Deck;

    }()

);
