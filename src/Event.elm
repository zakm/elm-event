module Event ( listen ) where

{-| Interface to EventSource

@docs listen
-}

import Native.Event
import Signal exposing (Signal)

listen : List String -> String -> Signal (String, Maybe String, Maybe String)
listen =
  Native.Event.listen
