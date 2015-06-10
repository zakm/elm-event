# elm-event

## Minimal Example

```elm
import Html exposing (..)
import Html.Attributes exposing (..)
import Event

type alias Message = (String, Maybe String, Maybe String)

eventSource : String
eventSource = "/event-source"

port message : Signal Message
port message =
    Event.listen ["message" "error"] eventSource

toHtml : Message -> Html
toHtml (name, id, data) =
    div [class name]
        [text (case data of
                 Nothing -> ""
                 Just msg -> msg)]

main : Signal Html
main =
    Signal.map toHtml message
```
