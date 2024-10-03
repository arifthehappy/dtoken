import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";



actor Token {
  let owner : Principal = Principal.fromText("pnlef-2drjh-d6dqd-zdvsz-jwqlx-a2xao-cyafg-vtzyg-cezyl-fxpd4-iae");
  let totalSupply : Nat = 1000000000;
  let symbol :Text = "DARF";

  Debug.print(debug_show ("hi"));

  private stable var balanceEntries : [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal, Principal.hash);

  if(balances.size() < 1){
      balances.put(owner, totalSupply);
    };

  public query func getSymbol() : async Text{
    return symbol;
  };

  public query func balanceOf(who: Principal) : async Nat{
    let balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public shared(msg) func payOut() : async Text{
    // Debug.print(debug_show (msg.caller));
    if(balances.get(msg.caller) == null){
      let amount = 10000;
      // balances.put(msg.caller, amount);
      let result = await transfer(msg.caller, amount);
      return result;
    }else{
      return "Already Claimed"
    }
  };

  public shared(msg) func transfer(to : Principal, amount : Nat) : async Text{
    let fromBalance = await balanceOf(msg.caller);
    if(fromBalance > amount){
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance : Nat = toBalance + amount;
      balances.put(to, newToBalance);
      return "success";  
    }
    else{
      return "Insufficient fund";
    }
  };

  system func preupgrade(){
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(owner, totalSupply);
    }
  };
}