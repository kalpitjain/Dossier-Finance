import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token{
  let owner : Principal = Principal.fromText("4sgdh-3mrsd-3k7t6-2wche-fz6k5-nyjwg-lna6q-o4wz2-qvtuv-heoml-iqe");
  let totalSupply: Nat = 1000000000000;
  let symbol: Text = "DOSS";

  // private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  
  if(balances.size() < 1){
    balances.put(owner, totalSupply);
  };

  // Check Token Balance Block
  public query func balanceOf(who: Principal): async Nat{
    let balance: Nat = switch(balances.get(who)){
      case null 0;
      case(?result) result;
    };
    return balance;
  };

  public query func getSymbol(): async Text{
    return symbol;
  };

  // Faucet Block
  public shared(msg) func payOut(): async Text{
    Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
      let amount = 5000;
      let result = await transfer(msg.caller, amount);
      return result;
    }else{
      return "Aready Claimed";
    }
  };

  //Transfer Block

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
    let fromBalance = await balanceOf(msg.caller);
    if(fromBalance>=amount){
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);
      
      return "Success";
    }else{

      return "Insufficient Funds";
    }
  }; 

  system func preupgrade(){
    balanceEntries:= Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(owner, totalSupply);
    };
  };

}