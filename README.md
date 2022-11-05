# Check your Balance

1. Find out your principal id:

```
sudo dfx identity get-principal
```

2. Save it somewhere.

3. Format and store it in a command line variable:

```
OWNER_PUBLIC_KEY="principal \"$(sudo \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:

```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:

```
sudo dfx canister call dossierFinance balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister

1. Check canister ID:

```
sudo dfx canister id dossierFinance
```

2. Save canister ID into a command line variable:

```
CANISTER_PUBLIC_KEY="principal \"$(sudo \dfx canister id dossierFinance )\""
```

3. Check canister ID has been successfully saved:

```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:

```
sudo dfx canister call dossierFinance transfer "($CANISTER_PUBLIC_KEY, 500_000_000_000)"
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
sudo dfx deploy --network ic
```

2. Check the live canister ID:

```
sudo dfx canister --network ic id dossierFinance
```

3. Save the live canister ID to a command line variable:

```
LIVE_CANISTER_KEY="principal \"$(sudo \dfx canister --network ic id dossierFinance )\""
```

4. Check that it worked:

```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:

```
sudo dfx canister --network ic call dossierFinance transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:

```
sudo dfx canister --network ic id dossierFinance_assets
```

7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
   e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app
