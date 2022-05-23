import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject, Vector3} from "UnityEngine"
import {EventTrigger, EventTriggerType} from "UnityEngine.EventSystems";
import {Entry} from "UnityEngine.EventSystems.EventTrigger";
import { Button } from "UnityEngine.UI"
import { Action, Action$1 } from "System" 

export default class UIController extends ZepetoScriptBehaviour {

    public carpetBtn : Button;
    public trigger : EventTrigger;
    public handleGo : GameObject;
    public handleOriginGo : GameObject;
    public downAction : Action;
    public dragAction : Action$1<Vector3>;
    public upAction : Action;
    
    Start() {
        this.AddEventTrigger(EventTriggerType.PointerDown, ()=>{
            console.log('move start');
            this.downAction();
        });
        this.AddEventTrigger(EventTriggerType.Drag, ()=>{
            var dir = (this.handleGo.transform.position - this.handleOriginGo.transform.position).normalized;
            //console.log(dir.x, dir.y); 
            this.dragAction(dir);
        });
        this.AddEventTrigger(EventTriggerType.PointerUp, ()=>{
            console.log('move complete');
            this.upAction();
        });
    }
    
    public AddEventTrigger(type:EventTriggerType, callback)
    {
        if(this.trigger === undefined) return;
        
        console.log(`this.trigger: ${this.trigger}, type : ${type}`);
        
        // create eventsystem entry
        var entry = new Entry();

        // specify event type & delegation
        entry.eventID = type;
        entry.callback.AddListener(callback);

        // register event entry
        this.trigger.triggers.Add(entry);
    }
    
    
    public  ShowCarpetButton()
    {
        this.carpetBtn.gameObject.SetActive(true);
    }

    public  HideCarpetButton()
    {
        this.carpetBtn.gameObject.SetActive(false);
    }

}