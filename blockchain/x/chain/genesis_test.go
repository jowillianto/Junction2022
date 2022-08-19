package chain_test

import (
	"testing"

	keepertest "chain/testutil/keeper"
	"chain/testutil/nullify"
	"chain/x/chain"
	"chain/x/chain/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChainKeeper(t)
	chain.InitGenesis(ctx, *k, genesisState)
	got := chain.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
