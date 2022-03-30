import { InstanceType, PluginEvent } from "../consts/enums";
import { InstanceChangeData } from "../data_representation/events_data";
import { EfficientSubject } from "../utilities/efficient_subject";
import { ILogLineParser } from "./log_line_parser";

enum Fields {
  Instance = 2,
  Command = 3
}

enum Commands {
  Commence = 0x40000001,
  Victory = 0x40000003,
  FadeOut = 0x40000005
}

const instanceMask = 0xFFFF0000;
const instanceFlag = 0x80030000;
const instanceIdMask = 0x0000FFFF; 

/*
  Dungeon, // ID 1-4999
  Trial, // ID 20001-24999
  Raid, // ID 30001-34999. has raids, alliances & ultimates
  Pvp, // 40001-54999
  DeepDungeon,// 60001-60099
*/
const [firstDungeonId, lastDungeonId] = [1, 4999];
const [firstTrialId, lastTrialId] = [20001, 24999];
const [firstRaidId, lastRaidId] = [30001, 34999];
const [firstPvpId, lastPvpId] = [40001, 54999];
const [firstDeepDungeonId, lastDeepDungeonId] = [60001, 60099];




export class ActorControlParser extends EfficientSubject implements ILogLineParser  {
  public execute(logLine33: Array<string>) {
    const instance = parseInt(logLine33[Fields.Instance], 16);
    if (((instance & instanceMask) >>> 0) === instanceFlag) {
      const instanceId = (instance & instanceIdMask) >>> 0;
      let instanceType = InstanceType.Other;
      if (instanceId >= firstDungeonId && instanceId <= lastDungeonId)
        instanceType = InstanceType.Dungeon;
      else if (instanceId >= firstTrialId && instanceId <= lastTrialId)
        instanceType = InstanceType.Trial;
      else if (instanceId >= firstRaidId && instanceId <= lastRaidId)
        instanceType = InstanceType.Raid;
      else if (instanceId >= firstPvpId && instanceId <= lastPvpId)
        instanceType = InstanceType.Pvp;
      else if (instanceId >= firstDeepDungeonId && instanceId <= lastDeepDungeonId)
        instanceType = InstanceType.DeepDungeon;

      super.notify(new InstanceChangeData(true, instanceType, instanceId), PluginEvent.InstanceChange);
      
    }

    const command = parseInt(logLine33[Fields.Command], 16);
    switch (command) {
      case Commands.FadeOut: super.notify(null, PluginEvent.Wipe); return;
      case Commands.Victory: super.notify(null, PluginEvent.Victory); return;
    }
  }
}