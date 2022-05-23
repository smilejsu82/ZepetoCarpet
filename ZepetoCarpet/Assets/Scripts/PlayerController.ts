import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {Collider, Animator, CharacterController, Vector3, Quaternion} from "UnityEngine"
import { UnityEvent  } from "UnityEngine.Events"
import Carpet from "./Carpet"
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller'

export default class PlayerController extends ZepetoScriptBehaviour {

    public enterAreaEvent : UnityEvent = new UnityEvent();
    public exitAreaEvent : UnityEvent = new UnityEvent();
    private anim : Animator;
    private characterController : CharacterController;
    private zepetoCharacter : ZepetoCharacter;
    Start() {
        this.anim = this.gameObject.GetComponentInChildren<Animator>();
        this.characterController= this.gameObject.GetComponent<CharacterController>();
        this.zepetoCharacter = this.gameObject.GetComponent<ZepetoCharacter>();
    }
    
    public Ride(carpet : Carpet)
    {
        console.log("Ride!");
        this.anim.SetTrigger("Ride");
        this.characterController.enabled = false;
        this.zepetoCharacter.enabled = false;
        this.transform.SetParent(carpet.transform);
        
        carpet.rotateAction = (angle)=>{
            this.transform.rotation = Quaternion.AngleAxis(angle, Vector3.up);
        };
        
        carpet.Fly(carpet.transform.position + Vector3.up, 1);
    }

    OnTriggerEnter(coll: Collider) {
        if(coll.tag == "Area"){
            this.enterAreaEvent.Invoke();        
        }
    }

    OnTriggerExit(coll: Collider) {
        if(coll.tag == "Area"){
            this.exitAreaEvent.Invoke();
        }
    }

}