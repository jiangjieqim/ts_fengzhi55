
import { EScene2DType } from "../../game/common/defines/EnumDefine";
import { E } from "../../game/G";
import {IScene2D} from "./IScene2D";
import { Scene2DBase } from "./Scene2DBase";

/**测试场景 */
export class TestScene extends Scene2DBase implements IScene2D {

    //#region 静态

    //#endregion

    //#region 实例
    SceneType = EScene2DType.Test;

    constructor() {
        super();

    }

    //#region 抽象方法实现

    protected onEnter(): void {

    }

    protected onExit(): void {

    }

    protected onFirstInit(): void {

    }

    protected onInit(): void {


        E.ResMgr.SceneOpen(this.SceneType, Laya.Handler.create(this, (s: any) => {
            console.log("[MainScene][onInit],加载场景完成");
            // this.Scene = this._scene = s;
            // this.createScene3D();
            console.log("----------------------------TestSceneInit");
            // new Test_Findpath();
            // new TestRoleSkill(this._scene3d);

            // let pos: Laya.Vector3 = Vec3Util.ZERO;

            // let label: Laya.Label = new Laya.Label();
            // Laya.stage.addChild(label);

            // let gePos: Laya.Vector4;
            // //
            // Laya.timer.loop(100, this, () => {
            //     if (pos.x > 5)
            //         pos.x -= 0.1;
            //     else if (pos.x < -5)
            //         pos.x += 0.1;

            //     gePos = GameHelp.Pos3Dto2D(pos, this._camera);
            //     label.pos(gePos.x, gePos.y);

            // }, null, true);


        }, [], null), null);
    }

    protected onAddLoadRes(): void {
        // this.addRes(ResPath.Scene.Test, Laya.Loader.JSON);
        // this.addRes(ResPath.Atlas.Comp, Laya.Loader.ATLAS);
    }

    protected onAddEventListener(): void {
        this.addEventSys(Laya.Event.KEY_DOWN, this.onKeyDown, this, Laya.stage);
    }

    //#endregion

    /**键盘事件*/
    private onKeyDown(e: Laya.Event): void {
        // if (e.keyCode == Laya.Keyboard.LEFT) {
        //     this.prevLevel();
        // }
        // else if (e.keyCode == Laya.Keyboard.RIGHT) {
        //     this.nextLevel();
        // }
        // console.log("[onKeyDown]e:" + e.keyCode);

        // if (e.keyCode == Laya.Keyboard.W) {
        //     this.ani_atk_crit.play();
        // }
        // if (e.keyCode == Laya.Keyboard.E) {
        //     this.ani_miss_left.play();
        // }
        // if (e.keyCode == Laya.Keyboard.R) {
        //     this.ani_miss_right.play();
        // }

    }

    //#endregion

    private _scene3d: Laya.Scene3D;
    private _camera: Laya.Camera;
    private _dirlight: Laya.DirectionLight;
    private createScene3D(): void {

        //创建场景
        var scene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 50, 0));
        camera.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        this._scene3d = scene;
        this._camera = camera;
        this._dirlight = directionLight;
    }

}