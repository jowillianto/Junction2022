package keeper

import (
	"chain/x/chain/types"
)

var _ types.QueryServer = Keeper{}
