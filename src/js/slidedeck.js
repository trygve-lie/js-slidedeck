var slidedeck = {

    decks : [],
    index : 0,


    // Init the slidedeck

    init : function() {
        var deck = document.getElementById('deck');
        slidedeck.decks = deck.getElementsByTagName('div');

        // Handle hash url
        var start = 0;
        if(window.location.hash){
            start = window.location.hash.substring(1);
        }
        slidedeck.index = start;


        // Set CSS classes on the decks
        for(var i = 0, l = slidedeck.decks.length; i < l; i++) {

            if(i < start){
                slidedeck.decks[i].className = 'left';
            }

            if(i === start){
                slidedeck.decks[i].className = 'center';
            }

            if(i > start){
                slidedeck.decks[i].className = 'right';
            }

        }

        // Set eventhandlers
        document.onkeydown = function(e) {
            slidedeck.keyHandler(e);
        };
    },


    // Move deck to left

    moveLeft : function() {

        if(slidedeck.index < (slidedeck.decks.length - 1)){
            slidedeck.decks[slidedeck.index].className = 'left';
            slidedeck.index++;
            slidedeck.decks[slidedeck.index].className = 'center';
        }

        // Update hash in URL
        window.location.hash = slidedeck.index;
    },


    // Move deck to right

    moveRight : function() {

        if(slidedeck.index > 0){
            slidedeck.decks[slidedeck.index].className = 'right';
            slidedeck.index--;
            slidedeck.decks[slidedeck.index].className = 'center';
        }

        // Update hash in URL
        window.location.hash = slidedeck.index;
    },


    // Navigate trough arrow keys

    keyHandler : function(ev) {
        switch (ev.keyCode) {
          case 37: // Left arrow
              slidedeck.move('left');
              break;
          case 39: // Right arrow
              slidedeck.move('right');
              break;
        }
    }

};