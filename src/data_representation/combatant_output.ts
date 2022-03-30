export class CombatantOutput {
  
  public dmgDone = 0;
  public rdmgDone = 0;
  public rdmgGiven = 0;
  public rdmgReceived = 0;
  public ndmgDone = 0;

  public dmgSwings = 0;
  public dmgCrits = 0;
  public dmgDhs = 0;
  public dmgCritDhs = 0;
  public dmgCritChance = 0;
  public dmgDhChance = 0;
  public dmgCritDhChance = 0;
  
  
  public pureHealingDone = 0;
  public pureOverhealingDone = 0;
  public shieldingDone = 0;
  public overshieldingDone = 0;

  public pureShieldingSwings = 0; // for stuff that is only a shield that can't crit. like whm's benison
  public pureHealingSwings = 0;
  public pureHealingCrits = 0;
  public pureHealingCritChance = 0;

  public healingDone = 0; // pure + shields
  public overhealingDone = 0; // pure + shields
  public healingCritChance = 0;
  
  
  public totalCritChance = 0; // dmg + heals
  public dmgTaken = 0;
  public mitigatedDmg = 0;
  public deaths = 0;
  public ghosts = 0;

  // calculated on each update cycle
  public dps = 0;
  public rdps = 0;
  public rdpsGiven = 0;
  public rdpsReceived = 0;
  public hps = 0; // heals + shields
  public dmgPercentageDone = 0;
  public ndps = 0;
  public gcdUptime = 0; // figure how to do it and add later


  update(elapsedTime) {

  }
}