package keeper_test

import (
	"context"
	"testing"

	keepertest "chain/testutil/keeper"
	"chain/x/chain/keeper"
	"chain/x/chain/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.ChainKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
