#!/bin/bash
set -e
echo $1
BASE_FILE="smart_contract/contracts/$1"

divider_index=$(awk '/------/{print NR}' $BASE_FILE)

first_part=$(head -n "$divider_index" "$BASE_FILE")

echo "$first_part" >"$BASE_FILE"

RANDOM_VALUE=$((RANDOM % 200000 + 1))

RANDOM_FUNC=$(head /dev/urandom | tr -dc 'a-z' | fold -w 5 | head -n 1)



echo "
function $RANDOM_FUNC() public pure returns (string memory)

	{
		string memory  randomStr='$RANDOM_VALUE';
		return randomStr;
	}
	}
" >>"$BASE_FILE"