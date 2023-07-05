#!/bin/bash
set -e
BASE_FILE="smart_contract/contracts/$1"

divider_index=$(awk '/------/{print NR}' $BASE_FILE)

first_part=$(head -n "$divider_index" "$BASE_FILE")

echo "$first_part" >"$BASE_FILE"

RANDOM_VALUE=$((RANDOM % 200000 + 1))

RANDOM_FUNC=$(head /dev/urandom | tr -dc 'a-z' | fold -w 5 | head -n 1)


# Define the search pattern
search_pattern="LayerZero[^ ]*"

# Convert the first letter to uppercase
first_letter="${RANDOM_FUNC:0:1}"
uppercased_first_letter="${first_letter^^}"

# Replace the first letter in the variable
result="${uppercased_first_letter}${RANDOM_FUNC:1}"



# Define the replacement string
replacement_string="LayerZero$result"



# Use sed command to perform the replacement
sed -E -i "s/$search_pattern/$replacement_string/g" "$BASE_FILE"



echo "
function $RANDOM_FUNC() public pure returns (string memory)

	{
		string memory  randomStr='$RANDOM_VALUE';
		return randomStr;
	}
	}
" >>"$BASE_FILE"

echo "$replacement_string"
