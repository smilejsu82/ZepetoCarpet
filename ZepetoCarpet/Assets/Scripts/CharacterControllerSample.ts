import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller'
import PlayerController from "./PlayerController"
import {GameObject, Object, Vector3, Quaternion, WaitUntil } from "UnityEngine";
import UIController from "./UIController"
import Carpet from "./Carpet"

export default class CharacterControllerSample extends ZepetoScriptBehaviour {

    private playerController : PlayerController;
    private uiController : UIController;
    public carpetPrefab : GameObject;
    private carpetGo : GameObject;
    private carpet : Carpet;
    
    Start() {
        //제페토 아이디로 내 케릭터 생성 
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "smilejsu82", new SpawnInfo(),true);
        
        //케릭터가 생성되면 호출 되는 부분 
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            
            let _player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.playerController = _player.zepetoPlayer.character.gameObject.AddComponent<PlayerController>();
            var go = Object.Instantiate<GameObject>(ZepetoPlayers.instance.controllerData.horizontalController);
            this.uiController = go.GetComponent<UIController>();

            this.uiController.downAction = ()=>{

                console.log(`[CreateCarpet] carpet : ${this.carpet}`);
                
                this.carpet.MoveStart();
            };
            
            this.uiController.dragAction = (dir)=>{
                this.carpet.Move(dir);
            };

            this.uiController.upAction = ()=>{
                this.carpet.MoveStop();
            };
            
            this.uiController.carpetBtn.onClick.AddListener(()=>{
                this.CreateCarpet(this.playerController.gameObject.transform.position);
                this.playerController.Ride(this.carpet);

                ZepetoPlayers.instance.characterData.walkSpeed = 0;
                ZepetoPlayers.instance.characterData.runSpeed = 0;
                
            });
            
            this.playerController.enterAreaEvent.AddListener(()=>{
                this.uiController.ShowCarpetButton();
            });

            this.playerController.exitAreaEvent.AddListener(()=>{
                this.uiController.HideCarpetButton();
            });
            
        });
    }
    
    private CreateCarpet(pos : Vector3)
    {
        this.carpetGo = Object.Instantiate(this.carpetPrefab, pos, Quaternion.identity ) as GameObject;
        
        console.log(`[CreateCarpet] carpetGo : ${this.carpetGo}`);
        
        this.carpet = this.carpetGo.AddComponent<Carpet>();

        console.log(`[CreateCarpet] carpet : ${this.carpet}`);
    }

}