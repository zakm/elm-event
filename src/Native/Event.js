Elm.Native.Event = {};
Elm.Native.Event.make = function(localRuntime) {
    "use strict";

    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.Event = localRuntime.Native.Event || {};
    if (localRuntime.Native.Event.values) {
        return localRuntime.Native.Event.values;
    }

    var List = Elm.Native.List.make(localRuntime),
        Maybe = Elm.Maybe.make(localRuntime),
        NS = Elm.Native.Signal.make(localRuntime);

    function Tuple3(x,y,z) {
        return {
            ctor: "_Tuple3",
            _0: x,
            _1: y,
            _2: z
        };
    }

    function listen(handlers, url) {

        var source = new EventSource( url ),
            signal = NS.input( 'event-source', Tuple3("", Maybe.Nothing, Maybe.Nothing) );

        List.toArray( handlers ).forEach( function(name) {

            source.addEventListener( name, function(e) {
                localRuntime.notify(
                    signal.id,
                    Tuple3( name,
                            (e.lastEventId === undefined
                             ? Maybe.Nothing
                             : Maybe.Just( e.lastEventId) ),
                            (e.data === undefined
                             ? Maybe.Nothing
                             : Maybe.Just( e.data )) ) );
            } );

        } );

        return signal;
    }

    return localRuntime.Native.Event.values = {
        listen: F2(listen)
    };
};
