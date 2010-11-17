var SlideDeck = (function() {


        // Set CSS classes on the decks

        var setStyles = function(decks, start, styleNames) {
   
            for(var i = 0, l = decks.length; i < l; i++) {

                if(i < start){
                    decks[i].className = styleNames.past;
                }

                if(i === start){
                    decks[i].className = styleNames.current;
                }

                if(i > start){
                    decks[i].className = styleNames.future;
                }

            }

        };



        // Find first level children in the slidedeck
        // TODO: Make this part of the process of setting styles!!!!
    
        var getFirstLevelChildren = function(el){

            // TODO: Make use of querySelectorAll - Note: make it generic!!!

            var elements = [];

            var walker = function(currentEl) {
                if(currentEl.nodeType === 1){
                    elements.push(currentEl);
                }
                var nextEl = currentEl.nextSibling;
                if (nextEl !== null) {
                    walker(nextEl);
                }
            };

            walker(el.firstChild);

            return elements;
        };



        // The Deck object

        var Deck = function(start, domElements, styleNames) {

            this.styles   = styleNames;
            this.decks    = getFirstLevelChildren(domElements.deck);
            this.index    = (start - 1);


            setStyles(this.decks, this.index, this.styles);

        };



        Deck.prototype = {

            next : function(callback) {

                if(this.index < (this.decks.length - 1)){

                    if(callback) {
                        callback();
                    }

                    this.decks[this.index].className = this.styles.past;
                    this.index++;
                    this.decks[this.index].className = this.styles.current;
                }

            },

            previous : function(callback) {

                if(this.index > 0){

                    if(callback) {
                        callback();
                    }

                    this.decks[this.index].className = this.styles.future;
                    this.index--;
                    this.decks[this.index].className = this.styles.current;
                }
                
            }
            
        };

        var d = Deck;
        return d;

    }

)();
