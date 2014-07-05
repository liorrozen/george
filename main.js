var George = {

    george: null,

    "init": function(){
        this.george = new webkitSpeechRecognition();
        this.george.continuous = true;
        this.george.interimResults = false;
        this.george.lang = "en-GB";
        this.george.voice = window.speechSynthesis.getVoices()[ 1 ];
        this.start();
    },

    "start": function(){
        this.george.start();
    },

    "stop": function(){
        $( "#listening" ).hide();
        this.george.stop();
    },

     "wait": function(){
        var self = this;
        $( "#listening" ).hide();
        this.george.onresult = function(event) {
            var results = event.results;
            var len = results.length - 1;
            var res = results[ len ];
            if ( res.isFinal && self.isGeorge( res ) ){
                self.listen();
                return;
            }
            // });
        };
    },

    "listen": function(){
        $( "#listening" ).show();
        $( "#result" ).text( "" );
        var self = this;
        this.george.onresult = function(event) {
            var len = event.results.length - 1;
            var said = event.results[ len ][ 0 ].transcript;
            self.say( "You said: " + said );
            self.wait();
        };
    },

    "say": function( text ){
        console.log( text );
        $( "#result" ).text( text );
    },

    "isGeorge": function( res ){
        var re = /george/i;
        if ( res.length > 0 ){
            var found = false;
            $.each( res, function( index, phrase ){
                trans = $.trim( phrase.transcript );
                if ( re.test( trans ) ){
                    found = true;
                    return;
                }
            });
            return found;
        }
    }
};
