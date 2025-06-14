
	/**
	 * Config 用于配置一些全局参数。如需更改，请在初始化引擎之前设置。
	 */
	declare class Config  {

		/**
		 * 动画 Animation 的默认播放时间间隔，单位为毫秒。
		 */
		static animationInterval:number;

		/**
		 * 设置是否抗锯齿，只对2D(WebGL)、3D有效。
		 */
		static isAntialias:boolean;

		/**
		 * 设置画布是否透明，只对2D(WebGL)、3D有效。
		 */
		static isAlpha:boolean;

		/**
		 * 设置画布是否预乘，只对2D(WebGL)、3D有效。
		 */
		static premultipliedAlpha:boolean;

		/**
		 * 设置画布的是否开启模板缓冲，只对2D(WebGL)、3D有效。
		 */
		static isStencil:boolean;

		/**
		 * 是否保留渲染缓冲区。
		 */
		static preserveDrawingBuffer:boolean;

		/**
		 * 当使用webGL渲染2d的时候，每次创建vb是否直接分配足够64k个顶点的缓存。这样可以提高效率。
		 */
		static webGL2D_MeshAllocMaxMem:boolean;

		/**
		 * 是否强制使用像素采样。适用于像素风格游戏
		 */
		static is2DPixelArtGame:boolean;

		/**
		 * 是否使用webgl2
		 */
		static useWebGL2:boolean;

		/**
		 * 是否打印Webgl指令，同时定位webgl报错
		 */
		static printWebglOrder:boolean;

		/**
		 * 是否允许GPUInstance动态合并,仅对3D有效。
		 */
		static allowGPUInstanceDynamicBatch:boolean;

		/**
		 * 是否允许静态合并
		 */
		static enableStaticBatch:boolean;
		static useRetinalCanvas:boolean;
	}

	/**
	 * <code>Config3D</code> 类用于创建3D初始化配置。
	 */
	declare class Config3D implements Laya.IClone  {
		static get useCannonPhysics():boolean;
		static set useCannonPhysics(value:boolean);
		static set enableDynamicManager(value:boolean);
		static get enableDynamicManager():boolean;
		static set enableStaticManager(value:boolean);
		static get enableStaticManager():boolean;

		/**
		 * 是否开启抗锯齿。
		 */
		isAntialias:boolean;

		/**
		 * 画布是否包含透明通道。
		 */
		isAlpha:boolean;

		/**
		 * 画布是否预乘。
		 */
		premultipliedAlpha:boolean;

		/**
		 * 画布是否开启模板缓冲。
		 */
		isStencil:boolean;

		/**
		 * 是否开启多光源,如果场景不需要多光源，关闭后可提升性能。
		 */
		enableMultiLight:boolean;

		/**
		 * 是否开启八叉树裁剪。
		 */
		octreeCulling:boolean;

		/**
		 * 八叉树初始化尺寸。
		 */
		octreeInitialSize:number;

		/**
		 * 八叉树初始化中心。
		 */
		octreeInitialCenter:Laya.Vector3;

		/**
		 * 八叉树最小尺寸。
		 */
		octreeMinNodeSize:number;

		/**
		 * 八叉树松散值。
		 */
		octreeLooseness:number;

		/**
		 * 是否开启视锥裁剪调试。
		 * 如果开启八叉树裁剪,使用红色绘制高层次八叉树节点包围盒,使用蓝色绘制低层次八叉节点包围盒,精灵包围盒和八叉树节点包围盒颜色一致,但Alpha为非透明。如果视锥完全包含八叉树节点,八叉树节点包围盒和精灵包围盒变为蓝色,同样精灵包围盒的Alpha为非透明。
		 * 如果不开启八叉树裁剪,使用绿色像素线绘制精灵包围盒。
		 */
		debugFrustumCulling:boolean;

		/**
		 * PBR材质渲染质量。
		 */
		pbrRenderQuality:Laya.PBRRenderQuality;

		/**
		 * 是否使用CANNONJS物理引擎
		 */
		isUseCannonPhysicsEngine:boolean;

		/**
		 * 默认物理功能初始化内存，单位为M。
		 */
		get defaultPhysicsMemory():number;
		set defaultPhysicsMemory(value:number);

		/**
		 * 设置分辨率大小（并不是实际渲染分辨率）
		 * @param width 
		 * @param height 
		 */
		setResSize(width:number,height:number):void;

		/**
		 * 分辨率宽
		 */
		get pixResolWidth():number;

		/**
		 * 设置分辨率宽
		 */
		get pixResolHeight():number;

		/**
		 * 分辨率倍率
		 */
		get pixelResol():number;
		set pixelResol(ratio:number);

		/**
		 * 分辨率倍率
		 */
		set pixelRatio(ratio:number);
		get pixelRatio():number;

		/**
		 * 自定义渲染像素
		 */
		set customPixel(value:boolean);
		get customPixel():boolean;

		/**
		 * 最大光源数量。
		 */
		get maxLightCount():number;
		set maxLightCount(value:number);

		/**
		 * X、Y、Z轴的光照集群数量,Z值会影响Cluster接受区域光(点光、聚光)影响的数量,Math.floor(2048 / lightClusterCount.z - 1) * 4 为每个Cluster的最大平均接受区域光数量,如果每个Cluster所接受光源影响的平均数量大于该值，则较远的Cluster会忽略其中多余的光照影响。
		 */
		get lightClusterCount():Laya.Vector3;
		set lightClusterCount(value:Laya.Vector3);

		/**
		 * 创建一个 <code>Config3D</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(dest:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>Laya</code> 是全局对象的引用入口集。
	 * Laya类引用了一些常用的全局对象，比如Laya.stage：舞台，Laya.timer：时间管理器，Laya.loader：加载管理器，使用时注意大小写。
	 */
	declare class Laya  {

		/**
		 * 舞台对象的引用。
		 */
		static stage:Laya.Stage;

		/**
		 * @private 系统时钟管理器，引擎内部使用
		 */
		static systemTimer:Laya.Timer;

		/**
		 * @private 组件的start时钟管理器
		 */
		static startTimer:Laya.Timer;

		/**
		 * @private 组件的物理时钟管理器
		 */
		static physicsTimer:Laya.Timer;

		/**
		 * @private 组件的update时钟管理器
		 */
		static updateTimer:Laya.Timer;

		/**
		 * @private 组件的lateUpdate时钟管理器
		 */
		static lateTimer:Laya.Timer;

		/**
		 * 游戏主时针，同时也是管理场景，动画，缓动等效果时钟，通过控制本时针缩放，达到快进慢播效果
		 */
		static timer:Laya.Timer;

		/**
		 * 加载管理器的引用。
		 */
		static loader:Laya.LoaderManager;

		/**
		 * 当前引擎版本。
		 */
		static version:string;

		/**
		 * @private Render 类的引用。
		 */
		static render:Laya.Render;

		/**
		 * 是否是微信小游戏子域，默认为false*
		 */
		static isWXOpenDataContext:boolean;

		/**
		 * 微信小游戏是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false*
		 */
		static isWXPosMsg:boolean;

		/**
		 * 兼容as3编译工具
		 */
		static __init(_classs:any[]):void;

		/**
		 * 初始化引擎。使用引擎需要先初始化引擎，否则可能会报错。
		 * @param width 初始化的游戏窗口宽度，又称设计宽度。
		 * @param height 初始化的游戏窗口高度，又称设计高度。
		 * @param plugins 插件列表，比如 WebGL（使用WebGL方式渲染）。
		 * @return 返回原生canvas引用，方便对canvas属性进行修改
		 */
		static init(width:number,height:number,...plugins:any[]):any;

		/**
		 * 表示是否捕获全局错误并弹出提示。默认为false。
		 * 适用于移动设备等不方便调试的时候，设置为true后，如有未知错误，可以弹窗抛出详细错误堆栈。
		 */
		static alertGlobalError(value:boolean):void;

		/**
		 * 开启DebugPanel
		 * @param debugJsPath laya.debugtool.js文件路径
		 */
		static enableDebugPanel(debugJsPath?:string):void;
		private static isNativeRender_enable:any;

		/**
		 * @private 
		 */
		private static enableWebGLPlus:any;

		/**
		 * @private 
		 */
		private static enableNative:any;
	}

	/**
	 * <code>Laya3D</code> 类用于初始化3D设置。
	 */
	declare class Laya3D  {

		/**
		 * Hierarchy资源。
		 */
		static HIERARCHY:string;

		/**
		 * Mesh资源。
		 */
		static MESH:string;

		/**
		 * Material资源。
		 */
		static MATERIAL:string;

		/**
		 * Texture2D资源。
		 */
		static TEXTURE2D:string;

		/**
		 * TextureCube资源。
		 */
		static TEXTURECUBE:string;

		/**
		 * TextureCube资源。
		 */
		static TEXTURECUBEBIN:string;

		/**
		 * AnimationClip资源。
		 */
		static ANIMATIONCLIP:string;

		/**
		 * Avatar资源。
		 */
		static AVATAR:string;

		/**
		 * Terrain资源。
		 */
		static TERRAINHEIGHTDATA:string;

		/**
		 * Terrain资源。
		 */
		static TERRAINRES:string;

		/**
		 * SimpleAnimator资源。
		 */
		static SIMPLEANIMATORBIN:string;

		/**
		 * 获取是否可以启用物理。
		 * @param 是否启用物理 。
		 */
		static get enablePhysics():any;
		private static enableNative3D:any;

		/**
		 * @private 
		 */
		private static formatRelativePath:any;

		/**
		 * 初始化Laya3D相关设置。
		 * @param width 3D画布宽度。
		 * @param height 3D画布高度。
		 */
		static init(width:number,height:number,config?:Config3D,compolete?:Laya.Handler):void;

		/**
		 * 创建一个 <code>Laya3D</code> 实例。
		 */

		constructor();
	}

	/**
	 * 全局配置
	 */
	declare class UIConfig  {

		/**
		 * 是否开启触摸滚动（针对滚动条）
		 */
		static touchScrollEnable:boolean;

		/**
		 * 是否开启滑轮滚动（针对滚动条）
		 */
		static mouseWheelEnable:boolean;

		/**
		 * 是否显示滚动条按钮
		 */
		static showButtons:boolean;

		/**
		 * 弹出框背景颜色
		 */
		static popupBgColor:string;

		/**
		 * 弹出框背景透明度
		 */
		static popupBgAlpha:number;

		/**
		 * 模式窗口点击边缘，是否关闭窗口，默认是关闭的
		 */
		static closeDialogOnSide:boolean;
	}
declare module Laya {

	/**
	 * 开始播放时调度。
	 * @eventType Event.PLAYED
	 */

	/**
	 * 暂停时调度。
	 * @eventType Event.PAUSED
	 */

	/**
	 * 完成一次循环时调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 停止时调度。
	 * @eventType Event.STOPPED
	 */

	/**
	 * <code>AnimationPlayer</code> 类用于动画播放器。
	 */
	class AnimationPlayer extends EventDispatcher implements IDestroy  {

		/**
		 * 是否缓存
		 */
		isCache:boolean;

		/**
		 * 播放速率
		 */
		playbackRate:number;

		/**
		 * 停止时是否归零
		 */
		returnToZeroStopped:boolean;

		/**
		 * 获取动画数据模板
		 * @param value 动画数据模板
		 */
		get templet():AnimationTemplet;

		/**
		 * 设置动画数据模板,注意：修改此值会有计算开销。
		 * @param value 动画数据模板
		 */
		set templet(value:AnimationTemplet);

		/**
		 * 动画播放的起始时间位置。
		 * @return 起始时间位置。
		 */
		get playStart():number;

		/**
		 * 动画播放的结束时间位置。
		 * @return 结束时间位置。
		 */
		get playEnd():number;

		/**
		 * 获取动画播放一次的总时间
		 * @return 动画播放一次的总时间
		 */
		get playDuration():number;

		/**
		 * 获取动画播放的总总时间
		 * @return 动画播放的总时间
		 */
		get overallDuration():number;

		/**
		 * 获取当前动画索引
		 * @return value 当前动画索引
		 */
		get currentAnimationClipIndex():number;

		/**
		 * 获取当前帧数
		 * @return 当前帧数
		 */
		get currentKeyframeIndex():number;

		/**
		 * 获取当前精确时间，不包括重播时间
		 * @return value 当前时间
		 */
		get currentPlayTime():number;

		/**
		 * 获取当前帧时间，不包括重播时间
		 * @return value 当前时间
		 */
		get currentFrameTime():number;

		/**
		 * 获取缓存播放速率。*
		 * @return 缓存播放速率。
		 */
		get cachePlayRate():number;

		/**
		 * 设置缓存播放速率,默认值为1.0,注意：修改此值会有计算开销。*
		 * @return value 缓存播放速率。
		 */
		set cachePlayRate(value:number);

		/**
		 * 获取默认帧率*
		 * @return value 默认帧率
		 */
		get cacheFrameRate():number;

		/**
		 * 设置默认帧率,每秒60帧,注意：修改此值会有计算开销。*
		 * @return value 缓存帧率
		 */
		set cacheFrameRate(value:number);

		/**
		 * 设置当前播放位置
		 * @param value 当前时间
		 */
		set currentTime(value:number);

		/**
		 * 获取当前是否暂停
		 * @return 是否暂停
		 */
		get paused():boolean;

		/**
		 * 设置是否暂停
		 * @param value 是否暂停
		 */
		set paused(value:boolean);

		/**
		 * 获取缓存帧率间隔时间
		 * @return 缓存帧率间隔时间
		 */
		get cacheFrameRateInterval():number;

		/**
		 * 获取当前播放状态
		 * @return 当前播放状态
		 */
		get state():number;

		/**
		 * 获取是否已销毁。
		 * @return 是否已销毁。
		 */
		get destroyed():boolean;

		/**
		 * 创建一个 <code>AnimationPlayer</code> 实例。
		 */

		constructor();

		/**
		 * @private 
		 */
		private _setPlayParams:any;

		/**
		 * 动画停止了对应的参数。目前都是设置时间为最后
		 * @private 
		 */
		private _setPlayParamsWhenStop:any;

		/**
		 * 播放动画。
		 * @param index 动画索引。
		 * @param playbackRate 播放速率。
		 * @param duration 播放时长（0为1次,Number.MAX_VALUE为循环播放）。
		 * @param playStart 播放的起始时间位置。
		 * @param playEnd 播放的结束时间位置。（0为动画一次循环的最长结束时间位置）。
		 */
		play(index?:number,playbackRate?:number,overallDuration?:number,playStart?:number,playEnd?:number):void;

		/**
		 * 播放动画。
		 * @param index 动画索引。
		 * @param playbackRate 播放速率。
		 * @param duration 播放时长（0为1次,Number.MAX_VALUE为循环播放）。
		 * @param playStartFrame 播放的原始起始帧率位置。
		 * @param playEndFrame 播放的原始结束帧率位置。（0为动画一次循环的最长结束时间位置）。
		 */
		playByFrame(index?:number,playbackRate?:number,overallDuration?:number,playStartFrame?:number,playEndFrame?:number,fpsIn3DBuilder?:number):void;

		/**
		 * 停止播放当前动画
		 * 如果不是立即停止就等待动画播放完成后再停止
		 * @param immediate 是否立即停止
		 */
		stop(immediate?:boolean):void;

		/**
		 * @private 
		 */
		destroy():void;
	}

	/**
	 * <code>AnimationTemplet</code> 类用于动画模板资源。
	 */
	class AnimationTemplet extends Resource  {

		/**
		 * 插值函数
		 */
		static interpolation:any[];

		/**
		 * @private 
		 */
		private static _LinearInterpolation_0:any;

		/**
		 * @private 
		 */
		private static _QuaternionInterpolation_1:any;

		/**
		 * @private 
		 */
		private static _AngleInterpolation_2:any;

		/**
		 * @private 
		 */
		private static _RadiansInterpolation_3:any;

		/**
		 * @private 
		 */
		private static _Matrix4x4Interpolation_4:any;

		/**
		 * @private 
		 */
		private static _NoInterpolation_5:any;

		/**
		 * @private 
		 */
		private static _BezierInterpolation_6:any;

		/**
		 * @private 
		 */
		private static _BezierInterpolation_7:any;

		/**
		 * @private 
		 */
		protected unfixedCurrentFrameIndexes:Uint32Array;

		/**
		 * @private 
		 */
		protected unfixedCurrentTimes:Float32Array;

		/**
		 * @private 
		 */
		protected unfixedKeyframes:KeyFramesContent[];

		/**
		 * @private 
		 */
		protected unfixedLastAniIndex:number;

		/**
		 * @private 
		 */
		private _boneCurKeyFrm:any;

		constructor();

		/**
		 * @private 
		 */
		parse(data:ArrayBuffer):void;

		/**
		 * 获取动画数量
		 */
		getAnimationCount():number;

		/**
		 * 通过索引获取动画
		 * @param aniIndex 
		 */
		getAnimation(aniIndex:number):any;

		/**
		 * 获取动画时长
		 * @param aniIndex 
		 */
		getAniDuration(aniIndex:number):number;

		/**
		 * 获取动画nodes信息
		 */
		getNodes(aniIndex:number):any;

		/**
		 * 获取动画骨骼信息
		 */
		getNodeIndexWithName(aniIndex:number,name:string):number;

		/**
		 * 获取nodes长度
		 */
		getNodeCount(aniIndex:number):number;

		/**
		 * 获取keyframes长度
		 */
		getTotalkeyframesLength(aniIndex:number):number;

		/**
		 * 获取附加数据
		 */
		getPublicExtData():ArrayBuffer;

		/**
		 * 获取动画信息数据
		 */
		getAnimationDataWithCache(key:any,cacheDatas:any,aniIndex:number,frameIndex:number):Float32Array;

		/**
		 * 设置动画信息数据
		 */
		setAnimationDataWithCache(key:any,cacheDatas:any[],aniIndex:number,frameIndex:number,data:any):void;

		/**
		 * 计算当前时间应该对应关键帧的哪一帧
		 * @param nodeframes 当前骨骼的关键帧数据
		 * @param nodeid 骨骼id，因为要使用和更新 _boneCurKeyFrm
		 * @param tm 
		 * @return 问题
	最后一帧有问题，例如倒数第二帧时间是0.033ms,则后两帧非常靠近，当实际给最后一帧的时候，根据帧数计算出的时间实际上落在倒数第二帧
 	使用与AnimationPlayer一致的累积时间就行
		 */
		getNodeKeyFrame(nodeframes:KeyFramesContent[],nodeid:number,tm:number):number;

		/**
		 * 获取原始数据
		 * @param aniIndex 
		 * @param originalData 
		 * @param nodesFrameIndices 
		 * @param frameIndex 
		 * @param playCurTime 
		 */
		getOriginalData(aniIndex:number,originalData:Float32Array,nodesFrameIndices:any[],frameIndex:number,playCurTime:number):void;

		/**
		 * 获取nodes信息
		 */
		getNodesCurrentFrameIndex(aniIndex:number,playCurTime:number):Uint32Array;

		/**
		 * 获取原始数据
		 */
		getOriginalDataUnfixedRate(aniIndex:number,originalData:Float32Array,playCurTime:number):void;
	}

	/**
	 * @private 
	 */
	class Bone  {
		static ShowBones:any;
		name:string;
		root:Bone;
		parentBone:Bone;
		length:number;
		transform:Transform;
		resultTransform:Transform;
		resultMatrix:Matrix;
		inheritScale:boolean;
		inheritRotation:boolean;
		rotation:number;
		resultRotation:number;
		d:number;

		constructor();
		setTempMatrix(matrix:Matrix):void;
		update(pMatrix?:Matrix|null):void;
		updateChild():void;
		setRotation(rd:number):void;
		updateDraw(x:number,y:number):void;
		addChild(bone:Bone):void;
		findBone(boneName:string):Bone|null;
		localToWorld(local:number[]):void;
	}
	class BoneSlot  {

		/**
		 * 插槽名称
		 */
		name:string;

		/**
		 * 插槽绑定的骨骼名称
		 */
		parent:string;

		/**
		 * 插糟显示数据数据的名称
		 */
		attachmentName:string;

		/**
		 * 原始数据的索引
		 */
		srcDisplayIndex:number;

		/**
		 * 判断对象是否是原对象
		 */
		type:string;

		/**
		 * 模板的指针
		 */
		templet:Templet;

		/**
		 * 当前插槽对应的数据
		 */
		currSlotData:SlotData;

		/**
		 * 当前插槽显示的纹理
		 */
		currTexture:Texture|null;

		/**
		 * 显示对象对应的数据
		 */
		currDisplayData:SkinSlotDisplayData|null;

		/**
		 * 显示皮肤的索引
		 */
		displayIndex:number;

		/**
		 * @private 
		 */
		originalIndex:number;

		/**
		 * @private 变形动画数据
		 */
		deformData:any[];

		/**
		 * 设置要显示的插槽数据
		 * @param slotData 
		 * @param disIndex 
		 * @param freshIndex 是否重置纹理
		 */
		showSlotData(slotData:SlotData,freshIndex?:boolean):void;

		/**
		 * 通过名字显示指定对象
		 * @param name 
		 */
		showDisplayByName(name:string):void;

		/**
		 * 替换贴图名
		 * @param tarName 要替换的贴图名
		 * @param newName 替换后的贴图名
		 */
		replaceDisplayByName(tarName:string,newName:string):void;

		/**
		 * 替换贴图索引
		 * @param tarIndex 要替换的索引
		 * @param newIndex 替换后的索引
		 */
		replaceDisplayByIndex(tarIndex:number,newIndex:number):void;

		/**
		 * 指定显示对象
		 * @param index 
		 */
		showDisplayByIndex(index:number):void;

		/**
		 * 替换皮肤
		 * @param _texture 
		 */
		replaceSkin(_texture:Texture):void;

		/**
		 * 保存父矩阵的索引
		 * @param parentMatrix 
		 */
		setParentMatrix(parentMatrix:Matrix):void;
		private _mVerticleArr:any;
		private static _tempMatrix:any;
		static createSkinMesh():any;
		private static isSameArr:any;
		private getSaveVerticle:any;
		static isSameMatrix(mtA:Matrix,mtB:Matrix):boolean;
		private _preGraphicMatrix:any;
		private static useSameMatrixAndVerticle:any;
		private getSaveMatrix:any;

		/**
		 * 把纹理画到Graphics上
		 * @param graphics 
		 * @param noUseSave 不使用共享的矩阵对象 _tempResultMatrix，只有实时计算的时候才设置为true
		 */
		draw(graphics:GraphicsAni,boneMatrixArray:any[],noUseSave?:boolean,alpha?:number):void;

		/**
		 * 显示蒙皮动画
		 * @param boneMatrixArray 当前帧的骨骼矩阵
		 */
		private skinMesh:any;

		/**
		 * 画骨骼的起始点，方便调试
		 * @param graphics 
		 */
		drawBonePoint(graphics:Graphics):void;

		/**
		 * 得到显示对象的矩阵
		 * @return 
		 */
		private getDisplayMatrix:any;

		/**
		 * 得到插糟的矩阵
		 * @return 
		 */
		getMatrix():Matrix;

		/**
		 * 用原始数据拷贝出一个
		 * @return 
		 */
		copy():BoneSlot;
	}

	/**
	 */
	class MeshData  {

		/**
		 * 纹理
		 */
		texture:Texture;

		/**
		 * uv数据
		 */
		uvs:Float32Array;

		/**
		 * 顶点数据
		 */
		vertices:Float32Array;

		/**
		 * 顶点索引
		 */
		indexes:Uint16Array;

		/**
		 * uv变换矩阵
		 */
		uvTransform:Matrix;

		/**
		 * 是否有uv变化矩阵
		 */
		useUvTransform:boolean;

		/**
		 * 扩展像素,用来去除黑边
		 */
		canvasPadding:number;

		/**
		 * 计算mesh的Bounds
		 * @return 
		 */
		getBounds():Rectangle;
	}
	class SkinMeshForGraphic extends MeshData  {

		constructor();

		/**
		 * 矩阵
		 */
		transform:Matrix|null;
		init2(texture:Texture,ps:any[],verticles:any[],uvs:any[]):void;
	}

	/**
	 * 事件数据
	 */
	class EventData  {

		/**
		 * 事件名称
		 */
		name:string;

		/**
		 * 整数数据
		 */
		intValue:number;

		/**
		 * 单精度浮点数数据
		 */
		floatValue:number;

		/**
		 * 字符串数据
		 */
		stringValue:string;

		/**
		 * 多媒体数据
		 */
		audioValue:string;

		/**
		 * 事件数据
		 */
		time:number;

		constructor();
	}

	/**
	 * 动画开始播放调度
	 * @eventType Event.PLAYED
	 */

	/**
	 * 动画停止播放调度
	 * @eventType Event.STOPPED
	 */

	/**
	 * 动画暂停播放调度
	 * @eventType Event.PAUSED
	 */

	/**
	 * 自定义事件。
	 * @eventType Event.LABEL
	 */

	/**
	 * 骨骼动画由<code>Templet</code>，<code>AnimationPlayer</code>，<code>Skeleton</code>三部分组成。
	 */
	class Skeleton extends Sprite  {

		/**
		 * 在canvas模式是否使用简化版的mesh绘制，简化版的mesh将不进行三角形绘制，而改为矩形绘制，能极大提高性能，但是可能某些mesh动画效果会不太正常
		 */
		static useSimpleMeshInCanvas:boolean;

		/**
		 * 创建一个Skeleton对象
		 * @param templet 骨骼动画模板
		 * @param aniMode 动画模式，0不支持换装，1、2支持换装
		 */

		constructor(templet?:Templet,aniMode?:number);

		/**
		 * 初始化动画
		 * @param templet 模板
		 * @param aniMode 动画模式
<table>
<tr><th>模式</th><th>描述</th></tr>
<tr>
<td>0</td> <td>使用模板缓冲的数据，模板缓冲的数据，不允许修改（内存开销小，计算开销小，不支持换装）</td>
</tr>
<tr>
<td>1</td> <td>使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存	（内存开销大，计算开销小，支持换装）</td>
</tr>
<tr>
<td>2</td> <td>使用动态方式，去实时去画（内存开销小，计算开销大，支持换装,不建议使用）</td>
</tr>
</table>
		 */
		init(templet:Templet,aniMode?:number):void;

		/**
		 * 得到资源的URL
		 */
		get url():string;

		/**
		 * 设置动画路径
		 */
		set url(path:string);

		/**
		 * 通过加载直接创建动画
		 * @param path 要加载的动画文件路径
		 * @param complete 加载完成的回调函数
		 * @param aniMode 与<code>Skeleton.init</code>的<code>aniMode</code>作用一致
		 */
		load(path:string,complete?:Handler,aniMode?:number):void;
		private _checkIsAllParsed:any;

		/**
		 * *****************************************定义接口************************************************
		 */

		/**
		 * 得到当前动画的数量
		 * @return 当前动画的数量
		 */
		getAnimNum():number;

		/**
		 * 得到指定动画的名字
		 * @param index 动画的索引
		 */
		getAniNameByIndex(index:number):string;

		/**
		 * 通过名字得到插槽的引用
		 * @param name 动画的名字
		 * @return 插槽的引用
		 */
		getSlotByName(name:string):BoneSlot;

		/**
		 * 通过名字显示一套皮肤
		 * @param name 皮肤的名字
		 * @param freshSlotIndex 是否将插槽纹理重置到初始化状态
		 */
		showSkinByName(name:string,freshSlotIndex?:boolean):void;

		/**
		 * 通过索引显示一套皮肤
		 * @param skinIndex 皮肤索引
		 * @param freshSlotIndex 是否将插槽纹理重置到初始化状态
		 */
		showSkinByIndex(skinIndex:number,freshSlotIndex?:boolean):void;

		/**
		 * 设置某插槽的皮肤
		 * @param slotName 插槽名称
		 * @param index 插糟皮肤的索引
		 */
		showSlotSkinByIndex(slotName:string,index:number):void;

		/**
		 * 设置某插槽的皮肤
		 * @param slotName 插槽名称
		 * @param name 皮肤名称
		 */
		showSlotSkinByName(slotName:string,name:string):void;

		/**
		 * 替换插槽贴图名
		 * @param slotName 插槽名称
		 * @param oldName 要替换的贴图名
		 * @param newName 替换后的贴图名
		 */
		replaceSlotSkinName(slotName:string,oldName:string,newName:string):void;

		/**
		 * 替换插槽的贴图索引
		 * @param slotName 插槽名称
		 * @param oldIndex 要替换的索引
		 * @param newIndex 替换后的索引
		 */
		replaceSlotSkinByIndex(slotName:string,oldIndex:number,newIndex:number):void;

		/**
		 * 设置自定义皮肤
		 * @param name 插糟的名字
		 * @param texture 自定义的纹理
		 */
		setSlotSkin(slotName:string,texture:Texture):void;

		/**
		 * 播放动画
		 * @param nameOrIndex 动画名字或者索引
		 * @param loop 是否循环播放
		 * @param force false,如果要播的动画跟上一个相同就不生效,true,强制生效
		 * @param start 起始时间
		 * @param end 结束时间
		 * @param freshSkin 是否刷新皮肤数据
		 * @param playAudio 是否播放音频
		 */
		play(nameOrIndex:any,loop:boolean,force?:boolean,start?:number,end?:number,freshSkin?:boolean,playAudio?:boolean):void;

		/**
		 * 停止动画
		 */
		stop():void;

		/**
		 * 设置动画播放速率
		 * @param value 1为标准速率
		 */
		playbackRate(value:number):void;

		/**
		 * 暂停动画的播放
		 */
		paused():void;

		/**
		 * 恢复动画的播放
		 */
		resume():void;

		/**
		 * 销毁当前动画
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @private 得到帧索引
		 */
		get index():number;

		/**
		 * @private 设置帧索引
		 */
		set index(value:number);

		/**
		 * 得到总帧数据
		 */
		get total():number;

		/**
		 * 得到播放器的引用
		 */
		get player():AnimationPlayer;

		/**
		 * 得到动画模板的引用
		 * @return templet.
		 */
		get templet():Templet;
	}

	/**
	 * 插槽显示数据
	 */
	class SkinSlotDisplayData  {

		/**
		 * 名称
		 */
		name:string;

		/**
		 * 附件名称
		 */
		attachmentName:string;

		/**
		 * 类型
		 */
		type:number;

		/**
		 * 变换
		 */
		transform:Transform;

		/**
		 * 宽度
		 */
		width:number;

		/**
		 * 高度
		 */
		height:number;

		/**
		 * 纹理
		 */
		texture:Texture;

		/**
		 * 骨骼数据
		 */
		bones:any[];

		/**
		 * uv数据
		 */
		uvs:any[];

		/**
		 * 权重
		 */
		weights:any[];

		/**
		 * 三角面数据
		 */
		triangles:any[];

		/**
		 * 顶点数据
		 */
		vertices:any[];

		/**
		 * 长度数据
		 */
		lengths:any[];

		/**
		 * 版本号
		 */
		verLen:number;
		createTexture(currTexture:Texture):Texture;
		destory():void;
	}
	class SlotData  {
		name:string;
		displayArr:any[];

		/**
		 * 通过附件名称获取位置
		 * @param name 
		 */
		getDisplayByName(name:string):number;
	}

	/**
	 * 数据解析完成后的调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 数据解析错误后的调度。
	 * @eventType Event.ERROR
	 */

	/**
	 * 动画模板类
	 */
	class Templet extends AnimationTemplet  {

		/**
		 * 存放原始骨骼信息
		 */
		srcBoneMatrixArr:any[];

		/**
		 * IK数据
		 */
		ikArr:any[];

		/**
		 * transform数据
		 */
		tfArr:any[];

		/**
		 * path数据
		 */
		pathArr:any[];

		/**
		 * 存放插槽数据的字典
		 */
		boneSlotDic:any;

		/**
		 * 绑定插槽数据的字典
		 */
		bindBoneBoneSlotDic:any;

		/**
		 * 存放插糟数据的数组
		 */
		boneSlotArray:any[];

		/**
		 * 皮肤数据
		 */
		skinDataArray:any[];

		/**
		 * 皮肤的字典数据
		 */
		skinDic:any;

		/**
		 * 存放纹理数据
		 */
		subTextureDic:any;

		/**
		 * 是否解析失败
		 */
		isParseFail:boolean;

		/**
		 * 反转矩阵，有些骨骼动画要反转才能显示
		 */
		yReverseMatrix:Matrix;

		/**
		 * 渲染顺序动画数据
		 */
		drawOrderAniArr:any[];

		/**
		 * 事件动画数据
		 */
		eventAniArr:any[];

		/**
		 * @private 索引对应的名称
		 */
		attachmentNames:any[];

		/**
		 * 顶点动画数据
		 */
		deformAniArr:any[];

		/**
		 * 实际显示对象列表，用于销毁用
		 */
		skinSlotDisplayDataArr:SkinSlotDisplayData[];
		isParserComplete:boolean;
		aniSectionDic:any;

		/**
		 * @private 
		 */
		tMatrixDataLen:number;
		mRootBone:Bone;
		mBoneArr:Bone[];
		loadAni(url:string):void;
		private onComplete:any;

		/**
		 * 解析骨骼动画数据
		 * @param texture 骨骼动画用到的纹理
		 * @param skeletonData 骨骼动画信息及纹理分块信息
		 * @param playbackRate 缓冲的帧率数据（会根据帧率去分帧）
		 */
		parseData(texture:Texture,skeletonData:ArrayBuffer,playbackRate?:number):void;

		/**
		 * 创建动画
		 * 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改					（内存开销小，计算开销小，不支持换装）
		 * 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存	（内存开销大，计算开销小，支持换装）
		 * 2,使用动态方式，去实时去画										（内存开销小，计算开销大，支持换装,不建议使用）
		 * @param aniMode 0	动画模式，0:不支持换装,1,2支持换装
		 * @return 
		 */
		buildArmature(aniMode?:number):Skeleton;

		/**
		 * @private 解析动画
		 * @param data 解析的二进制数据
		 * @param playbackRate 帧率
		 * @override 
		 */
		parse(data:ArrayBuffer):void;

		/**
		 * 得到指定的纹理
		 * @param name 纹理的名字
		 * @return 
		 */
		getTexture(name:string):Texture;

		/**
		 * @private 显示指定的皮肤
		 * @param boneSlotDic 插糟字典的引用
		 * @param skinIndex 皮肤的索引
		 * @param freshDisplayIndex 是否重置插槽纹理
		 */
		showSkinByIndex(boneSlotDic:any,skinIndex:number,freshDisplayIndex?:boolean):boolean;

		/**
		 * 通过皮肤名字得到皮肤索引
		 * @param skinName 皮肤名称
		 * @return 
		 */
		getSkinIndexByName(skinName:string):number;

		/**
		 * @private 得到缓冲数据
		 * @param aniIndex 动画索引
		 * @param frameIndex 帧索引
		 * @return 
		 */
		getGrahicsDataWithCache(aniIndex:number,frameIndex:number):Graphics;

		/**
		 * @private 保存缓冲grahpics
		 * @param aniIndex 动画索引
		 * @param frameIndex 帧索引
		 * @param graphics 要保存的数据
		 */
		setGrahicsDataWithCache(aniIndex:number,frameIndex:number,graphics:Graphics):void;
		deleteAniData(aniIndex:number):void;

		/**
		 * 释放纹理
		 * @override 
		 */
		destroy():void;

		/**
		 * *********************************下面为一些儿访问接口****************************************
		 */

		/**
		 * 通过索引得动画名称
		 * @param index 
		 * @return 
		 */
		getAniNameByIndex(index:number):string;
		get rate():number;
		set rate(v:number);
	}
	class Transform  {

		/**
		 * 水平方向旋转角度
		 */
		skX:number;

		/**
		 * 垂直方向旋转角度
		 */
		skY:number;

		/**
		 * 水平方向缩放
		 */
		scX:number;

		/**
		 * 垂直方向缩放
		 */
		scY:number;

		/**
		 * 水平方向偏移
		 */
		x:number;

		/**
		 * 垂直方向偏移
		 */
		y:number;

		/**
		 * 水平方向倾斜角度
		 */
		skewX:number;

		/**
		 * 垂直方向倾斜角度
		 */
		skewY:number;
		private mMatrix:any;

		/**
		 * 初始化数据
		 * @param data 
		 */
		initData(data:any):void;

		/**
		 * 获取当前矩阵
		 */
		getMatrix():Matrix;

		/**
		 * 获取倾斜矩阵
		 * @param m 
		 * @param x 
		 * @param y 
		 */
		skew(m:Matrix,x:number,y:number):Matrix;
	}

	/**
	 * 动画
	 */
	class GraphicsAni extends Graphics  {

		/**
		 * @private 画自定义蒙皮动画
		 * @param skin 
		 */
		drawSkin(skinA:SkinMeshForGraphic,alpha:number):void;
		private static _caches:any;
		static create():GraphicsAni;

		/**
		 * 回收清理
		 * @param graphics 
		 */
		static recycle(graphics:GraphicsAni):void;
	}

	/**
	 * 关键帧
	 */
	class KeyFramesContent  {

		/**
		 * 开始时间
		 */
		startTime:number;

		/**
		 * 持续时间
		 */
		duration:number;

		/**
		 * 私有插值方式
		 */
		interpolationData:any[];

		/**
		 * 数据
		 */
		data:Float32Array;

		/**
		 * 数据变化量
		 */
		dData:Float32Array;

		/**
		 * 下一次的数据
		 */
		nextData:Float32Array;
	}

	/**
	 * 动画播放完毕后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 播放到某标签后调度。
	 * @eventType Event.LABEL
	 */

	/**
	 * 加载完成后调度。
	 * @eventType Event.LOADED
	 */

	/**
	 * 进入帧后调度。
	 * @eventType Event.FRAME
	 */

	/**
	 * <p> <code>MovieClip</code> 用于播放经过工具处理后的 swf 动画。</p>
	 */
	class MovieClip extends Sprite  {

		/**
		 * 资源根目录。
		 */
		basePath:string;

		/**
		 * 播放间隔(单位：毫秒)。
		 */
		interval:number;

		/**
		 * 是否循环播放
		 */
		loop:boolean;

		/**
		 * 创建一个 <code>MovieClip</code> 实例。
		 * @param parentMovieClip 父MovieClip,自己创建时不需要传该参数
		 */

		constructor(parentMovieClip?:MovieClip);

		/**
		 * <p>销毁此对象。以及销毁引用的Texture</p>
		 * @param destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @private 更新时间轴
		 */
		updates():void;

		/**
		 * 当前播放索引。
		 */
		get index():number;
		set index(value:number);

		/**
		 * 增加一个标签到index帧上，播放到此index后会派发label事件
		 * @param label 标签名称
		 * @param index 索引位置
		 */
		addLabel(label:string,index:number):void;

		/**
		 * 删除某个标签
		 * @param label 标签名字，如果label为空，则删除所有Label
		 */
		removeLabel(label:string):void;

		/**
		 * 帧总数。
		 */
		get count():number;

		/**
		 * 是否在播放中
		 */
		get playing():boolean;

		/**
		 * 停止播放动画。
		 */
		stop():void;

		/**
		 * 跳到某帧并停止播放动画。
		 * @param frame 要跳到的帧
		 */
		gotoAndStop(index:number):void;

		/**
		 * 播放动画。
		 * @param index 帧索引。
		 */
		play(index?:number,loop?:boolean):void;

		/**
		 * 资源地址。
		 */
		set url(path:string);

		/**
		 * 加载资源。
		 * @param url swf 资源地址。
		 * @param atlas 是否使用图集资源
		 * @param atlasPath 图集路径，默认使用与swf同名的图集
		 */
		load(url:string,atlas?:boolean,atlasPath?:string):void;

		/**
		 * 从开始索引播放到结束索引，结束之后出发complete回调
		 * @param start 开始索引
		 * @param end 结束索引
		 * @param complete 结束回调
		 */
		playTo(start:number,end:number,complete?:Handler):void;
	}

	/**
	 * <code>CommonScript</code> 类用于创建公共脚本类。
	 */
	class CommonScript extends Component  {

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get isSingleton():boolean;

		constructor();

		/**
		 * 创建后只执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onAwake():void;

		/**
		 * 每次启动后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onEnable():void;

		/**
		 * 第一次执行update之前执行，只会执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStart():void;

		/**
		 * 每帧更新时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onUpdate():void;

		/**
		 * 每帧更新时执行，在update之后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onLateUpdate():void;

		/**
		 * 禁用时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDisable():void;

		/**
		 * 销毁时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDestroy():void;
	}

	/**
	 * <code>Component</code> 类用于创建组件的基类。
	 */
	class Component implements ISingletonElement,IDestroy  {

		/**
		 * [只读]获取所属Node节点。
		 * @readonly 
		 */
		owner:Node;

		/**
		 * 创建一个新的 <code>Component</code> 实例。
		 */

		constructor();

		/**
		 * 唯一标识ID。
		 */
		get id():number;

		/**
		 * 是否启用组件。
		 */
		get enabled():boolean;
		set enabled(value:boolean);

		/**
		 * 是否为单实例组件。
		 */
		get isSingleton():boolean;

		/**
		 * 是否已经销毁 。
		 */
		get destroyed():boolean;

		/**
		 * [实现IListPool接口]
		 */
		_getIndexInList():number;

		/**
		 * [实现IListPool接口]
		 */
		_setIndexInList(index:number):void;

		/**
		 * 重置组件参数到默认值，如果实现了这个函数，则组件会被重置并且自动回收到对象池，方便下次复用
		 * 如果没有重置，则不进行回收复用
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onReset():void;

		/**
		 * 销毁组件
		 */
		destroy():void;
	}

	/**
	 * 模板，预制件
	 */
	class Prefab  {

		/**
		 * @private 
		 */
		json:any;

		/**
		 * 通过预制创建实例
		 */
		create():any;
	}

	/**
	 * <code>Script</code> 类用于创建脚本的父类，该类为抽象类，不允许实例。
	 * 组件的生命周期
	 */
	class Script extends Component  {

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get isSingleton():boolean;

		/**
		 * 组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onAwake():void;

		/**
		 * 组件被启用后执行，比如节点被添加到舞台后
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onEnable():void;

		/**
		 * 第一次执行update之前执行，只会执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStart():void;

		/**
		 * 开始碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerEnter(other:any,self:any,contact:any):void;

		/**
		 * 持续碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerStay(other:any,self:any,contact:any):void;

		/**
		 * 结束碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerExit(other:any,self:any,contact:any):void;

		/**
		 * 鼠标按下时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseDown(e:Event):void;

		/**
		 * 鼠标抬起时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseUp(e:Event):void;

		/**
		 * 鼠标点击时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onClick(e:Event):void;

		/**
		 * 鼠标在舞台按下时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStageMouseDown(e:Event):void;

		/**
		 * 鼠标在舞台抬起时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStageMouseUp(e:Event):void;

		/**
		 * 鼠标在舞台点击时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStageClick(e:Event):void;

		/**
		 * 鼠标在舞台移动时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStageMouseMove(e:Event):void;

		/**
		 * 鼠标双击时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDoubleClick(e:Event):void;

		/**
		 * 鼠标右键点击时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onRightClick(e:Event):void;

		/**
		 * 鼠标移动时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseMove(e:Event):void;

		/**
		 * 鼠标经过节点时触发
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseOver(e:Event):void;

		/**
		 * 鼠标离开节点时触发
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseOut(e:Event):void;

		/**
		 * 键盘按下时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onKeyDown(e:Event):void;

		/**
		 * 键盘产生一个字符时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onKeyPress(e:Event):void;

		/**
		 * 键盘抬起时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onKeyUp(e:Event):void;

		/**
		 * 每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onUpdate():void;

		/**
		 * 每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onLateUpdate():void;

		/**
		 * 渲染之前执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onPreRender():void;

		/**
		 * 渲染之后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onPostRender():void;

		/**
		 * 组件被禁用时执行，比如从节点从舞台移除后
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDisable():void;

		/**
		 * 手动调用节点销毁时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDestroy():void;
	}

	/**
	 * @private 静态常量集合
	 */
	class Const  {
		static NOT_ACTIVE:number;
		static ACTIVE_INHIERARCHY:number;
		static AWAKED:number;
		static NOT_READY:number;
		static DISPLAY:number;
		static HAS_ZORDER:number;
		static HAS_MOUSE:number;
		static DISPLAYED_INSTAGE:number;
		static DRAWCALL_OPTIMIZE:number;
	}

	/**
	 * <code>AnimationClip</code> 类用于动画片段资源。
	 */
	class AnimationClip extends Resource  {

		/**
		 * AnimationClip资源。
		 */
		static ANIMATIONCLIP:string;

		/**
		 * 加载动画片段。
		 * @param url 动画片段地址。
		 * @param complete 完成回掉。load
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * 是否循环。
		 */
		islooping:boolean;

		/**
		 * 动画持续时间
		 * @returns 返回动画持续时间
		 */
		duration():number;

		/**
		 * 创建一个 <code>AnimationClip</code> 实例。
		 */

		constructor();

		/**
		 * 是否是Weight模式
		 * @param weightMode 
		 * @param nextweightMode 
		 * @returns true 此段动画插值使用埃尔米特插值
		 */
		private _weightModeHermite:any;
		private _hermiteCurveSplineWeight:any;
		private _curveInterpolate:any;
		private _evaluateFrameNodeVector3DatasRealTime:any;
		private _evaluateFrameNodeQuaternionDatasRealTime:any;
		private _binarySearchEventIndex:any;

		/**
		 * 添加动画事件。
		 * @param event 动画事件
		 */
		addEvent(event:AnimationEvent):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;
	}

	/**
	 * <code>AnimationEvent</code> 类用于实现动画事件。
	 */
	class AnimationEvent  {

		/**
		 * 事件触发时间。
		 */
		time:number;

		/**
		 * 事件触发名称。
		 */
		eventName:string;

		/**
		 * 事件触发参数。
		 */
		params:any[];

		/**
		 * 创建一个 <code>AnimationEvent</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>BoneNode</code> 类用于实现骨骼节点。
	 */
	class AnimationNode implements IClone  {
		private _children:any;

		/**
		 * 节点名称。
		 */
		name:string|null;

		/**
		 * 创建一个新的 <code>AnimationNode</code> 实例。
		 */

		constructor();

		/**
		 * 添加子节点。
		 * @param child 子节点。
		 */
		addChild(child:AnimationNode):void;

		/**
		 * 移除子节点。
		 * @param child 子节点。
		 */
		removeChild(child:AnimationNode):void;

		/**
		 * 根据名字获取子节点。
		 * @param name 名字。
		 */
		getChildByName(name:string):AnimationNode|null;

		/**
		 * 根据索引获取子节点。
		 * @param index 索引。
		 */
		getChildByIndex(index:number):AnimationNode;

		/**
		 * 获取子节点的个数。
		 */
		getChildCount():number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>AnimationTransform3D</code> 类用于实现3D变换。
	 */
	class AnimationTransform3D extends EventDispatcher  {
		private static _tempVector3:any;
		private static _angleToRandin:any;
		private _localMatrix:any;
		private _worldMatrix:any;
		private _localPosition:any;
		private _localRotation:any;
		private _localScale:any;
		private _localQuaternionUpdate:any;
		private _locaEulerlUpdate:any;
		private _localUpdate:any;
		private _parent:any;
		private _children:any;

		/**
		 * 创建一个 <code>Transform3D</code> 实例。
		 * @param owner 所属精灵。
		 */

		constructor(owner:AnimationNode);
		private _getlocalMatrix:any;
		private _onWorldTransform:any;

		/**
		 * 获取世界矩阵。
		 * @return 世界矩阵。
		 */
		getWorldMatrix():Float32Array;

		/**
		 * 设置父3D变换。
		 * @param value 父3D变换。
		 */
		setParent(value:AnimationTransform3D):void;
	}

	/**
	 * <code>AnimatorStateScript</code> 类用于动画状态脚本的父类,该类为抽象类,不允许实例。
	 */
	class AnimatorStateScript  {

		/**
		 * 创建一个新的 <code>AnimatorStateScript</code> 实例。
		 */

		constructor();

		/**
		 * 动画状态开始时执行。
		 */
		onStateEnter():void;

		/**
		 * 动画状态更新时执行。
		 */
		onStateUpdate():void;

		/**
		 * 动画状态退出时执行。
		 */
		onStateExit():void;
	}

	/**
	 * /**
	 *    <code>CastShadowList</code> 类用于实现产生阴影者队列。
	 */
	class CastShadowList extends SingletonList<ISingletonElement>  {

		/**
		 * 创建一个新的 <code>CastShadowList</code> 实例。
		 */

		constructor();
	}

enum AnimatorUpdateMode {
    /**正常更新。*/
    Normal = 0,
    /**低频率更新 */
    LowFrame = 1,
    /**不更新 */
    UnScaleTime = 2
}

	/**
	 * <code>Animator</code> 类用于创建动画组件。
	 */
	class Animator extends Component  {

		/**
		 * 裁剪模式_始终播放动画。
		 */
		static CULLINGMODE_ALWAYSANIMATE:number;

		/**
		 * 裁剪模式_不可见时完全不播放动画。
		 */
		static CULLINGMODE_CULLCOMPLETELY:number;

		/**
		 * 裁剪模式
		 */
		cullingMode:number;

		/**
		 * 动画的播放速度,1.0为正常播放速度。
		 */
		get speed():number;
		set speed(value:number);

		/**
		 * 设置更新模式
		 */
		set updateMode(value:AnimatorUpdateMode);
		set lowUpdateDelty(value:number);
		get controllerLayerCount():number;

		/**
		 * 创建一个 <code>Animation</code> 实例。
		 */

		constructor();

		/**
		 * 赋值Node数据
		 * @param stateInfo 动画状态
		 * @param additive 是否为addtive
		 * @param weight state权重
		 * @param isFirstLayer 是否是第一层
		 */
		private _setClipDatasToNode:any;
		private _applyUpdateMode:any;

		/**
		 * 获取默认动画状态。
		 * @param layerIndex 层索引。
		 * @return 默认动画状态。
		 */
		getDefaultState(layerIndex?:number):AnimatorState;

		/**
		 * 添加动画状态。
		 * @param state 动画状态。
		 * @param layerIndex 层索引。
		 */
		addState(state:AnimatorState,layerIndex?:number):void;

		/**
		 * 移除动画状态。
		 * @param state 动画状态。
		 * @param layerIndex 层索引。
		 */
		removeState(state:AnimatorState,layerIndex?:number):void;

		/**
		 * 添加控制器层。
		 */
		addControllerLayer(controllderLayer:AnimatorControllerLayer):void;

		/**
		 * 获取控制器层。
		 */
		getControllerLayer(layerInex?:number):AnimatorControllerLayer;

		/**
		 * 播放动画。
		 * @param name 如果为null则播放默认动画，否则按名字播放动画片段。
		 * @param layerIndex 层索引。
		 * @param normalizedTime 归一化的播放起始时间。
		 */
		play(name?:string|null,layerIndex?:number,normalizedTime?:number):void;

		/**
		 * 在当前动画状态和目标动画状态之间进行融合过渡播放。
		 * @param name 目标动画状态。
		 * @param transitionDuration 过渡时间,该值为当前动画状态的归一化时间，值在0.0~1.0之间。
		 * @param layerIndex 层索引。
		 * @param normalizedTime 归一化的播放起始时间。
		 */
		crossFade(name:string,transitionDuration:number,layerIndex?:number,normalizedTime?:number):void;

		/**
		 * @deprecated 请使用animator.getControllerLayer(layerIndex).getCurrentPlayState()替换。use animator.getControllerLayer(layerIndex).getCurrentPlayState() instead
获取当前的播放状态。
		 * @param layerIndex 层索引。
		 * @return 动画播放状态。
		 */
		getCurrentAnimatorPlayState(layerInex?:number):AnimatorPlayState;

		/**
		 * avatar。
		 */
		get avatar():Avatar;
		set avatar(value:Avatar);

		/**
		 * 关联精灵节点到Avatar节点,此Animator必须有Avatar文件。
		 * @param nodeName 关联节点的名字。
		 * @param sprite3D 精灵节点。
		 * @return 是否关联成功。
		 */
		linkSprite3DToAvatarNode(nodeName:string,sprite3D:Sprite3D):boolean;

		/**
		 * 解除精灵节点到Avatar节点的关联,此Animator必须有Avatar文件。
		 * @param sprite3D 精灵节点。
		 * @return 是否解除关联成功。
		 */
		unLinkSprite3DToAvatarNode(sprite3D:Sprite3D):boolean;
	}

	/**
	 * <code>AnimatorControllerLayer</code> 类用于创建动画控制器层。
	 */
	class AnimatorControllerLayer implements IReferenceCounter,IClone  {

		/**
		 * 混合模式_覆盖。
		 */
		static BLENDINGMODE_OVERRIDE:number;

		/**
		 * 混合模式_叠加。
		 */
		static BLENDINGMODE_ADDTIVE:number;

		/**
		 * 层的名称。
		 */
		name:string;

		/**
		 * 混合模式。
		 */
		blendingMode:number;

		/**
		 * 默认权重。
		 */
		defaultWeight:number;

		/**
		 * 激活时是否自动播放。
		 */
		playOnWake:boolean;

		/**
		 * 默认动画状态机。
		 */
		get defaultState():AnimatorState;
		set defaultState(value:AnimatorState);

		/**
		 * 骨骼遮罩
		 */
		get avatarMask():AvatarMask;
		set avatarMask(value:AvatarMask);

		/**
		 * 创建一个 <code>AnimatorControllerLayer</code> 实例。
		 * @param 动画层名称 
		 */

		constructor(name:string);

		/**
		 * @implements 
		 */
		_getReferenceCount():number;

		/**
		 * @implements 
		 */
		_addReference(count?:number):void;

		/**
		 * @implements 
		 */
		_removeReference(count?:number):void;

		/**
		 * @implements 
		 */
		_clearReference():void;

		/**
		 * 获取当前的播放状态。
		 * @return 动画播放状态。
		 */
		getCurrentPlayState():AnimatorPlayState;

		/**
		 * 获取动画状态。
		 * @return 动画状态。
		 */
		getAnimatorState(name:string):AnimatorState|null;

		/**
		 * 添加动画状态。
		 * @param state 动画状态。
		 * @param layerIndex 层索引。
		 */
		addState(state:AnimatorState):void;

		/**
		 * 移除动画状态。
		 * @param state 动画状态。
		 * @param layerIndex 层索引。
		 */
		removeState(state:AnimatorState):void;

		/**
		 * 销毁。
		 */
		destroy():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>AnimatorPlayState</code> 类用于创建动画播放状态信息。
	 */
	class AnimatorPlayState  {

		/**
		 * 播放状态的归一化时间,整数为循环次数，小数为单次播放时间。
		 */
		get normalizedTime():number;

		/**
		 * 当前动画的持续时间，以秒为单位。
		 */
		get duration():number;

		/**
		 * 动画状态机。
		 */
		get animatorState():AnimatorState;

		/**
		 * 创建一个 <code>AnimatorPlayState</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>AnimatorState</code> 类用于创建动作状态。
	 */
	class AnimatorState implements IReferenceCounter,IClone  {

		/**
		 * 名称。
		 */
		name:string;

		/**
		 * 动画播放速度,1.0为正常播放速度。
		 */
		speed:number;

		/**
		 * 动作播放起始时间。
		 */
		clipStart:number;

		/**
		 * 动作播放结束时间。
		 */
		clipEnd:number;

		/**
		 * 动作。
		 */
		get clip():AnimationClip|null;
		set clip(value:AnimationClip|null);

		/**
		 * 创建一个 <code>AnimatorState</code> 实例。
		 */

		constructor();

		/**
		 * @implements 
		 */
		_getReferenceCount():number;

		/**
		 * @implements 
		 */
		_addReference(count?:number):void;

		/**
		 * @implements 
		 */
		_removeReference(count?:number):void;

		/**
		 * @implements 
		 */
		_clearReference():void;

		/**
		 * 添加脚本。
		 * @param type 组件类型。
		 * @return 脚本。
		 */
		addScript(type:typeof AnimatorStateScript):AnimatorStateScript;

		/**
		 * 获取脚本。
		 * @param type 组件类型。
		 * @return 脚本。
		 */
		getScript(type:typeof AnimatorStateScript):AnimatorStateScript|null;

		/**
		 * 获取脚本集合。
		 * @param type 组件类型。
		 * @return 脚本集合。
		 */
		getScripts(type:typeof AnimatorStateScript):AnimatorStateScript[]|null;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * 用来描述动画层遮罩
	 */
	class AvatarMask  {

		/**
		 * 创建一个<code>AvatarMask</code>实例
		 */

		constructor();

		/**
		 * 查找节点路径遮罩
		 * @param path 
		 * @returns 
		 */
		getTransformActive(path:string):boolean;

		/**
		 * 设置
		 * @param path 
		 * @param value 
		 */
		setTransformActive(path:string,value:boolean):void;

		/**
		 * 获得遮罩信息
		 * @returns 
		 */
		getAllTranfromPath():{[key:string]:boolean;};

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;
	}

	/**
	 * <code>PostProcess</code> 类用于创建后期处理组件。
	 */
	class PostProcess  {

		/**
		 * 创建一个 <code>PostProcess</code> 实例。
		 */

		constructor();
		get enable():boolean;
		set enable(value:boolean);
		set commandContext(oriContext:RenderContext3D);

		/**
		 * 添加后期处理效果。
		 */
		addEffect(effect:PostProcessEffect):void;

		/**
		 * 移除后期处理效果。
		 */
		removeEffect(effect:PostProcessEffect):void;
	}

	/**
	 * <code>Script3D</code> 类用于创建脚本的父类,该类为抽象类,不允许实例。
	 */
	class Script3D extends Component  {

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get isSingleton():boolean;

		/**
		 * 创建后只执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onAwake():void;

		/**
		 * 每次启动后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onEnable():void;

		/**
		 * 第一次执行update之前执行，只会执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onStart():void;

		/**
		 * 开始触发时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerEnter(other:PhysicsComponent):void;

		/**
		 * 持续触发时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerStay(other:PhysicsComponent):void;

		/**
		 * 结束触发时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onTriggerExit(other:PhysicsComponent):void;

		/**
		 * 开始碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onCollisionEnter(collision:Collision):void;

		/**
		 * 持续碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onCollisionStay(collision:Collision):void;

		/**
		 * 结束碰撞时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onCollisionExit(collision:Collision):void;

		/**
		 * 关节破坏时执行此方法
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onJointBreak():void;

		/**
		 * 鼠标按下时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseDown():void;

		/**
		 * 鼠标拖拽时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseDrag():void;

		/**
		 * 鼠标点击时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseClick():void;

		/**
		 * 鼠标弹起时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseUp():void;

		/**
		 * 鼠标进入时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseEnter():void;

		/**
		 * 鼠标经过时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseOver():void;

		/**
		 * 鼠标离开时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onMouseOut():void;

		/**
		 * 每帧更新时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onUpdate():void;

		/**
		 * 每帧更新时执行，在update之后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onLateUpdate():void;

		/**
		 * 渲染之前执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onPreRender():void;

		/**
		 * 渲染之后执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onPostRender():void;

		/**
		 * 禁用时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDisable():void;

		/**
		 * 销毁时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDestroy():void;
	}

	/**
	 * <code>SimpleSingletonList</code> 类用于实现单例队列。
	 */
	class SimpleSingletonList extends SingletonList<ISingletonElement>  {

		/**
		 * 创建一个新的 <code>SimpleSingletonList</code> 实例。
		 */

		constructor();
		clearElement():void;
	}

	/**
	 * <code>SingletonList</code> 类用于实现单例队列。
	 */
	class SingletonList<T>  {

		/**
		 * 创建一个新的 <code>SingletonList</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Avatar</code> 类用于创建Avatar。
	 */
	class Avatar extends Resource implements IClone  {

		/**
		 * Avatar资源。
		 */
		static AVATAR:string;

		/**
		 * @inheritDoc 
		 */
		static _parse(data:any,propertyParams?:any,constructParams?:any[]):Avatar;

		/**
		 * 加载Avatar文件。
		 * @param url Avatar文件。
		 * @param complete 完成回掉。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * [NATIVE]
		 */
		private _nativeNodeCount:any;

		/**
		 * 创建一个 <code>Avatar</code> 实例。
		 */

		constructor();
		private _initCloneToAnimator:any;
		private _parseNode:any;

		/**
		 * 克隆数据到Avatr。
		 * @param destObject 克隆源。
		 */
		_cloneDatasToAnimator(destAnimator:Animator):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>BaseCamera</code> 类用于创建摄像机的父类。
	 */
	class BaseCamera extends Sprite3D  {

		/**
		 * 渲染模式,延迟光照渲染，暂未开放。
		 */
		static RENDERINGTYPE_DEFERREDLIGHTING:string;

		/**
		 * 渲染模式,前向渲染。
		 */
		static RENDERINGTYPE_FORWARDRENDERING:string;
		protected static _invertYScaleMatrix:Matrix4x4;
		protected static _invertYProjectionMatrix:Matrix4x4;
		protected static _invertYProjectionViewMatrix:Matrix4x4;

		/**
		 * 近裁剪面。
		 */
		protected _nearPlane:number;

		/**
		 * 远裁剪面。
		 */
		protected _farPlane:number;

		/**
		 * 视野。
		 */
		private _fieldOfView:any;

		/**
		 * 正交投影的垂直尺寸。
		 */
		private _orthographicVerticalSize:any;
		private _skyRenderer:any;
		private _forward:any;
		private _up:any;

		/**
		 * 摄像机的清除颜色,默认颜色为CornflowerBlue。
		 */
		clearColor:Vector4;

		/**
		 * 可视层位标记遮罩值,支持混合 例:cullingMask=Math.pow(2,0)|Math.pow(2,1)为第0层和第1层可见。
		 */
		cullingMask:number;

		/**
		 * 渲染时是否用遮挡剔除。
		 */
		useOcclusionCulling:boolean;

		/**
		 * 天空渲染器。
		 */
		get skyRenderer():SkyRenderer;

		/**
		 * 视野。
		 */
		get fieldOfView():number;
		set fieldOfView(value:number);

		/**
		 * 近裁面。
		 */
		get nearPlane():number;
		set nearPlane(value:number);

		/**
		 * 远裁面。
		 */
		get farPlane():number;
		set farPlane(vaule:number);

		/**
		 * 是否正交投影矩阵。
		 */
		get orthographic():boolean;
		set orthographic(vaule:boolean);

		/**
		 * 正交投影垂直矩阵尺寸。
		 */
		get orthographicVerticalSize():number;
		set orthographicVerticalSize(vaule:number);

		/**
		 * 渲染顺序
		 */
		get renderingOrder():number;
		set renderingOrder(value:number);

		/**
		 * 创建一个 <code>BaseCamera</code> 实例。
		 * @param fieldOfView 视野。
		 * @param nearPlane 近裁面。
		 * @param farPlane 远裁面。
		 */

		constructor(nearPlane?:number,farPlane?:number);

		/**
		 * 相机渲染。
		 * @param shader 着色器。
		 * @param replacementTag 着色器替换标记。
		 */
		render(shader?:Shader3D,replacementTag?:string):void;

		/**
		 * 增加可视图层,layer值为0到31层。
		 * @param layer 图层。
		 */
		addLayer(layer:number):void;

		/**
		 * 移除可视图层,layer值为0到31层。
		 * @param layer 图层。
		 */
		removeLayer(layer:number):void;

		/**
		 * 增加所有图层。
		 */
		addAllLayers():void;

		/**
		 * 移除所有图层。
		 */
		removeAllLayers():void;

		/**
		 * 重算计算投影矩阵
		 */
		resetProjectionMatrix():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;

		/**
		 * 删除相机
		 * @inheritDoc 
		 * @override 
		 * @param 是否删除节点 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @deprecated plaease use CameraClearFlags.SolidColor instead.
		 */
		static CLEARFLAG_SOLIDCOLOR:number;

		/**
		 * @deprecated plaease use CameraClearFlags.Sky instead.
		 */
		static CLEARFLAG_SKY:number;

		/**
		 * @deprecated plaease use CameraClearFlags.DepthOnly instead.
		 */
		static CLEARFLAG_DEPTHONLY:number;

		/**
		 * @deprecated plaease use CameraClearFlags.Nothing instead.
		 */
		static CLEARFLAG_NONE:number;
	}

	/**
	 * <code>Bounds</code> 类用于创建包围体。
	 */
	class Bounds implements IClone  {
		static TEMP_VECTOR3_MAX0:Vector3;
		static TEMP_VECTOR3_MAX1:Vector3;
		private _updateFlag:any;

		/**
		 */
		_boundBox:BoundBox;

		/**
		 * 设置包围盒的最小点。
		 * @param value 包围盒的最小点。
		 */
		setMin(value:Vector3):void;

		/**
		 * 获取包围盒的最小点。
		 * @return 包围盒的最小点。
		 */
		getMin():Vector3;

		/**
		 * 设置包围盒的最大点。
		 * @param value 包围盒的最大点。
		 */
		setMax(value:Vector3):void;

		/**
		 * 获取包围盒的最大点。
		 * @return 包围盒的最大点。
		 */
		getMax():Vector3;

		/**
		 * 设置包围盒的中心点。
		 * @param value 包围盒的中心点。
		 */
		setCenter(value:Vector3):void;

		/**
		 * 获取包围盒的中心点。
		 * @return 包围盒的中心点。
		 */
		getCenter():Vector3;

		/**
		 * 设置包围盒的范围。
		 * @param value 包围盒的范围。
		 */
		setExtent(value:Vector3):void;

		/**
		 * 获取包围盒的范围。
		 * @return 包围盒的范围。
		 */
		getExtent():Vector3;

		/**
		 * 创建一个 <code>Bounds</code> 实例。
		 * @param min min 最小坐标
		 * @param max max 最大坐标。
		 */

		constructor(min:Vector3,max:Vector3);
		private _getUpdateFlag:any;
		private _setUpdateFlag:any;
		private _getCenter:any;
		private _getExtent:any;
		private _getMin:any;
		private _getMax:any;
		private _rotateExtents:any;

		/**
		 * @returns -1为不相交 不为0的时候返回值为相交体积
		 */
		calculateBoundsintersection(bounds:Bounds):number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

enum CameraClearFlags {
    /**固定颜色。*/
    SolidColor = 0,
    /**天空。*/
    Sky = 1,
    /**仅深度。*/
    DepthOnly = 2,
    /**不清除。*/
    Nothing = 3
}

enum CameraEventFlags {
    /**在渲染非透明物体之前。*/
    BeforeForwardOpaque = 0,
    /**在渲染天空盒之前。*/
    BeforeSkyBox = 2,
    /**在渲染透明物体之前。*/
    BeforeTransparent = 4,
    /**在后期处理之前。*/
    BeforeImageEffect = 6,
    /**所有渲染之后。*/
    AfterEveryThing = 8
}

	/**
	 * <code>Camera</code> 类用于创建摄像机。
	 */
	class Camera extends BaseCamera  {
		static set _updateMark(value:number);
		static get _updateMark():number;

		/**
		 * 根据相机、scene信息获得scene中某一位置的渲染结果
		 * @param camera 相机
		 * @param scene 需要渲染的场景
		 * @param shader 着色器
		 * @param replacementTag 替换标记。
		 */
		static drawRenderTextureByScene(camera:Camera,scene:Scene3D,renderTexture:RenderTexture,shader?:Shader3D,replaceFlag?:string):RenderTexture;

		/**
		 * 深度贴图模式
		 */
		protected _depthTextureFormat:RenderTextureDepthFormat;

		/**
		 * 深度贴图
		 */
		private _depthTexture:any;

		/**
		 * 深度法线贴图
		 */
		private _depthNormalsTexture:any;
		private _cameraEventCommandBuffer:any;

		/**
		 * 是否允许渲染。
		 */
		enableRender:boolean;

		/**
		 * 清除标记。
		 */
		clearFlag:CameraClearFlags;

		/**
		 * 横纵比。
		 */
		get aspectRatio():number;
		set aspectRatio(value:number);

		/**
		 * 获取屏幕像素坐标的视口。
		 */
		get viewport():Viewport;
		set viewport(value:Viewport);
		get clientWidth():number;
		get clientHeight():number;

		/**
		 * 多重采样抗锯齿
		 */
		set msaa(value:boolean);
		get msaa():boolean;

		/**
		 * 裁剪空间的视口。
		 */
		get normalizedViewport():Viewport;
		set normalizedViewport(value:Viewport);

		/**
		 * 获取视图矩阵。
		 */
		get viewMatrix():Matrix4x4;

		/**
		 * 投影矩阵。
		 */
		get projectionMatrix():Matrix4x4;
		set projectionMatrix(value:Matrix4x4);

		/**
		 * 获取视图投影矩阵。
		 */
		get projectionViewMatrix():Matrix4x4;

		/**
		 * 获取摄像机视锥。
		 */
		get boundFrustum():BoundFrustum;

		/**
		 * 自定义渲染场景的渲染目标。
		 */
		get renderTarget():RenderTexture;
		set renderTarget(value:RenderTexture);

		/**
		 * 后期处理。
		 */
		get postProcess():PostProcess;
		set postProcess(value:PostProcess);

		/**
		 * 是否开启HDR。
		 * 开启后对性能有一定影响。
		 */
		get enableHDR():boolean;
		set enableHDR(value:boolean);

		/**
		 * 是否使用正在渲染的RenderTexture为CommandBuffer服务，设置为true
		 * 一般和CommandBuffer一起使用
		 */
		get enableBuiltInRenderTexture():boolean;
		set enableBuiltInRenderTexture(value:boolean);

		/**
		 * 深度贴图模式
		 */
		get depthTextureMode():number;
		set depthTextureMode(value:number);

		/**
		 * 深度贴图格式
		 */
		get depthTextureFormat():RenderTextureDepthFormat;
		set depthTextureFormat(value:RenderTextureDepthFormat);

		/**
		 * 设置是否使用内置的深度贴图(TODO:如果开启,只可在后期使用深度贴图，不可在渲染流程中使用)
		 */
		set enableBlitDepth(value:boolean);
		get canblitDepth():boolean;

		/**
		 * 创建一个 <code>Camera</code> 实例。
		 * @param aspectRatio 横纵比。
		 * @param nearPlane 近裁面。
		 * @param farPlane 远裁面。
		 */

		constructor(aspectRatio?:number,nearPlane?:number,farPlane?:number);

		/**
		 * 通过蒙版值获取蒙版是否显示。
		 * @param layer 层。
		 * @return 是否显示。
		 */
		_isLayerVisible(layer:number):boolean;
		clone():Camera;

		/**
		 * 调用渲染命令流
		 * @param event 
		 * @param renderTarget 
		 * @param context 
		 */
		_applyCommandBuffer(event:number,context:RenderContext3D):void;
		set depthTexture(value:BaseTexture);
		set depthNormalTexture(value:RenderTexture);

		/**
		 * @override 
		 * @param shader 着色器
		 * @param replacementTag 替换标记。
		 */
		render(shader?:Shader3D,replacementTag?:string):void;

		/**
		 * 计算从屏幕空间生成的射线。
		 * @param point 屏幕空间的位置位置。
		 * @param out 输出射线。
		 */
		viewportPointToRay(point:Vector2,out:Ray):void;

		/**
		 * 计算从裁切空间生成的射线。
		 * @param point 裁切空间的位置。
		 * @param out 输出射线。
		 */
		normalizedViewportPointToRay(point:Vector2,out:Ray):void;

		/**
		 * 将一个点从世界空间转换到视口空间。
		 * @param position 世界空间的坐标。
		 * @param out x、y、z为视口空间坐标,w为相对于摄像机的z轴坐标。
		 */
		worldToViewportPoint(position:Vector3,out:Vector4):void;

		/**
		 * 将一个点从世界空间转换到归一化视口空间。
		 * @param position 世界空间的坐标。
		 * @param out x、y、z为归一化视口空间坐标,w为相对于摄像机的z轴坐标。
		 */
		worldToNormalizedViewportPoint(position:Vector3,out:Vector4):void;

		/**
		 * 转换2D屏幕坐标系统到3D正交投影下的坐标系统，注:只有正交模型下有效。
		 * @param source 源坐标。
		 * @param out 输出坐标。
		 * @return 是否转换成功。
		 */
		convertScreenCoordToOrthographicCoord(source:Vector3,out:Vector3):boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 增加camera渲染节点渲染缓存
		 * @param event 相机事件标志
		 * @param commandBuffer 渲染命令流
		 */
		addCommandBuffer(event:CameraEventFlags,commandBuffer:CommandBuffer):void;

		/**
		 * 移除camera渲染节点渲染缓存
		 * @param event 相机事件标志
		 * @param commandBuffer 渲染命令流
		 */
		removeCommandBuffer(event:CameraEventFlags,commandBuffer:CommandBuffer):void;

		/**
		 * 移除camera相机节点的所有渲染缓存
		 * @param event 相机事件标志
		 */
		removeCommandBuffers(event:CameraEventFlags):void;
	}

	/**
	 * <code>FloatKeyFrame</code> 类用于创建浮点关键帧实例。
	 */
	class FloatKeyframe extends Keyframe  {

		/**
		 * 内切线
		 */
		inTangent:number;

		/**
		 * 外切线
		 */
		outTangent:number;

		/**
		 * 帧数据
		 */
		value:number;

		/**
		 * 内权重
		 */
		inWeight:number;

		/**
		 * 外权重
		 */
		outWeight:number;

		/**
		 * 权重模式
		 */
		weightedMode:number;

		/**
		 * 创建一个 <code>FloatKeyFrame</code> 实例。
		 */

		constructor();

		/**
		 * 克隆数据
		 * @inheritDoc 
		 * @override 
		 */
		cloneTo(destObject:any):void;
	}

	/**
	 * <code>GeometryElement</code> 类用于实现几何体元素,该类为抽象类。
	 */
	class GeometryElement implements IDestroy  {

		/**
		 * 获取是否销毁。
		 * @return 是否销毁。
		 */
		get destroyed():boolean;

		/**
		 * 创建一个 <code>GeometryElement</code> 实例。
		 */

		constructor();

		/**
		 * 获取几何体类型。
		 */
		_getType():number;

		/**
		 * 销毁。
		 */
		destroy():void;
	}

	/**
	 * <code>Gradient</code> 类用于创建颜色渐变。
	 */
	class Gradient implements IClone  {
		private _mode:any;
		private _maxColorRGBKeysCount:any;
		private _maxColorAlphaKeysCount:any;
		private _colorRGBKeysCount:any;
		private _colorAlphaKeysCount:any;

		/**
		 * 获取梯度模式。
		 * @return 梯度模式。
		 */
		get mode():number;

		/**
		 * 设置梯度模式。
		 * @param value 梯度模式。
		 */
		set mode(value:number);

		/**
		 * 获取颜色RGB数量。
		 * @return 颜色RGB数量。
		 */
		get colorRGBKeysCount():number;

		/**
		 * 获取颜色Alpha数量。
		 * @return 颜色Alpha数量。
		 */
		get colorAlphaKeysCount():number;

		/**
		 * 获取最大颜色RGB帧数量。
		 * @return 最大RGB帧数量。
		 */
		get maxColorRGBKeysCount():number;

		/**
		 * 获取最大颜色Alpha帧数量。
		 * @return 最大Alpha帧数量。
		 */
		get maxColorAlphaKeysCount():number;

		/**
		 * 创建一个 <code>Gradient</code> 实例。
		 * @param maxColorRGBKeyCount 最大RGB帧个数。
		 * @param maxColorAlphaKeyCount 最大Alpha帧个数。
		 */

		constructor(maxColorRGBKeyCount:number,maxColorAlphaKeyCount:number);

		/**
		 * 增加颜色RGB帧。
		 * @param key 生命周期，范围为0到1。
		 * @param value RGB值。
		 */
		addColorRGB(key:number,value:Color):void;

		/**
		 * 增加颜色Alpha帧。
		 * @param key 生命周期，范围为0到1。
		 * @param value Alpha值。
		 */
		addColorAlpha(key:number,value:number):void;

		/**
		 * 更新颜色RGB帧。
		 * @param index 索引。
		 * @param key 生命周期，范围为0到1。
		 * @param value RGB值。
		 */
		updateColorRGB(index:number,key:number,value:Color):void;

		/**
		 * 更新颜色Alpha帧。
		 * @param index 索引。
		 * @param key 生命周期，范围为0到1。
		 * @param value Alpha值。
		 */
		updateColorAlpha(index:number,key:number,value:number):void;

		/**
		 * 通过插值获取RGB颜色。
		 * @param lerpFactor 插值因子。
		 * @param out 颜色结果。
		 * @param 开始查找索引 。
		 * @return 结果索引。
		 */
		evaluateColorRGB(lerpFactor:number,out:Color,startSearchIndex?:number,reverseSearch?:boolean):number;

		/**
		 * 通过插值获取透明值。
		 * @param lerpFactor 插值因子。
		 * @param out 颜色结果。
		 * @param 开始查找索引 。
		 * @return 结果索引 。
		 */
		evaluateColorAlpha(lerpFactor:number,outColor:Color,startSearchIndex?:number,reverseSearch?:boolean):number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * ...
	 * @author ...
	 */
	class GradientMode  {

		/**
		 * 找到与请求的评估时间相邻的两个键,并线性插值在他们之间,以获得一种混合的颜色。
		 */
		static Blend:number;

		/**
		 * 返回一个固定的颜色，通过查找第一个键的时间值大于所请求的评估时间。
		 */
		static Fixed:number;
	}

	/**
	 * <code>HeightMap</code> 类用于实现高度图数据。
	 */
	class HeightMap  {
		private static _tempRay:any;

		/**
		 * 从网格精灵生成高度图。
		 * @param meshSprite 网格精灵。
		 * @param width 高度图宽度。
		 * @param height 高度图高度。
		 * @param outCellSize 输出 单元尺寸。
		 */
		static creatFromMesh(mesh:Mesh,width:number,height:number,outCellSize:Vector2):HeightMap;

		/**
		 * 从图片生成高度图。
		 * @param image 图片。
		 * @param maxHeight 最小高度。
		 * @param maxHeight 最大高度。
		 */
		static createFromImage(texture:Texture2D,minHeight:number,maxHeight:number):HeightMap;
		private static _getPosition:any;
		private _datas:any;
		private _w:any;
		private _h:any;
		private _minHeight:any;
		private _maxHeight:any;

		/**
		 * 获取宽度。
		 * @return value 宽度。
		 */
		get width():number;

		/**
		 * 获取高度。
		 * @return value 高度。
		 */
		get height():number;

		/**
		 * 最大高度。
		 * @return value 最大高度。
		 */
		get maxHeight():number;

		/**
		 * 最大高度。
		 * @return value 最大高度。
		 */
		get minHeight():number;

		/**
		 * 创建一个 <code>HeightMap</code> 实例。
		 * @param width 宽度。
		 * @param height 高度。
		 * @param minHeight 最大高度。
		 * @param maxHeight 最大高度。
		 */

		constructor(width:number,height:number,minHeight:number,maxHeight:number);

		/**
		 * 获取高度。
		 * @param row 列数。
		 * @param col 行数。
		 * @return 高度。
		 */
		getHeight(row:number,col:number):number;
	}

	interface IClone{
		clone():any;
		cloneTo(destObject:any):void;
	}


enum WeightedMode {
    None = 0,
    In = 1,
    Out = 2,
    Both = 3
}

	/**
	 * <code>KeyFrame</code> 类用于创建关键帧实例。
	 */
	class Keyframe implements IClone  {
		static defaultWeight:number;

		/**
		 * 时间。
		 */
		time:number;

		/**
		 * 创建一个 <code>KeyFrame</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>DirectionLight</code> 类用于创建平行光。
	 */
	class DirectionLight extends LightSprite  {

		/**
		 * 阴影级联数量。
		 */
		get shadowCascadesMode():ShadowCascadesMode;
		set shadowCascadesMode(value:ShadowCascadesMode);

		/**
		 * 二级级联阴影分割比例。
		 */
		get shadowTwoCascadeSplits():number;
		set shadowTwoCascadeSplits(value:number);

		/**
		 * 四级级联阴影分割比例,X、Y、Z依次为其分割比例,Z必须大于Y,Y必须大于X。
		 */
		get shadowFourCascadeSplits():Vector3;
		set shadowFourCascadeSplits(value:Vector3);

		/**
		 * 创建一个 <code>DirectionLight</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>LightSprite</code> 类用于创建灯光的父类。
	 */
	class LightSprite extends Sprite3D  {

		/**
		 * 灯光烘培类型-实时。
		 */
		static LIGHTMAPBAKEDTYPE_REALTIME:number;

		/**
		 * 灯光烘培类型-混合。
		 */
		static LIGHTMAPBAKEDTYPE_MIXED:number;

		/**
		 * 灯光烘培类型-烘焙。
		 */
		static LIGHTMAPBAKEDTYPE_BAKED:number;

		/**
		 * 灯光颜色。
		 */
		color:Vector3;

		/**
		 * 灯光强度。
		 */
		get intensity():number;
		set intensity(value:number);

		/**
		 * 阴影模式。
		 */
		get shadowMode():ShadowMode;
		set shadowMode(value:ShadowMode);

		/**
		 * 最大阴影距离。
		 */
		get shadowDistance():number;
		set shadowDistance(value:number);

		/**
		 * 阴影贴图分辨率。
		 */
		get shadowResolution():number;
		set shadowResolution(value:number);

		/**
		 * 阴影深度偏差。
		 */
		get shadowDepthBias():number;
		set shadowDepthBias(value:number);

		/**
		 * 阴影法线偏差。
		 */
		get shadowNormalBias():number;
		set shadowNormalBias(value:number);

		/**
		 * 阴影强度。
		 */
		get shadowStrength():number;
		set shadowStrength(value:number);

		/**
		 * 阴影视锥的近裁面。
		 */
		get shadowNearPlane():number;
		set shadowNearPlane(value:number);

		/**
		 * 灯光烘培类型。
		 */
		get lightmapBakedType():number;
		set lightmapBakedType(value:number);
		get lightWorldMatrix():Matrix4x4;

		/**
		 * 创建一个 <code>LightSprite</code> 实例。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;

		/**
		 * @deprecated please use color property instead.
		 */
		get diffuseColor():Vector3;
		set diffuseColor(value:Vector3);
	}

	/**
	 * <code>PointLight</code> 类用于创建点光。
	 */
	class PointLight extends LightSprite  {

		/**
		 * 点光的范围。
		 * @return 点光的范围。
		 */
		get range():number;
		set range(value:number);

		/**
		 * 创建一个 <code>PointLight</code> 实例。
		 */

		constructor();
	}

enum ShadowCascadesMode {
    /** 无级联。 */
    NoCascades = 0,
    /** 二级级联。 */
    TwoCascades = 1,
    /** 四级级联。 */
    FourCascades = 2
}

enum ShadowMode {
    /**不产生阴影。*/
    None = 0,
    /**硬阴影，对性能要求较低。*/
    Hard = 1,
    /**低强度软阴影，对性能要求一般。*/
    SoftLow = 2,
    /**高强度软阴影,对性能要求较高。*/
    SoftHigh = 3
}

	/**
	 * <code>SpotLight</code> 类用于创建聚光。
	 */
	class SpotLight extends LightSprite  {

		/**
		 * 聚光灯的锥形角度。
		 */
		get spotAngle():number;
		set spotAngle(value:number);

		/**
		 * 聚光的范围。
		 */
		get range():number;
		set range(value:number);

		/**
		 * 创建一个 <code>SpotLight</code> 实例。
		 */

		constructor();
	}

	/**
	 * BaseMaterial has deprecated,please use Material instead废弃的类，请使用Material类.
	 * @deprecated 
	 */
	class BaseMaterial  {

		/**
		 * @deprecated 废弃请使用Material类 use Material.MATERIAL instead
		 */
		static MATERIAL:string;

		/**
		 * @deprecated 废弃请使用Material类 use Material.RENDERQUEUE_OPAQUE instead
		 */
		static RENDERQUEUE_OPAQUE:number;

		/**
		 * @deprecated 废弃请使用Material类 use Material.RENDERQUEUE_ALPHATEST instead
		 */
		static RENDERQUEUE_ALPHATEST:number;

		/**
		 * @deprecated 废弃请使用Material类 use Material.RENDERQUEUE_TRANSPARENT instead
		 */
		static RENDERQUEUE_TRANSPARENT:number;

		/**
		 * @deprecated 废弃请使用Material类 use Material.ALPHATESTVALUE instead
		 */
		static ALPHATESTVALUE:number;

		/**
		 * @deprecated 废弃请使用Material类 use Material.SHADERDEFINE_ALPHATEST instead
		 */
		static SHADERDEFINE_ALPHATEST:ShaderDefine;

		/**
		 * @deprecated 废弃请使用Material类 BaseMaterial has deprecated,please use Material instead.
		 * @param 资源路径 
		 * @param 处理句柄 
		 */
		static load(url:string,complete:Handler):void;
	}

	/**
	 * <code>BlinnPhongMaterial</code> 类用于实现Blinn-Phong材质。
	 */
	class BlinnPhongMaterial extends Material  {

		/**
		 * 高光强度数据源_漫反射贴图的Alpha通道。
		 */
		static SPECULARSOURCE_DIFFUSEMAPALPHA:number;

		/**
		 * 高光强度数据源_高光贴图的RGB通道。
		 */
		static SPECULARSOURCE_SPECULARMAP:number;

		/**
		 * 渲染状态_不透明。
		 */
		static RENDERMODE_OPAQUE:number;

		/**
		 * 渲染状态_阿尔法测试。
		 */
		static RENDERMODE_CUTOUT:number;

		/**
		 * 渲染状态_透明混合。
		 */
		static RENDERMODE_TRANSPARENT:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:BlinnPhongMaterial;
		set _ColorR(value:number);
		set _ColorG(value:number);
		set _ColorB(value:number);
		set _ColorA(value:number);
		set _Color(value:Vector4);
		set _SpecColorR(value:number);
		set _SpecColorG(value:number);
		set _SpecColorB(value:number);
		set _SpecColorA(value:number);
		set _SpecColor(value:Vector4);
		set _Shininess(value:number);
		set _MainTex_STX(x:number);
		set _MainTex_STY(y:number);
		set _MainTex_STZ(z:number);
		set _MainTex_STW(w:number);
		set _MainTex_ST(value:Vector4);
		set _Cutoff(value:number);

		/**
		 * 设置渲染模式。
		 * @param 渲染模式 
		 */
		set renderMode(value:number);

		/**
		 * 是否支持顶点色。
		 */
		get enableVertexColor():boolean;
		set enableVertexColor(value:boolean);

		/**
		 * 纹理平铺和偏移X分量。
		 */
		get tilingOffsetX():number;
		set tilingOffsetX(x:number);

		/**
		 * 纹理平铺和偏移Y分量。
		 */
		get tilingOffsetY():number;
		set tilingOffsetY(y:number);

		/**
		 * 纹理平铺和偏移Z分量。
		 */
		get tilingOffsetZ():number;
		set tilingOffsetZ(z:number);

		/**
		 * 纹理平铺和偏移W分量。
		 */
		get tilingOffsetW():number;
		set tilingOffsetW(w:number);

		/**
		 * 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;
		set tilingOffset(value:Vector4);

		/**
		 * 反照率颜色R分量。
		 */
		get albedoColorR():number;
		set albedoColorR(value:number);

		/**
		 * 反照率颜色G分量。
		 */
		get albedoColorG():number;
		set albedoColorG(value:number);

		/**
		 * 反照率颜色B分量。
		 */
		get albedoColorB():number;
		set albedoColorB(value:number);

		/**
		 * 反照率颜色Z分量。
		 */
		get albedoColorA():number;
		set albedoColorA(value:number);

		/**
		 * 反照率颜色。
		 */
		get albedoColor():Vector4;
		set albedoColor(value:Vector4);

		/**
		 * 反照率强度。
		 */
		get albedoIntensity():number;
		set albedoIntensity(value:number);

		/**
		 * 高光颜色R轴分量。
		 */
		get specularColorR():number;
		set specularColorR(value:number);

		/**
		 * 高光颜色G分量。
		 */
		get specularColorG():number;
		set specularColorG(value:number);

		/**
		 * 高光颜色B分量。
		 */
		get specularColorB():number;
		set specularColorB(value:number);

		/**
		 * 高光颜色A分量。
		 */
		get specularColorA():number;
		set specularColorA(value:number);

		/**
		 * 高光颜色。
		 */
		get specularColor():Vector4;
		set specularColor(value:Vector4);

		/**
		 * 高光强度,范围为0到1。
		 */
		get shininess():number;
		set shininess(value:number);

		/**
		 * 反照率贴图。
		 */
		get albedoTexture():BaseTexture;
		set albedoTexture(value:BaseTexture);

		/**
		 * 法线贴图。
		 */
		get normalTexture():BaseTexture;
		set normalTexture(value:BaseTexture);

		/**
		 * 高光贴图。
		 */
		get specularTexture():BaseTexture;
		set specularTexture(value:BaseTexture);

		/**
		 * 是否支持透光色。
		 */
		get enableTransmission():boolean;
		set enableTransmission(value:boolean);

		/**
		 * 透光率，会影响漫反射以及透光强度
		 */
		get transmissionRata():number;
		set transmissionRata(value:number);

		/**
		 * 透射影响范围指数
		 */
		get backDiffuse():number;
		set backDiffuse(value:number);

		/**
		 * 透射光强度
		 */
		get backScale():number;
		set backScale(value:number);

		/**
		 * 厚度贴图，会影响透视光，越厚，透射光越弱
		 */
		get thinknessTexture():BaseTexture;
		set thinknessTexture(value:BaseTexture);

		/**
		 * 透光颜色。模拟透光物质内部颜色吸收率
		 */
		get transmissionColor():Vector4;
		set transmissionColor(value:Vector4);

		/**
		 * 创建一个 <code>BlinnPhongMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * 请使用transmissionRata
		 * @deprecated 
		 */
		get transmissionRate():number;
	}

	/**
	 * <code>EffectMaterial</code> 类用于实现Mesh特效材质。
	 */
	class EffectMaterial extends Material  {

		/**
		 * 渲染状态_加色法混合。
		 */
		static RENDERMODE_ADDTIVE:number;

		/**
		 * 渲染状态_透明混合。
		 */
		static RENDERMODE_ALPHABLENDED:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:EffectMaterial;
		set _TintColorR(value:number);
		set _TintColorG(value:number);
		set _TintColorB(value:number);
		set _TintColorA(value:number);
		set _TintColor(value:Vector4);
		set _MainTex_STX(x:number);
		set _MainTex_STY(y:number);
		set _MainTex_STZ(z:number);
		set _MainTex_STW(w:number);
		set _MainTex_ST(value:Vector4);

		/**
		 * 设置渲染模式。
		 */
		set renderMode(value:number);

		/**
		 * 颜色R分量。
		 */
		get colorR():number;
		set colorR(value:number);

		/**
		 * 颜色G分量。
		 */
		get colorG():number;
		set colorG(value:number);

		/**
		 * 颜色B分量。
		 */
		get colorB():number;
		set colorB(value:number);

		/**
		 * 颜色A分量。
		 */
		get colorA():number;
		set colorA(value:number);

		/**
		 * 获取颜色。
		 */
		get color():Vector4;
		set color(value:Vector4);

		/**
		 * 贴图。
		 */
		get texture():BaseTexture;
		set texture(value:BaseTexture);

		/**
		 * 纹理平铺和偏移X分量。
		 */
		get tilingOffsetX():number;
		set tilingOffsetX(x:number);

		/**
		 * 纹理平铺和偏移Y分量。
		 */
		get tilingOffsetY():number;
		set tilingOffsetY(y:number);

		/**
		 * 纹理平铺和偏移Z分量。
		 */
		get tilingOffsetZ():number;
		set tilingOffsetZ(z:number);

		/**
		 * 纹理平铺和偏移W分量。
		 */
		get tilingOffsetW():number;
		set tilingOffsetW(w:number);

		/**
		 * 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;
		set tilingOffset(value:Vector4);

		/**
		 * 创建一个 <code>EffectMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * ...
	 * @author ...
	 */
	class ExtendTerrainMaterial extends Material  {

		/**
		 * 渲染状态_不透明。
		 */
		static RENDERMODE_OPAQUE:number;

		/**
		 * 渲染状态_透明混合。
		 */
		static RENDERMODE_TRANSPARENT:number;

		/**
		 * splatAlpha贴图。
		 */
		get splatAlphaTexture():BaseTexture;
		set splatAlphaTexture(value:BaseTexture);

		/**
		 * 第一层贴图。
		 */
		get diffuseTexture1():BaseTexture;
		set diffuseTexture1(value:BaseTexture);

		/**
		 * 第二层贴图。
		 */
		get diffuseTexture2():BaseTexture;
		set diffuseTexture2(value:BaseTexture);

		/**
		 * 第三层贴图。
		 */
		get diffuseTexture3():BaseTexture;
		set diffuseTexture3(value:BaseTexture);

		/**
		 * 第四层贴图。
		 */
		get diffuseTexture4():BaseTexture;
		set diffuseTexture4(value:BaseTexture);

		/**
		 * 第五层贴图。
		 */
		get diffuseTexture5():BaseTexture;
		set diffuseTexture5(value:BaseTexture);

		/**
		 * 第一层贴图缩放偏移。
		 */
		set diffuseScaleOffset1(scaleOffset1:Vector4);

		/**
		 * 第二层贴图缩放偏移。
		 */
		set diffuseScaleOffset2(scaleOffset2:Vector4);

		/**
		 * 第三层贴图缩放偏移。
		 */
		set diffuseScaleOffset3(scaleOffset3:Vector4);

		/**
		 * 第四层贴图缩放偏移。
		 */
		set diffuseScaleOffset4(scaleOffset4:Vector4);

		/**
		 * 第五层贴图缩放偏移。
		 */
		set diffuseScaleOffset5(scaleOffset5:Vector4);

		/**
		 * 设置渲染模式。
		 */
		set renderMode(value:number);

		/**
		 * 创建一个 <code>ExtendTerrainMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>Material</code> 类用于创建材质。
	 */
	class Material extends Resource implements IClone  {

		/**
		 * Material资源。
		 */
		static MATERIAL:string;

		/**
		 * 渲染队列_不透明。
		 */
		static RENDERQUEUE_OPAQUE:number;

		/**
		 * 渲染队列_阿尔法裁剪。
		 */
		static RENDERQUEUE_ALPHATEST:number;

		/**
		 * 渲染队列_透明。
		 */
		static RENDERQUEUE_TRANSPARENT:number;

		/**
		 * 着色器变量,透明测试值。
		 */
		static ALPHATESTVALUE:number;

		/**
		 * 加载材质。
		 * @param url 材质地址。
		 * @param complete 完成回掉。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * @inheritDoc 
		 */
		static _parse(data:any,propertyParams?:any,constructParams?:any[]):Material;

		/**
		 * @private 
		 */
		_shaderValues:ShaderData|null;

		/**
		 * 所属渲染队列.
		 */
		renderQueue:number;

		/**
		 * 着色器数据。
		 */
		get shaderData():ShaderData;

		/**
		 * 透明测试模式裁剪值。
		 */
		get alphaTestValue():number;
		set alphaTestValue(value:number);

		/**
		 * 是否透明裁剪。
		 */
		get alphaTest():boolean;
		set alphaTest(value:boolean);

		/**
		 * 是否写入深度。
		 */
		get depthWrite():boolean;
		set depthWrite(value:boolean);

		/**
		 * 剔除方式。
		 */
		get cull():number;
		set cull(value:number);

		/**
		 * 混合方式。
		 */
		get blend():number;
		set blend(value:number);

		/**
		 * 混合源。
		 */
		get blendSrc():number;
		set blendSrc(value:number);

		/**
		 * 混合目标。
		 */
		get blendDst():number;
		set blendDst(value:number);

		/**
		 * 深度测试方式。
		 */
		get depthTest():number;
		set depthTest(value:number);

		/**
		 * 模板测试方式
		 */
		get stencilTest():number;
		set stencilTest(value:number);

		/**
		 * 是否写入模板。
		 */
		get stencilWrite():boolean;
		set stencilWrite(value:boolean);

		/**
		 * 写入模板值
		 */
		set stencilRef(value:number);
		get stencilRef():number;

		/**
		 */

		/**
		 * 写入模板测试设置
		 * vector(fail, zfail, zpass)
		 */
		set stencilOp(value:Vector3);
		get stencilOp():Vector3;

		/**
		 * 获得材质属性
		 */
		get MaterialProperty():any;

		/**
		 * 获得材质宏
		 */
		get MaterialDefine():Array<string>;

		/**
		 * 创建一个 <code>BaseMaterial</code> 实例。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;

		/**
		 * 设置使用Shader名字。
		 * @param name 名称。
		 */
		setShaderName(name:string):void;

		/**
		 * 设置属性值
		 * @param name 
		 * @param value 
		 */
		setShaderPropertyValue(name:string,value:any):void;

		/**
		 * 获取属性值
		 * @param name 
		 */
		getShaderPropertyValue(name:string):any;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		get _defineDatas():DefineDatas;
	}

enum PBRRenderMode {
    /**不透明。*/
    Opaque = 0,
    /**透明裁剪。*/
    Cutout = 1,
    /**透明混合_游戏中经常使用的透明。*/
    Fade = 2,
    /**透明混合_物理上看似合理的透明。*/
    Transparent = 3
}

	/**
	 * PBR材质的父类,该类为抽象类。
	 */
	class PBRMaterial extends Material  {

		/**
		 * 渲染质量。
		 */
		static renderQuality:PBRRenderQuality;

		/**
		 * @private 
		 */
		static __init__():void;

		/**
		 * 漫反射颜色。
		 */
		get albedoColor():Vector4;
		set albedoColor(value:Vector4);

		/**
		 * 漫反射贴图。
		 */
		get albedoTexture():BaseTexture;
		set albedoTexture(value:BaseTexture);

		/**
		 * 法线贴图。
		 */
		get normalTexture():BaseTexture;
		set normalTexture(value:BaseTexture);

		/**
		 * 法线贴图缩放系数。
		 */
		get normalTextureScale():number;
		set normalTextureScale(value:number);

		/**
		 * 视差贴图。
		 */
		get parallaxTexture():BaseTexture;
		set parallaxTexture(value:BaseTexture);

		/**
		 * 视差贴图缩放系数。
		 */
		get parallaxTextureScale():number;
		set parallaxTextureScale(value:number);

		/**
		 * 遮挡贴图。
		 */
		get occlusionTexture():BaseTexture;
		set occlusionTexture(value:BaseTexture);

		/**
		 * 遮挡贴图强度,范围为0到1。
		 */
		get occlusionTextureStrength():number;
		set occlusionTextureStrength(value:number);

		/**
		 * 光滑度,范围为0到1。
		 */
		get smoothness():number;
		set smoothness(value:number);

		/**
		 * 光滑度缩放系数,范围为0到1。
		 */
		get smoothnessTextureScale():number;
		set smoothnessTextureScale(value:number);

		/**
		 * 是否开启自发光。
		 */
		get enableEmission():boolean;
		set enableEmission(value:boolean);

		/**
		 * 自发光颜色。
		 */
		get emissionColor():Vector4;
		set emissionColor(value:Vector4);

		/**
		 * 自发光贴图。
		 */
		get emissionTexture():BaseTexture;
		set emissionTexture(value:BaseTexture);

		/**
		 * 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;
		set tilingOffset(value:Vector4);

		/**
		 * 渲染模式。
		 */
		set renderMode(value:number);

		constructor();
	}

enum PBRRenderQuality {
    /**高质量。*/
    High = 0,
    /**低质量。*/
    Low = 1
}

enum PBRSpecularSmoothnessSource {
    /**金属度贴图的Alpha通道。*/
    SpecularTextureAlpha = 0,
    /**反射率贴图的Alpha通道。*/
    AlbedoTextureAlpha = 1
}

	/**
	 * <code>PBRSpecularMaterial</code> 类用于实现PBR(Specular)材质。
	 */
	class PBRSpecularMaterial extends PBRMaterial  {

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:PBRSpecularMaterial;

		/**
		 * 高光贴图。
		 */
		get specularTexture():BaseTexture;
		set specularTexture(value:BaseTexture);

		/**
		 * 高光颜色。
		 */
		get specularColor():Vector4;
		set specularColor(value:Vector4);

		/**
		 * 创建一个 <code>PBRSpecularMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

enum PBRMetallicSmoothnessSource {
    /**金属度贴图的Alpha通道。*/
    MetallicGlossTextureAlpha = 0,
    /**反射率贴图的Alpha通道。*/
    AlbedoTextureAlpha = 1
}

	/**
	 * <code>PBRStandardMaterial</code> 类用于实现PBR材质。
	 */
	class PBRStandardMaterial extends PBRMaterial  {

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:PBRStandardMaterial;

		/**
		 * 金属光滑度贴图。
		 */
		get metallicGlossTexture():BaseTexture;
		set metallicGlossTexture(value:BaseTexture);

		/**
		 * 获取金属度,范围为0到1。
		 */
		get metallic():number;
		set metallic(value:number);

		/**
		 * 光滑度数据源,0或1。
		 */
		get smoothnessSource():PBRMetallicSmoothnessSource;
		set smoothnessSource(value:PBRMetallicSmoothnessSource);

		/**
		 * 创建一个 <code>PBRStandardMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>RenderState</code> 类用于控制渲染状态。
	 */
	class RenderState implements IClone  {

		/**
		 * 剔除枚举_不剔除。
		 */
		static CULL_NONE:number;

		/**
		 * 剔除枚举_剔除正面。
		 */
		static CULL_FRONT:number;

		/**
		 * 剔除枚举_剔除背面。
		 */
		static CULL_BACK:number;

		/**
		 * 混合枚举_禁用。
		 */
		static BLEND_DISABLE:number;

		/**
		 * 混合枚举_启用_RGB和Alpha统一混合。
		 */
		static BLEND_ENABLE_ALL:number;

		/**
		 * 混合枚举_启用_RGB和Alpha单独混合。
		 */
		static BLEND_ENABLE_SEPERATE:number;

		/**
		 * 混合参数枚举_零,例：RGB(0,0,0),Alpha:(1)。
		 */
		static BLENDPARAM_ZERO:number;

		/**
		 * 混合参数枚举_一,例：RGB(1,1,1),Alpha:(1)。
		 */
		static BLENDPARAM_ONE:number;

		/**
		 * 混合参数枚举_源颜色,例：RGB(Rs, Gs, Bs)，Alpha(As)。
		 */
		static BLENDPARAM_SRC_COLOR:number;

		/**
		 * 混合参数枚举_一减源颜色,例：RGB(1-Rs, 1-Gs, 1-Bs)，Alpha(1-As)。
		 */
		static BLENDPARAM_ONE_MINUS_SRC_COLOR:number;

		/**
		 * 混合参数枚举_目标颜色,例：RGB(Rd, Gd, Bd),Alpha(Ad)。
		 */
		static BLENDPARAM_DST_COLOR:number;

		/**
		 * 混合参数枚举_一减目标颜色,例：RGB(1-Rd, 1-Gd, 1-Bd)，Alpha(1-Ad)。
		 */
		static BLENDPARAM_ONE_MINUS_DST_COLOR:number;

		/**
		 * 混合参数枚举_源透明,例:RGB(As, As, As),Alpha(1-As)。
		 */
		static BLENDPARAM_SRC_ALPHA:number;

		/**
		 * 混合参数枚举_一减源阿尔法,例:RGB(1-As, 1-As, 1-As),Alpha(1-As)。
		 */
		static BLENDPARAM_ONE_MINUS_SRC_ALPHA:number;

		/**
		 * 混合参数枚举_目标阿尔法，例：RGB(Ad, Ad, Ad),Alpha(Ad)。
		 */
		static BLENDPARAM_DST_ALPHA:number;

		/**
		 * 混合参数枚举_一减目标阿尔法,例：RGB(1-Ad, 1-Ad, 1-Ad),Alpha(Ad)。
		 */
		static BLENDPARAM_ONE_MINUS_DST_ALPHA:number;

		/**
		 * 混合参数枚举_阿尔法饱和，例：RGB(min(As, 1 - Ad), min(As, 1 - Ad), min(As, 1 - Ad)),Alpha(1)。
		 */
		static BLENDPARAM_SRC_ALPHA_SATURATE:number;

		/**
		 * 混合方程枚举_加法,例：source + destination
		 */
		static BLENDEQUATION_ADD:number;

		/**
		 * 混合方程枚举_减法，例：source - destination
		 */
		static BLENDEQUATION_SUBTRACT:number;

		/**
		 * 混合方程枚举_反序减法，例：destination - source
		 */
		static BLENDEQUATION_REVERSE_SUBTRACT:number;

		/**
		 * 深度测试函数枚举_关闭深度测试。
		 */
		static DEPTHTEST_OFF:number;

		/**
		 * 深度测试函数枚举_从不通过。
		 */
		static DEPTHTEST_NEVER:number;

		/**
		 * 深度测试函数枚举_小于时通过。
		 */
		static DEPTHTEST_LESS:number;

		/**
		 * 深度测试函数枚举_等于时通过。
		 */
		static DEPTHTEST_EQUAL:number;

		/**
		 * 深度测试函数枚举_小于等于时通过。
		 */
		static DEPTHTEST_LEQUAL:number;

		/**
		 * 深度测试函数枚举_大于时通过。
		 */
		static DEPTHTEST_GREATER:number;

		/**
		 * 深度测试函数枚举_不等于时通过。
		 */
		static DEPTHTEST_NOTEQUAL:number;

		/**
		 * 深度测试函数枚举_大于等于时通过。
		 */
		static DEPTHTEST_GEQUAL:number;

		/**
		 * 深度测试函数枚举_总是通过。
		 */
		static DEPTHTEST_ALWAYS:number;
		static STENCILTEST_OFF:number;

		/**
		 * 深度测试函数枚举_从不通过。
		 */
		static STENCILTEST_NEVER:number;

		/**
		 * 深度测试函数枚举_小于时通过。
		 */
		static STENCILTEST_LESS:number;

		/**
		 * 深度测试函数枚举_等于时通过。
		 */
		static STENCILTEST_EQUAL:number;

		/**
		 * 深度测试函数枚举_小于等于时通过。
		 */
		static STENCILTEST_LEQUAL:number;

		/**
		 * 深度测试函数枚举_大于时通过。
		 */
		static STENCILTEST_GREATER:number;

		/**
		 * 深度测试函数枚举_不等于时通过。
		 */
		static STENCILTEST_NOTEQUAL:number;

		/**
		 * 深度测试函数枚举_大于等于时通过。
		 */
		static STENCILTEST_GEQUAL:number;

		/**
		 * 深度测试函数枚举_总是通过。
		 */
		static STENCILTEST_ALWAYS:number;

		/**
		 * 保持当前值
		 */
		static STENCILOP_KEEP:number;

		/**
		 * 将模板缓冲区值设置为0
		 */
		static STENCILOP_ZERO:number;

		/**
		 * 将模具缓冲区值设置为指定的参考值
		 */
		static STENCILOP_REPLACE:number;

		/**
		 * 增加当前模具缓冲区值+1
		 */
		static STENCILOP_INCR:number;

		/**
		 * 增加当前模具缓冲区值,超过最大值的时候循环
		 */
		static STENCILOP_INCR_WRAP:number;

		/**
		 * 递减当前模板缓冲区的值
		 */
		static STENCILOP_DECR:number;

		/**
		 * 递减当前模板缓冲去的值，小于0时会循环
		 */
		static STENCILOP_DECR_WRAP:number;

		/**
		 * 按位反转当前的模板缓冲区的值
		 */
		static STENCILOP_INVERT:number;

		/**
		 * 渲染剔除状态。
		 */
		cull:number;

		/**
		 * 透明混合。
		 */
		blend:number;

		/**
		 * 源混合参数,在blend为BLEND_ENABLE_ALL时生效。
		 */
		srcBlend:number;

		/**
		 * 目标混合参数,在blend为BLEND_ENABLE_ALL时生效。
		 */
		dstBlend:number;

		/**
		 * RGB源混合参数,在blend为BLEND_ENABLE_SEPERATE时生效。
		 */
		srcBlendRGB:number;

		/**
		 * RGB目标混合参数,在blend为BLEND_ENABLE_SEPERATE时生效。
		 */
		dstBlendRGB:number;

		/**
		 * Alpha源混合参数,在blend为BLEND_ENABLE_SEPERATE时生效。
		 */
		srcBlendAlpha:number;

		/**
		 * Alpha目标混合参数,在blend为BLEND_ENABLE_SEPERATE时生效。
		 */
		dstBlendAlpha:number;

		/**
		 * 混合常量颜色。
		 */
		blendConstColor:Vector4;

		/**
		 * 混合方程。
		 */
		blendEquation:number;

		/**
		 * RGB混合方程。
		 */
		blendEquationRGB:number;

		/**
		 * Alpha混合方程。
		 */
		blendEquationAlpha:number;

		/**
		 * 深度测试函数。
		 */
		depthTest:number;

		/**
		 * 是否深度测试。
		 */
		depthWrite:boolean;

		/**
		 * 是否模板写入
		 */
		stencilWrite:boolean;

		/**
		 * 是否开启模板测试
		 */
		stencilTest:number;

		/**
		 * 模板值 一般会在0-255
		 */
		stencilRef:number;

		/**
		 * 模板设置值
		 */
		stencilOp:Vector3;

		/**
		 * RenderState init data
		 */
		static __init__(gl:WebGLRenderingContext):void;

		/**
		 * 创建一个 <code>RenderState</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(dest:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>SkyBoxMaterial</code> 类用于实现SkyBoxMaterial材质。
	 */
	class SkyBoxMaterial extends Material  {
		static TINTCOLOR:number;
		static EXPOSURE:number;
		static ROTATION:number;
		static TEXTURECUBE:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:SkyBoxMaterial;

		/**
		 * 颜色。
		 */
		get tintColor():Vector4;
		set tintColor(value:Vector4);

		/**
		 * 曝光强度。
		 */
		get exposure():number;
		set exposure(value:number);

		/**
		 * 旋转角度。
		 */
		get rotation():number;
		set rotation(value:number);

		/**
		 * 天空盒纹理。
		 */
		get textureCube():TextureCube;
		set textureCube(value:TextureCube);

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;

		/**
		 * 创建一个 <code>SkyBoxMaterial</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>SkyPanoramicMaterial</code> 类用于实现SkyPanoramicMaterial材质。
	 */
	class SkyPanoramicMaterial extends Material  {
		static TINTCOLOR:number;
		static EXPOSURE:number;
		static ROTATION:number;
		static TEXTURE:number;
		static TEXTURE_HDR_PARAMS:number;

		/**
		 * 颜色。
		 */
		get tintColor():Vector4;
		set tintColor(value:Vector4);

		/**
		 * 曝光强度。
		 */
		get exposure():number;
		set exposure(value:number);

		/**
		 * 旋转角度。
		 */
		get rotation():number;
		set rotation(value:number);

		/**
		 * 全景天空纹理。
		 */
		get panoramicTexture():Texture2D;
		set panoramicTexture(value:Texture2D);

		/**
		 * 全景天空纹理解码格式。
		 */
		get panoramicTextureDecodeFormat():TextureDecodeFormat;
		set panoramicTextureDecodeFormat(value:TextureDecodeFormat);

		/**
		 * 创建一个 <code>SkyPanoramicMaterial</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>SkyProceduralMaterial</code> 类用于实现SkyProceduralMaterial材质。
	 */
	class SkyProceduralMaterial extends Material  {

		/**
		 * 太阳_无
		 */
		static SUN_NODE:number;

		/**
		 * 太阳_精简
		 */
		static SUN_SIMPLE:number;

		/**
		 * 太阳_高质量
		 */
		static SUN_HIGH_QUALITY:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:SkyProceduralMaterial;

		/**
		 * 太阳状态。
		 */
		get sunDisk():number;
		set sunDisk(value:number);

		/**
		 * 太阳尺寸,范围是0到1。
		 */
		get sunSize():number;
		set sunSize(value:number);

		/**
		 * 太阳尺寸收缩,范围是0到20。
		 */
		get sunSizeConvergence():number;
		set sunSizeConvergence(value:number);

		/**
		 * 大气厚度,范围是0到5。
		 */
		get atmosphereThickness():number;
		set atmosphereThickness(value:number);

		/**
		 * 天空颜色。
		 */
		get skyTint():Vector4;
		set skyTint(value:Vector4);

		/**
		 * 地面颜色。
		 */
		get groundTint():Vector4;
		set groundTint(value:Vector4);

		/**
		 * 曝光强度,范围是0到8。
		 */
		get exposure():number;
		set exposure(value:number);

		/**
		 * 创建一个 <code>SkyProceduralMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>UnlitMaterial</code> 类用于实现不受光照影响的材质。
	 */
	class UnlitMaterial extends Material  {

		/**
		 * 渲染状态_不透明。
		 */
		static RENDERMODE_OPAQUE:number;

		/**
		 * 渲染状态_阿尔法测试。
		 */
		static RENDERMODE_CUTOUT:number;

		/**
		 * 渲染状态__透明混合。
		 */
		static RENDERMODE_TRANSPARENT:number;

		/**
		 * 渲染状态__加色法混合。
		 */
		static RENDERMODE_ADDTIVE:number;
		static SHADERDEFINE_ALBEDOTEXTURE:ShaderDefine;
		static SHADERDEFINE_ENABLEVERTEXCOLOR:ShaderDefine;
		static ALBEDOTEXTURE:number;
		static ALBEDOCOLOR:number;
		static TILINGOFFSET:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:UnlitMaterial;
		private _albedoIntensity:any;
		set _ColorR(value:number);
		set _ColorG(value:number);
		set _ColorB(value:number);
		set _ColorA(value:number);
		set _Color(value:Vector4);
		set _AlbedoIntensity(value:number);
		set _MainTex_STX(x:number);
		set _MainTex_STY(y:number);
		set _MainTex_STZ(z:number);
		set _MainTex_STW(w:number);
		set _MainTex_ST(value:Vector4);
		set _Cutoff(value:number);

		/**
		 * 反照率颜色R分量。
		 */
		get albedoColorR():number;
		set albedoColorR(value:number);

		/**
		 * 反照率颜色G分量。
		 */
		get albedoColorG():number;
		set albedoColorG(value:number);

		/**
		 * 反照率颜色B分量。
		 */
		get albedoColorB():number;
		set albedoColorB(value:number);

		/**
		 * 反照率颜色Z分量。
		 */
		get albedoColorA():number;
		set albedoColorA(value:number);

		/**
		 * 反照率颜色。
		 */
		get albedoColor():Vector4;
		set albedoColor(value:Vector4);

		/**
		 * 反照率强度。
		 */
		get albedoIntensity():number;
		set albedoIntensity(value:number);

		/**
		 * 反照率贴图。
		 */
		get albedoTexture():BaseTexture;
		set albedoTexture(value:BaseTexture);

		/**
		 * 纹理平铺和偏移X分量。
		 */
		get tilingOffsetX():number;
		set tilingOffsetX(x:number);

		/**
		 * 纹理平铺和偏移Y分量。
		 */
		get tilingOffsetY():number;
		set tilingOffsetY(y:number);

		/**
		 * 纹理平铺和偏移Z分量。
		 */
		get tilingOffsetZ():number;
		set tilingOffsetZ(z:number);

		/**
		 * 纹理平铺和偏移W分量。
		 */
		get tilingOffsetW():number;
		set tilingOffsetW(w:number);

		/**
		 * 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;
		set tilingOffset(value:Vector4);

		/**
		 * 是否支持顶点色。
		 */
		get enableVertexColor():boolean;
		set enableVertexColor(value:boolean);

		/**
		 * 渲染模式。
		 */
		set renderMode(value:number);

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>WaterPrimaryMaterial</code> 类用于实现水材质。
	 */
	class WaterPrimaryMaterial extends Material  {
		static HORIZONCOLOR:number;
		static MAINTEXTURE:number;
		static NORMALTEXTURE:number;
		static WAVESCALE:number;
		static WAVESPEED:number;
		static SHADERDEFINE_MAINTEXTURE:ShaderDefine;
		static SHADERDEFINE_NORMALTEXTURE:ShaderDefine;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:WaterPrimaryMaterial;

		/**
		 * 地平线颜色。
		 */
		get horizonColor():Vector4;
		set horizonColor(value:Vector4);

		/**
		 * 主贴图。
		 */
		get mainTexture():BaseTexture;
		set mainTexture(value:BaseTexture);

		/**
		 * 法线贴图。
		 */
		get normalTexture():BaseTexture;
		set normalTexture(value:BaseTexture);

		/**
		 * 波动缩放系数。
		 */
		get waveScale():number;
		set waveScale(value:number);

		/**
		 * 波动速率。
		 */
		get waveSpeed():Vector4;
		set waveSpeed(value:Vector4);

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>MeshFilter</code> 类用于创建网格过滤器。
	 */
	class MeshFilter  {

		/**
		 * 共享网格。
		 */
		get sharedMesh():Mesh;
		set sharedMesh(value:Mesh);

		/**
		 * 创建一个新的 <code>MeshFilter</code> 实例。
		 * @param owner 所属网格精灵。
		 */

		constructor(owner:RenderableSprite3D);

		/**
		 * @inheritDoc 
		 */
		destroy():void;
	}

	/**
	 * <code>MeshRenderer</code> 类用于网格渲染器。
	 */
	class MeshRenderer extends BaseRender  {

		/**
		 * 创建一个新的 <code>MeshRender</code> 实例。
		 */

		constructor(owner:RenderableSprite3D);
	}

	/**
	 * <code>MeshSprite3D</code> 类用于创建网格。
	 */
	class MeshSprite3D extends RenderableSprite3D  {
		private _meshFilter:any;

		/**
		 * 网格过滤器。
		 */
		get meshFilter():MeshFilter;

		/**
		 * 网格渲染器。
		 */
		get meshRenderer():MeshRenderer;

		/**
		 * 创建一个 <code>MeshSprite3D</code> 实例。
		 * @param mesh 网格,同时会加载网格所用默认材质。
		 * @param name 名字。
		 */

		constructor(mesh?:Mesh,name?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * 类用来记录精灵数据宏
	 */
	class MeshSprite3DShaderDeclaration  {

		/**
		 * UV0通道顶点数据宏
		 */
		static SHADERDEFINE_UV0:ShaderDefine;

		/**
		 * 顶点色顶点数据宏
		 */
		static SHADERDEFINE_COLOR:ShaderDefine;

		/**
		 * UV1通道顶点数据宏
		 */
		static SHADERDEFINE_UV1:ShaderDefine;

		/**
		 * instance调用宏
		 */
		static SHADERDEFINE_GPU_INSTANCE:ShaderDefine;

		/**
		 * 盒子反射宏
		 */
		static SHADERDEFINE_SPECCUBE_BOX_PROJECTION:ShaderDefine;
	}

	/**
	 * <code>TerrainMeshSprite3D</code> 类用于地形节点转换普通mesh渲染。
	 */
	class MeshTerrainSprite3D extends MeshSprite3D  {
		private static _tempVector3:any;
		private static _tempMatrix4x4:any;

		/**
		 * 从网格创建一个TerrainMeshSprite3D实例和其高度图属性。
		 * @param mesh 网格。
		 * @param heightMapWidth 高度图宽度。
		 * @param heightMapHeight 高度图高度。
		 * @param name 名字。
		 */
		static createFromMesh(mesh:Mesh,heightMapWidth:number,heightMapHeight:number,name?:string):MeshTerrainSprite3D;

		/**
		 * 从网格创建一个TerrainMeshSprite3D实例、图片读取高度图属性。
		 * @param mesh 网格。
		 * @param image 高度图。
		 * @param name 名字。
		 * @returns 地形渲染节点
		 */
		static createFromMeshAndHeightMap(mesh:Mesh,texture:Texture2D,minHeight:number,maxHeight:number,name?:string):MeshTerrainSprite3D;
		private _minX:any;
		private _minZ:any;
		private _cellSize:any;
		private _heightMap:any;

		/**
		 * 获取地形X轴最小位置。
		 * @return 地形X轴最小位置。
		 */
		get minX():number;

		/**
		 * 获取地形Z轴最小位置。
		 * @return 地形X轴最小位置。
		 */
		get minZ():number;

		/**
		 * 获取地形X轴长度。
		 * @return 地形X轴长度。
		 */
		get width():number;

		/**
		 * 获取地形Z轴长度。
		 * @return 地形Z轴长度。
		 */
		get depth():number;

		/**
		 * 创建一个 <code>TerrainMeshSprite3D</code> 实例。
		 * @param mesh 网格。
		 * @param heightMap 高度图。
		 * @param name 名字。
		 */

		constructor(mesh:Mesh,heightMap:HeightMap,name?:string);
		private _disableRotation:any;
		private _getScaleX:any;
		private _getScaleZ:any;
		private _initCreateFromMesh:any;
		private _initCreateFromMeshHeightMap:any;
		private _computeCellSize:any;

		/**
		 * 获取地形高度。
		 * @param x X轴坐标。
		 * @param z Z轴坐标。
		 */
		getHeight(x:number,z:number):number;
	}

	/**
	 * <code>Burst</code> 类用于粒子的爆裂描述。
	 */
	class Burst implements IClone  {

		/**
		 * 爆裂时间,单位为秒。
		 */
		private _time:any;

		/**
		 * 爆裂的最小数量。
		 */
		private _minCount:any;

		/**
		 * 爆裂的最大数量。
		 */
		private _maxCount:any;

		/**
		 * 获取爆裂时间,单位为秒。
		 * @return 爆裂时间,单位为秒。
		 */
		get time():number;

		/**
		 * 获取爆裂的最小数量。
		 * @return 爆裂的最小数量。
		 */
		get minCount():number;

		/**
		 * 获取爆裂的最大数量。
		 * @return 爆裂的最大数量。
		 */
		get maxCount():number;

		/**
		 * 创建一个 <code>Burst</code> 实例。
		 * @param time 爆裂时间,单位为秒。
		 * @param minCount 爆裂的最小数量。
		 * @param time 爆裂的最大数量。
		 */

		constructor(time:number,minCount:number,maxCount:number);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>ColorOverLifetime</code> 类用于粒子的生命周期颜色。
	 */
	class ColorOverLifetime  {
		private _color:any;

		/**
		 * 是否启用。
		 */
		enable:boolean;

		/**
		 * 获取颜色。
		 */
		get color():GradientColor;

		/**
		 * 创建一个 <code>ColorOverLifetime</code> 实例。
		 */

		constructor(color:GradientColor);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>Emission</code> 类用于粒子发射器。
	 */
	class Emission implements IClone,IDestroy  {
		private _emissionRateOverDistance:any;

		/**
		 * 是否启用。
		 */
		enable:boolean;

		/**
		 * 设置粒子发射速率。
		 * @param emissionRate 粒子发射速率 (个/秒)。
		 */
		set emissionRate(value:number);

		/**
		 * 获取粒子发射速率。
		 * @return 粒子发射速率 (个/秒)。
		 */
		get emissionRate():number;
		get emissionRateOverDistance():number;
		set emissionRateOverDistance(value:number);

		/**
		 * 获取是否已销毁。
		 * @return 是否已销毁。
		 */
		get destroyed():boolean;

		/**
		 * 创建一个 <code>Emission</code> 实例。
		 */

		constructor();

		/**
		 * @private 
		 */
		destroy():void;

		/**
		 * 获取粒子爆裂个数。
		 * @return 粒子爆裂个数。
		 */
		getBurstsCount():number;

		/**
		 * 通过索引获取粒子爆裂。
		 * @param index 爆裂索引。
		 * @return 粒子爆裂。
		 */
		getBurstByIndex(index:number):Burst;

		/**
		 * 增加粒子爆裂。
		 * @param burst 爆裂。
		 */
		addBurst(burst:Burst):void;

		/**
		 * 移除粒子爆裂。
		 * @param burst 爆裂。
		 */
		removeBurst(burst:Burst):void;

		/**
		 * 通过索引移除粒子爆裂。
		 * @param index 爆裂索引。
		 */
		removeBurstByIndex(index:number):void;

		/**
		 * 清空粒子爆裂。
		 */
		clearBurst():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>FrameOverTime</code> 类用于创建时间帧。
	 */
	class FrameOverTime implements IClone  {

		/**
		 * 通过固定帧创建一个 <code>FrameOverTime</code> 实例。
		 * @param constant 固定帧。
		 * @return 时间帧。
		 */
		static createByConstant(constant?:number):FrameOverTime;

		/**
		 * 通过时间帧创建一个 <code>FrameOverTime</code> 实例。
		 * @param overTime 时间帧。
		 * @return 时间帧。
		 */
		static createByOverTime(overTime:GradientDataInt):FrameOverTime;

		/**
		 * 通过随机双固定帧创建一个 <code>FrameOverTime</code> 实例。
		 * @param constantMin 最小固定帧。
		 * @param constantMax 最大固定帧。
		 * @return 时间帧。
		 */
		static createByRandomTwoConstant(constantMin?:number,constantMax?:number):FrameOverTime;

		/**
		 * 通过随机双时间帧创建一个 <code>FrameOverTime</code> 实例。
		 * @param gradientFrameMin 最小时间帧。
		 * @param gradientFrameMax 最大时间帧。
		 * @return 时间帧。
		 */
		static createByRandomTwoOverTime(gradientFrameMin:GradientDataInt,gradientFrameMax:GradientDataInt):FrameOverTime;
		private _type:any;
		private _constant:any;
		private _overTime:any;
		private _constantMin:any;
		private _constantMax:any;
		private _overTimeMin:any;
		private _overTimeMax:any;

		/**
		 * 生命周期旋转类型,0常量模式，1曲线模式，2随机双常量模式，3随机双曲线模式。
		 */
		get type():number;

		/**
		 * 固定帧。
		 */
		get constant():number;

		/**
		 * 时间帧。
		 */
		get frameOverTimeData():GradientDataInt;

		/**
		 * 最小固定帧。
		 */
		get constantMin():number;

		/**
		 * 最大固定帧。
		 */
		get constantMax():number;

		/**
		 * 最小时间帧。
		 */
		get frameOverTimeDataMin():GradientDataInt;

		/**
		 * 最大时间帧。
		 */
		get frameOverTimeDataMax():GradientDataInt;

		/**
		 * 创建一个 <code>FrameOverTime,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientRotation</code> 类用于创建渐变角速度。
	 */
	class GradientAngularVelocity implements IClone  {

		/**
		 * 通过固定角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param constant 固定角速度。
		 * @return 渐变角速度。
		 */
		static createByConstant(constant:number):GradientAngularVelocity;

		/**
		 * 通过分轴固定角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param separateConstant 分轴固定角速度。
		 * @return 渐变角速度。
		 */
		static createByConstantSeparate(separateConstant:Vector3):GradientAngularVelocity;

		/**
		 * 通过渐变角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param gradient 渐变角速度。
		 * @return 渐变角速度。
		 */
		static createByGradient(gradient:GradientDataNumber):GradientAngularVelocity;

		/**
		 * 通过分轴渐变角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param gradientX X轴渐变角速度。
		 * @param gradientY Y轴渐变角速度。
		 * @param gradientZ Z轴渐变角速度。
		 * @return 渐变角速度。
		 */
		static createByGradientSeparate(gradientX:GradientDataNumber,gradientY:GradientDataNumber,gradientZ:GradientDataNumber):GradientAngularVelocity;

		/**
		 * 通过随机双固定角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param constantMin 最小固定角速度。
		 * @param constantMax 最大固定角速度。
		 * @return 渐变角速度。
		 */
		static createByRandomTwoConstant(constantMin:number,constantMax:number):GradientAngularVelocity;

		/**
		 * 通过随机分轴双固定角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param separateConstantMin 最小分轴固定角速度。
		 * @param separateConstantMax 最大分轴固定角速度。
		 * @return 渐变角速度。
		 */
		static createByRandomTwoConstantSeparate(separateConstantMin:Vector3,separateConstantMax:Vector3):GradientAngularVelocity;

		/**
		 * 通过随机双渐变角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param gradientMin 最小渐变角速度。
		 * @param gradientMax 最大渐变角速度。
		 * @return 渐变角速度。
		 */
		static createByRandomTwoGradient(gradientMin:GradientDataNumber,gradientMax:GradientDataNumber):GradientAngularVelocity;

		/**
		 * 通过分轴随机双渐变角速度创建一个 <code>GradientAngularVelocity</code> 实例。
		 * @param gradientXMin 最小X轴渐变角速度。
		 * @param gradientXMax 最大X轴渐变角速度。
		 * @param gradientYMin 最小Y轴渐变角速度。
		 * @param gradientYMax 最大Y轴渐变角速度。
		 * @param gradientZMin 最小Z轴渐变角速度。
		 * @param gradientZMax 最大Z轴渐变角速度。
		 * @return 渐变角速度。
		 */
		static createByRandomTwoGradientSeparate(gradientXMin:GradientDataNumber,gradientXMax:GradientDataNumber,gradientYMin:GradientDataNumber,gradientYMax:GradientDataNumber,gradientZMin:GradientDataNumber,gradientZMax:GradientDataNumber,gradientWMin:GradientDataNumber,gradientWMax:GradientDataNumber):GradientAngularVelocity;
		private _type:any;
		private _separateAxes:any;
		private _constant:any;
		private _constantSeparate:any;
		private _gradient:any;
		private _gradientX:any;
		private _gradientY:any;
		private _gradientZ:any;
		private _gradientW:any;
		private _constantMin:any;
		private _constantMax:any;
		private _constantMinSeparate:any;
		private _constantMaxSeparate:any;
		private _gradientMin:any;
		private _gradientMax:any;
		private _gradientXMin:any;
		private _gradientXMax:any;
		private _gradientYMin:any;
		private _gradientYMax:any;
		private _gradientZMin:any;
		private _gradientZMax:any;
		private _gradientWMin:any;
		private _gradientWMax:any;

		/**
		 * 生命周期角速度类型,0常量模式，1曲线模式，2随机双常量模式，3随机双曲线模式。
		 */
		get type():number;

		/**
		 * 是否分轴。
		 */
		get separateAxes():boolean;

		/**
		 * 固定角速度。
		 */
		get constant():number;

		/**
		 * 分轴固定角速度。
		 */
		get constantSeparate():Vector3;

		/**
		 * 渐变角速度。
		 */
		get gradient():GradientDataNumber;

		/**
		 * 渐变角角速度X。
		 */
		get gradientX():GradientDataNumber;

		/**
		 * 渐变角速度Y。
		 */
		get gradientY():GradientDataNumber;

		/**
		 * 渐变角速度Z。
		 */
		get gradientZ():GradientDataNumber;

		/**
		 * 渐变角速度Z。
		 */
		get gradientW():GradientDataNumber;

		/**
		 * 最小随机双固定角速度。
		 */
		get constantMin():number;

		/**
		 * 最大随机双固定角速度。
		 */
		get constantMax():number;

		/**
		 * 最小分轴随机双固定角速度。
		 */
		get constantMinSeparate():Vector3;

		/**
		 * 最大分轴随机双固定角速度。
		 */
		get constantMaxSeparate():Vector3;

		/**
		 * 最小渐变角速度。
		 */
		get gradientMin():GradientDataNumber;

		/**
		 * 最大渐变角速度。
		 */
		get gradientMax():GradientDataNumber;

		/**
		 * 最小渐变角速度X。
		 */
		get gradientXMin():GradientDataNumber;

		/**
		 * 最大渐变角速度X。
		 */
		get gradientXMax():GradientDataNumber;

		/**
		 * 最小渐变角速度Y。
		 */
		get gradientYMin():GradientDataNumber;

		/**
		 * 最大渐变角速度Y。
		 */
		get gradientYMax():GradientDataNumber;

		/**
		 * 最小渐变角速度Z。
		 */
		get gradientZMin():GradientDataNumber;

		/**
		 * 最大渐变角速度Z。
		 */
		get gradientZMax():GradientDataNumber;

		/**
		 * 最小渐变角速度Z。
		 */
		get gradientWMin():GradientDataNumber;

		/**
		 * 最大渐变角速度Z。
		 */
		get gradientWMax():GradientDataNumber;

		/**
		 * 创建一个 <code>GradientAngularVelocity,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientColor</code> 类用于创建渐变颜色。
	 */
	class GradientColor implements IClone  {

		/**
		 * 通过固定颜色创建一个 <code>GradientColor</code> 实例。
		 * @param constant 固定颜色。
		 */
		static createByConstant(constant:Vector4):GradientColor;

		/**
		 * 通过渐变颜色创建一个 <code>GradientColor</code> 实例。
		 * @param gradient 渐变色。
		 */
		static createByGradient(gradient:Gradient):GradientColor;

		/**
		 * 通过随机双固定颜色创建一个 <code>GradientColor</code> 实例。
		 * @param minConstant 最小固定颜色。
		 * @param maxConstant 最大固定颜色。
		 */
		static createByRandomTwoConstant(minConstant:Vector4,maxConstant:Vector4):GradientColor;

		/**
		 * 通过随机双渐变颜色创建一个 <code>GradientColor</code> 实例。
		 * @param minGradient 最小渐变颜色。
		 * @param maxGradient 最大渐变颜色。
		 */
		static createByRandomTwoGradient(minGradient:Gradient,maxGradient:Gradient):GradientColor;
		private _type:any;
		private _constant:any;
		private _constantMin:any;
		private _constantMax:any;
		private _gradient:any;
		private _gradientMin:any;
		private _gradientMax:any;

		/**
		 * 生命周期颜色类型,0为固定颜色模式,1渐变模式,2为随机双固定颜色模式,3随机双渐变模式。
		 */
		get type():number;

		/**
		 * 固定颜色。
		 */
		get constant():Vector4;

		/**
		 * 最小固定颜色。
		 */
		get constantMin():Vector4;

		/**
		 * 最大固定颜色。
		 */
		get constantMax():Vector4;

		/**
		 * 渐变颜色。
		 */
		get gradient():Gradient;

		/**
		 * 最小渐变颜色。
		 */
		get gradientMin():Gradient;

		/**
		 * 最大渐变颜色。
		 */
		get gradientMax():Gradient;

		/**
		 * 创建一个 <code>GradientColor,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientDataInt</code> 类用于创建整形渐变。
	 */
	class GradientDataInt implements IClone  {
		private _currentLength:any;

		/**
		 * 整形渐变数量。
		 */
		get gradientCount():number;

		/**
		 * 创建一个 <code>GradientDataInt</code> 实例。
		 */

		constructor();

		/**
		 * 增加整形渐变。
		 * @param key 生命周期，范围为0到1。
		 * @param value 整形值。
		 */
		add(key:number,value:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientDataNumber</code> 类用于创建浮点渐变。
	 */
	class GradientDataNumber implements IClone  {
		private _currentLength:any;

		/**
		 * 渐变浮点数量。
		 */
		get gradientCount():number;

		/**
		 * 创建一个 <code>GradientDataNumber</code> 实例。
		 */

		constructor();

		/**
		 * 增加浮点渐变。
		 * @param key 生命周期，范围为0到1。
		 * @param value 浮点值。
		 */
		add(key:number,value:number):void;

		/**
		 * 通过索引获取键。
		 * @param index 索引。
		 * @return value 键。
		 */
		getKeyByIndex(index:number):number;

		/**
		 * 通过索引获取值。
		 * @param index 索引。
		 * @return value 值。
		 */
		getValueByIndex(index:number):number;

		/**
		 * 获取平均值。
		 */
		getAverageValue():number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientDataVector2</code> 类用于创建二维向量渐变。
	 */
	class GradientDataVector2 implements IClone  {
		private _currentLength:any;

		/**
		 * 二维向量渐变数量。
		 */
		get gradientCount():number;

		/**
		 * 创建一个 <code>GradientDataVector2</code> 实例。
		 */

		constructor();

		/**
		 * 增加二维向量渐变。
		 * @param key 生命周期，范围为0到1。
		 * @param value 二维向量值。
		 */
		add(key:number,value:Vector2):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientSize</code> 类用于创建渐变尺寸。
	 */
	class GradientSize implements IClone  {

		/**
		 * 通过渐变尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param gradient 渐变尺寸。
		 * @return 渐变尺寸。
		 */
		static createByGradient(gradient:GradientDataNumber):GradientSize;

		/**
		 * 通过分轴渐变尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param gradientX 渐变尺寸X。
		 * @param gradientY 渐变尺寸Y。
		 * @param gradientZ 渐变尺寸Z。
		 * @return 渐变尺寸。
		 */
		static createByGradientSeparate(gradientX:GradientDataNumber,gradientY:GradientDataNumber,gradientZ:GradientDataNumber):GradientSize;

		/**
		 * 通过随机双固定尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param constantMin 最小固定尺寸。
		 * @param constantMax 最大固定尺寸。
		 * @return 渐变尺寸。
		 */
		static createByRandomTwoConstant(constantMin:number,constantMax:number):GradientSize;

		/**
		 * 通过分轴随机双固定尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param constantMinSeparate 分轴最小固定尺寸.
		 * @param constantMaxSeparate 分轴最大固定尺寸。
		 * @return 渐变尺寸。
		 */
		static createByRandomTwoConstantSeparate(constantMinSeparate:Vector3,constantMaxSeparate:Vector3):GradientSize;

		/**
		 * 通过随机双渐变尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param gradientMin 最小渐变尺寸。
		 * @param gradientMax 最大渐变尺寸。
		 * @return 渐变尺寸。
		 */
		static createByRandomTwoGradient(gradientMin:GradientDataNumber,gradientMax:GradientDataNumber):GradientSize;

		/**
		 * 通过分轴随机双渐变尺寸创建一个 <code>GradientSize</code> 实例。
		 * @param gradientXMin X轴最小渐变尺寸。
		 * @param gradientXMax X轴最大渐变尺寸。
		 * @param gradientYMin Y轴最小渐变尺寸。
		 * @param gradientYMax Y轴最大渐变尺寸。
		 * @param gradientZMin Z轴最小渐变尺寸。
		 * @param gradientZMax Z轴最大渐变尺寸。
		 * @return 渐变尺寸。
		 */
		static createByRandomTwoGradientSeparate(gradientXMin:GradientDataNumber,gradientXMax:GradientDataNumber,gradientYMin:GradientDataNumber,gradientYMax:GradientDataNumber,gradientZMin:GradientDataNumber,gradientZMax:GradientDataNumber):GradientSize;
		private _type:any;
		private _separateAxes:any;
		private _gradient:any;
		private _gradientX:any;
		private _gradientY:any;
		private _gradientZ:any;
		private _constantMin:any;
		private _constantMax:any;
		private _constantMinSeparate:any;
		private _constantMaxSeparate:any;
		private _gradientMin:any;
		private _gradientMax:any;
		private _gradientXMin:any;
		private _gradientXMax:any;
		private _gradientYMin:any;
		private _gradientYMax:any;
		private _gradientZMin:any;
		private _gradientZMax:any;

		/**
		 * 生命周期尺寸类型，0曲线模式，1随机双常量模式，2随机双曲线模式。
		 */
		get type():number;

		/**
		 * 是否分轴。
		 */
		get separateAxes():boolean;

		/**
		 * 渐变尺寸。
		 */
		get gradient():GradientDataNumber;

		/**
		 * 渐变尺寸X。
		 */
		get gradientX():GradientDataNumber;

		/**
		 * 渐变尺寸Y。
		 */
		get gradientY():GradientDataNumber;

		/**
		 * 渐变尺寸Z。
		 */
		get gradientZ():GradientDataNumber;

		/**
		 * 最小随机双固定尺寸。
		 */
		get constantMin():number;

		/**
		 * 最大随机双固定尺寸。
		 */
		get constantMax():number;

		/**
		 * 最小分轴随机双固定尺寸。
		 */
		get constantMinSeparate():Vector3;

		/**
		 * 最小分轴随机双固定尺寸。
		 */
		get constantMaxSeparate():Vector3;

		/**
		 * 渐变最小尺寸。
		 */
		get gradientMin():GradientDataNumber;

		/**
		 * 渐变最大尺寸。
		 */
		get gradientMax():GradientDataNumber;

		/**
		 * 渐变最小尺寸X。
		 */
		get gradientXMin():GradientDataNumber;

		/**
		 * 渐变最大尺寸X。
		 */
		get gradientXMax():GradientDataNumber;

		/**
		 * 渐变最小尺寸Y。
		 */
		get gradientYMin():GradientDataNumber;

		/**
		 * 渐变最大尺寸Y。
		 */
		get gradientYMax():GradientDataNumber;

		/**
		 * 渐变最小尺寸Z。
		 */
		get gradientZMin():GradientDataNumber;

		/**
		 * 渐变最大尺寸Z。
		 */
		get gradientZMax():GradientDataNumber;

		/**
		 * 创建一个 <code>GradientSize,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 获取最大尺寸。
		 */
		getMaxSizeInGradient(meshMode?:boolean):number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>GradientVelocity</code> 类用于创建渐变速度。
	 */
	class GradientVelocity implements IClone  {

		/**
		 * 通过固定速度创建一个 <code>GradientVelocity</code> 实例。
		 * @param constant 固定速度。
		 * @return 渐变速度。
		 */
		static createByConstant(constant:Vector3):GradientVelocity;

		/**
		 * 通过渐变速度创建一个 <code>GradientVelocity</code> 实例。
		 * @param gradientX 渐变速度X。
		 * @param gradientY 渐变速度Y。
		 * @param gradientZ 渐变速度Z。
		 * @return 渐变速度。
		 */
		static createByGradient(gradientX:GradientDataNumber,gradientY:GradientDataNumber,gradientZ:GradientDataNumber):GradientVelocity;

		/**
		 * 通过随机双固定速度创建一个 <code>GradientVelocity</code> 实例。
		 * @param constantMin 最小固定角速度。
		 * @param constantMax 最大固定角速度。
		 * @return 渐变速度。
		 */
		static createByRandomTwoConstant(constantMin:Vector3,constantMax:Vector3):GradientVelocity;

		/**
		 * 通过随机双渐变速度创建一个 <code>GradientVelocity</code> 实例。
		 * @param gradientXMin X轴最小渐变速度。
		 * @param gradientXMax X轴最大渐变速度。
		 * @param gradientYMin Y轴最小渐变速度。
		 * @param gradientYMax Y轴最大渐变速度。
		 * @param gradientZMin Z轴最小渐变速度。
		 * @param gradientZMax Z轴最大渐变速度。
		 * @return 渐变速度。
		 */
		static createByRandomTwoGradient(gradientXMin:GradientDataNumber,gradientXMax:GradientDataNumber,gradientYMin:GradientDataNumber,gradientYMax:GradientDataNumber,gradientZMin:GradientDataNumber,gradientZMax:GradientDataNumber):GradientVelocity;
		private _type:any;
		private _constant:any;
		private _gradientX:any;
		private _gradientY:any;
		private _gradientZ:any;
		private _constantMin:any;
		private _constantMax:any;
		private _gradientXMin:any;
		private _gradientXMax:any;
		private _gradientYMin:any;
		private _gradientYMax:any;
		private _gradientZMin:any;
		private _gradientZMax:any;

		/**
		 * 生命周期速度类型，0常量模式，1曲线模式，2随机双常量模式，3随机双曲线模式。
		 */
		get type():number;

		/**
		 * 固定速度。
		 */
		get constant():Vector3;

		/**
		 * 渐变速度X。
		 */
		get gradientX():GradientDataNumber;

		/**
		 * 渐变速度Y。
		 */
		get gradientY():GradientDataNumber;

		/**
		 * 渐变速度Z。
		 */
		get gradientZ():GradientDataNumber;

		/**
		 * 最小固定速度。
		 */
		get constantMin():Vector3;

		/**
		 * 最大固定速度。
		 */
		get constantMax():Vector3;

		/**
		 * 渐变最小速度X。
		 */
		get gradientXMin():GradientDataNumber;

		/**
		 * 渐变最大速度X。
		 */
		get gradientXMax():GradientDataNumber;

		/**
		 * 渐变最小速度Y。
		 */
		get gradientYMin():GradientDataNumber;

		/**
		 * 渐变最大速度Y。
		 */
		get gradientYMax():GradientDataNumber;

		/**
		 * 渐变最小速度Z。
		 */
		get gradientZMin():GradientDataNumber;

		/**
		 * 渐变最大速度Z。
		 */
		get gradientZMax():GradientDataNumber;

		/**
		 * 创建一个 <code>GradientVelocity,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>RotationOverLifetime</code> 类用于粒子的生命周期旋转。
	 */
	class RotationOverLifetime implements IClone  {
		private _angularVelocity:any;

		/**
		 * 是否启用
		 */
		enable:boolean;

		/**
		 * 获取角速度。
		 */
		get angularVelocity():GradientAngularVelocity;

		/**
		 * 创建一个 <code>RotationOverLifetime,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor(angularVelocity:GradientAngularVelocity);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

enum ParticleSystemShapeType {
    /**盒体 */
    Box = 0,
    /**环形 */
    Circle = 1,
    /**锥体 */
    Cone = 2,
    /**半球体 */
    Hemisphere = 3,
    /**球体 */
    Sphere = 4
}

	/**
	 * <code>BaseShape</code> 类用于粒子形状。
	 */
	class BaseShape implements IClone  {

		/**
		 * 是否启用。
		 */
		enable:boolean;

		/**
		 * 随机方向。
		 */
		randomDirection:number;

		/**
		 * 粒子类型
		 */
		shapeType:ParticleSystemShapeType;

		/**
		 * 创建一个 <code>BaseShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>BoxShape</code> 类用于创建球形粒子形状。
	 */
	class BoxShape extends BaseShape  {

		/**
		 * 发射器X轴长度。
		 */
		x:number;

		/**
		 * 发射器Y轴长度。
		 */
		y:number;

		/**
		 * 发射器Z轴长度。
		 */
		z:number;

		/**
		 * 创建一个 <code>BoxShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 * @override 
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * @param destObject 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @override 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>CircleShape</code> 类用于创建环形粒子形状。
	 */
	class CircleShape extends BaseShape  {

		/**
		 * 发射器半径。
		 */
		radius:number;

		/**
		 * 环形弧度。
		 */
		arc:number;

		/**
		 * 从边缘发射。
		 */
		emitFromEdge:boolean;

		/**
		 * 创建一个 <code>CircleShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 * @override 
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * @param destObject 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @override 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>ConeShape</code> 类用于创建锥形粒子形状。
	 */
	class ConeShape extends BaseShape  {

		/**
		 * 发射角度。
		 */
		angle:number;

		/**
		 * 发射器半径。
		 */
		radius:number;

		/**
		 * 椎体长度。
		 */
		length:number;

		/**
		 * 发射类型,0为Base,1为BaseShell,2为Volume,3为VolumeShell。
		 */
		emitType:number;

		/**
		 * 创建一个 <code>ConeShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 * @override 
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @override 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>HemisphereShape</code> 类用于创建半球形粒子形状。
	 */
	class HemisphereShape extends BaseShape  {

		/**
		 * 发射器半径。
		 */
		radius:number;

		/**
		 * 从外壳发射。
		 */
		emitFromShell:boolean;

		/**
		 * 创建一个 <code>HemisphereShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 * @override 
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @override 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>SphereShape</code> 类用于创建球形粒子形状。
	 */
	class SphereShape extends BaseShape  {

		/**
		 * 发射器半径。
		 */
		radius:number;

		/**
		 * 从外壳发射。
		 */
		emitFromShell:boolean;

		/**
		 * 创建一个 <code>SphereShape</code> 实例。
		 */

		constructor();

		/**
		 * 用于生成粒子初始位置和方向。
		 * @param position 粒子位置。
		 * @param direction 粒子方向。
		 * @override 
		 */
		generatePositionAndDirection(position:Vector3,direction:Vector3,rand?:Rand,randomSeeds?:Uint32Array):void;

		/**
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @override 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>SizeOverLifetime</code> 类用于粒子的生命周期尺寸。
	 */
	class SizeOverLifetime implements IClone  {
		private _size:any;

		/**
		 * 是否启用
		 */
		enable:boolean;

		/**
		 * 获取尺寸。
		 */
		get size():GradientSize;

		/**
		 * 创建一个 <code>SizeOverLifetime</code> 实例。
		 */

		constructor(size:GradientSize);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>StartFrame</code> 类用于创建开始帧。
	 */
	class StartFrame implements IClone  {

		/**
		 * 通过随机常量旋转创建一个 <code>StartFrame</code> 实例。
		 * @param constant 固定帧。
		 * @return 开始帧。
		 */
		static createByConstant(constant?:number):StartFrame;

		/**
		 * 通过随机双常量旋转创建一个 <code>StartFrame</code> 实例。
		 * @param constantMin 最小固定帧。
		 * @param constantMax 最大固定帧。
		 * @return 开始帧。
		 */
		static createByRandomTwoConstant(constantMin?:number,constantMax?:number):StartFrame;
		private _type:any;
		private _constant:any;
		private _constantMin:any;
		private _constantMax:any;

		/**
		 * 开始帧类型,0常量模式，1随机双常量模式。
		 */
		get type():number;

		/**
		 * 固定帧。
		 */
		get constant():number;

		/**
		 * 最小固定帧。
		 */
		get constantMin():number;

		/**
		 * 最大固定帧。
		 */
		get constantMax():number;

		/**
		 * 创建一个 <code>StartFrame,不允许new，请使用静态创建函数。</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>TextureSheetAnimation</code> 类用于创建粒子帧动画。
	 */
	class TextureSheetAnimation implements IClone  {

		/**
		 * 纹理平铺。
		 */
		tiles:Vector2;

		/**
		 * 类型,0为whole sheet、1为singal row。
		 */
		type:number;

		/**
		 * 是否随机行，type为1时有效。
		 */
		randomRow:boolean;

		/**
		 * 行索引,type为1时有效。
		 */
		rowIndex:number;

		/**
		 * 循环次数。
		 */
		cycles:number;

		/**
		 * UV通道类型,0为Noting,1为Everything,待补充,暂不支持。
		 */
		enableUVChannels:number;

		/**
		 * 是否启用
		 */
		enable:boolean;

		/**
		 * 获取时间帧率。
		 */
		get frame():FrameOverTime;

		/**
		 * 获取开始帧率。
		 */
		get startFrame():StartFrame;

		/**
		 * 创建一个 <code>TextureSheetAnimation</code> 实例。
		 * @param frame 动画帧。
		 * @param startFrame 开始帧。
		 */

		constructor(frame:FrameOverTime,startFrame:StartFrame);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>VelocityOverLifetime</code> 类用于粒子的生命周期速度。
	 */
	class VelocityOverLifetime implements IClone  {

		/**
		 * 是否启用
		 */
		enable:boolean;

		/**
		 * 速度空间,0为local,1为world。
		 */
		space:number;

		/**
		 * 获取尺寸。
		 */
		get velocity():GradientVelocity;

		/**
		 * 创建一个 <code>VelocityOverLifetime</code> 实例。
		 */

		constructor(velocity:GradientVelocity);

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>ShuriKenParticle3D</code> 3D粒子。
	 */
	class ShuriKenParticle3D extends RenderableSprite3D  {

		/**
		 * 粒子系统。
		 */
		get particleSystem():ShurikenParticleSystem;

		/**
		 * 粒子渲染器。
		 */
		get particleRenderer():ShurikenParticleRenderer;

		/**
		 * 创建一个 <code>Particle3D</code> 实例。
		 */

		constructor();

		/**
		 * <p>销毁此对象。</p>
		 * @param destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}
	class ShurikenParticleInstanceSystem extends ShurikenParticleSystem  {
		private _instanceParticleVertexBuffer:any;
		private _instanceVertex:any;
		private _instanceBufferState:any;
		private _meshIndexCount:any;
		private _meshFloatCountPreVertex:any;

		/**
		 * 每个粒子数据 float 个数
		 */
		private _floatCountPerParticleData:any;

		constructor(owner:ShuriKenParticle3D);

		/**
		 * *
		 * 重排 mesh vb
		 */
		private _initMeshVertex:any;

		/**
		 * 初始化 buffer
		 * @returns 
		 */
		_initBufferDatas():void;
		protected _retireActiveParticles():void;
		protected _freeRetiredParticles():void;
		addParticle(position:Vector3,direction:Vector3,time:number):boolean;
		addNewParticlesToVertexBuffer():void;
		_render(stage:RenderContext3D):void;
		destroy():void;
	}

	/**
	 * <code>ShurikenParticleMaterial</code> 类用于实现粒子材质。
	 */
	class ShurikenParticleMaterial extends Material  {

		/**
		 * 渲染状态_透明混合。
		 */
		static RENDERMODE_ALPHABLENDED:number;

		/**
		 * 渲染状态_加色法混合。
		 */
		static RENDERMODE_ADDTIVE:number;

		/**
		 * @interanl 
		 */
		static SHADERDEFINE_ADDTIVEFOG:ShaderDefine;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:ShurikenParticleMaterial;

		/**
		 * 渲染模式。
		 */
		set renderMode(value:number);

		/**
		 * 颜色R分量。
		 */
		get colorR():number;
		set colorR(value:number);

		/**
		 * 颜色G分量。
		 */
		get colorG():number;
		set colorG(value:number);

		/**
		 * 颜色B分量。
		 */
		get colorB():number;
		set colorB(value:number);

		/**
		 * 颜色Z分量。
		 */
		get colorA():number;
		set colorA(value:number);

		/**
		 * 颜色。
		 */
		get color():Vector4;
		set color(value:Vector4);

		/**
		 * 纹理平铺和偏移X分量。
		 */
		get tilingOffsetX():number;
		set tilingOffsetX(x:number);

		/**
		 * 纹理平铺和偏移Y分量。
		 */
		get tilingOffsetY():number;
		set tilingOffsetY(y:number);

		/**
		 * 纹理平铺和偏移Z分量。
		 */
		get tilingOffsetZ():number;
		set tilingOffsetZ(z:number);

		/**
		 * 纹理平铺和偏移W分量。
		 */
		get tilingOffsetW():number;
		set tilingOffsetW(w:number);

		/**
		 * 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;
		set tilingOffset(value:Vector4);

		/**
		 * 漫反射贴图。
		 */
		get texture():BaseTexture;
		set texture(value:BaseTexture);

		/**
		 * 创建一个 <code>ShurikenParticleMaterial</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @return 克隆副本。
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>ShurikenParticleRender</code> 类用于创建3D粒子渲染器。
	 */
	class ShurikenParticleRenderer extends BaseRender  {
		private _dragConstant:any;

		/**
		 * 拉伸广告牌模式摄像机速度缩放,暂不支持。
		 */
		stretchedBillboardCameraSpeedScale:number;

		/**
		 * 拉伸广告牌模式速度缩放。
		 */
		stretchedBillboardSpeedScale:number;

		/**
		 * 拉伸广告牌模式长度缩放。
		 */
		stretchedBillboardLengthScale:number;

		/**
		 * 获取渲染模式,0为BILLBOARD、1为STRETCHEDBILLBOARD、2为HORIZONTALBILLBOARD、3为VERTICALBILLBOARD、4为MESH。
		 */
		get renderMode():number;
		set renderMode(value:number);

		/**
		 * 获取网格渲染模式所使用的Mesh,rendderMode为4时生效。
		 */
		get mesh():Mesh;
		set mesh(value:Mesh);

		/**
		 * 创建一个 <code>ShurikenParticleRender</code> 实例。
		 */

		constructor(owner:ShuriKenParticle3D);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get bounds():Bounds;
	}

	/**
	 * <code>ShurikenParticleSystem</code> 类用于创建3D粒子数据模板。
	 */
	class ShurikenParticleSystem extends GeometryElement implements IClone  {
		protected _emissionLastPosition:Vector3;

		/**
		 * 粒子运行的总时长，单位为秒。
		 */
		duration:number;

		/**
		 * 是否循环。
		 */
		looping:boolean;

		/**
		 * 是否预热。暂不支持
		 */
		prewarm:boolean;

		/**
		 * 开始延迟类型，0为常量模式,1为随机随机双常量模式，不能和prewarm一起使用。
		 */
		startDelayType:number;

		/**
		 * 开始播放延迟，不能和prewarm一起使用。
		 */
		startDelay:number;

		/**
		 * 开始播放最小延迟，不能和prewarm一起使用。
		 */
		startDelayMin:number;

		/**
		 * 开始播放最大延迟，不能和prewarm一起使用。
		 */
		startDelayMax:number;

		/**
		 * 开始速度模式，0为恒定速度，2为两个恒定速度的随机插值。缺少1、3模式
		 */
		startSpeedType:number;

		/**
		 * 开始速度,0模式。
		 */
		startSpeedConstant:number;

		/**
		 * 最小开始速度,1模式。
		 */
		startSpeedConstantMin:number;

		/**
		 * 最大开始速度,1模式。
		 */
		startSpeedConstantMax:number;

		/**
		 * 阻力模式，0为恒定速度，2为两个恒定速度的随机插值
		 */
		dragType:number;

		/**
		 * 开始速度,0模式。
		 */
		dragConstant:number;

		/**
		 * 最小开始速度,1模式。
		 */
		dragSpeedConstantMin:number;

		/**
		 * 最大开始速度,1模式。
		 */
		dragSpeedConstantMax:number;

		/**
		 * 开始尺寸是否为3D模式。
		 */
		threeDStartSize:boolean;

		/**
		 * 开始尺寸模式,0为恒定尺寸，2为两个恒定尺寸的随机插值。缺少1、3模式和对应的二种3D模式
		 */
		startSizeType:number;

		/**
		 * 开始尺寸，0模式。
		 */
		startSizeConstant:number;

		/**
		 * 开始三维尺寸，0模式。
		 */
		startSizeConstantSeparate:Vector3;

		/**
		 * 最小开始尺寸，2模式。
		 */
		startSizeConstantMin:number;

		/**
		 * 最大开始尺寸，2模式。
		 */
		startSizeConstantMax:number;

		/**
		 * 最小三维开始尺寸，2模式。
		 */
		startSizeConstantMinSeparate:Vector3;

		/**
		 * 最大三维开始尺寸，2模式。
		 */
		startSizeConstantMaxSeparate:Vector3;

		/**
		 * 3D开始旋转。
		 */
		threeDStartRotation:boolean;

		/**
		 * 开始旋转模式,0为恒定尺寸，2为两个恒定旋转的随机插值,缺少2种模式,和对应的四种3D模式。
		 */
		startRotationType:number;

		/**
		 * 开始旋转，0模式。
		 */
		startRotationConstant:number;

		/**
		 * 开始三维旋转，0模式。
		 */
		startRotationConstantSeparate:Vector3;

		/**
		 * 最小开始旋转，1模式。
		 */
		startRotationConstantMin:number;

		/**
		 * 最大开始旋转，1模式。
		 */
		startRotationConstantMax:number;

		/**
		 * 最小开始三维旋转，1模式。
		 */
		startRotationConstantMinSeparate:Vector3;

		/**
		 * 最大开始三维旋转，1模式。
		 */
		startRotationConstantMaxSeparate:Vector3;

		/**
		 * 随机旋转方向，范围为0.0到1.0
		 */
		randomizeRotationDirection:number;

		/**
		 * 开始颜色模式，0为恒定颜色，2为两个恒定颜色的随机插值,缺少2种模式。
		 */
		startColorType:number;

		/**
		 * 开始颜色，0模式。
		 */
		startColorConstant:Vector4;

		/**
		 * 最小开始颜色，1模式。
		 */
		startColorConstantMin:Vector4;

		/**
		 * 最大开始颜色，1模式。
		 */
		startColorConstantMax:Vector4;

		/**
		 * 重力敏感度。
		 */
		gravityModifier:number;

		/**
		 * 模拟器空间,0为World,1为Local。暂不支持Custom。
		 */
		simulationSpace:number;

		/**
		 * 粒子的播放速度。
		 */
		simulationSpeed:number;

		/**
		 * 缩放模式，0为Hiercachy,1为Local,2为World。
		 */
		scaleMode:number;

		/**
		 * 激活时是否自动播放。
		 */
		playOnAwake:boolean;

		/**
		 * 随机种子,注:play()前设置有效。
		 */
		randomSeed:Uint32Array;

		/**
		 * 是否使用随机种子。
		 */
		autoRandomSeed:boolean;

		/**
		 * 是否为性能模式,性能模式下会延迟粒子释放。
		 */
		isPerformanceMode:boolean;

		/**
		 * 最大粒子数。
		 */
		get maxParticles():number;
		set maxParticles(value:number);

		/**
		 * 获取发射器。
		 */
		get emission():Emission;

		/**
		 * 粒子存活个数。
		 */
		get aliveParticleCount():number;

		/**
		 * 一次循环内的累计时间。
		 */
		get emissionTime():number;

		/**
		 * 形状。
		 */
		get shape():BaseShape;
		set shape(value:BaseShape);

		/**
		 * 是否存活。
		 */
		get isAlive():boolean;

		/**
		 * 是否正在发射。
		 */
		get isEmitting():boolean;

		/**
		 * 是否正在播放。
		 */
		get isPlaying():boolean;

		/**
		 * 是否已暂停。
		 */
		get isPaused():boolean;

		/**
		 * 开始生命周期模式,0为固定时间，1为渐变时间，2为两个固定之间的随机插值,3为两个渐变时间的随机插值。
		 */
		get startLifetimeType():number;
		set startLifetimeType(value:number);

		/**
		 * 开始生命周期，0模式,单位为秒。
		 */
		get startLifetimeConstant():number;
		set startLifetimeConstant(value:number);

		/**
		 * 开始渐变生命周期，1模式,单位为秒。
		 */
		get startLifeTimeGradient():GradientDataNumber;
		set startLifeTimeGradient(value:GradientDataNumber);

		/**
		 * 最小开始生命周期，2模式,单位为秒。
		 */
		get startLifetimeConstantMin():number;
		set startLifetimeConstantMin(value:number);

		/**
		 * 最大开始生命周期，2模式,单位为秒。
		 */
		get startLifetimeConstantMax():number;
		set startLifetimeConstantMax(value:number);

		/**
		 * 开始渐变最小生命周期，3模式,单位为秒。
		 */
		get startLifeTimeGradientMin():GradientDataNumber;
		set startLifeTimeGradientMin(value:GradientDataNumber);

		/**
		 * 开始渐变最大生命周期，3模式,单位为秒。
		 */
		get startLifeTimeGradientMax():GradientDataNumber;
		set startLifeTimeGradientMax(value:GradientDataNumber);

		/**
		 * 生命周期速度,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
		 */
		get velocityOverLifetime():VelocityOverLifetime;
		set velocityOverLifetime(value:VelocityOverLifetime);

		/**
		 * 生命周期颜色,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
		 */
		get colorOverLifetime():ColorOverLifetime;
		set colorOverLifetime(value:ColorOverLifetime);

		/**
		 * 生命周期尺寸,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
		 */
		get sizeOverLifetime():SizeOverLifetime;
		set sizeOverLifetime(value:SizeOverLifetime);

		/**
		 * 生命周期旋转,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
		 */
		get rotationOverLifetime():RotationOverLifetime;
		set rotationOverLifetime(value:RotationOverLifetime);

		/**
		 * 生命周期纹理动画,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
		 */
		get textureSheetAnimation():TextureSheetAnimation;
		set textureSheetAnimation(value:TextureSheetAnimation);

		constructor(owner:ShuriKenParticle3D);

		/**
		 * 设置 自定义 包围盒
		 */
		get customBounds():Bounds;
		set customBounds(value:Bounds);

		/**
		 * 发射一个粒子。
		 */
		emit(time:number):boolean;
		addParticle(position:Vector3,direction:Vector3,time:number):boolean;
		addNewParticlesToVertexBuffer():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_getType():number;

		/**
		 * 开始发射粒子。
		 */
		play():void;

		/**
		 * 暂停发射粒子。
		 */
		pause():void;

		/**
		 * 通过指定时间增加粒子播放进度，并暂停播放。
		 * @param time 进度时间.如果restart为true,粒子播放时间会归零后再更新进度。
		 * @param restart 是否重置播放状态。
		 */
		simulate(time:number,restart?:boolean):void;

		/**
		 * 停止发射粒子。
		 */
		stop():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>PixelLineData</code> 类用于表示线数据。
	 */
	class PixelLineData  {

		/**
		 * 线开始位置
		 */
		startPosition:Vector3;

		/**
		 * 线结束位置
		 */
		endPosition:Vector3;

		/**
		 * 线开始颜色
		 */
		startColor:Color;

		/**
		 * 线结束颜色
		 */
		endColor:Color;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:PixelLineData):void;
	}

	/**
	 * <code>PixelLineFilter</code> 类用于线过滤器。
	 */
	class PixelLineFilter extends GeometryElement  {

		/**
		 * @private 
		 */
		private static _tempVector0:any;

		/**
		 * @private 
		 */
		private static _tempVector1:any;

		/**
		 * 创建一个PixelLineFilter实例
		 * @param owner 渲染精灵节点
		 * @param maxLineCount 最大线长
		 */

		constructor(owner:PixelLineSprite3D,maxLineCount:number);

		/**
		 * 获取线段数据
		 * @return 线段数据。
		 */
		_getLineData(index:number,out:PixelLineData):void;

		/**
		 * @inheritDoc 
		 * @override 删除
		 */
		destroy():void;
	}

	/**
	 * <code>PixelLineMaterial</code> 类用于实现像素线材质。
	 */
	class PixelLineMaterial extends Material  {

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:PixelLineMaterial;

		/**
		 * 获取颜色。
		 * @return 颜色。
		 */
		get color():Vector4;

		/**
		 * 设置颜色。
		 * @param value 颜色。
		 */
		set color(value:Vector4);

		/**
		 * 创建一个 <code>PixelLineMaterial</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>PixelLineRenderer</code> 类用于线渲染器。
	 */
	class PixelLineRenderer extends BaseRender  {

		/**
		 * 创建一个PixelLineRenderer实例
		 * @param owner 线渲染精灵
		 */

		constructor(owner:PixelLineSprite3D);
	}

	/**
	 * <code>PixelLineSprite3D</code> 类用于像素线渲染精灵。
	 */
	class PixelLineSprite3D extends RenderableSprite3D  {

		/**
		 * @private 是否调用active
		 */
		private _isRenderActive:any;

		/**
		 * @private 是否加入渲染队列
		 */
		private _isInRenders:any;

		/**
		 * 最大线数量
		 */
		get maxLineCount():number;
		set maxLineCount(value:number);

		/**
		 * 获取线数量。
		 */
		get lineCount():number;
		set lineCount(value:number);

		/**
		 * line渲染器。
		 */
		get pixelLineRenderer():PixelLineRenderer;

		/**
		 * 创建一个 <code>PixelLineSprite3D</code> 实例。
		 * @param maxCount 最大线段数量。
		 * @param name 名字。
		 */

		constructor(maxCount?:number,name?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 */
		_changeRenderObjects(index:number,material:Material):void;

		/**
		 * 增加一条线。
		 * @param startPosition 初始点位置
		 * @param endPosition 结束点位置
		 * @param startColor 初始点颜色
		 * @param endColor 结束点颜色
		 */
		addLine(startPosition:Vector3,endPosition:Vector3,startColor:Color,endColor:Color):void;

		/**
		 * 添加多条线段。
		 * @param lines 线段数据
		 */
		addLines(lines:PixelLineData[]):void;

		/**
		 * 移除一条线段。
		 * @param index 索引。
		 */
		removeLine(index:number):void;

		/**
		 * 更新线
		 * @param index 索引
		 * @param startPosition 初始点位置
		 * @param endPosition 结束点位置
		 * @param startColor 初始点颜色
		 * @param endColor 结束点颜色
		 */
		setLine(index:number,startPosition:Vector3,endPosition:Vector3,startColor:Color,endColor:Color):void;

		/**
		 * 获取线段数据
		 * @param out 线段数据。
		 */
		getLine(index:number,out:PixelLineData):void;

		/**
		 * 清除所有线段。
		 */
		clear():void;
	}

	/**
	 * <code>QuaternionKeyframe</code> 类用于创建四元数关键帧实例。
	 */
	class QuaternionKeyframe extends Keyframe  {

		/**
		 * 内切线
		 */
		inTangent:Vector4;

		/**
		 * 外切线
		 */
		outTangent:Vector4;

		/**
		 * 帧数据
		 */
		value:Quaternion;

		/**
		 * 内权重
		 */
		inWeight:Vector4;

		/**
		 * 外权重
		 */
		outWeight:Vector4;

		/**
		 * 权重模式
		 */
		weightedMode:Vector4;

		/**
		 * 创建一个 <code>QuaternionKeyframe</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 * @override 
		 */
		cloneTo(dest:any):void;
	}

enum ReflectionProbeMode {
    /**烘培模式 */
    off = 0,
    /**实时简单采样模式 还未支持*/
    simple = 1
}

	/**
	 * <code>ReflectionProbe</code> 类用于实现反射探针组件
	 * @miner 
	 */
	class ReflectionProbe extends Sprite3D  {
		static TEMPVECTOR3:Vector3;

		/**
		 * 默认解码数据
		 */
		static defaultTextureHDRDecodeValues:Vector4;

		/**
		 * 盒子反射是否开启
		 */
		private _boxProjection:any;

		/**
		 * 探针重要度
		 */
		private _importance:any;

		/**
		 * 反射探针图片
		 */
		private _reflectionTexture:any;

		/**
		 * 包围盒大小
		 */
		private _size:any;

		/**
		 * 包围盒偏移
		 */
		private _offset:any;

		/**
		 * 包围盒
		 */
		private _bounds:any;

		/**
		 * 反射强度
		 */
		private _intensity:any;

		/**
		 * 反射参数
		 */
		private _reflectionHDRParams:any;

		/**
		 * 反射探针解码格式
		 */
		private _reflectionDecodeFormat:any;

		/**
		 * 队列索引
		 */
		private _indexInReflectProbList:any;

		/**
		 * 是否是场景探针
		 */
		_isScene:boolean;

		constructor();

		/**
		 * 是否开启正交反射。
		 */
		get boxProjection():boolean;
		set boxProjection(value:boolean);

		/**
		 * 设置反射探针的重要度
		 */
		get importance():number;
		set importance(value:number);

		/**
		 * 设置反射探针资源
		 */
		get intensity():number;
		set intensity(value:number);

		/**
		 * 设置反射贴图
		 */
		get reflectionTexture():TextureCube;
		set reflectionTexture(value:TextureCube);

		/**
		 * 获得反射探针的包围盒
		 */
		get bounds():Bounds;
		get boundsMax():Vector3;
		get boundsMin():Vector3;
		get probePosition():Vector3;

		/**
		 * 反射参数
		 */
		get reflectionHDRParams():Vector4;

		/**
		 * 设置队列索引
		 * @param value 
		 */
		_setIndexInReflectionList(value:number):void;

		/**
		 * 获得队列索引
		 */
		_getIndexInReflectionList():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * <code>ReflectionProbeList</code> 类用于实现反射探针队列。
	 * @miner 
	 */
	class ReflectionProbeList extends SingletonList<ReflectionProbe>  {

		/**
		 * 创建一个新的 <code>ReflectionProbeList</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>ReflectionProbeManager</code> 类用于反射探针管理
	 * @miner 
	 */
	class ReflectionProbeManager  {

		constructor();
		set sceneReflectionProbe(value:TextureCube);
		set sceneReflectionCubeHDRParam(value:Vector4);

		/**
		 * 更新baseRender的反射探针
		 * @param baseRender 
		 */
		_updateMotionObjects(baseRender:BaseRender):void;

		/**
		 * 添加运动物体。
		 * @param 运动物体 。
		 */
		addMotionObject(renderObject:BaseRender):void;

		/**
		 * 更新运动物体的反射探针信息
		 */
		update():void;

		/**
		 * 更新传入所有渲染器反射探针
		 * @param 渲染器列表 
		 */
		updateAllRenderObjects(baseRenders:SimpleSingletonList):void;

		/**
		 * 清楚变动队列
		 */
		clearMotionObjects():void;
		destroy():void;
	}

	/**
	 * <code>Render</code> 类用于渲染器的父类，抽象类不允许实例。
	 */
	class BaseRender extends EventDispatcher implements ISingletonElement,IOctreeObject  {
		_renderElements:RenderElement[];

		/**
		 * 排序矫正值。
		 */
		sortingFudge:number;

		/**
		 * 获取唯一标识ID,通常用于识别。
		 */
		get id():number;

		/**
		 * 光照贴图的索引。
		 */
		get lightmapIndex():number;
		set lightmapIndex(value:number);

		/**
		 * 光照贴图的缩放和偏移。
		 */
		get lightmapScaleOffset():Vector4;
		set lightmapScaleOffset(value:Vector4);

		/**
		 * 是否可用。
		 */
		get enable():boolean;
		set enable(value:boolean);

		/**
		 * 返回第一个实例材质,第一次使用会拷贝实例对象。
		 */
		get material():Material;
		set material(value:Material);

		/**
		 * 潜拷贝实例材质列表,第一次使用会拷贝实例对象。
		 */
		get materials():Material[];
		set materials(value:Material[]);

		/**
		 * 返回第一个材质。
		 */
		get sharedMaterial():Material;
		set sharedMaterial(value:Material);

		/**
		 * 浅拷贝材质列表。
		 */
		get sharedMaterials():Material[];
		set sharedMaterials(value:Material[]);

		/**
		 * 包围盒,只读,不允许修改其值。
		 */
		get bounds():Bounds;
		set receiveShadow(value:boolean);

		/**
		 * 是否接收阴影属性
		 */
		get receiveShadow():boolean;

		/**
		 * 是否产生阴影。
		 */
		get castShadow():boolean;
		set castShadow(value:boolean);

		/**
		 * 是否是静态的一部分。
		 */
		get isPartOfStaticBatch():boolean;

		/**
		 * 是否被渲染。
		 */
		get isRender():boolean;
		set reflectionMode(value:ReflectionProbeMode);
		get reflectionMode():ReflectionProbeMode;

		/**
		 */
		_getOctreeNode():BoundsOctreeNode;

		/**
		 */
		_setOctreeNode(value:BoundsOctreeNode):void;

		/**
		 */
		_getIndexInMotionList():number;

		/**
		 */
		_setIndexInMotionList(value:number):void;

		/**
		 * [实现ISingletonElement接口]
		 */
		_getIndexInList():number;

		/**
		 * [实现ISingletonElement接口]
		 */
		_setIndexInList(index:number):void;
		_setUnBelongScene():void;

		/**
		 * 标记为非静态,静态合并后可用于取消静态限制。
		 */
		markAsUnStatic():void;
	}

	/**
	 * <code>BloomEffect</code> 类用于创建泛光效果。
	 */
	class BloomEffect extends PostProcessEffect  {

		/**
		 * 限制泛光像素的数量,该值在伽马空间。
		 */
		clamp:number;

		/**
		 * 泛光颜色。
		 */
		color:Color;

		/**
		 * 是否开启快速模式。该模式通过降低质量来提升性能。
		 */
		fastMode:boolean;

		/**
		 * 镜头污渍纹路,用于为泛光特效增加污渍灰尘效果
		 */
		dirtTexture:Texture2D;

		/**
		 * 获取泛光过滤器强度,最小值为0。
		 * @return 强度。
		 */
		get intensity():number;

		/**
		 * 设置泛光过滤器强度,最小值为0。
		 * @param value 强度。
		 */
		set intensity(value:number);

		/**
		 * 设置泛光阈值,在该阈值亮度以下的像素会被过滤掉,该值在伽马空间。
		 * @return 阈值。
		 */
		get threshold():number;

		/**
		 * 获取泛光阈值,在该阈值亮度以下的像素会被过滤掉,该值在伽马空间。
		 * @param value 阈值。
		 */
		set threshold(value:number);

		/**
		 * 获取软膝盖过渡强度,在阈值以下进行渐变过渡(0为完全硬过度,1为完全软过度)。
		 * @return 软膝盖值。
		 */
		get softKnee():number;

		/**
		 * 设置软膝盖过渡强度,在阈值以下进行渐变过渡(0为完全硬过度,1为完全软过度)。
		 * @param value 软膝盖值。
		 */
		set softKnee(value:number);

		/**
		 * 获取扩散值,改变泛光的扩散范围,最好使用整数值保证效果,该值会改变内部的迭代次数,范围是1到10。
		 * @return 光晕的扩散范围。
		 */
		get diffusion():number;

		/**
		 * 设置扩散值,改变泛光的扩散范围,最好使用整数值保证效果,该值会改变内部的迭代次数,范围是1到10。
		 * @param value 光晕的扩散范围。
		 */
		set diffusion(value:number);

		/**
		 * 获取形变比,通过扭曲泛光产生视觉上形变,负值为垂直扭曲,正值为水平扭曲。
		 * @return 形变比。
		 */
		get anamorphicRatio():number;

		/**
		 * 设置形变比,通过扭曲泛光产生视觉上形变,负值为垂直扭曲,正值为水平扭曲。
		 * @param value 形变比。
		 */
		set anamorphicRatio(value:number);

		/**
		 * 获取污渍强度。
		 * @return 污渍强度。
		 */
		get dirtIntensity():number;

		/**
		 * 设置污渍强度。
		 * @param value 污渍强度。
		 */
		set dirtIntensity(value:number);

		/**
		 * 创建一个 <code>BloomEffect</code> 实例。
		 */

		constructor();
	}

	/**
	 * 类用于创建从渲染源输出到渲染目标的指令
	 */
	class BlitFrameBufferCMD  {

		/**
		 * 渲染命令集
		 * @param source 
		 * @param dest 
		 * @param viewport 
		 * @param offsetScale 
		 * @param shader 
		 * @param shaderData 
		 * @param subShader 
		 */
		static create(source:BaseTexture,dest:RenderTexture,viewport:Viewport,offsetScale?:Vector4,shader?:Shader3D,shaderData?:ShaderData,subShader?:number):BlitFrameBufferCMD;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		run():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		recover():void;
	}

	/**
	 * <code>BlitScreenQuadCMD</code> 类用于创建从一张渲染目标输出到另外一张渲染目标指令。
	 */
	class BlitScreenQuadCMD extends Command  {

		/**
		 * 创建命令流
		 * @param source 原始贴图 如果设置为null  将会使用默认的Camera流程中的原RenderTexture
		 * @param dest 目标贴图 如果设置为null，将会使用默认的camera渲染目标
		 * @param offsetScale 偏移缩放
		 * @param shader 渲染shader
		 * @param shaderData 渲染数据
		 * @param subShader subshader的节点
		 * @param screenType 
		 */
		static create(source:BaseTexture,dest:RenderTexture,offsetScale?:Vector4,shader?:Shader3D,shaderData?:ShaderData,subShader?:number,screenType?:number,commandbuffer?:CommandBuffer,definedCanvas?:boolean):BlitScreenQuadCMD;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		run():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		recover():void;
	}

	/**
	 * <code>Command</code> 类用于创建指令。
	 */
	class Command  {

		/**
		 * 创建一个 <code>Command</code> 实例。
		 */

		constructor();

		/**
		 * 运行渲染指令
		 */
		run():void;

		/**
		 * 回收渲染指令
		 */
		recover():void;

		/**
		 * 设置渲染上下文
		 * @param context 渲染上下文
		 */
		setContext(context:RenderContext3D):void;
	}

	/**
	 * <code>CommandBuffer</code> 类用于创建命令流。
	 */
	class CommandBuffer  {

		/**
		 * 创建一个 <code>CommandBuffer</code> 实例。
		 */

		constructor(name?:string);
		get name():string;
		_applyOne():boolean;
		getCommandsSize():number;

		/**
		 * 设置shader图片数据
		 * @param shaderData shader数据集合
		 * @param nameID 图片UniformID
		 * @param source 图片源
		 */
		setShaderDataTexture(shaderData:ShaderData,nameID:number,source:BaseTexture):void;

		/**
		 * 设置全局纹理数据
		 * @param nameID 图片uniformID
		 * @param source 图片源
		 */
		setGlobalTexture(nameID:number,source:BaseTexture):void;

		/**
		 * 设置shader Vector4数据
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataVector(shaderData:ShaderData,nameID:number,value:Vector4):void;

		/**
		 * 设置全局Vector4数据
		 * @param nameID Vector4数据ID
		 * @param source 数据
		 */
		setGlobalVector(nameID:number,source:Vector4):void;

		/**
		 * 设置shader Vector3数据
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataVector3(shaderData:ShaderData,nameID:number,value:Vector3):void;

		/**
		 * 设置全局Vector3数据
		 * @param nameID 数据ID
		 * @param source 数据
		 */
		setGlobalVector3(nameID:number,source:Vector3):void;

		/**
		 * 设置shader Vector2数据
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataVector2(shaderData:ShaderData,nameID:number,value:Vector2):void;

		/**
		 * 设置全局Vector2数据
		 * @param nameID 数据ID
		 * @param source 数据
		 */
		setGlobalVector2(nameID:number,source:Vector2):void;

		/**
		 * 设置shader Number属性
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataNumber(shaderData:ShaderData,nameID:number,value:number):void;

		/**
		 * 设置全局number属性
		 * @param nameID 数据ID
		 * @param source 数据
		 */
		setGlobalNumber(nameID:number,source:number):void;

		/**
		 * 设置shader Int属性
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataInt(shaderData:ShaderData,nameID:number,value:number):void;

		/**
		 * 设置全局int属性
		 * @param nameID 数据ID
		 * @param source 数据
		 */
		setGlobalInt(nameID:number,source:number):void;

		/**
		 * 设置shader Matrix属性
		 * @param shaderData shader数据集合
		 * @param nameID 数据ID
		 * @param value 数据
		 */
		setShaderDataMatrix(shaderData:ShaderData,nameID:number,value:Matrix4x4):void;
		setShaderDefine(shaderData:ShaderData,define:string,value:boolean):void;

		/**
		 * 设置全局Matrix属性
		 * @param nameID 数据ID
		 * @param source 数据
		 */
		setGlobalMatrix(nameID:number,source:number):void;

		/**
		 * 添加一条通过全屏四边形将源纹理渲染到目标渲染纹理指令。
		 * @param source 源纹理. 如果为null,前渲染结果为原纹理
		 * @param dest 目标纹理. 如果为null，直接渲染到最终画布
		 * @param offsetScale 偏移缩放。
		 * @param shader 着色器,如果为null使用内部拷贝着色器,不做任何处理。
		 * @param shaderData 着色器数据,如果为null只接收sourceTexture。
		 * @param subShader subShader索引,默认值为0。
		 */
		blitScreenQuad(source:BaseTexture,dest:RenderTexture,offsetScale?:Vector4,shader?:Shader3D,shaderData?:ShaderData,subShader?:number,definedCanvas?:boolean):void;

		/**
		 * 添加一条通过全屏四边形将源纹理渲染到目标渲染纹理指令。
		 * @param source 源纹理 如果为null,前渲染结果为原纹理
		 * @param dest 目标纹理 如果为null，直接渲染到最终画布
		 * @param offsetScale 偏移缩放
		 * @param material 材质
		 * @param subShader shader索引
		 */
		blitScreenQuadByMaterial(source:BaseTexture,dest:RenderTexture,offsetScale?:Vector4,material?:Material,subShader?:number):void;

		/**
		 * 添加一条通过全屏三角形将源纹理渲染到目标渲染纹理指令。
		 * @param source 源纹理。
		 * @param dest 目标纹理。
		 * @param offsetScale 偏移缩放。
		 * @param shader 着色器,如果为null使用内部拷贝着色器,不做任何处理。
		 * @param shaderData 着色器数据,如果为null只接收sourceTexture。
		 * @param subShader subShader索引,默认值为0。
		 */
		blitScreenTriangle(source:BaseTexture,dest:RenderTexture,offsetScale?:Vector4,shader?:Shader3D,shaderData?:ShaderData,subShader?:number,defineCanvas?:boolean):void;

		/**
		 * 设置指令渲染目标
		 * @param renderTexture RT渲染目标
		 */
		setRenderTarget(renderTexture:RenderTexture):void;

		/**
		 * clear渲染纹理
		 * @param clearColor 
		 * @param clearDepth 
		 * @param backgroundColor 
		 * @param depth 
		 */
		clearRenderTarget(clearColor:boolean,clearDepth:boolean,backgroundColor:Vector4,depth?:number):void;

		/**
		 * 渲染一个Mesh
		 * @param mesh 原始网格信息
		 * @param matrix 网格世界矩阵
		 * @param material 材质
		 * @param submeshIndex 子网格索引 如果索引为
		 * @param subShaderIndex 子shader索引 一般为0
		 */
		drawMesh(mesh:Mesh,matrix:Matrix4x4,material:Material,submeshIndex:number,subShaderIndex:number):void;

		/**
		 * 渲染一个Render
		 * @param render 渲染器
		 * @param material 材质
		 * @param subShaderIndex 子shader索引 一般为0
		 */
		drawRender(render:BaseRender,material:Material,subShaderIndex:number):void;

		/**
		 * 使用instance动态合批的方式渲染一个Mesh
		 * @param mesh 原始网格信息
		 * @param subMeshIndex mesh索引
		 * @param matrixs 渲染的世界矩阵数组，用来描述每个Mesh需要渲染的位置,如果为null，将不创建更新世界矩阵Buffer
		 * @param material 渲染材质
		 * @param subShaderIndex 渲染材质shader索引
		 * @param instanceProperty Instance自定义属性
		 * @param drawnums 渲染个数
		 */
		drawMeshInstance(mesh:Mesh,subMeshIndex:number,matrixs:Matrix4x4[],material:Material,subShaderIndex:number,instanceProperty:MaterialInstancePropertyBlock,drawnums:number):any;
	}

	/**
	 * <code>SetShaderDataTextureCMD</code> 类用于创建设置渲染目标指令。
	 */
	class DrawMeshInstancedCMD extends Command  {

		/**
		 * 设置最大DrawInstance数
		 */
		static maxInstanceCount:number;

		constructor();
		get bufferState():VertexBuffer3D;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		run():void;

		/**
		 * 重置DrawInstance的世界矩阵数组
		 * @param worldMatrixArray 
		 */
		setWorldMatrix(worldMatrixArray:Matrix4x4[]):void;

		/**
		 * 重置渲染个数
		 * @param drawNums 
		 */
		setDrawNums(drawNums:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		recover():void;
	}

enum InstanceLocation {
    CUSTOME0 = 12,
    CUSTOME1 = 13,
    CUSTOME2 = 14,
    CUSTOME3 = 15
}

	/**
	 * <code>Mesh</code> 类用于创建CustomInstance属性块。
	 */
	class MaterialInstancePropertyBlock  {

		/**
		 * Instance合并方案
		 */

		/**
		 * attribute instance渲染方案 优点：合并数量多,合并效率高，渲染性能优 缺点：instance变量元素少
		 */
		static INSTANCETYPE_ATTRIBUTE:number;

		/**
		 * uniform instance渲染方案 优点：instance变量多，灵活  缺点：合并数量受WebGLContext._maxUniformFragmentVectors的影响，合并效率低
		 */
		static INSTANCETYPE_UNIFORMBUFFER:number;

		constructor();

		/**
		 * 创建instance属性
		 * @param attributeName name
		 * @param arrays data
		 * @param vertexStride vertex size
		 * @param vertexformat vertexFormat
		 * @param attributeLocation attribute location
		 */
		private _creatProperty:any;

		/**
		 * 设置Vector4材质数组属性
		 * @param attributeName 属性名称（要对应到Shader中）
		 * @param arrays 数据
		 * @param attributeLocation 属性Shader位置（需要与shader中的声明Attribute一一对应）
		 */
		setVectorArray(attributeName:string,arrays:Vector4[]|Float32Array,attributeLocation:InstanceLocation):void;

		/**
		 * 设置Vector3材质数组属性
		 * @param attributeName 属性名称（要对应到Shader中）
		 * @param arrays 数据
		 * @param attributeLocation 属性shader位置（需要与shader中的声明Attribute一一对应）
		 */
		setVector3Array(attributeName:string,arrays:Vector3[]|Float32Array,attributeLocation:InstanceLocation):void;

		/**
		 * 设置Vector2材质数组属性
		 * @param attributeName 属性名称（要对应到Shader中）
		 * @param arrays 数据
		 * @param attributeLocation 属性shader位置（需要与shader中的声明Attribute一一对应）
		 */
		setVector2Array(attributeName:string,arrays:Vector2[]|Float32Array,attributeLocation:InstanceLocation):void;

		/**
		 * 设置Number材质数组属性
		 * @param attributeName 属性名称（要对应到Shader中）
		 * @param arrays 数据
		 * @param attributeLocation 属性shader位置（需要与shader中的声明Attribute一一对应）
		 */
		setNumberArray(attributeName:string,arrays:Float32Array,attributeLocation:InstanceLocation):void;

		/**
		 * 获得属性数据
		 * @param attributeLocation 属性shader位置
		 */
		getPropertyArray(attributeLocation:InstanceLocation):Vector4[]|Vector3[]|Vector2[]|Float32Array;
		clear():void;
	}

enum ShaderDataType {
    /**整数 */
    Int = 0,
    /**布尔 */
    Bool = 1,
    /**浮点数 */
    Number = 2,
    /**2维数结构 */
    Vector2 = 3,
    /**3维数结构 */
    Vector3 = 4,
    /**4维数结构 */
    Vector4 = 5,
    /**四元数 */
    Quaternion = 6,
    /**矩阵 */
    Matrix4x4 = 7,
    /**数组 */
    Buffer = 8,
    /**图片 */
    Texture = 9,
    /**宏定义 */
    ShaderDefine = 10
}

	/**
	 * <code>PostProcessEffect</code> 类用于创建后期处理渲染效果。
	 */
	class PostProcessEffect  {

		/**
		 * 创建一个 <code>PostProcessEffect</code> 实例。
		 */

		constructor();
	}

	/**
	 * * <code>PostProcessRenderContext</code> 类用于创建后期处理渲染上下文。
	 */
	class PostProcessRenderContext  {

		/**
		 * 源纹理。
		 */
		source:RenderTexture|null;

		/**
		 * 输出纹理。
		 */
		destination:RenderTexture|null;

		/**
		 * 渲染相机。
		 */
		camera:Camera|null;

		/**
		 * 合成着色器数据。
		 */
		compositeShaderData:ShaderData|null;

		/**
		 * 后期处理指令流。
		 */
		command:CommandBuffer|null;

		/**
		 * 临时纹理数组。
		 */
		deferredReleaseTextures:RenderTexture[];
	}

	/**
	 * <code>RenderContext3D</code> 类用于实现渲染状态。
	 */
	class RenderContext3D  {

		/**
		 * 渲染区宽度。
		 */
		static clientWidth:number;

		/**
		 * 渲染区高度。
		 */
		static clientHeight:number;

		/**
		 * 设置渲染管线
		 */
		configPipeLineMode:string;

		/**
		 * 创建一个 <code>RenderContext3D</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>RenderElement</code> 类用于实现渲染元素。
	 */
	class RenderElement  {

		/**
		 * 创建一个 <code>RenderElement</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>ScreenQuad</code> 类用于创建全屏四边形。
	 */
	class ScreenQuad extends Resource  {

		/**
		 * 创建一个 <code>ScreenQuad</code> 实例,禁止使用。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>ScreenTriangle</code> 类用于创建全屏三角形。
	 */
	class ScreenTriangle extends Resource  {

		/**
		 * 创建一个 <code>ScreenTriangle</code> 实例,禁止使用。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>RenderableSprite3D</code> 类用于可渲染3D精灵的父类，抽象类不允许实例。
	 */
	class RenderableSprite3D extends Sprite3D  {

		/**
		 * 精灵级着色器宏定义,接收阴影。
		 */
		static SHADERDEFINE_RECEIVE_SHADOW:ShaderDefine;

		/**
		 * 精灵级着色器宏定义,光照贴图。
		 */
		static SAHDERDEFINE_LIGHTMAP:ShaderDefine;

		/**
		 * 精灵级着色器宏定义,光照贴图方向。
		 */
		static SHADERDEFINE_LIGHTMAP_DIRECTIONAL:ShaderDefine;

		/**
		 * 着色器变量名，光照贴图缩放和偏移。
		 */
		static LIGHTMAPSCALEOFFSET:number;

		/**
		 * 着色器变量名，光照贴图。
		 */
		static LIGHTMAP:number;

		/**
		 * 着色器变量名，光照贴图方向。
		 */
		static LIGHTMAP_DIRECTION:number;

		/**
		 * 拾取颜色。
		 */
		static PICKCOLOR:number;

		/**
		 * 反射贴图
		 */
		static REFLECTIONTEXTURE:number;

		/**
		 * 反射贴图参数
		 */
		static REFLECTIONCUBE_HDR_PARAMS:number;

		/**
		 * 反射探针位置 最大最小值
		 */
		static REFLECTIONCUBE_PROBEPOSITION:number;
		static REFLECTIONCUBE_PROBEBOXMAX:number;
		static REFLECTIONCUBE_PROBEBOXMIN:number;
		pickColor:Vector4;

		/**
		 * 创建一个 <code>RenderableSprite3D</code> 实例。
		 */

		constructor(name:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActiveInScene():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * <code>BoundsOctree</code> 类用于创建八叉树。
	 */
	class BoundsOctree implements ISceneRenderManager  {

		/**
		 * 创建一个 <code>BoundsOctree</code> 实例。
		 * @param initialWorldSize 八叉树尺寸
		 * @param initialWorldPos 八叉树中心
		 * @param minNodeSize 节点最小尺寸
		 * @param loosenessVal 松散值
		 */

		constructor(initialWorldSize:number,initialWorldPos:Vector3,minNodeSize:number,looseness:number);

		/**
		 * 添加物体
		 * @param object 
		 */
		addRender(object:IOctreeObject):void;

		/**
		 * 移除物体
		 * @return 是否成功
		 */
		removeRender(object:IOctreeObject):boolean;

		/**
		 * 更新物体
		 */
		update(object:IOctreeObject):boolean;

		/**
		 * 如果可能则收缩根节点。
		 */
		shrinkRootIfPossible():void;

		/**
		 * 添加运动物体。
		 * @param 运动物体 。
		 */
		addMotionObject(object:IOctreeObject):void;

		/**
		 * 移除运动物体。
		 * @param 运动物体 。
		 */
		removeMotionObject(object:IOctreeObject):void;

		/**
		 * 裁剪更新
		 */
		preFruUpdate():void;

		/**
		 * 直射光阴影裁剪
		 */
		cullingShadow(cullInfo:ShadowCullInfo,context:RenderContext3D):void;

		/**
		 * 更新所有运动物体。
		 */
		updateMotionObjects():void;

		/**
		 * 获取是否与指定包围盒相交。
		 * @param checkBound AABB包围盒。
		 * @return 是否相交。
		 */
		isCollidingWithBoundBox(checkBounds:BoundBox):boolean;

		/**
		 * 获取是否与指定射线相交。
		 * @param ray 射线。
		 * @param maxDistance 射线的最大距离。
		 * @return 是否相交。
		 */
		isCollidingWithRay(ray:Ray,maxDistance?:number):boolean;

		/**
		 * 获取与指定包围盒相交的物体列表。
		 * @param checkBound AABB包围盒。
		 * @param result 相交物体列表
		 */
		getCollidingWithBoundBox(checkBound:BoundBox,result:any[]):void;

		/**
		 * 获取与指定射线相交的的物理列表。
		 * @param ray 射线。
		 * @param result 相交物体列表。
		 * @param maxDistance 射线的最大距离。
		 */
		getCollidingWithRay(ray:Ray,result:any[],maxDistance?:number):void;

		/**
		 * 获取与指定视锥相交的的物理列表。
		 * @param 渲染上下文 。
		 */
		getCollidingWithFrustum(cameraCullInfo:CameraCullInfo,context:RenderContext3D,shader:Shader3D,replacementTag:string,isShadowCasterCull:boolean):void;

		/**
		 * 获取最大包围盒
		 * @return 最大包围盒
		 */
		getMaxBounds():BoundBox;
		destroy():void;
	}

	/**
	 * <code>BoundsOctreeNode</code> 类用于创建八叉树节点。
	 */
	class BoundsOctreeNode implements IRenderNodeObject  {

		/**
		 * 创建一个 <code>BoundsOctreeNode</code> 实例。
		 * @param octree 所属八叉树。
		 * @param parent 父节点。
		 * @param baseLength 节点基本长度。
		 * @param center 节点的中心位置。
		 */

		constructor(octree:BoundsOctree,parent:BoundsOctreeNode,baseLength:number,center:Vector3);
		private _getCollidingWithCastShadowFrustum:any;
		getManagerNode():BoundsOctree;

		/**
		 * 添加指定物体。
		 * @param object 指定物体。
		 */
		add(object:IOctreeObject):boolean;

		/**
		 * 移除指定物体。
		 * @param obejct 指定物体。
		 * @return 是否成功。
		 */
		remove(object:IOctreeObject):boolean;

		/**
		 * 更新制定物体，
		 * @param obejct 指定物体。
		 * @return 是否成功。
		 */
		update(object:IOctreeObject):boolean;

		/**
		 * 收缩八叉树节点。
		 * -所有物体都在根节点的八分之一区域
		 * -该节点无子节点或有子节点但1/8的子节点不包含物体
		 * @param minLength 最小尺寸。
		 * @return 新的根节点。
		 */
		shrinkIfPossible(minLength:number):BoundsOctreeNode;

		/**
		 * 检查该节点和其子节点是否包含任意物体。
		 * @return 是否包含任意物体。
		 */
		hasAnyObjects():boolean;

		/**
		 * 获取与指定包围盒相交的物体列表。
		 * @param checkBound AABB包围盒。
		 * @param result 相交物体列表
		 */
		getCollidingWithBoundBox(checkBound:BoundBox,result:any[]):void;

		/**
		 * 获取与指定射线相交的的物理列表。
		 * @param ray 射线。
		 * @param result 相交物体列表。
		 * @param maxDistance 射线的最大距离。
		 */
		getCollidingWithRay(ray:Ray,result:any[],maxDistance?:number):void;

		/**
		 * 获取与指定视锥相交的的物理列表。
		 * @param ray 射线。.
		 * @param result 相交物体列表。
		 */
		getCollidingWithFrustum(cameraCullInfo:CameraCullInfo,context:RenderContext3D,customShader:Shader3D,replacementTag:string,isShadowCasterCull:boolean):void;
		getCollidingWithCastShadowFrustum(cameraCullInfo:ShadowCullInfo,contect:RenderContext3D):void;

		/**
		 * 获取是否与指定包围盒相交。
		 * @param checkBound AABB包围盒。
		 * @return 是否相交。
		 */
		isCollidingWithBoundBox(checkBound:BoundBox):boolean;

		/**
		 * 获取是否与指定射线相交。
		 * @param ray 射线。
		 * @param maxDistance 射线的最大距离。
		 * @return 是否相交。
		 */
		isCollidingWithRay(ray:Ray,maxDistance?:number):boolean;

		/**
		 * 获取包围盒。
		 */
		getBound():BoundBox;
	}

	interface IOctreeObject{

		/**
		 * 获得八叉树节点
		 */
		_getOctreeNode():IRenderNodeObject;

		/**
		 * 设置八叉树节点
		 */
		_setOctreeNode(value:IRenderNodeObject):void;

		/**
		 * 获得动态列表中的Index
		 */
		_getIndexInMotionList():number;

		/**
		 * 设置动态列表中的Index
		 */
		_setIndexInMotionList(value:number):void;

		/**
		 * 包围盒
		 */
		bounds:Bounds;
	}


	/**
	 * 光照贴图。
	 */
	class Lightmap  {

		/**
		 * 光照贴图颜色。
		 */
		lightmapColor:Texture2D;

		/**
		 * 光照贴图方向。
		 */
		lightmapDirection:Texture2D;
	}

	/**
	 * <code>OctreeMotionList</code> 类用于实现物理更新队列。
	 */
	class OctreeMotionList extends SingletonList<IOctreeObject>  {

		/**
		 * 创建一个新的 <code>OctreeMotionList</code> 实例。
		 */

		constructor();
	}

enum AmbientMode {
    /** 固定颜色。*/
    SolidColor = 0,
    /** 球谐光照, 通过天空盒生成的球谐数据。 */
    SphericalHarmonics = 1,
    /** 分别设置天空, 地平线, 地面的环境光颜色 */
    TripleColor = 2
}

	/**
	 * 用于实现3D场景。
	 */
	class Scene3D extends Sprite implements ISubmit,ICreateResource  {

		/**
		 * Hierarchy资源。
		 */
		static HIERARCHY:string;

		/**
		 * 是否开启八叉树裁剪。
		 */
		static octreeCulling:boolean;

		/**
		 * 八叉树初始化尺寸。
		 */
		static octreeInitialSize:number;

		/**
		 * 八叉树初始化中心。
		 */
		static octreeInitialCenter:Vector3;

		/**
		 * 八叉树最小尺寸。
		 */
		static octreeMinNodeSize:number;

		/**
		 * 八叉树松散值。
		 */
		static octreeLooseness:number;
		static REFLECTIONMODE_SKYBOX:number;
		static REFLECTIONMODE_CUSTOM:number;
		static SCENERENDERFLAG_RENDERQPAQUE:number;
		static SCENERENDERFLAG_SKYBOX:number;
		static SCENERENDERFLAG_RENDERTRANSPARENT:number;
		static _blitTransRT:RenderTexture;
		static _blitOffset:Vector4;
		static mainCavansViewPort:Viewport;
		static set _updateMark(value:number);
		static get _updateMark():number;

		/**
		 * 加载场景,注意:不缓存。
		 * @param url 模板地址。
		 * @param complete 完成回调。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * 当前创建精灵所属遮罩层。
		 */
		currentCreationLayer:number;

		/**
		 * 是否启用灯光。
		 */
		enableLight:boolean;

		/**
		 * 资源的URL地址。
		 */
		get url():string;
		set sceneRenderableManager(manager:ISceneRenderManager);

		/**
		 * 是否允许雾化。
		 */
		get enableFog():boolean;
		set enableFog(value:boolean);

		/**
		 * 雾化颜色。
		 */
		get fogColor():Vector3;
		set fogColor(value:Vector3);

		/**
		 * 雾化起始位置。
		 */
		get fogStart():number;
		set fogStart(value:number);

		/**
		 * 雾化范围。
		 */
		get fogRange():number;
		set fogRange(value:number);

		/**
		 * 环境光模式。
		 * 如果值为AmbientMode.SolidColor一般使用ambientColor作为环境光源，如果值为如果值为AmbientMode.SphericalHarmonics一般使用ambientSphericalHarmonics作为环境光源。
		 */
		get ambientMode():AmbientMode;
		set ambientMode(value:AmbientMode);

		/**
		 * 固定颜色环境光。
		 */
		get ambientColor():Vector3;
		set ambientColor(value:Vector3);

		/**
		 * 天空环境光颜色
		 */
		get ambientSkyColor():Vector3;

		/**
		 * 地平线环境光颜色
		 */
		get ambientEquatorColor():Vector3;

		/**
		 * 地面环境光颜色
		 */
		get ambientGroundColor():Vector3;

		/**
		 * 球谐环境光,修改后必须重新赋值。
		 */
		get ambientSphericalHarmonics():SphericalHarmonicsL2;
		set ambientSphericalHarmonics(value:SphericalHarmonicsL2);

		/**
		 * 环境球谐强度。
		 */
		get ambientSphericalHarmonicsIntensity():number;
		set ambientSphericalHarmonicsIntensity(value:number);

		/**
		 * 反射立方体纹理。
		 */
		get reflection():TextureCube;
		set reflection(value:TextureCube);

		/**
		 * 反射立方体纹理解码格式。
		 */
		get reflectionDecodingFormat():TextureDecodeFormat;
		set reflectionDecodingFormat(value:TextureDecodeFormat);

		/**
		 * 反射强度。
		 */
		get reflectionIntensity():number;
		set reflectionIntensity(value:number);

		/**
		 * 天空渲染器。
		 */
		get skyRenderer():SkyRenderer;

		/**
		 * 物理模拟器。
		 */
		get physicsSimulation():PhysicsSimulation;
		get cannonPhysicsSimulation():CannonPhysicsSimulation;

		/**
		 * 场景时钟。
		 * @override 
		 */
		get timer():Timer;
		set timer(value:Timer);

		/**
		 * 输入。
		 */
		get input():Input3D;

		/**
		 * 光照贴图数组,返回值为浅拷贝数组。
		 */
		get lightmaps():Lightmap[];
		set lightmaps(value:Lightmap[]);

		/**
		 * 创建一个 <code>Scene3D</code> 实例。
		 */

		constructor();

		/**
		 * 设置 天空， 地平线， 地面 环境光颜色
		 */
		setGradientAmbient(skyColor:Vector3,equatorColor:Vector3,groundColor:Vector3):void;

		/**
		 * @param url 路径
		 */
		_setCreateURL(url:string):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onInActive():void;
		private _removeScriptInPool:any;

		/**
		 * @inheritDoc 
		 * @override 删除资源
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 渲染入口
		 */
		renderSubmit():number;
		blitMainCanvans(source:BaseTexture,normalizeViewPort:Viewport):void;

		/**
		 * 获得渲染类型
		 */
		getRenderType():number;

		/**
		 * 删除渲染
		 */
		releaseRender():void;

		/**
		 * 设置全局渲染数据
		 * @param name 数据对应着色器名字
		 * @param shaderDataType 渲染数据类型
		 * @param value 渲染数据值
		 */
		setGlobalShaderValue(name:string,shaderDataType:ShaderDataType,value:any):void;

		/**
		 * @deprecated 
		 */
		get customReflection():TextureCube;
		set customReflection(value:TextureCube);

		/**
		 * @deprecated 
		 */
		get reflectionMode():number;
		set reflectionMode(value:number);

		/**
		 * @deprecated 设置光照贴图。
		 * @param value 光照贴图。
		 */
		setlightmaps(value:Texture2D[]):void;

		/**
		 * @deprecated 获取光照贴图浅拷贝列表。
		 * @return 获取光照贴图浅拷贝列表。
		 */
		getlightmaps():Texture2D[];
	}

	interface IRenderNodeObject{

		/**
		 * 获得管理节点
		 */
		getManagerNode():ISceneRenderManager;
	}


	interface ISceneRenderManager{

		/**
		 * 增加一个渲染节点
		 */
		addRender(object:IOctreeObject):void;

		/**
		 * 减少一个渲染节点
		 */
		removeRender(object:IOctreeObject):void;

		/**
		 * 添加运动物体。
		 */
		addMotionObject(object:IOctreeObject):void;

		/**
		 * 移除运动物体。
		 */
		removeMotionObject(object:IOctreeObject):void;

		/**
		 * 释放一个管理节点
		 */
		destroy():void;

		/**
		 * 裁剪之前的更新
		 */
		preFruUpdate():void;

		/**
		 * 直射光裁剪
		 */
		cullingShadow(cullInfo:ShadowCullInfo,context:RenderContext3D):void;

		/**
		 * 获取与指定视锥相交的的物理列表。
		 */
		getCollidingWithFrustum(cameraCullInfo:CameraCullInfo,context:RenderContext3D,shader:Shader3D,replacementTag:string,isShadowCasterCull:boolean):void;
	}

	class SimpleSkinnedMeshRenderer extends SkinnedMeshRenderer  {

		/**
		 * 创建一个 <code>SkinnedMeshRender</code> 实例。
		 */

		constructor(owner:RenderableSprite3D);

		/**
		 * 删除节点
		 */
		_destroy():void;
	}

	/**
	 * <code>SkinnedMeshSprite3D</code> 类用于创建网格。
	 */
	class SimpleSkinnedMeshSprite3D extends RenderableSprite3D  {

		/**
		 */
		static SIMPLE_SIMPLEANIMATORTEXTURE:number;
		static SIMPLE_SIMPLEANIMATORPARAMS:number;
		static SIMPLE_SIMPLEANIMATORTEXTURESIZE:number;

		/**
		 * 网格过滤器。
		 */
		get meshFilter():MeshFilter;

		/**
		 * 网格渲染器。
		 */
		get simpleSkinnedMeshRenderer():SimpleSkinnedMeshRenderer;

		/**
		 * 创建一个 <code>MeshSprite3D</code> 实例。
		 * @param mesh 网格,同时会加载网格所用默认材质。
		 * @param name 名字。
		 */

		constructor(mesh?:Mesh,name?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * <code>SkinMeshRenderer</code> 类用于蒙皮渲染器。
	 */
	class SkinnedMeshRenderer extends MeshRenderer  {

		/**
		 * 局部边界。
		 */
		get localBounds():Bounds;
		set localBounds(value:Bounds);

		/**
		 * 根节点。
		 */
		get rootBone():Sprite3D;
		set rootBone(value:Sprite3D);

		/**
		 * 用于蒙皮的骨骼。
		 */
		get bones():Sprite3D[];
		set bones(value:Sprite3D[]);

		/**
		 * 创建一个 <code>SkinnedMeshRender</code> 实例。
		 */

		constructor(owner:RenderableSprite3D);
		protected _computeSkinnedData():void;

		/**
		 * @override 包围盒。
		 */
		get bounds():Bounds;
	}

	/**
	 * <code>SkinnedMeshSprite3D</code> 类用于绑点骨骼节点精灵。
	 */
	class SkinnedMeshSprite3D extends RenderableSprite3D  {

		/**
		 * 着色器变量名，蒙皮动画。
		 */
		static BONES:number;

		/**
		 * 简单动画变量名，贴图蒙皮动画
		 */
		static SIMPLE_SIMPLEANIMATORTEXTURE:number;
		static SIMPLE_SIMPLEANIMATORPARAMS:number;
		static SIMPLE_SIMPLEANIMATORTEXTURESIZE:number;

		/**
		 * 网格过滤器。
		 */
		get meshFilter():MeshFilter;

		/**
		 * 网格渲染器。
		 */
		get skinnedMeshRenderer():SkinnedMeshRenderer;

		/**
		 * 创建一个 <code>MeshSprite3D</code> 实例。
		 * @param mesh 网格,同时会加载网格所用默认材质。
		 * @param name 名字。
		 */

		constructor(mesh?:Mesh,name?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}
	class SkinnedMeshSprite3DShaderDeclaration  {

		/**
		 * 精灵级着色器宏定义,蒙皮动画。
		 */
		static SHADERDEFINE_BONE:ShaderDefine;
		static SHADERDEFINE_SIMPLEBONE:ShaderDefine;
	}

	/**
	 * <code>Sprite3D</code> 类用于实现3D精灵。
	 */
	class Sprite3D extends Node implements ICreateResource  {

		/**
		 * Hierarchy资源。
		 */
		static HIERARCHY:string;

		/**
		 * 创建精灵的克隆实例。
		 * @param original 原始精灵。
		 * @param parent 父节点。
		 * @param worldPositionStays 是否保持自身世界变换。
		 * @param position 世界位置,worldPositionStays为false时生效。
		 * @param rotation 世界旋转,worldPositionStays为false时生效。
		 * @return 克隆实例。
		 */
		static instantiate(original:Sprite3D,parent?:Node,worldPositionStays?:boolean,position?:Vector3,rotation?:Quaternion):Sprite3D;

		/**
		 * 加载网格模板。
		 * @param url 模板地址。
		 * @param complete 完成回掉。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * 唯一标识ID。
		 */
		get id():number;

		/**
		 * 蒙版层。
		 */
		get layer():number;
		set layer(value:number);

		/**
		 * 资源的URL地址。
		 */
		get url():string;

		/**
		 * 是否为静态。
		 */
		get isStatic():boolean;

		/**
		 * 精灵变换。
		 */
		get transform():Transform3D;

		/**
		 * 创建一个 <code>Sprite3D</code> 实例。
		 * @param name 精灵名称。
		 * @param isStatic 是否为静态。
		 */

		constructor(name?:string,isStatic?:boolean);

		/**
		 */
		_setCreateURL(url:string):void;

		/**
		 * @private 
		 */
		protected _onInActiveInScene():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onAdded():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onRemoved():void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}
	class TextureMode  {

		/**
		 * 拉伸模式。
		 */
		static Stretch:number;

		/**
		 * 平铺模式。
		 */
		static Tile:number;
	}

enum TrailAlignment {
    /** 使拖尾面向摄像机。*/
    View = 0,
    /** 使拖尾的与组件的方向对齐*/
    TransformZ = 1
}

	/**
	 * <code>TrailFilter</code> 类用于创建拖尾过滤器。
	 */
	class TrailFilter  {
		static CURTIME:number;
		static LIFETIME:number;
		static WIDTHCURVE:number;
		static WIDTHCURVEKEYLENGTH:number;
		_owner:TrailSprite3D;
		_lastPosition:Vector3;
		_curtime:number;

		/**
		 * 轨迹准线。
		 */
		alignment:number;

		/**
		 * 获取淡出时间。
		 * @return 淡出时间。
		 */
		get time():number;

		/**
		 * 设置淡出时间。
		 * @param value 淡出时间。
		 */
		set time(value:number);

		/**
		 * 获取新旧顶点之间最小距离。
		 * @return 新旧顶点之间最小距离。
		 */
		get minVertexDistance():number;

		/**
		 * 设置新旧顶点之间最小距离。
		 * @param value 新旧顶点之间最小距离。
		 */
		set minVertexDistance(value:number);

		/**
		 * 获取宽度倍数。
		 * @return 宽度倍数。
		 */
		get widthMultiplier():number;

		/**
		 * 设置宽度倍数。
		 * @param value 宽度倍数。
		 */
		set widthMultiplier(value:number);

		/**
		 * 获取宽度曲线。
		 * @return 宽度曲线。
		 */
		get widthCurve():FloatKeyframe[];

		/**
		 * 设置宽度曲线。最多10个
		 * @param value 宽度曲线。
		 */
		set widthCurve(value:FloatKeyframe[]);

		/**
		 * 获取颜色梯度。
		 * @return 颜色梯度。
		 */
		get colorGradient():Gradient;

		/**
		 * 设置颜色梯度。
		 * @param value 颜色梯度。
		 */
		set colorGradient(value:Gradient);

		/**
		 * 获取纹理模式。
		 * @return 纹理模式。
		 */
		get textureMode():number;

		/**
		 * 设置纹理模式。
		 * @param value 纹理模式。
		 */
		set textureMode(value:number);

		constructor(owner:TrailSprite3D);
		clear():void;

		/**
		 * 轨迹准线_面向摄像机。
		 */
		static ALIGNMENT_VIEW:number;

		/**
		 * 轨迹准线_面向运动方向。
		 */
		static ALIGNMENT_TRANSFORM_Z:number;
	}

	/**
	 * <code>TrailGeometry</code> 类用于创建拖尾渲染单元。
	 */
	class TrailGeometry extends GeometryElement  {

		/**
		 * 轨迹准线_面向摄像机。
		 */
		static ALIGNMENT_VIEW:number;

		/**
		 * 轨迹准线_面向运动方向。
		 */
		static ALIGNMENT_TRANSFORM_Z:number;
		private tmpColor:any;

		/**
		 * @private 
		 */
		private _disappearBoundsMode:any;

		constructor(owner:TrailFilter);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_getType():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
		clear():void;
	}

	/**
	 * <code>TrailMaterial</code> 类用于实现拖尾材质。
	 */
	class TrailMaterial extends Material  {

		/**
		 * 渲染状态_透明混合。
		 */
		static RENDERMODE_ALPHABLENDED:number;

		/**
		 * 渲染状态_加色法混合。
		 */
		static RENDERMODE_ADDTIVE:number;

		/**
		 * 默认材质，禁止修改
		 */
		static defaultMaterial:TrailMaterial;
		static SHADERDEFINE_MAINTEXTURE:ShaderDefine;
		static SHADERDEFINE_ADDTIVEFOG:ShaderDefine;
		static MAINTEXTURE:number;
		static TINTCOLOR:number;
		static TILINGOFFSET:number;

		/**
		 * 设置渲染模式。
		 * @return 渲染模式。
		 */
		set renderMode(value:number);

		/**
		 * 获取颜色R分量。
		 * @return 颜色R分量。
		 */
		get colorR():number;

		/**
		 * 设置颜色R分量。
		 * @param value 颜色R分量。
		 */
		set colorR(value:number);

		/**
		 * 获取颜色G分量。
		 * @return 颜色G分量。
		 */
		get colorG():number;

		/**
		 * 设置颜色G分量。
		 * @param value 颜色G分量。
		 */
		set colorG(value:number);

		/**
		 * 获取颜色B分量。
		 * @return 颜色B分量。
		 */
		get colorB():number;

		/**
		 * 设置颜色B分量。
		 * @param value 颜色B分量。
		 */
		set colorB(value:number);

		/**
		 * 获取颜色Z分量。
		 * @return 颜色Z分量。
		 */
		get colorA():number;

		/**
		 * 设置颜色alpha分量。
		 * @param value 颜色alpha分量。
		 */
		set colorA(value:number);

		/**
		 * 获取颜色。
		 * @return 颜色。
		 */
		get color():Vector4;

		/**
		 * 设置颜色。
		 * @param value 颜色。
		 */
		set color(value:Vector4);

		/**
		 * 获取贴图。
		 * @return 贴图。
		 */
		get texture():BaseTexture;

		/**
		 * 设置贴图。
		 * @param value 贴图。
		 */
		set texture(value:BaseTexture);

		/**
		 * 获取纹理平铺和偏移X分量。
		 * @return 纹理平铺和偏移X分量。
		 */
		get tilingOffsetX():number;

		/**
		 * 获取纹理平铺和偏移X分量。
		 * @param x 纹理平铺和偏移X分量。
		 */
		set tilingOffsetX(x:number);

		/**
		 * 获取纹理平铺和偏移Y分量。
		 * @return 纹理平铺和偏移Y分量。
		 */
		get tilingOffsetY():number;

		/**
		 * 获取纹理平铺和偏移Y分量。
		 * @param y 纹理平铺和偏移Y分量。
		 */
		set tilingOffsetY(y:number);

		/**
		 * 获取纹理平铺和偏移Z分量。
		 * @return 纹理平铺和偏移Z分量。
		 */
		get tilingOffsetZ():number;

		/**
		 * 获取纹理平铺和偏移Z分量。
		 * @param z 纹理平铺和偏移Z分量。
		 */
		set tilingOffsetZ(z:number);

		/**
		 * 获取纹理平铺和偏移W分量。
		 * @return 纹理平铺和偏移W分量。
		 */
		get tilingOffsetW():number;

		/**
		 * 获取纹理平铺和偏移W分量。
		 * @param w 纹理平铺和偏移W分量。
		 */
		set tilingOffsetW(w:number);

		/**
		 * 获取纹理平铺和偏移。
		 * @return 纹理平铺和偏移。
		 */
		get tilingOffset():Vector4;

		/**
		 * 设置纹理平铺和偏移。
		 * @param value 纹理平铺和偏移。
		 */
		set tilingOffset(value:Vector4);

		constructor();

		/**
		 * @inheritdoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>TrailRenderer</code> 类用于创建拖尾渲染器。
	 */
	class TrailRenderer extends BaseRender  {

		constructor(owner:TrailSprite3D);
		protected _projectionViewWorldMatrix:Matrix4x4;
	}

	/**
	 * <code>TrailSprite3D</code> 类用于创建拖尾渲染精灵。
	 */
	class TrailSprite3D extends RenderableSprite3D  {

		/**
		 * Trail过滤器。
		 */
		get trailFilter():TrailFilter;

		/**
		 * Trail渲染器。
		 */
		get trailRenderer():TrailRenderer;

		constructor(name?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _onActive():void;

		/**
		 * <p>销毁此对象。</p>
		 * @param destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
		clear():void;
	}

	/**
	 * <code>VertexTrail</code> 类用于创建拖尾顶点结构。
	 */
	class VertexTrail implements IVertex  {
		static TRAIL_POSITION0:number;
		static TRAIL_OFFSETVECTOR:number;
		static TRAIL_TIME0:number;
		static TRAIL_TEXTURECOORDINATE0Y:number;
		static TRAIL_TEXTURECOORDINATE0X:number;
		static TRAIL_COLOR:number;
		static get vertexDeclaration1():VertexDeclaration;
		static get vertexDeclaration2():VertexDeclaration;
		get vertexDeclaration():VertexDeclaration;
	}

	/**
	 * <code>Transform3D</code> 类用于实现3D变换。
	 */
	class Transform3D extends EventDispatcher  {

		/**
		 * 所属精灵。
		 */
		get owner():Sprite3D;

		/**
		 * 世界矩阵是否需要更新。
		 */
		get worldNeedUpdate():boolean;

		/**
		 * 局部位置X轴分量。
		 */
		get localPositionX():number;
		set localPositionX(x:number);

		/**
		 * 局部位置Y轴分量。
		 */
		get localPositionY():number;
		set localPositionY(y:number);

		/**
		 * 局部位置Z轴分量。
		 */
		get localPositionZ():number;
		set localPositionZ(z:number);

		/**
		 * 局部位置。
		 */
		get localPosition():Vector3;
		set localPosition(value:Vector3);

		/**
		 * 局部旋转四元数X分量。
		 */
		get localRotationX():number;
		set localRotationX(x:number);

		/**
		 * 局部旋转四元数Y分量。
		 */
		get localRotationY():number;
		set localRotationY(y:number);

		/**
		 * 局部旋转四元数Z分量。
		 */
		get localRotationZ():number;
		set localRotationZ(z:number);

		/**
		 * 局部旋转四元数W分量。
		 */
		get localRotationW():number;
		set localRotationW(w:number);

		/**
		 * 局部旋转。
		 */
		get localRotation():Quaternion;
		set localRotation(value:Quaternion);

		/**
		 * 局部缩放X。
		 */
		get localScaleX():number;
		set localScaleX(value:number);

		/**
		 * 局部缩放Y。
		 */
		get localScaleY():number;
		set localScaleY(value:number);

		/**
		 * 局部缩放Z。
		 */
		get localScaleZ():number;
		set localScaleZ(value:number);

		/**
		 * 局部缩放。
		 */
		get localScale():Vector3;
		set localScale(value:Vector3);

		/**
		 * 局部空间的X轴欧拉角。
		 */
		get localRotationEulerX():number;
		set localRotationEulerX(value:number);

		/**
		 * 局部空间的Y轴欧拉角。
		 */
		get localRotationEulerY():number;
		set localRotationEulerY(value:number);

		/**
		 * 局部空间的Z轴欧拉角。
		 */
		get localRotationEulerZ():number;
		set localRotationEulerZ(value:number);

		/**
		 * 局部空间欧拉角。
		 */
		get localRotationEuler():Vector3;
		set localRotationEuler(value:Vector3);

		/**
		 * 局部矩阵。
		 */
		get localMatrix():Matrix4x4;
		set localMatrix(value:Matrix4x4);

		/**
		 * 世界位置。
		 */
		get position():Vector3;
		set position(value:Vector3);

		/**
		 * 世界旋转。
		 */
		get rotation():Quaternion;
		set rotation(value:Quaternion);

		/**
		 * 世界空间的旋转角度，顺序为x、y、z。
		 */
		get rotationEuler():Vector3;
		set rotationEuler(value:Vector3);

		/**
		 * 世界矩阵。
		 */
		get worldMatrix():Matrix4x4;
		set worldMatrix(value:Matrix4x4);

		/**
		 * 创建一个 <code>Transform3D</code> 实例。
		 * @param owner 所属精灵。
		 */

		constructor(owner:Sprite3D);

		/**
		 * 平移变换。
		 * @param translation 移动距离。
		 * @param isLocal 是否局部空间。
		 */
		translate(translation:Vector3,isLocal?:boolean):void;

		/**
		 * 旋转变换。
		 * @param rotations 旋转幅度。
		 * @param isLocal 是否局部空间。
		 * @param isRadian 是否弧度制。
		 */
		rotate(rotation:Vector3,isLocal?:boolean,isRadian?:boolean):void;

		/**
		 * 获取向前方向。
		 * @param forward 前方向。
		 */
		getForward(forward:Vector3):void;

		/**
		 * 获取向上方向。
		 * @param up 上方向。
		 */
		getUp(up:Vector3):void;

		/**
		 * 获取向右方向。
		 * @param 右方向 。
		 */
		getRight(right:Vector3):void;

		/**
		 * 观察目标位置。
		 * @param target 观察目标。
		 * @param up 向上向量。
		 * @param isLocal 是否局部空间。
		 */
		lookAt(target:Vector3,up:Vector3,isLocal?:boolean,isCamera?:boolean):void;

		/**
		 * 对象朝向目标
		 * @param target 
		 * @param up 
		 * @param isLocal 
		 */
		objLookat(target:Vector3,up:Vector3,isLocal?:boolean):void;

		/**
		 * 世界缩放。
		 * 某种条件下获取该值可能不正确（例如：父节点有缩放，子节点有旋转），缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示。
		 * @return 世界缩放。
		 */
		getWorldLossyScale():Vector3;

		/**
		 * 设置世界缩放。
		 * 某种条件下设置该值可能不正确（例如：父节点有缩放，子节点有旋转），缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示。
		 * @return 世界缩放。
		 */
		setWorldLossyScale(value:Vector3):void;

		/**
		 * @deprecated 
		 */
		get scale():Vector3;

		/**
		 * @deprecated 
		 */
		set scale(value:Vector3);
		localToGlobal(value:Vector3,out:Vector3):void;

		/**
		 * 转化成局部坐标
		 * @param pos 
		 * @param out 
		 */
		globalToLocal(pos:Vector3,out:Vector3):void;

		/**
		 * 转化成局部向量
		 * @param pos 
		 * @param out 
		 */
		toLocalNormal(pos:Vector3,out:Vector3):void;
		toDir(forward:Vector3,dir:Vector3):void;
		static tmpVec3:Vector3;

		/**
		 * 这是一个 glmatrix中的函数
		 * a,b都是规格化以后的向量
		 * Sets a quaternion to represent the shortest rotation from one
		 * vector to another.
		 * 
		 * Both vectors are assumed to be unit length.
		 * @param out the receiving quaternion.
		 * @param a the initial vector
		 * @param b the destination vector
		 * @returns out
		 */
		rotationTo(out:Quaternion,a:Vector3,b:Vector3):boolean;
	}

	/**
	 * <code>Vector3Keyframe</code> 类用于创建三维向量关键帧实例。
	 */
	class Vector3Keyframe extends Keyframe  {

		/**
		 * 内切线
		 */
		inTangent:Vector3;

		/**
		 * 外切线
		 */
		outTangent:Vector3;

		/**
		 * 帧数据
		 */
		value:Vector3;

		/**
		 * 内权重
		 */
		inWeight:Vector3;

		/**
		 * 外权重
		 */
		outWeight:Vector3;

		/**
		 * 权重模式
		 */
		weightedMode:Vector3;

		/**
		 * 创建一个 <code>Vector3Keyframe</code> 实例。
		 */

		constructor();

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 * @override 
		 */
		cloneTo(dest:any):void;
	}

enum DepthTextureMode {
    /**不生成深度贴图 */
    None = 0,
    /**生成深度贴图 */
    Depth = 1,
    /**生成深度+法线贴图 */
    DepthNormals = 2,
    /**是否应渲染运动矢量  TODO*/
    MotionVectors = 4
}

	/**
	 * <code>ShadowCasterPass</code> 类用于实现阴影渲染管线
	 */
	class DepthPass  {
		private static SHADOW_BIAS:any;

		constructor();

		/**
		 * 渲染深度更新
		 * @param camera 
		 * @param depthType 
		 */
		update(camera:Camera,depthType:DepthTextureMode,depthTextureFormat:RenderTextureDepthFormat):void;

		/**
		 * 渲染深度帧缓存
		 * @param context 
		 * @param depthType 
		 */
		render(context:RenderContext3D,depthType:DepthTextureMode):void;
	}

	/**
	 * camera裁剪数据
	 */
	class CameraCullInfo  {

		/**
		 * 位置
		 */
		position:Vector3;

		/**
		 * 是否遮挡剔除
		 */
		useOcclusionCulling:Boolean;

		/**
		 * 锥体包围盒
		 */
		boundFrustum:BoundFrustum;

		/**
		 * 遮挡标记
		 */
		cullingMask:number;
	}

	/**
	 * 阴影裁剪数据
	 */
	class ShadowCullInfo  {
		position:Vector3;
		cullPlanes:Plane[];
		cullSphere:BoundSphere;
		cullPlaneCount:number;
		direction:Vector3;
	}

	/**
	 * <code>IndexBuffer3D</code> 类用于创建索引缓冲。
	 */
	class IndexBuffer3D extends Buffer  {

		/**
		 * 索引类型。
		 */
		get indexType():IndexFormat;

		/**
		 * 索引类型字节数量。
		 */
		get indexTypeByteCount():number;

		/**
		 * 索引个数。
		 */
		get indexCount():number;

		/**
		 * 是否可读。
		 */
		get canRead():boolean;

		/**
		 * 创建一个 <code>IndexBuffer3D,不建议开发者使用并用IndexBuffer3D.create()代替</code> 实例。
		 * @param indexType 索引类型。
		 * @param indexCount 索引个数。
		 * @param bufferUsage IndexBuffer3D用途类型。
		 * @param canRead 是否可读。
		 */

		constructor(indexType:IndexFormat,indexCount:number,bufferUsage?:number,canRead?:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_bindForVAO():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		bind():boolean;

		/**
		 * 设置数据。
		 * @param data 索引数据。
		 * @param bufferOffset 索引缓冲中的偏移。
		 * @param dataStartIndex 索引数据的偏移。
		 * @param dataCount 索引数据的数量。
		 */
		setData(data:any,bufferOffset?:number,dataStartIndex?:number,dataCount?:number):void;

		/**
		 * 获取索引数据。
		 * @return 索引数据。
		 */
		getData():Uint16Array;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

enum IndexFormat {
    /** 8 位无符号整型索引格式。*/
    UInt8 = 0,
    /** 16 位无符号整型索引格式。*/
    UInt16 = 1,
    /** 32 位无符号整型索引格式。*/
    UInt32 = 2
}

	interface IVertex{

		/**
		 * 顶点声明
		 */
		vertexDeclaration:VertexDeclaration;
	}


	/**
	 * 二阶球谐函数。
	 */
	class SphericalHarmonicsL2  {

		/**
		 * 获取颜色通道的系数。
		 * @param i 通道索引，范围0到2。
		 * @param j 系数索引，范围0到8。
		 */
		getCoefficient(i:number,j:number):number;

		/**
		 * 设置颜色通道的系数。
		 * @param i 通道索引，范围0到2。
		 * @param j 系数索引，范围0到8。
		 */
		setCoefficient(i:number,j:number,coefficient:number):void;

		/**
		 * 设置颜色通道的系数。
		 * @param i 通道索引，范围0到2。
		 * @param coefficient0 系数0
		 * @param coefficient1 系数1
		 * @param coefficient2 系数2
		 * @param coefficient3 系数3
		 * @param coefficient4 系数4
		 * @param coefficient5 系数5
		 * @param coefficient6 系数6
		 * @param coefficient7 系数7
		 * @param coefficient8 系数8
		 */
		setCoefficients(i:number,coefficient0:number,coefficient1:number,coefficient2:number,coefficient3:number,coefficient4:number,coefficient5:number,coefficient6:number,coefficient7:number,coefficient8:number):void;

		/**
		 * 克隆
		 * @param dest 
		 */
		cloneTo(dest:SphericalHarmonicsL2):void;
	}

	/**
	 * <code>StaticBatchManager</code> 类用于静态批处理管理的父类。
	 */
	class StaticBatchManager  {

		/**
		 * 静态批处理合并，合并后子节点修改Transform属性无效，根节点staticBatchRoot可为null,如果根节点不为null，根节点可移动。
		 * 如果renderableSprite3Ds为null，合并staticBatchRoot以及其所有子节点为静态批处理，staticBatchRoot作为静态根节点。
		 * 如果renderableSprite3Ds不为null,合并renderableSprite3Ds为静态批处理，staticBatchRoot作为静态根节点。
		 * @param staticBatchRoot 静态批处理根节点。
		 * @param renderableSprite3Ds 静态批处理子节点队列。
		 */
		static combine(staticBatchRoot:Sprite3D,renderableSprite3Ds?:RenderableSprite3D[]):void;

		/**
		 * 创建一个 <code>StaticBatchManager</code> 实例。
		 */

		constructor();
	}

	/**
	 * ...
	 * @author ...
	 */
	class VertexMesh  {

		/**
		 * 顶点位置数据
		 */
		static MESH_POSITION0:number;

		/**
		 * 顶点顶点色数据
		 */
		static MESH_COLOR0:number;

		/**
		 * 顶点UV0数据
		 */
		static MESH_TEXTURECOORDINATE0:number;

		/**
		 * 顶点法线数据
		 */
		static MESH_NORMAL0:number;

		/**
		 * 顶点切线数据
		 */
		static MESH_TANGENT0:number;

		/**
		 * 顶点骨骼索引数据
		 */
		static MESH_BLENDINDICES0:number;

		/**
		 * 顶点骨骼权重数据
		 */
		static MESH_BLENDWEIGHT0:number;

		/**
		 * 顶点UV1数据
		 */
		static MESH_TEXTURECOORDINATE1:number;

		/**
		 * 顶点世界矩阵数据Row0
		 */
		static MESH_WORLDMATRIX_ROW0:number;

		/**
		 * 顶点世界矩阵数据Row1
		 */
		static MESH_WORLDMATRIX_ROW1:number;

		/**
		 * 顶点世界矩阵数据Row2
		 */
		static MESH_WORLDMATRIX_ROW2:number;

		/**
		 * 顶点世界矩阵数据Row3
		 */
		static MESH_WORLDMATRIX_ROW3:number;

		/**
		 * 简单数据动画数据
		 */
		static MESH_SIMPLEANIMATOR:number;

		/**
		 * instanceworld顶点描述
		 */
		static instanceWorldMatrixDeclaration:VertexDeclaration;

		/**
		 * instanceSimple动画数据顶点描述
		 */
		static instanceSimpleAnimatorDeclaration:VertexDeclaration;

		/**
		 * 自定义attribute instance 预留位
		 */

		/**
		 * 顶点自定义数据0
		 */
		static MESH_CUSTOME0:number;

		/**
		 * 顶点自定义数据1
		 */
		static MESH_CUSTOME1:number;

		/**
		 * 顶点自定义数据2
		 */
		static MESH_CUSTOME2:number;

		/**
		 * 顶点自定义数据3
		 */
		static MESH_CUSTOME3:number;

		/**
		 * 获取顶点声明。
		 * @param vertexFlag 顶点声明标记字符,格式为:"POSITION,NORMAL,COLOR,UV,UV1,BLENDWEIGHT,BLENDINDICES,TANGENT"。
		 * @return 顶点声明。
		 */
		static getVertexDeclaration(vertexFlag:string,compatible?:boolean):VertexDeclaration;
	}

	/**
	 * <code>VertexBuffer3D</code> 类用于创建顶点缓冲。
	 */
	class VertexBuffer3D extends Buffer  {

		/**
		 * 数据类型_Float32Array类型。
		 */
		static DATATYPE_FLOAT32ARRAY:number;

		/**
		 * 数据类型_Uint8Array类型。
		 */
		static DATATYPE_UINT8ARRAY:number;

		/**
		 * 获取顶点声明。
		 */
		get vertexDeclaration():VertexDeclaration|null;
		set vertexDeclaration(value:VertexDeclaration|null);

		/**
		 * 是否可读。
		 */
		get canRead():boolean;

		/**
		 * 创建一个 <code>VertexBuffer3D</code> 实例。
		 * @param byteLength 字节长度。
		 * @param bufferUsage VertexBuffer3D用途类型。
		 * @param canRead 是否可读。
		 */

		constructor(byteLength:number,bufferUsage:number,canRead?:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		bind():boolean;

		/**
		 * 剥离内存块存储。
		 */
		orphanStorage():void;

		/**
		 * 设置数据。
		 * @param data 顶点数据。
		 * @param bufferOffset 顶点缓冲中的偏移,以字节为单位。
		 * @param dataStartIndex 顶点数据的偏移,以字节为单位。
		 * @param dataCount 顶点数据的长度,以字节为单位。
		 */
		setData(buffer:ArrayBuffer,bufferOffset?:number,dataStartIndex?:number,dataCount?:number):void;

		/**
		 * 获取顶点数据。
		 * @return 顶点数据。
		 */
		getUint8Data():Uint8Array;

		/**
		 * @ignore 
		 */
		getFloat32Data():Float32Array|null;

		/**
		 * @ignore 
		 */
		markAsUnreadbale():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>VertexDeclaration</code> 类用于生成顶点声明。
	 */
	class VertexDeclaration  {

		/**
		 * 获取唯一标识ID(通常用于优化或识别)。
		 * @return 唯一标识ID
		 */
		get id():number;

		/**
		 * 顶点跨度，以字节为单位。
		 */
		get vertexStride():number;

		/**
		 * 顶点元素的数量。
		 */
		get vertexElementCount():number;

		/**
		 * 创建一个 <code>VertexDeclaration</code> 实例。
		 * @param vertexStride 顶点跨度。
		 * @param vertexElements 顶点元素集合。
		 */

		constructor(vertexStride:number,vertexElements:Array<VertexElement>);

		/**
		 * 通过索引获取顶点元素。
		 * @param index 索引。
		 */
		getVertexElementByIndex(index:number):VertexElement;
	}

	/**
	 * <code>VertexElement</code> 类用于创建顶点结构分配。
	 */
	class VertexElement  {

		/**
		 * 顶点偏移
		 */
		get offset():number;

		/**
		 * 顶点信息名称
		 */
		get elementFormat():string;

		/**
		 * 顶点宏标记
		 */
		get elementUsage():number;

		/**
		 * 创建顶点结构分配实例
		 * @param offset 顶点偏移
		 * @param elementFormat 顶点数据格式名称
		 * @param elementUsage 顶点宏标记
		 */

		constructor(offset:number,elementFormat:string,elementUsage:number);
	}

	/**
	 * 类用来定义顶点元素格式
	 */
	class VertexElementFormat  {

		/**
		 * 单精度浮点数
		 */
		static Single:string;

		/**
		 * vec2 数据
		 */
		static Vector2:string;

		/**
		 * vec3 数据
		 */
		static Vector3:string;

		/**
		 * vec4 数据
		 */
		static Vector4:string;

		/**
		 * 颜色
		 */
		static Color:string;

		/**
		 * 字节数组4
		 */
		static Byte4:string;

		/**
		 * 字节数组3
		 */
		static Byte3:string;

		/**
		 * 字节数组2
		 */
		static Byte2:string;

		/**
		 * 字节数组1
		 */
		static ByteOne:string;

		/**
		 * 半精度浮点数数组2
		 */
		static Short2:string;

		/**
		 * 半精度浮点数数组4
		 */
		static Short4:string;

		/**
		 * 归一化半精度浮点数组2
		 */
		static NormalizedShort2:string;

		/**
		 * 归一化半精度浮点数组4
		 */
		static NormalizedShort4:string;

		/**
		 * 获取顶点元素格式信息。
		 * @param element 元素名称
		 * @returns 返回顶点元素信息
		 */
		static getElementInfos(element:string):any[];
	}

	/**
	 * <code>Input3D</code> 类用于实现3D输入。
	 */
	class Input3D  {

		/**
		 * 获取触摸点个数。
		 * @return 触摸点个数。
		 */
		touchCount():number;

		/**
		 * 获取是否可以使用多点触摸。
		 * @return 是否可以使用多点触摸。
		 */
		get multiTouchEnabled():boolean;

		/**
		 * 设置是否可以使用多点触摸。
		 * @param 是否可以使用多点触摸 。
		 */
		set multiTouchEnabled(value:boolean);

		/**
		 * 获取触摸点。
		 * @param index 索引。
		 * @return 触摸点。
		 */
		getTouch(index:number):Touch;
	}

	/**
	 * <code>BoundBox</code> 类用于创建包围盒。
	 */
	class BoundBox implements IClone  {

		/**
		 * 最小顶点。
		 */
		min:Vector3;

		/**
		 * 最大顶点。
		 */
		max:Vector3;

		/**
		 * 创建一个 <code>BoundBox</code> 实例。
		 * @param min 包围盒的最小顶点。
		 * @param max 包围盒的最大顶点。
		 */

		constructor(min:Vector3,max:Vector3);

		/**
		 * 获取包围盒的8个角顶点。
		 * @param corners 返回顶点的输出队列。
		 */
		getCorners(corners:Vector3[]):void;

		/**
		 * 获取中心点。
		 * @param out 
		 */
		getCenter(out:Vector3):void;

		/**
		 * 获取范围。
		 * @param out 
		 */
		getExtent(out:Vector3):void;

		/**
		 * 设置中心点和范围。
		 * @param center 
		 */
		setCenterAndExtent(center:Vector3,extent:Vector3):void;
		toDefault():void;

		/**
		 * 从顶点生成包围盒。
		 * @param points 所需顶点队列。
		 * @param out 生成的包围盒。
		 */
		static createfromPoints(points:Vector3[],out:BoundBox):void;

		/**
		 * 合并两个包围盒。
		 * @param box1 包围盒1。
		 * @param box2 包围盒2。
		 * @param out 生成的包围盒。
		 */
		static merge(box1:BoundBox,box2:BoundBox,out:BoundBox):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>BoundFrustum</code> 类用于创建锥截体。
	 */
	class BoundFrustum  {

		/**
		 * 根据矩阵获取6个包围平面。
		 * @param m 描述矩阵。
		 * @param np 近平面。
		 * @param fp 远平面。
		 * @param lp 左平面。
		 * @param rp 右平面。
		 * @param tp 顶平面。
		 * @param bp 底平面。
		 */
		static getPlanesFromMatrix(m:Matrix4x4,np:Plane,fp:Plane,lp:Plane,rp:Plane,tp:Plane,bp:Plane):void;

		/**
		 * 创建一个 <code>BoundFrustum</code> 实例。
		 * @param matrix 锥截体的描述4x4矩阵。
		 */

		constructor(matrix:Matrix4x4);

		/**
		 * 描述矩阵。
		 */
		get matrix():Matrix4x4;
		set matrix(matrix:Matrix4x4);

		/**
		 * 近平面。
		 */
		get near():Plane;

		/**
		 * 远平面。
		 */
		get far():Plane;

		/**
		 * 左平面。
		 */
		get left():Plane;

		/**
		 * 右平面。
		 */
		get right():Plane;

		/**
		 * 顶平面。
		 */
		get top():Plane;

		/**
		 * 底平面。
		 */
		get bottom():Plane;

		/**
		 * 判断是否与其他锥截体相等。
		 * @param other 锥截体。
		 */
		equalsBoundFrustum(other:BoundFrustum):boolean;

		/**
		 * 判断是否与其他对象相等。
		 * @param obj 对象。
		 */
		equalsObj(obj:any):boolean;

		/**
		 * 获取锥截体的任意一平面。
		 * 0:近平面
		 * 1:远平面
		 * 2:左平面
		 * 3:右平面
		 * 4:顶平面
		 * 5:底平面
		 * @param index 索引。
		 */
		getPlane(index:number):Plane;

		/**
		 * 锥截体三个相交平面的交点。
		 * @param p1 平面1。
		 * @param p2 平面2。
		 * @param p3 平面3。
		 */
		static get3PlaneInterPoint(p1:Plane,p2:Plane,p3:Plane,out:Vector3):void;

		/**
		 * 锥截体的8个顶点。
		 * @param corners 返回顶点的输出队列。
		 */
		getCorners(corners:Vector3[]):void;

		/**
		 * 与点的关系。
		 * @param point 点。
		 * @returns 包涵:1,相交:2,不相交:0
		 */
		containsPoint(point:Vector3):number;

		/**
		 * 是否与包围盒交叉。
		 * @param box 包围盒。
		 * @returns boolean 是否相交
		 */
		intersects(box:BoundBox):boolean;

		/**
		 * 与包围盒的位置关系。
		 * @param box 包围盒。
		 * @returns 包涵:1,相交:2,不相交:0
		 */
		containsBoundBox(box:BoundBox):number;

		/**
		 * 与包围球的位置关系
		 * @param sphere 包围球。
		 * @returns 包涵:1,相交:2,不相交:0
		 */
		containsBoundSphere(sphere:BoundSphere):number;
	}

	/**
	 * <code>BoundSphere</code> 类用于创建包围球。
	 */
	class BoundSphere implements IClone  {
		private static _tempVector3:any;

		/**
		 * 包围球的中心。
		 */
		center:Vector3;

		/**
		 * 包围球的半径。
		 */
		radius:number;

		/**
		 * 创建一个 <code>BoundSphere</code> 实例。
		 * @param center 包围球的中心。
		 * @param radius 包围球的半径。
		 */

		constructor(center:Vector3,radius:number);
		toDefault():void;

		/**
		 * 从顶点的子队列生成包围球。
		 * @param points 顶点的队列。
		 * @param start 顶点子队列的起始偏移。
		 * @param count 顶点子队列的顶点数。
		 * @param result 生成的包围球。
		 */
		static createFromSubPoints(points:Vector3[],start:number,count:number,out:BoundSphere):void;

		/**
		 * 从顶点队列生成包围球。
		 * @param points 顶点的队列。
		 * @param result 生成的包围球。
		 */
		static createfromPoints(points:Vector3[],out:BoundSphere):void;

		/**
		 * 判断射线是否与碰撞球交叉，并返回交叉距离。
		 * @param ray 射线。
		 * @return 距离交叉点的距离，-1表示不交叉。
		 */
		intersectsRayDistance(ray:Ray):number;

		/**
		 * 判断射线是否与碰撞球交叉，并返回交叉点。
		 * @param ray 射线。
		 * @param outPoint 交叉点。
		 * @return 距离交叉点的距离，-1表示不交叉。
		 */
		intersectsRayPoint(ray:Ray,outPoint:Vector3):number;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>Collision</code> 类用于检测碰撞。
	 */
	class CollisionUtils  {

		/**
		 * 创建一个 <code>Collision</code> 实例。
		 */

		constructor();

		/**
		 * 空间中点到平面的距离
		 * @param plane 平面
		 * @param point 点
		 */
		static distancePlaneToPoint(plane:Plane,point:Vector3):number;

		/**
		 * 空间中点到包围盒的距离
		 * @param box 包围盒
		 * @param point 点
		 */
		static distanceBoxToPoint(box:BoundBox,point:Vector3):number;

		/**
		 * 空间中包围盒到包围盒的距离
		 * @param box1 包围盒1
		 * @param box2 包围盒2
		 */
		static distanceBoxToBox(box1:BoundBox,box2:BoundBox):number;

		/**
		 * 空间中点到包围球的距离
		 * @param sphere 包围球
		 * @param point 点
		 */
		static distanceSphereToPoint(sphere:BoundSphere,point:Vector3):number;

		/**
		 * 空间中包围球到包围球的距离
		 * @param sphere1 包围球1
		 * @param sphere2 包围球2
		 */
		static distanceSphereToSphere(sphere1:BoundSphere,sphere2:BoundSphere):number;

		/**
		 * 空间中射线和三角面是否相交,输出距离
		 * @param ray 射线
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @param out 点和三角面的距离
		 * @return 是否相交
		 */
		static intersectsRayAndTriangleRD(ray:Ray,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3,out:number):boolean;

		/**
		 * 空间中射线和三角面是否相交,输出相交点
		 * @param ray 射线
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @param out 相交点
		 * @return 是否相交
		 */
		static intersectsRayAndTriangleRP(ray:Ray,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3,out:Vector3):boolean;

		/**
		 * 空间中射线和点是否相交
		 * @param sphere1 包围球1
		 * @param sphere2 包围球2
		 */
		static intersectsRayAndPoint(ray:Ray,point:Vector3):boolean;

		/**
		 * 空间中射线和射线是否相交
		 * @param ray1 射线1
		 * @param ray2 射线2
		 * @param out 相交点
		 */
		static intersectsRayAndRay(ray1:Ray,ray2:Ray,out:Vector3):boolean;

		/**
		 * 空间中平面和三角面是否相交
		 * @param plane 平面
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @return 返回空间位置关系
		 */
		static intersectsPlaneAndTriangle(plane:Plane,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3):number;

		/**
		 * 射线和平面是否相交,并返回相交距离。
		 * @param ray 射线。
		 * @param plane 平面。
		 * @return 相交距离,-1为不相交。
		 */
		static intersectsRayAndPlaneRD(ray:Ray,plane:Plane):number;

		/**
		 * 空间中射线和平面是否相交，并返回相交点。
		 * @param ray 射线。
		 * @param plane 平面。
		 * @param out 相交点。
		 */
		static intersectsRayAndPlaneRP(ray:Ray,plane:Plane,out:Vector3):boolean;

		/**
		 * 空间中射线和包围盒是否相交
		 * @param ray 射线
		 * @param box 包围盒
		 * @param out 相交距离,如果为0,不相交
		 */
		static intersectsRayAndBoxRD(ray:Ray,box:BoundBox):number;

		/**
		 * 空间中射线和包围盒是否相交
		 * @param ray 射线
		 * @param box 包围盒
		 * @param out 相交点
		 */
		static intersectsRayAndBoxRP(ray:Ray,box:BoundBox,out:Vector3):number;

		/**
		 * 空间中射线和包围球是否相交
		 * @param ray 射线
		 * @param sphere 包围球
		 * @return 相交距离,-1表示不相交
		 */
		static intersectsRayAndSphereRD(ray:Ray,sphere:BoundSphere):number;

		/**
		 * 空间中射线和包围球是否相交
		 * @param ray 射线
		 * @param sphere 包围球
		 * @param out 相交点
		 * @return 相交距离,-1表示不相交
		 */
		static intersectsRayAndSphereRP(ray:Ray,sphere:BoundSphere,out:Vector3):number;

		/**
		 * 空间中包围球和三角面是否相交
		 * @param sphere 包围球
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @return 返回是否相交
		 */
		static intersectsSphereAndTriangle(sphere:BoundSphere,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3):boolean;

		/**
		 * 空间中点和平面是否相交
		 * @param plane 平面
		 * @param point 点
		 * @return 碰撞状态
		 */
		static intersectsPlaneAndPoint(plane:Plane,point:Vector3):number;

		/**
		 * 空间中平面和平面是否相交
		 * @param plane1 平面1
		 * @param plane2 平面2
		 * @return 是否相交
		 */
		static intersectsPlaneAndPlane(plane1:Plane,plane2:Plane):boolean;

		/**
		 * 空间中平面和平面是否相交
		 * @param plane1 平面1
		 * @param plane2 平面2
		 * @param line 相交线
		 * @return 是否相交
		 */
		static intersectsPlaneAndPlaneRL(plane1:Plane,plane2:Plane,line:Ray):boolean;

		/**
		 * 空间中平面和包围盒是否相交
		 * @param plane 平面
		 * @param box 包围盒
		 * @return 碰撞状态
		 */
		static intersectsPlaneAndBox(plane:Plane,box:BoundBox):number;

		/**
		 * 空间中平面和包围球是否相交
		 * @param plane 平面
		 * @param sphere 包围球
		 * @return 碰撞状态
		 */
		static intersectsPlaneAndSphere(plane:Plane,sphere:BoundSphere):number;

		/**
		 * 空间中包围盒和包围盒是否相交
		 * @param box1 包围盒1
		 * @param box2 包围盒2
		 * @return 是否相交
		 */
		static intersectsBoxAndBox(box1:BoundBox,box2:BoundBox):boolean;

		/**
		 * 空间中包围盒和包围球是否相交
		 * @param box 包围盒
		 * @param sphere 包围球
		 * @return 是否相交
		 */
		static intersectsBoxAndSphere(box:BoundBox,sphere:BoundSphere):boolean;

		/**
		 * 空间中包围球和包围球是否相交
		 * @param sphere1 包围球1
		 * @param sphere2 包围球2
		 * @return 是否相交
		 */
		static intersectsSphereAndSphere(sphere1:BoundSphere,sphere2:BoundSphere):boolean;

		/**
		 * 空间中包围盒是否包含另一个点
		 * @param box 包围盒
		 * @param point 点
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static boxContainsPoint(box:BoundBox,point:Vector3):number;

		/**
		 * 空间中包围盒是否包含另一个包围盒
		 * @param box1 包围盒1
		 * @param box2 包围盒2
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static boxContainsBox(box1:BoundBox,box2:BoundBox):number;

		/**
		 * 空间中包围盒是否包含另一个包围球
		 * @param box 包围盒
		 * @param sphere 包围球
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static boxContainsSphere(box:BoundBox,sphere:BoundSphere):number;

		/**
		 * 空间中包围球是否包含另一个点
		 * @param sphere 包围球
		 * @param point 点
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static sphereContainsPoint(sphere:BoundSphere,point:Vector3):number;

		/**
		 * 空间中包围球是否包含另一个三角面
		 * @param sphere 
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @return 返回空间位置关系
		 */
		static sphereContainsTriangle(sphere:BoundSphere,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3):number;

		/**
		 * 空间中包围球是否包含另一包围盒
		 * @param sphere 包围球
		 * @param box 包围盒
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static sphereContainsBox(sphere:BoundSphere,box:BoundBox):number;

		/**
		 * 空间中包围球是否包含另一包围球
		 * @param sphere1 包围球
		 * @param sphere2 包围球
		 * @return 位置关系:0 不想交,1 包含, 2 相交
		 */
		static sphereContainsSphere(sphere1:BoundSphere,sphere2:BoundSphere):number;

		/**
		 * 空间中点与三角面的最近点
		 * @param point 点
		 * @param vertex1 三角面顶点1
		 * @param vertex2 三角面顶点2
		 * @param vertex3 三角面顶点3
		 * @param out 最近点
		 */
		static closestPointPointTriangle(point:Vector3,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3,out:Vector3):void;

		/**
		 * 空间中平面与一点的最近点
		 * @param plane 平面
		 * @param point 点
		 * @param out 最近点
		 */
		static closestPointPlanePoint(plane:Plane,point:Vector3,out:Vector3):void;

		/**
		 * 空间中包围盒与一点的最近点
		 * @param box 包围盒
		 * @param point 点
		 * @param out 最近点
		 */
		static closestPointBoxPoint(box:BoundBox,point:Vector3,out:Vector3):void;

		/**
		 * 空间中包围球与一点的最近点
		 * @param sphere 包围球
		 * @param point 点
		 * @param out 最近点
		 */
		static closestPointSpherePoint(sphere:BoundSphere,point:Vector3,out:Vector3):void;

		/**
		 * 空间中包围球与包围球的最近点
		 * @param sphere1 包围球1
		 * @param sphere2 包围球2
		 * @param out 最近点
		 */
		static closestPointSphereSphere(sphere1:BoundSphere,sphere2:BoundSphere,out:Vector3):void;
	}

	/**
	 * <code>Color</code> 类用于创建颜色实例。
	 */
	class Color implements IClone  {

		/**
		 * 红色
		 */
		static RED:Color;

		/**
		 * 绿色
		 */
		static GREEN:Color;

		/**
		 * 蓝色
		 */
		static BLUE:Color;

		/**
		 * 蓝绿色
		 */
		static CYAN:Color;

		/**
		 * 黄色
		 */
		static YELLOW:Color;

		/**
		 * 品红色
		 */
		static MAGENTA:Color;

		/**
		 * 灰色
		 */
		static GRAY:Color;

		/**
		 * 白色
		 */
		static WHITE:Color;

		/**
		 * 黑色
		 */
		static BLACK:Color;

		/**
		 * Gamma空间值转换到线性空间。
		 * @param value gamma空间值。
		 */
		static gammaToLinearSpace(value:number):number;

		/**
		 * 线性空间值转换到Gamma空间。
		 * @param value 线性空间值。
		 */
		static linearToGammaSpace(value:number):number;

		/**
		 * red分量
		 */
		r:number;

		/**
		 * green分量
		 */
		g:number;

		/**
		 * blue分量
		 */
		b:number;

		/**
		 * alpha分量
		 */
		a:number;

		/**
		 * 创建一个 <code>Color</code> 实例。
		 * @param r 颜色的red分量。
		 * @param g 颜色的green分量。
		 * @param b 颜色的blue分量。
		 * @param a 颜色的alpha分量。
		 */

		constructor(r?:number,g?:number,b?:number,a?:number);

		/**
		 * Gamma空间转换到线性空间。
		 * @param linear 线性空间颜色。
		 */
		toLinear(out:Color):void;

		/**
		 * 线性空间转换到Gamma空间。
		 * @param gamma Gamma空间颜色。
		 */
		toGamma(out:Color):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		forNativeElement():void;
	}

	/**
	 * <code>ContainmentType</code> 类用于定义空间物体位置关系。
	 */
	class ContainmentType  {

		/**
		 * 不相交
		 */
		static Disjoint:number;

		/**
		 * 包含
		 */
		static Contains:number;

		/**
		 * 相交
		 */
		static Intersects:number;
	}

	/**
	 * <code>MathUtils3D</code> 类用于创建数学工具。
	 */
	class MathUtils3D  {

		/**
		 * 单精度浮点(float)零的容差
		 */
		static zeroTolerance:number;

		/**
		 * 浮点数默认最大值
		 */
		static MaxValue:number;

		/**
		 * 浮点数默认最小值
		 */
		static MinValue:number;

		/**
		 * 角度转弧度系数
		 */
		static Deg2Rad:number;

		/**
		 * 创建一个 <code>MathUtils</code> 实例。
		 */

		constructor();

		/**
		 * 是否在容差的范围内近似于0
		 * @param 判断值 
		 * @return 是否近似于0
		 */
		static isZero(v:number):boolean;

		/**
		 * 两个值是否在容差的范围内近似相等Sqr Magnitude
		 * @param 判断值 
		 * @return 是否近似于0
		 */
		static nearEqual(n1:number,n2:number):boolean;
		static fastInvSqrt(value:number):number;
	}

	/**
	 * <code>Matrix3x3</code> 类用于创建3x3矩阵。
	 */
	class Matrix3x3 implements IClone  {

		/**
		 * 默认矩阵,禁止修改
		 */
		static DEFAULT:Matrix3x3;

		/**
		 * 通过四元数创建旋转矩阵。
		 * @param rotation 旋转四元数。
		 * @param out 旋转矩阵。
		 */
		static createRotationQuaternion(rotation:Quaternion,out:Matrix3x3):void;

		/**
		 * 根据指定平移生成3x3矩阵
		 * @param tra 平移
		 * @param out 输出矩阵
		 */
		static createFromTranslation(trans:Vector2,out:Matrix3x3):void;

		/**
		 * 根据指定旋转生成3x3矩阵
		 * @param rad 旋转值
		 * @param out 输出矩阵
		 */
		static createFromRotation(rad:number,out:Matrix3x3):void;

		/**
		 * 根据制定缩放生成3x3矩阵
		 * @param scale 缩放值
		 * @param out 输出矩阵
		 */
		static createFromScaling(scale:Vector3,out:Matrix3x3):void;

		/**
		 * 从4x4矩阵转换为一个3x3的矩阵（原则为upper-left,忽略第四行四列）
		 * @param sou 4x4源矩阵
		 * @param out 3x3输出矩阵
		 */
		static createFromMatrix4x4(sou:Matrix4x4,out:Matrix3x3):void;

		/**
		 * 两个3x3矩阵的相乘
		 * @param left 左矩阵
		 * @param right 右矩阵
		 * @param out 输出矩阵
		 */
		static multiply(left:Matrix3x3,right:Matrix3x3,out:Matrix3x3):void;

		/**
		 * 矩阵元素数组
		 */
		elements:Float32Array;

		/**
		 * 创建一个 <code>Matrix3x3</code> 实例。
		 */

		constructor();

		/**
		 * 计算3x3矩阵的行列式
		 * @return 矩阵的行列式
		 */
		determinant():number;

		/**
		 * 通过一个二维向量转换3x3矩阵
		 * @param tra 转换向量
		 * @param out 输出矩阵
		 */
		translate(trans:Vector2,out:Matrix3x3):void;

		/**
		 * 根据指定角度旋转3x3矩阵
		 * @param rad 旋转角度
		 * @param out 输出矩阵
		 */
		rotate(rad:number,out:Matrix3x3):void;

		/**
		 * 根据制定缩放3x3矩阵
		 * @param scale 缩放值
		 * @param out 输出矩阵
		 */
		scale(scale:Vector2,out:Matrix3x3):void;

		/**
		 * 计算3x3矩阵的逆矩阵
		 * @param out 输出的逆矩阵
		 */
		invert(out:Matrix3x3):void;

		/**
		 * 计算3x3矩阵的转置矩阵
		 * @param out 输出矩阵
		 */
		transpose(out:Matrix3x3):void;

		/**
		 * 设置已有的矩阵为单位矩阵
		 */
		identity():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 计算观察3x3矩阵
		 * @param eye 观察者位置
		 * @param target 目标位置
		 * @param up 上向量
		 * @param out 输出3x3矩阵
		 */
		static lookAt(eye:Vector3,target:Vector3,up:Vector3,out:Matrix3x3):void;
	}

	/**
	 * <code>Matrix4x4</code> 类用于创建4x4矩阵。
	 */
	class Matrix4x4 implements IClone  {

		/**
		 * 默认矩阵,禁止修改
		 */
		static DEFAULT:Matrix4x4;

		/**
		 * 默认矩阵,禁止修改
		 */
		static ZERO:Matrix4x4;

		/**
		 * 绕X轴旋转
		 * @param rad 旋转角度
		 * @param out 输出矩阵
		 */
		static createRotationX(rad:number,out:Matrix4x4):void;

		/**
		 * 绕Y轴旋转
		 * @param rad 旋转角度
		 * @param out 输出矩阵
		 */
		static createRotationY(rad:number,out:Matrix4x4):void;

		/**
		 * 绕Z轴旋转
		 * @param rad 旋转角度
		 * @param out 输出矩阵
		 */
		static createRotationZ(rad:number,out:Matrix4x4):void;

		/**
		 * 通过yaw pitch roll旋转创建旋转矩阵。
		 * @param yaw 
		 * @param pitch 
		 * @param roll 
		 * @param result 
		 */
		static createRotationYawPitchRoll(yaw:number,pitch:number,roll:number,result:Matrix4x4):void;

		/**
		 * 通过旋转轴axis和旋转角度angle计算旋转矩阵。
		 * @param axis 旋转轴,假定已经归一化。
		 * @param angle 旋转角度。
		 * @param result 结果矩阵。
		 */
		static createRotationAxis(axis:Vector3,angle:number,result:Matrix4x4):void;
		setRotation(rotation:Quaternion):void;
		setPosition(position:Vector3):void;

		/**
		 * 通过四元数创建旋转矩阵。
		 * @param rotation 旋转四元数。
		 * @param result 输出旋转矩阵
		 */
		static createRotationQuaternion(rotation:Quaternion,result:Matrix4x4):void;

		/**
		 * 根据平移计算输出矩阵
		 * @param trans 平移向量
		 * @param out 输出矩阵
		 */
		static createTranslate(trans:Vector3,out:Matrix4x4):void;

		/**
		 * 根据缩放计算输出矩阵
		 * @param scale 缩放值
		 * @param out 输出矩阵
		 */
		static createScaling(scale:Vector3,out:Matrix4x4):void;

		/**
		 * 计算两个矩阵的乘法
		 * @param left left矩阵
		 * @param right right矩阵
		 * @param out 输出矩阵
		 */
		static multiply(left:Matrix4x4,right:Matrix4x4,out:Matrix4x4):void;
		static multiplyForNative(left:Matrix4x4,right:Matrix4x4,out:Matrix4x4):void;

		/**
		 * 从四元数计算旋转矩阵
		 * @param rotation 四元数
		 * @param out 输出矩阵
		 */
		static createFromQuaternion(rotation:Quaternion,out:Matrix4x4):void;

		/**
		 * 计算仿射矩阵
		 * @param trans 平移
		 * @param rot 旋转
		 * @param scale 缩放
		 * @param out 输出矩阵
		 */
		static createAffineTransformation(trans:Vector3,rot:Quaternion,scale:Vector3,out:Matrix4x4):void;

		/**
		 * 计算观察矩阵
		 * @param eye 视点位置
		 * @param target 视点目标
		 * @param up 向上向量
		 * @param out 输出矩阵
		 */
		static createLookAt(eye:Vector3,target:Vector3,up:Vector3,out:Matrix4x4):void;

		/**
		 * 通过FOV创建透视投影矩阵。
		 * @param fov 视角。
		 * @param aspect 横纵比。
		 * @param near 近裁面。
		 * @param far 远裁面。
		 * @param out 输出矩阵。
		 */
		static createPerspective(fov:number,aspect:number,znear:number,zfar:number,out:Matrix4x4):void;

		/**
		 * 创建透视投影矩阵。
		 * @param left 视椎左边界。
		 * @param right 视椎右边界。
		 * @param bottom 视椎底边界。
		 * @param top 视椎顶边界。
		 * @param znear 视椎近边界。
		 * @param zfar 视椎远边界。
		 * @param out 输出矩阵。
		 */
		static createPerspectiveOffCenter(left:number,right:number,bottom:number,top:number,znear:number,zfar:number,out:Matrix4x4):void;

		/**
		 * 计算正交投影矩阵。
		 * @param left 视椎左边界。
		 * @param right 视椎右边界。
		 * @param bottom 视椎底边界。
		 * @param top 视椎顶边界。
		 * @param near 视椎近边界。
		 * @param far 视椎远边界。
		 * @param out 输出矩阵。
		 */
		static createOrthoOffCenter(left:number,right:number,bottom:number,top:number,znear:number,zfar:number,out:Matrix4x4):void;

		/**
		 * 矩阵元素数组
		 */
		elements:Float32Array;

		/**
		 * 创建一个 <code>Matrix4x4</code> 实例。
		 * @param  4x4矩阵的各元素
		 */

		constructor(m11?:number,m12?:number,m13?:number,m14?:number,m21?:number,m22?:number,m23?:number,m24?:number,m31?:number,m32?:number,m33?:number,m34?:number,m41?:number,m42?:number,m43?:number,m44?:number,elements?:Float32Array);
		getElementByRowColumn(row:number,column:number):number;
		setElementByRowColumn(row:number,column:number,value:number):void;

		/**
		 * 判断两个4x4矩阵的值是否相等。
		 * @param other 4x4矩阵
		 */
		equalsOtherMatrix(other:Matrix4x4):boolean;

		/**
		 * 分解矩阵为平移向量、旋转四元数、缩放向量。
		 * @param translation 平移向量。
		 * @param rotation 旋转四元数。
		 * @param scale 缩放向量。
		 * @return 是否分解成功。
		 */
		decomposeTransRotScale(translation:Vector3,rotation:Quaternion,scale:Vector3):boolean;

		/**
		 * 分解矩阵为平移向量、旋转矩阵、缩放向量。
		 * @param translation 平移向量。
		 * @param rotationMatrix 旋转矩阵。
		 * @param scale 缩放向量。
		 * @return 是否分解成功。
		 */
		decomposeTransRotMatScale(translation:Vector3,rotationMatrix:Matrix4x4,scale:Vector3):boolean;

		/**
		 * 分解旋转矩阵的旋转为YawPitchRoll欧拉角。
		 * @param out float yaw
		 * @param out float pitch
		 * @param out float roll
		 * @return 
		 */
		decomposeYawPitchRoll(yawPitchRoll:Vector3):void;

		/**
		 * 归一化矩阵
		 */
		normalize():void;

		/**
		 * 计算矩阵的转置矩阵
		 */
		transpose():Matrix4x4;

		/**
		 * 计算一个矩阵的逆矩阵
		 * @param out 输出矩阵
		 */
		invert(out:Matrix4x4):void;

		/**
		 * 计算BlillBoard矩阵
		 * @param objectPosition 物体位置
		 * @param cameraPosition 相机位置
		 * @param cameraUp 相机上向量
		 * @param cameraForward 相机前向量
		 * @param mat 变换矩阵
		 */
		static billboard(objectPosition:Vector3,cameraPosition:Vector3,cameraUp:Vector3,cameraForward:Vector3,mat:Matrix4x4):void;

		/**
		 * 设置矩阵为单位矩阵
		 */
		identity():void;

		/**
		 * 判断是否是单位矩阵
		 */
		isIdentity():boolean;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;
		cloneByArray(destObject:Float32Array):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		static translation(v3:Vector3,out:Matrix4x4):void;

		/**
		 * 获取平移向量。
		 * @param out 平移向量。
		 */
		getTranslationVector(out:Vector3):void;

		/**
		 * 设置平移向量。
		 * @param translate 平移向量。
		 */
		setTranslationVector(translate:Vector3):void;

		/**
		 * 获取前向量。
		 * @param out 前向量。
		 */
		getForward(out:Vector3):void;

		/**
		 * 设置前向量。
		 * @param forward 前向量。
		 */
		setForward(forward:Vector3):void;

		/**
		 * 判断此矩阵是否是反向矩阵
		 */
		getInvertFront():boolean;
	}

	/**
	 * <code>Quaternion</code> 类用于创建四元数。
	 */
	class ConchQuaternion implements IClone  {

		/**
		 * 默认矩阵,禁止修改
		 */
		static DEFAULT:ConchQuaternion;

		/**
		 * 无效矩阵,禁止修改
		 */
		static NAN:ConchQuaternion;

		/**
		 * 从欧拉角生成四元数（顺序为Yaw、Pitch、Roll）
		 * @param yaw yaw值
		 * @param pitch pitch值
		 * @param roll roll值
		 * @param out 输出四元数
		 */
		static createFromYawPitchRoll(yaw:number,pitch:number,roll:number,out:ConchQuaternion):void;

		/**
		 * 计算两个四元数相乘
		 * @param left left四元数
		 * @param right right四元数
		 * @param out 输出四元数
		 */
		static multiply(left:ConchQuaternion,right:ConchQuaternion,out:ConchQuaternion):void;
		private static arcTanAngle:any;
		private static angleTo:any;

		/**
		 * 从指定的轴和角度计算四元数
		 * @param axis 轴
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		static createFromAxisAngle(axis:ConchVector3,rad:number,out:ConchQuaternion):void;

		/**
		 * 根据3x3矩阵计算四元数
		 * @param sou 源矩阵
		 * @param out 输出四元数
		 */
		static createFromMatrix3x3(sou:Matrix3x3,out:ConchQuaternion):void;

		/**
		 * 从旋转矩阵计算四元数
		 * @param mat 旋转矩阵
		 * @param out 输出四元数
		 */
		static createFromMatrix4x4(mat:Matrix4x4,out:ConchQuaternion):void;

		/**
		 * 球面插值
		 * @param left left四元数
		 * @param right right四元数
		 * @param a 插值比例
		 * @param out 输出四元数
		 * @return 输出Float32Array
		 */
		static slerp(left:ConchQuaternion,right:ConchQuaternion,t:number,out:ConchQuaternion):Float32Array;

		/**
		 * 计算两个四元数的线性插值
		 * @param left left四元数
		 * @param right right四元数b
		 * @param t 插值比例
		 * @param out 输出四元数
		 */
		static lerp(left:ConchQuaternion,right:ConchQuaternion,amount:number,out:ConchQuaternion):void;

		/**
		 * 计算两个四元数的和
		 * @param left left四元数
		 * @param right right 四元数
		 * @param out 输出四元数
		 */
		static add(left:any,right:ConchQuaternion,out:ConchQuaternion):void;

		/**
		 * 计算两个四元数的点积
		 * @param left left四元数
		 * @param right right四元数
		 * @return 点积
		 */
		static dot(left:any,right:ConchQuaternion):number;

		/**
		 * 四元数元素数组
		 */
		elements:Float32Array;

		/**
		 * 获取四元数的x值
		 */
		get x():number;

		/**
		 * 设置四元数的x值
		 */
		set x(value:number);

		/**
		 * 获取四元数的y值
		 */
		get y():number;

		/**
		 * 设置四元数的y值
		 */
		set y(value:number);

		/**
		 * 获取四元数的z值
		 */
		get z():number;

		/**
		 * 设置四元数的z值
		 */
		set z(value:number);

		/**
		 * 获取四元数的w值
		 */
		get w():number;

		/**
		 * 设置四元数的w值
		 */
		set w(value:number);

		/**
		 * 创建一个 <code>Quaternion</code> 实例。
		 * @param x 四元数的x值
		 * @param y 四元数的y值
		 * @param z 四元数的z值
		 * @param w 四元数的w值
		 */

		constructor(x?:number,y?:number,z?:number,w?:number,nativeElements?:Float32Array);

		/**
		 * 根据缩放值缩放四元数
		 * @param scale 缩放值
		 * @param out 输出四元数
		 */
		scaling(scaling:number,out:ConchQuaternion):void;

		/**
		 * 归一化四元数
		 * @param out 输出四元数
		 */
		normalize(out:ConchQuaternion):void;

		/**
		 * 计算四元数的长度
		 * @return 长度
		 */
		length():number;

		/**
		 * 根据绕X轴的角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateX(rad:number,out:ConchQuaternion):void;

		/**
		 * 根据绕Y轴的制定角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateY(rad:number,out:ConchQuaternion):void;

		/**
		 * 根据绕Z轴的制定角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateZ(rad:number,out:ConchQuaternion):void;

		/**
		 * 分解四元数到欧拉角（顺序为Yaw、Pitch、Roll），参考自http://xboxforums.create.msdn.com/forums/p/4574/23988.aspx#23988,问题绕X轴翻转超过±90度时有，会产生瞬间反转
		 * @param quaternion 源四元数
		 * @param out 欧拉角值
		 */
		getYawPitchRoll(out:ConchVector3):void;

		/**
		 * 求四元数的逆
		 * @param out 输出四元数
		 */
		invert(out:ConchQuaternion):void;

		/**
		 * 设置四元数为单位算数
		 * @param out 输出四元数
		 */
		identity():void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		equals(b:ConchQuaternion):boolean;

		/**
		 * 计算旋转观察四元数
		 * @param forward 方向
		 * @param up 上向量
		 * @param out 输出四元数
		 */
		static rotationLookAt(forward:ConchVector3,up:ConchVector3,out:ConchQuaternion):void;

		/**
		 * 计算观察四元数
		 * @param eye 观察者位置
		 * @param target 目标位置
		 * @param up 上向量
		 * @param out 输出四元数
		 */
		static lookAt(eye:any,target:any,up:any,out:ConchQuaternion):void;

		/**
		 * 计算长度的平方。
		 * @return 长度的平方。
		 */
		lengthSquared():number;

		/**
		 * 计算四元数的逆四元数。
		 * @param value 四元数。
		 * @param out 逆四元数。
		 */
		static invert(value:ConchQuaternion,out:ConchQuaternion):void;

		/**
		 * 通过一个3x3矩阵创建一个四元数
		 * @param matrix3x3 3x3矩阵
		 * @param out 四元数
		 */
		static rotationMatrix(matrix3x3:Matrix3x3,out:ConchQuaternion):void;
	}

	/**
	 * <code>Vector3</code> 类用于创建三维向量。
	 */
	class ConchVector3 implements IClone  {

		/**
		 * 零向量，禁止修改
		 */
		static ZERO:ConchVector3;

		/**
		 * 一向量，禁止修改
		 */
		static ONE:ConchVector3;

		/**
		 * X轴单位向量，禁止修改
		 */
		static NegativeUnitX:ConchVector3;

		/**
		 * X轴单位向量，禁止修改
		 */
		static UnitX:ConchVector3;

		/**
		 * Y轴单位向量，禁止修改
		 */
		static UnitY:ConchVector3;

		/**
		 * Z轴单位向量，禁止修改
		 */
		static UnitZ:ConchVector3;

		/**
		 * 右手坐标系统前向量，禁止修改
		 */
		static ForwardRH:ConchVector3;

		/**
		 * 左手坐标系统前向量,禁止修改
		 */
		static ForwardLH:ConchVector3;

		/**
		 * 上向量,禁止修改
		 */
		static Up:ConchVector3;

		/**
		 * 无效矩阵,禁止修改
		 */
		static NAN:ConchVector3;

		/**
		 * [只读]向量元素集合。
		 */
		elements:Float32Array;

		/**
		 * 两个三维向量距离的平方。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离的平方。
		 */
		static distanceSquared(value1:ConchVector3,value2:ConchVector3):number;

		/**
		 * 两个三维向量距离。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离。
		 */
		static distance(value1:ConchVector3,value2:ConchVector3):number;

		/**
		 * 分别取两个三维向量x、y、z的最小值计算新的三维向量。
		 * @param a 。
		 * @param b 。
		 * @param out 。
		 */
		static min(a:ConchVector3,b:ConchVector3,out:ConchVector3):void;

		/**
		 * 分别取两个三维向量x、y、z的最大值计算新的三维向量。
		 * @param a a三维向量。
		 * @param b b三维向量。
		 * @param out 结果三维向量。
		 */
		static max(a:ConchVector3,b:ConchVector3,out:ConchVector3):void;

		/**
		 * 根据四元数旋转三维向量。
		 * @param source 源三维向量。
		 * @param rotation 旋转四元数。
		 * @param out 输出三维向量。
		 */
		static transformQuat(source:ConchVector3,rotation:ConchQuaternion,out:ConchVector3):void;

		/**
		 * 计算标量长度。
		 * @param a 源三维向量。
		 * @return 标量长度。
		 */
		static scalarLength(a:ConchVector3):number;

		/**
		 * 计算标量长度的平方。
		 * @param a 源三维向量。
		 * @return 标量长度的平方。
		 */
		static scalarLengthSquared(a:ConchVector3):number;

		/**
		 * 归一化三维向量。
		 * @param s 源三维向量。
		 * @param out 输出三维向量。
		 */
		static normalize(s:ConchVector3,out:ConchVector3):void;

		/**
		 * 计算两个三维向量的乘积。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param out 输出三维向量。
		 */
		static multiply(a:ConchVector3,b:ConchVector3,out:ConchVector3):void;

		/**
		 * 缩放三维向量。
		 * @param a 源三维向量。
		 * @param b 缩放值。
		 * @param out 输出三维向量。
		 */
		static scale(a:ConchVector3,b:number,out:ConchVector3):void;

		/**
		 * 插值三维向量。
		 * @param a left向量。
		 * @param b right向量。
		 * @param t 插值比例。
		 * @param out 输出向量。
		 */
		static lerp(a:ConchVector3,b:ConchVector3,t:number,out:ConchVector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个三维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量。
		 */
		static transformV3ToV3(vector:ConchVector3,transform:any,result:ConchVector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个四维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出四维向量。
		 */
		static transformV3ToV4(vector:ConchVector3,transform:any,result:ConchVector4):void;

		/**
		 * 通过法线矩阵转换一个法线三维向量到另外一个三维向量。
		 * @param normal 源法线三维向量。
		 * @param transform 法线变换矩阵。
		 * @param result 输出法线三维向量。
		 */
		static TransformNormal(normal:ConchVector3,transform:any,result:ConchVector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个归一化的三维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量。
		 */
		static transformCoordinate(coordinate:ConchVector3,transform:any,result:ConchVector3):void;

		/**
		 * 求一个指定范围的向量
		 * @param value clamp向量
		 * @param min 最小
		 * @param max 最大
		 * @param out 输出向量
		 */
		static Clamp(value:ConchVector3,min:ConchVector3,max:ConchVector3,out:ConchVector3):void;

		/**
		 * 求两个三维向量的和。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param out 输出向量。
		 */
		static add(a:ConchVector3,b:ConchVector3,out:ConchVector3):void;

		/**
		 * 求两个三维向量的差。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param o out 输出向量。
		 */
		static subtract(a:ConchVector3,b:ConchVector3,o:ConchVector3):void;

		/**
		 * 求两个三维向量的叉乘。
		 * @param a left向量。
		 * @param b right向量。
		 * @param o 输出向量。
		 */
		static cross(a:ConchVector3,b:ConchVector3,o:ConchVector3):void;

		/**
		 * 求两个三维向量的点积。
		 * @param a left向量。
		 * @param b right向量。
		 * @return 点积。
		 */
		static dot(a:ConchVector3,b:ConchVector3):number;

		/**
		 * 判断两个三维向量是否相等。
		 * @param a 三维向量。
		 * @param b 三维向量。
		 * @return 是否相等。
		 */
		static equals(a:ConchVector3,b:ConchVector3):boolean;

		/**
		 * 获取X轴坐标。
		 * @return X轴坐标。
		 */
		get x():number;

		/**
		 * 设置X轴坐标。
		 * @param value X轴坐标。
		 */
		set x(value:number);

		/**
		 * 获取Y轴坐标。
		 * @return Y轴坐标。
		 */
		get y():number;

		/**
		 * 设置Y轴坐标。
		 * @param value Y轴坐标。
		 */
		set y(value:number);

		/**
		 * 获取Z轴坐标。
		 * @return Z轴坐标。
		 */
		get z():number;

		/**
		 * 设置Z轴坐标。
		 * @param value Z轴坐标。
		 */
		set z(value:number);

		/**
		 * 创建一个 <code>Vector3</code> 实例。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 * @param z Z轴坐标。
		 */

		constructor(x?:number,y?:number,z?:number,nativeElements?:Float32Array);

		/**
		 * 设置xyz值。
		 * @param x X值。
		 * @param y Y值。
		 * @param z Z值。
		 */
		setValue(x:number,y:number,z:number):void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		toDefault():void;
	}

	/**
	 * <code>Vector4</code> 类用于创建四维向量。
	 */
	class ConchVector4 implements IClone  {

		/**
		 * 零向量，禁止修改
		 */
		static ZERO:ConchVector4;
		static ONE:ConchVector4;
		static UnitX:ConchVector4;
		static UnitY:ConchVector4;
		static UnitZ:ConchVector4;
		static UnitW:ConchVector4;

		/**
		 * [只读]向量元素集合。
		 */
		elements:Float32Array;

		/**
		 * 获取X轴坐标。
		 * @return X轴坐标。
		 */
		get x():number;

		/**
		 * 设置X轴坐标。
		 * @param value X轴坐标。
		 */
		set x(value:number);

		/**
		 * 获取Y轴坐标。
		 * @return Y轴坐标。
		 */
		get y():number;

		/**
		 * 设置Y轴坐标。
		 * @param value Y轴坐标。
		 */
		set y(value:number);

		/**
		 * 获取Z轴坐标。
		 * @return Z轴坐标。
		 */
		get z():number;

		/**
		 * 设置Z轴坐标。
		 * @param value Z轴坐标。
		 */
		set z(value:number);

		/**
		 * 获取W轴坐标。
		 * @return W轴坐标。
		 */
		get w():number;

		/**
		 * 设置W轴坐标。
		 * @param value W轴坐标。
		 */
		set w(value:number);

		/**
		 * 创建一个 <code>Vector4</code> 实例。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 * @param z Z轴坐标。
		 * @param w W轴坐标。
		 */

		constructor(x?:number,y?:number,z?:number,w?:number);

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 插值四维向量。
		 * @param a left向量。
		 * @param b right向量。
		 * @param t 插值比例。
		 * @param out 输出向量。
		 */
		static lerp(a:ConchVector4,b:ConchVector4,t:number,out:ConchVector4):void;

		/**
		 * 通过4x4矩阵把一个四维向量转换为另一个四维向量
		 * @param vector4 带转换四维向量。
		 * @param M4x4 4x4矩阵。
		 * @param out 转换后四维向量。
		 */
		static transformByM4x4(vector4:ConchVector4,m4x4:any,out:ConchVector4):void;

		/**
		 * 判断两个四维向量是否相等。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @return 是否相等。
		 */
		static equals(a:ConchVector4,b:ConchVector4):boolean;

		/**
		 * 求四维向量的长度。
		 * @return 长度。
		 */
		length():number;

		/**
		 * 求四维向量长度的平方。
		 * @return 长度的平方。
		 */
		lengthSquared():number;

		/**
		 * 归一化四维向量。
		 * @param s 源四维向量。
		 * @param out 输出四维向量。
		 */
		static normalize(s:ConchVector4,out:ConchVector4):void;

		/**
		 * 求两个四维向量的和。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static add(a:ConchVector4,b:ConchVector4,out:ConchVector4):void;

		/**
		 * 求两个四维向量的差。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static subtract(a:ConchVector4,b:ConchVector4,out:ConchVector4):void;

		/**
		 * 计算两个四维向量的乘积。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static multiply(a:ConchVector4,b:ConchVector4,out:ConchVector4):void;

		/**
		 * 缩放四维向量。
		 * @param a 源四维向量。
		 * @param b 缩放值。
		 * @param out 输出四维向量。
		 */
		static scale(a:ConchVector4,b:number,out:ConchVector4):void;

		/**
		 * 求一个指定范围的四维向量
		 * @param value clamp向量
		 * @param min 最小
		 * @param max 最大
		 * @param out 输出向量
		 */
		static Clamp(value:ConchVector4,min:ConchVector4,max:ConchVector4,out:ConchVector4):void;

		/**
		 * 两个四维向量距离的平方。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离的平方。
		 */
		static distanceSquared(value1:ConchVector4,value2:ConchVector4):number;

		/**
		 * 两个四维向量距离。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离。
		 */
		static distance(value1:ConchVector4,value2:ConchVector4):number;

		/**
		 * 求两个四维向量的点积。
		 * @param a 向量。
		 * @param b 向量。
		 * @return 点积。
		 */
		static dot(a:ConchVector4,b:ConchVector4):number;

		/**
		 * 分别取两个四维向量x、y、z的最小值计算新的四维向量。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 结果三维向量。
		 */
		static min(a:ConchVector4,b:ConchVector4,out:ConchVector4):void;

		/**
		 * 分别取两个四维向量x、y、z的最大值计算新的四维向量。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 结果三维向量。
		 */
		static max(a:ConchVector4,b:ConchVector4,out:ConchVector4):void;
	}

	/**
	 * 平面。
	 */
	class Plane  {

		/**
		 * 平面的向量
		 */
		normal:Vector3;

		/**
		 * 平面到坐标系原点的距离
		 */
		distance:number;

		/**
		 * 平面与其他几何体相交类型
		 */
		static PlaneIntersectionType_Back:number;
		static PlaneIntersectionType_Front:number;
		static PlaneIntersectionType_Intersecting:number;

		/**
		 * 创建一个 <code>Plane</code> 实例。
		 * @param normal 平面的向量
		 * @param d 平面到原点的距离
		 */

		constructor(normal:Vector3,d?:number);

		/**
		 * 通过三个点创建一个平面。
		 * @param point0 第零个点
		 * @param point1 第一个点
		 * @param point2 第二个点
		 */
		static createPlaneBy3P(point0:Vector3,point1:Vector3,point2:Vector3,out:Plane):void;

		/**
		 * 更改平面法线向量的系数，使之成单位长度。
		 */
		normalize():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():Plane;
	}

	/**
	 * <code>Quaternion</code> 类用于创建四元数。
	 */
	class Quaternion implements IClone  {

		/**
		 * 默认矩阵,禁止修改
		 */
		static DEFAULT:Quaternion;

		/**
		 * 无效矩阵,禁止修改
		 */
		static NAN:Quaternion;

		/**
		 * 从欧拉角生成四元数（顺序为Yaw、Pitch、Roll）
		 * @param yaw yaw值
		 * @param pitch pitch值
		 * @param roll roll值
		 * @param out 输出四元数
		 */
		static createFromYawPitchRoll(yaw:number,pitch:number,roll:number,out:Quaternion):void;

		/**
		 * 计算两个四元数相乘
		 * @param left left四元数
		 * @param right right四元数
		 * @param out 输出四元数
		 */
		static multiply(left:Quaternion,right:Quaternion,out:Quaternion):void;
		private static arcTanAngle:any;
		private static angleTo:any;

		/**
		 * 从指定的轴和角度计算四元数
		 * @param axis 轴
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		static createFromAxisAngle(axis:Vector3,rad:number,out:Quaternion):void;

		/**
		 * 从旋转矩阵计算四元数
		 * @param mat 旋转矩阵
		 * @param out 输出四元数
		 */
		static createFromMatrix4x4(mat:Matrix4x4,out:Quaternion):void;

		/**
		 * 球面插值
		 * @param left left四元数
		 * @param right right四元数
		 * @param t 插值比例
		 * @param out 输出四元数
		 * @returns 输出Float32Array
		 */
		static slerp(left:Quaternion,right:Quaternion,t:number,out:Quaternion):Quaternion;

		/**
		 * 计算两个四元数的线性插值
		 * @param left left四元数
		 * @param right right四元数b
		 * @param t 插值比例
		 * @param out 输出四元数
		 */
		static lerp(left:Quaternion,right:Quaternion,amount:number,out:Quaternion):void;

		/**
		 * 计算两个四元数的和
		 * @param left left四元数
		 * @param right right 四元数
		 * @param out 输出四元数
		 */
		static add(left:Quaternion,right:Quaternion,out:Quaternion):void;

		/**
		 * 计算两个四元数的点积
		 * @param left left四元数
		 * @param right right四元数
		 * @return 点积
		 */
		static dot(left:Quaternion,right:Quaternion):number;

		/**
		 * X轴坐标
		 */
		x:number;

		/**
		 * Y轴坐标
		 */
		y:number;

		/**
		 * Z轴坐标
		 */
		z:number;

		/**
		 * W轴坐标
		 */
		w:number;

		/**
		 * 创建一个 <code>Quaternion</code> 实例。
		 * @param x 四元数的x值
		 * @param y 四元数的y值
		 * @param z 四元数的z值
		 * @param w 四元数的w值
		 */

		constructor(x?:number,y?:number,z?:number,w?:number);

		/**
		 * 设置四元数的值。
		 * @param x X值。
		 * @param y Y值。
		 * @param z Z值。
		 */
		setValue(x:number,y:number,z:number,w:number):void;

		/**
		 * 根据缩放值缩放四元数
		 * @param scale 缩放值
		 * @param out 输出四元数
		 */
		scaling(scaling:number,out:Quaternion):void;

		/**
		 * 归一化四元数
		 * @param out 输出四元数
		 */
		normalize(out:Quaternion):void;

		/**
		 * 计算四元数的长度
		 * @return 长度
		 */
		length():number;

		/**
		 * 根据绕X轴的角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateX(rad:number,out:Quaternion):void;

		/**
		 * 根据绕Y轴的制定角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateY(rad:number,out:Quaternion):void;

		/**
		 * 根据绕Z轴的制定角度旋转四元数
		 * @param rad 角度
		 * @param out 输出四元数
		 */
		rotateZ(rad:number,out:Quaternion):void;

		/**
		 * 分解四元数到欧拉角（顺序为Yaw、Pitch、Roll），参考自http://xboxforums.create.msdn.com/forums/p/4574/23988.aspx#23988,问题绕X轴翻转超过±90度时有，会产生瞬间反转
		 * @param quaternion 源四元数
		 * @param out 欧拉角值
		 */
		getYawPitchRoll(out:Vector3):void;

		/**
		 * 求四元数的逆
		 * @param out 输出四元数
		 */
		invert(out:Quaternion):void;

		/**
		 * 设置四元数为单位算数
		 * @param out 输出四元数
		 */
		identity():void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		equals(b:Quaternion):boolean;

		/**
		 * 计算旋转观察四元数
		 * @param forward 方向
		 * @param up 上向量
		 * @param out 输出四元数
		 */
		static rotationLookAt(forward:Vector3,up:Vector3,out:Quaternion):void;

		/**
		 * 计算观察四元数
		 * @param eye 观察者位置
		 * @param target 目标位置
		 * @param up 上向量
		 * @param out 输出四元数
		 */
		static lookAt(eye:Vector3,target:Vector3,up:Vector3,out:Quaternion):void;

		/**
		 * 计算长度的平方。
		 * @return 长度的平方。
		 */
		lengthSquared():number;

		/**
		 * 计算四元数的逆四元数。
		 * @param value 四元数。
		 * @param out 逆四元数。
		 */
		static invert(value:Quaternion,out:Quaternion):void;

		/**
		 * 通过一个3x3矩阵创建一个四元数
		 * @param matrix3x3 3x3矩阵
		 * @param out 四元数
		 */
		static rotationMatrix(matrix3x3:Matrix3x3,out:Quaternion):void;
		forNativeElement(nativeElements?:Float32Array):void;
	}

	/**
	 * <code>Rand</code> 类用于通过32位无符号整型随机种子创建随机数。
	 */
	class Rand  {

		/**
		 * 通过无符号32位整形，获取32位浮点随机数。
		 * @param 无符号32位整形随机数 。
		 * @return 32位浮点随机数。
		 */
		static getFloatFromInt(v:number):number;

		/**
		 * 通过无符号32位整形，获取无符号8位字节随机数。
		 * @param 无符号32位整形随机数 。
		 * @return 无符号8位字节随机数。
		 */
		static getByteFromInt(v:number):number;

		/**
		 * 获取随机种子。
		 */
		seeds:Uint32Array;

		/**
		 * 获取随机种子。
		 * @return 随机种子。
		 */
		get seed():number;

		/**
		 * 设置随机种子。
		 * @param seed 随机种子。
		 */
		set seed(seed:number);

		/**
		 * 创建一个 <code>Rand</code> 实例。
		 * @param seed 32位无符号整型随机种子。
		 */

		constructor(seed:number);

		/**
		 * 获取无符号32位整形随机数。
		 * @return 无符号32位整形随机数。
		 */
		getUint():number;

		/**
		 * 获取0到1之间的浮点随机数。
		 * @return 0到1之间的浮点随机数。
		 */
		getFloat():number;

		/**
		 * 获取-1到1之间的浮点随机数。
		 * @return -1到1之间的浮点随机数。
		 */
		getSignedFloat():number;
	}

	/**
	 * <code>Rand</code> 类用于通过128位整型种子创建随机数,算法来自:https://github.com/AndreasMadsen/xorshift。
	 */
	class RandX  {

		/**
		 * 基于时间种子的随机数。
		 */
		static defaultRand:RandX;

		/**
		 * 创建一个 <code>Rand</code> 实例。
		 * @param seed 随机种子。
		 */

		constructor(seed:any[]);

		/**
		 * 通过2x32位的数组，返回64位的随机数。
		 * @return 64位的随机数。
		 */
		randomint():any[];

		/**
		 * 返回[0,1)之间的随机数。
		 * @return 
		 */
		random():number;
	}

	/**
	 * <code>Ray</code> 类用于创建射线。
	 */
	class Ray  {

		/**
		 * 原点
		 */
		origin:Vector3;

		/**
		 * 方向
		 */
		direction:Vector3;

		/**
		 * 创建一个 <code>Ray</code> 实例。
		 * @param origin 射线的起点
		 * @param direction 射线的方向
		 */

		constructor(origin:Vector3,direction:Vector3);
	}

	/**
	 * <code>Vector2</code> 类用于创建二维向量。
	 */
	class Vector2 implements IClone  {

		/**
		 * 零向量,禁止修改
		 */
		static ZERO:Vector2;

		/**
		 * 一向量,禁止修改
		 */
		static ONE:Vector2;

		/**
		 * X轴坐标
		 */
		x:number;

		/**
		 * Y轴坐标
		 */
		y:number;

		/**
		 * 创建一个 <code>Vector2</code> 实例。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 */

		constructor(x?:number,y?:number);

		/**
		 * 设置xy值。
		 * @param x X值。
		 * @param y Y值。
		 */
		setValue(x:number,y:number):void;

		/**
		 * 缩放二维向量。
		 * @param a 源二维向量。
		 * @param b 缩放值。
		 * @param out 输出二维向量。
		 */
		static scale(a:Vector2,b:number,out:Vector2):void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 写入Array数组
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		toArray(array:Float32Array,offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 求两个二维向量的点积。
		 * @param a left向量。
		 * @param b right向量。
		 * @return 点积。
		 */
		static dot(a:Vector2,b:Vector2):number;

		/**
		 * 归一化二维向量。
		 * @param s 源三维向量。
		 * @param out 输出三维向量。
		 */
		static normalize(s:Vector2,out:Vector2):void;

		/**
		 * 计算标量长度。
		 * @param a 源三维向量。
		 * @return 标量长度。
		 */
		static scalarLength(a:Vector2):number;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		forNativeElement(nativeElements?:Float32Array|null):void;
		static rewriteNumProperty(proto:any,name:string,index:number):void;
	}

	/**
	 * <code>Vector3</code> 类用于创建三维向量。
	 */
	class Vector3 implements IClone  {

		/**
		 * 两个三维向量距离的平方。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离的平方。
		 */
		static distanceSquared(value1:Vector3,value2:Vector3):number;

		/**
		 * 两个三维向量距离。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离。
		 */
		static distance(value1:Vector3,value2:Vector3):number;

		/**
		 * 分别取两个三维向量x、y、z的最小值计算新的三维向量。
		 * @param a 。
		 * @param b 。
		 * @param out 。
		 */
		static min(a:Vector3,b:Vector3,out:Vector3):void;

		/**
		 * 分别取两个三维向量x、y、z的最大值计算新的三维向量。
		 * @param a a三维向量。
		 * @param b b三维向量。
		 * @param out 结果三维向量。
		 */
		static max(a:Vector3,b:Vector3,out:Vector3):void;

		/**
		 * 根据四元数旋转三维向量。
		 * @param source 源三维向量。
		 * @param rotation 旋转四元数。
		 * @param out 输出三维向量。
		 */
		static transformQuat(source:Vector3,rotation:Quaternion,out:Vector3):void;

		/**
		 * 计算标量长度。
		 * @param a 源三维向量。
		 * @return 标量长度。
		 */
		static scalarLength(a:Vector3):number;

		/**
		 * 计算标量长度的平方。
		 * @param a 源三维向量。
		 * @return 标量长度的平方。
		 */
		static scalarLengthSquared(a:Vector3):number;

		/**
		 * 归一化三维向量。
		 * @param s 源三维向量。
		 * @param out 输出三维向量。
		 */
		static normalize(s:Vector3,out:Vector3):void;

		/**
		 * 计算两个三维向量的乘积。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param out 输出三维向量。
		 */
		static multiply(a:Vector3,b:Vector3,out:Vector3):void;

		/**
		 * 缩放三维向量。
		 * @param a 源三维向量。
		 * @param b 缩放值。
		 * @param out 输出三维向量。
		 */
		static scale(a:Vector3,b:number,out:Vector3):void;

		/**
		 * 插值三维向量。
		 * @param a left向量。
		 * @param b right向量。
		 * @param t 插值比例。
		 * @param out 输出向量。
		 */
		static lerp(a:Vector3,b:Vector3,t:number,out:Vector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个三维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量。
		 */
		static transformV3ToV3(vector:Vector3,transform:Matrix4x4,result:Vector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个四维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出四维向量。
		 */
		static transformV3ToV4(vector:Vector3,transform:Matrix4x4,result:Vector4):void;

		/**
		 * 通过法线矩阵转换一个法线三维向量到另外一个三维向量。
		 * @param normal 源法线三维向量。
		 * @param transform 法线变换矩阵。
		 * @param result 输出法线三维向量。
		 */
		static TransformNormal(normal:Vector3,transform:Matrix4x4,result:Vector3):void;

		/**
		 * 通过矩阵转换一个三维向量到另外一个归一化的三维向量。
		 * @param vector 源三维向量。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量。
		 */
		static transformCoordinate(coordinate:Vector3,transform:Matrix4x4,result:Vector3):void;

		/**
		 * 求一个指定范围的向量
		 * @param value clamp向量
		 * @param min 最小
		 * @param max 最大
		 * @param out 输出向量
		 */
		static Clamp(value:Vector3,min:Vector3,max:Vector3,out:Vector3):void;

		/**
		 * 求两个三维向量的和。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param out 输出向量。
		 */
		static add(a:Vector3,b:Vector3,out:Vector3):void;

		/**
		 * 求两个三维向量的差。
		 * @param a left三维向量。
		 * @param b right三维向量。
		 * @param o out 输出向量。
		 */
		static subtract(a:Vector3,b:Vector3,o:Vector3):void;

		/**
		 * 求两个三维向量的叉乘。
		 * @param a left向量。
		 * @param b right向量。
		 * @param o 输出向量。
		 */
		static cross(a:Vector3,b:Vector3,o:Vector3):void;

		/**
		 * 求两个三维向量的点积。
		 * @param a left向量。
		 * @param b right向量。
		 * @return 点积。
		 */
		static dot(a:Vector3,b:Vector3):number;

		/**
		 * 判断两个三维向量是否相等。
		 * @param a 三维向量。
		 * @param b 三维向量。
		 * @return 是否相等。
		 */
		static equals(a:Vector3,b:Vector3):boolean;

		/**
		 * X轴坐标
		 */
		x:number;

		/**
		 * Y轴坐标
		 */
		y:number;

		/**
		 * Z轴坐标
		 */
		z:number;

		/**
		 * 创建一个 <code>Vector3</code> 实例。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 * @param z Z轴坐标。
		 */

		constructor(x?:number,y?:number,z?:number);

		/**
		 * 设置xyz值。
		 * @param x X值。
		 * @param y Y值。
		 * @param z Z值。
		 */
		setValue(x:number,y:number,z:number):void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 写入Array数组
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		toArray(array:Float32Array,offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
		toDefault():void;
		forNativeElement(nativeElements?:Float32Array):void;
	}

	/**
	 * <code>Vector4</code> 类用于创建四维向量。
	 */
	class Vector4 implements IClone  {

		/**
		 * 零向量，禁止修改
		 */
		static ZERO:Vector4;
		static ONE:Vector4;
		static UnitX:Vector4;
		static UnitY:Vector4;
		static UnitZ:Vector4;
		static UnitW:Vector4;

		/**
		 * X轴坐标
		 */
		x:number;

		/**
		 * Y轴坐标
		 */
		y:number;

		/**
		 * Z轴坐标
		 */
		z:number;

		/**
		 * W轴坐标
		 */
		w:number;

		/**
		 * 创建一个 <code>Vector4</code> 实例。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 * @param z Z轴坐标。
		 * @param w W轴坐标。
		 */

		constructor(x?:number,y?:number,z?:number,w?:number);

		/**
		 * 设置xyzw值。
		 * @param x X值。
		 * @param y Y值。
		 * @param z Z值。
		 * @param w W值。
		 */
		setValue(x:number,y:number,z:number,w:number):void;

		/**
		 * 从Array数组拷贝值。
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		fromArray(array:any[],offset?:number):void;

		/**
		 * 写入Array数组
		 * @param array 数组。
		 * @param offset 数组偏移。
		 */
		toArray(array:Float32Array,offset?:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 插值四维向量。
		 * @param a left向量。
		 * @param b right向量。
		 * @param t 插值比例。
		 * @param out 输出向量。
		 */
		static lerp(a:Vector4,b:Vector4,t:number,out:Vector4):void;

		/**
		 * 通过4x4矩阵把一个四维向量转换为另一个四维向量
		 * @param vector4 带转换四维向量。
		 * @param M4x4 4x4矩阵。
		 * @param out 转换后四维向量。
		 */
		static transformByM4x4(vector4:Vector4,m4x4:Matrix4x4,out:Vector4):void;

		/**
		 * 判断两个四维向量是否相等。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @return 是否相等。
		 */
		static equals(a:Vector4,b:Vector4):boolean;

		/**
		 * 求四维向量的长度。
		 * @return 长度。
		 */
		length():number;

		/**
		 * 求四维向量长度的平方。
		 * @return 长度的平方。
		 */
		lengthSquared():number;

		/**
		 * 归一化四维向量。
		 * @param s 源四维向量。
		 * @param out 输出四维向量。
		 */
		static normalize(s:Vector4,out:Vector4):void;

		/**
		 * 求两个四维向量的和。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static add(a:Vector4,b:Vector4,out:Vector4):void;

		/**
		 * 求两个四维向量的差。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static subtract(a:Vector4,b:Vector4,out:Vector4):void;

		/**
		 * 计算两个四维向量的乘积。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 输出向量。
		 */
		static multiply(a:Vector4,b:Vector4,out:Vector4):void;

		/**
		 * 缩放四维向量。
		 * @param a 源四维向量。
		 * @param b 缩放值。
		 * @param out 输出四维向量。
		 */
		static scale(a:Vector4,b:number,out:Vector4):void;

		/**
		 * 求一个指定范围的四维向量
		 * @param value clamp向量
		 * @param min 最小
		 * @param max 最大
		 * @param out 输出向量
		 */
		static Clamp(value:Vector4,min:Vector4,max:Vector4,out:Vector4):void;

		/**
		 * 两个四维向量距离的平方。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离的平方。
		 */
		static distanceSquared(value1:Vector4,value2:Vector4):number;

		/**
		 * 两个四维向量距离。
		 * @param value1 向量1。
		 * @param value2 向量2。
		 * @return 距离。
		 */
		static distance(value1:Vector4,value2:Vector4):number;

		/**
		 * 求两个四维向量的点积。
		 * @param a 向量。
		 * @param b 向量。
		 * @return 点积。
		 */
		static dot(a:Vector4,b:Vector4):number;

		/**
		 * 分别取两个四维向量x、y、z的最小值计算新的四维向量。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 结果三维向量。
		 */
		static min(a:Vector4,b:Vector4,out:Vector4):void;

		/**
		 * 分别取两个四维向量x、y、z的最大值计算新的四维向量。
		 * @param a 四维向量。
		 * @param b 四维向量。
		 * @param out 结果三维向量。
		 */
		static max(a:Vector4,b:Vector4,out:Vector4):void;
		forNativeElement(nativeElements?:Float32Array):void;
	}

	/**
	 * <code>Viewport</code> 类用于创建视口。
	 */
	class Viewport  {

		/**
		 * X轴坐标
		 */
		x:number;

		/**
		 * Y轴坐标
		 */
		y:number;

		/**
		 * 宽度
		 */
		width:number;

		/**
		 * 高度
		 */
		height:number;

		/**
		 * 最小深度
		 */
		minDepth:number;

		/**
		 * 最大深度
		 */
		maxDepth:number;

		/**
		 * 创建一个 <code>Viewport</code> 实例。
		 * @param x x坐标。
		 * @param y y坐标。
		 * @param width 宽度。
		 * @param height 高度。
		 */

		constructor(x:number,y:number,width:number,height:number);

		/**
		 * 投影一个三维向量到视口空间。
		 * @param source 三维向量。
		 * @param matrix 变换矩阵。
		 * @param out x、y、z为视口空间坐标,透视投影下w为相对于变换矩阵的z轴坐标。
		 */
		project(source:Vector3,matrix:Matrix4x4,out:Vector4):void;

		/**
		 * 反变换一个三维向量。
		 * @param source 源三维向量。
		 * @param matrix 变换矩阵。
		 * @param out 输出三维向量。
		 */
		unprojectFromMat(source:Vector3,matrix:Matrix4x4,out:Vector3):void;

		/**
		 * 反变换一个三维向量。
		 * @param source 源三维向量。
		 * @param projection 透视投影矩阵。
		 * @param view 视图矩阵。
		 * @param world 世界矩阵,可设置为null。
		 * @param out 输出向量。
		 */
		unprojectFromWVP(source:Vector3,projection:Matrix4x4,view:Matrix4x4,world:Matrix4x4,out:Vector3):void;

		/**
		 * 克隆
		 * @param out 
		 */
		cloneTo(out:Viewport):void;
	}

	/**
	 * <code>CharacterController</code> 类用于创建角色控制器。
	 */
	class CharacterController extends PhysicsComponent  {
		static UPAXIS_X:number;
		static UPAXIS_Y:number;
		static UPAXIS_Z:number;

		/**
		 * 角色降落速度。
		 */
		get fallSpeed():number;
		set fallSpeed(value:number);

		/**
		 * 角色跳跃速度。
		 */
		get jumpSpeed():number;
		set jumpSpeed(value:number);

		/**
		 * 重力。
		 */
		get gravity():Vector3;
		set gravity(value:Vector3);

		/**
		 * 最大坡度。
		 */
		get maxSlope():number;
		set maxSlope(value:number);

		/**
		 * 角色是否在地表。
		 */
		get isGrounded():boolean;

		/**
		 * 角色行走的脚步高度，表示可跨越的最大高度。
		 */
		get stepHeight():number;
		set stepHeight(value:number);

		/**
		 * 角色的Up轴。
		 */
		get upAxis():Vector3;
		set upAxis(value:Vector3);

		/**
		 * 创建一个 <code>CharacterController</code> 实例。
		 * @param stepheight 角色脚步高度。
		 * @param upAxis 角色Up轴
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(stepheight?:number,upAxis?:Vector3,collisionGroup?:number,canCollideWith?:number);

		/**
		 * 通过指定移动向量移动角色。
		 * @param movement 移动向量。
		 */
		move(movement:Vector3):void;

		/**
		 * 跳跃。
		 * @param velocity 跳跃速度。
		 */
		jump(velocity?:Vector3):void;
	}

	/**
	 * <code>Collision</code> 类用于创建物理碰撞信息。
	 */
	class Collision  {

		/**
		 * @readonly 
		 */
		contacts:ContactPoint[];

		/**
		 * @readonly 
		 */
		other:PhysicsComponent;

		/**
		 * 创建一个 <code>Collision</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>CollisionMap</code> 类用于实现碰撞组合实例图。
	 */
	class CollisionTool  {

		/**
		 * 创建一个 <code>CollisionMap</code> 实例。
		 */

		constructor();
	}

	/**
	 * ...
	 * @author ...
	 */
	class Constraint3D  {

		/**
		 * 获取刚体A。[只读]
		 */
		rigidbodyA:Rigidbody3D;

		/**
		 * 获取刚体A。[只读]
		 */
		rigidbodyB:Rigidbody3D;

		constructor();
	}

	/**
	 * <code>ConfigurableConstraint</code>类用于可设置的约束组件
	 */
	class ConfigurableConstraint extends ConstraintComponent  {

		/**
		 * 约束限制模式  完全限制
		 */
		static CONFIG_MOTION_TYPE_LOCKED:number;

		/**
		 * 约束限制模式  范围限制
		 */
		static CONFIG_MOTION_TYPE_LIMITED:number;

		/**
		 * 约束限制模式  不限制
		 */
		static CONFIG_MOTION_TYPE_FREE:number;

		/**
		 * 创建一个<code>ConfigurableConstraint</code>实例	可设置的约束组件
		 */

		constructor();

		/**
		 * 主轴
		 */
		get axis():Vector3;

		/**
		 * 副轴
		 */
		get secondaryAxis():Vector3;

		/**
		 * 旋转角度最大值
		 */
		set maxAngularLimit(value:Vector3);

		/**
		 * 旋转角度最小值
		 */
		set minAngularLimit(value:Vector3);
		get maxAngularLimit():Vector3;
		get minAngularLimit():Vector3;

		/**
		 * 最大线性位置
		 */
		set maxLinearLimit(value:Vector3);

		/**
		 * 最小线性位置
		 */
		set minLinearLimit(value:Vector3);
		get maxLinearLimit():Vector3;
		get minLinearLimit():Vector3;

		/**
		 * X轴线性约束模式
		 */
		set XMotion(value:number);
		get XMotion():number;

		/**
		 * Y轴线性约束模式
		 */
		set YMotion(value:number);
		get YMotion():number;

		/**
		 * Z轴线性约束模式
		 */
		set ZMotion(value:number);
		get ZMotion():number;

		/**
		 * X轴旋转约束模式
		 */
		set angularXMotion(value:number);
		get angularXMotion():number;

		/**
		 * Y轴旋转约束模式
		 */
		set angularYMotion(value:number);
		get angularYMotion():number;

		/**
		 * Z轴旋转约束模式
		 */
		set angularZMotion(value:number);
		get angularZMotion():number;

		/**
		 * 线性弹簧
		 */
		set linearLimitSpring(value:Vector3);
		get linearLimitSpring():Vector3;

		/**
		 * 角度弹簧
		 */
		set angularLimitSpring(value:Vector3);
		get angularLimitSpring():Vector3;

		/**
		 * 线性弹力
		 */
		set linearBounce(value:Vector3);
		get linearBounce():Vector3;

		/**
		 * 角度弹力
		 */
		set angularBounce(value:Vector3);
		get angularBounce():Vector3;

		/**
		 * 线性阻力
		 */
		set linearDamp(value:Vector3);
		get linearDamp():Vector3;

		/**
		 * 角度阻力
		 */
		set angularDamp(value:Vector3);
		get angularDamp():Vector3;

		/**
		 * 设置锚点
		 */
		set anchor(value:Vector3);
		get anchor():Vector3;

		/**
		 * 设置链接锚点
		 */
		set connectAnchor(value:Vector3);
		get connectAnchor():Vector3;

		/**
		 * 设置对象自然旋转的局部轴主轴，axis2为副轴
		 * @param axis1 
		 * @param axis2 
		 */
		setAxis(axis:Vector3,secondaryAxis:Vector3):void;
		_initAllConstraintInfo():void;
		_onDisable():void;
	}

	/**
	 * <code>ConstraintComponent</code> 类用于创建约束的父类。
	 */
	class ConstraintComponent extends Component  {

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get enabled():boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set enabled(value:boolean);

		/**
		 * 获取应用的冲力。
		 */
		get appliedImpulse():number;

		/**
		 * 获取连接的刚体B。
		 * @return 已连接刚体B。
		 */
		get connectedBody():Rigidbody3D;

		/**
		 * 获取连接的刚体A。
		 * @return 已连接刚体A。
		 */
		get ownBody():Rigidbody3D;

		/**
		 * 获得收到的总力
		 */
		get currentForce():Vector3;

		/**
		 * 获取的总力矩
		 */
		get currentTorque():Vector3;

		/**
		 * 设置最大承受力
		 * @param value 最大承受力
		 */
		get breakForce():number;
		set breakForce(value:number);

		/**
		 * 设置最大承受力矩
		 * @param value 最大承受力矩
		 */
		get breakTorque():number;
		set breakTorque(value:number);

		/**
		 * 设置锚点
		 */
		set anchor(value:Vector3);
		get anchor():Vector3;

		/**
		 * 设置链接锚点
		 */
		set connectAnchor(value:Vector3);
		get connectAnchor():Vector3;

		/**
		 * 创建一个 <code>ConstraintComponent</code> 实例。
		 */

		constructor(constraintType:number);

		/**
		 * 设置迭代的次数，次数越高，越精确
		 * @param overideNumIterations 
		 */
		setOverrideNumSolverIterations(overideNumIterations:number):void;

		/**
		 * 设置约束是否可用
		 * @param enable 
		 */
		setConstraintEnabled(enable:boolean):void;
		_onDisable():void;

		/**
		 * 设置约束刚体
		 * @param ownerRigid 
		 * @param connectRigidBody 
		 * @override 
		 */
		setConnectRigidBody(ownerRigid:Rigidbody3D,connectRigidBody:Rigidbody3D):void;

		/**
		 * 获得当前力
		 * @param out 
		 */
		getcurrentForce(out:Vector3):void;

		/**
		 * 获得当前力矩
		 * @param out 
		 */
		getcurrentTorque(out:Vector3):void;
	}
	class FixedConstraint extends ConstraintComponent  {

		/**
		 * 创建一个<code>FixedConstraint</code>实例
		 */

		constructor();
		_onDisable():void;
	}

	/**
	 * <code>ContactPoint</code> 类用于创建物理碰撞信息。
	 */
	class ContactPoint  {

		/**
		 * 碰撞器A。
		 */
		colliderA:PhysicsComponent;

		/**
		 * 碰撞器B。
		 */
		colliderB:PhysicsComponent;

		/**
		 * 距离。
		 */
		distance:number;

		/**
		 * 法线。
		 */
		normal:Vector3;

		/**
		 * 碰撞器A的碰撞点。
		 */
		positionOnA:Vector3;

		/**
		 * 碰撞器B的碰撞点。
		 */
		positionOnB:Vector3;

		/**
		 * 创建一个 <code>ContactPoint</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>HitResult</code> 类用于实现射线检测或形状扫描的结果。
	 */
	class HitResult  {

		/**
		 * 是否成功。
		 */
		succeeded:boolean;

		/**
		 * 发生碰撞的碰撞组件。
		 */
		collider:PhysicsComponent;

		/**
		 * 碰撞点。
		 */
		point:Vector3;

		/**
		 * 碰撞法线。
		 */
		normal:Vector3;

		/**
		 * 碰撞分数。
		 */
		hitFraction:number;

		/**
		 * 创建一个 <code>HitResult</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>PhysicsCollider</code> 类用于创建物理碰撞器。
	 */
	class PhysicsCollider extends PhysicsTriggerComponent  {

		/**
		 * 创建一个 <code>PhysicsCollider</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup?:number,canCollideWith?:number);
	}

	/**
	 * <code>PhysicsComponent</code> 类用于创建物理组件的父类。
	 */
	class PhysicsComponent extends Component  {

		/**
		 * 是否可以缩放Shape。
		 */
		canScaleShape:boolean;

		/**
		 * 弹力。
		 */
		get restitution():number;
		set restitution(value:number);

		/**
		 * 摩擦力。
		 */
		get friction():number;
		set friction(value:number);

		/**
		 * 滚动摩擦力。
		 */
		get rollingFriction():number;
		set rollingFriction(value:number);

		/**
		 * 用于连续碰撞检测(CCD)的速度阈值,当物体移动速度小于该值时不进行CCD检测,防止快速移动物体(例如:子弹)错误的穿过其它物体,0表示禁止。
		 */
		get ccdMotionThreshold():number;
		set ccdMotionThreshold(value:number);

		/**
		 * 获取用于进入连续碰撞检测(CCD)范围的球半径。
		 */
		get ccdSweptSphereRadius():number;
		set ccdSweptSphereRadius(value:number);

		/**
		 * 获取是否激活。
		 */
		get isActive():boolean;

		/**
		 * 碰撞形状。
		 */
		get colliderShape():ColliderShape;
		set colliderShape(value:ColliderShape);

		/**
		 * 模拟器。
		 */
		get simulation():PhysicsSimulation;

		/**
		 * 所属碰撞组。
		 */
		get collisionGroup():number;
		set collisionGroup(value:number);

		/**
		 * 可碰撞的碰撞组,基于位运算。
		 */
		get canCollideWith():number;
		set canCollideWith(value:number);

		/**
		 * 创建一个 <code>PhysicsComponent</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup:number,canCollideWith:number);
	}

	/**
	 * <code>PhysicsSettings</code> 类用于创建物理配置信息。
	 */
	class PhysicsSettings  {

		/**
		 * 标志集合。
		 */
		flags:number;

		/**
		 * 物理引擎在一帧中用于补偿减速的最大次数。
		 */
		maxSubSteps:number;

		/**
		 * 物理模拟器帧的间隔时间。
		 */
		fixedTimeStep:number;

		/**
		 * 创建一个 <code>PhysicsSettings</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Simulation</code> 类用于创建物理模拟器。
	 */
	class PhysicsSimulation  {
		static disableSimulation:boolean;

		/**
		 * 创建限制刚体运动的约束条件。
		 */
		static createConstraint():void;

		/**
		 * 物理引擎在一帧中用于补偿减速的最大次数：模拟器每帧允许的最大模拟次数，如果引擎运行缓慢,可能需要增加该次数，否则模拟器会丢失“时间",引擎间隔时间小于maxSubSteps*fixedTimeStep非常重要。
		 */
		maxSubSteps:number;

		/**
		 * 物理模拟器帧的间隔时间:通过减少fixedTimeStep可增加模拟精度，默认是1.0 / 60.0。
		 */
		fixedTimeStep:number;

		/**
		 * 是否进行连续碰撞检测。
		 */
		get continuousCollisionDetection():boolean;
		set continuousCollisionDetection(value:boolean);

		/**
		 * 获取重力。
		 */
		get gravity():Vector3;
		set gravity(value:Vector3);

		/**
		 * 射线检测第一个碰撞物体。
		 * @param from 起始位置。
		 * @param to 结束位置。
		 * @param out 碰撞结果。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		raycastFromTo(from:Vector3,to:Vector3,out?:HitResult,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测所有碰撞的物体。
		 * @param from 起始位置。
		 * @param to 结束位置。
		 * @param out 碰撞结果[数组元素会被回收]。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		raycastAllFromTo(from:Vector3,to:Vector3,out:HitResult[],collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测第一个碰撞物体。
		 * @param ray 射线
		 * @param outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
		 * @param distance 射线长度,默认为最大值
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否检测成功。
		 */
		rayCast(ray:Ray,outHitResult?:HitResult,distance?:number,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测所有碰撞的物体。
		 * @param ray 射线
		 * @param out 碰撞结果[数组元素会被回收]。
		 * @param distance 射线长度,默认为最大值
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否检测成功。
		 */
		rayCastAll(ray:Ray,out:HitResult[],distance?:number,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 形状检测第一个碰撞的物体。
		 * @param shape 形状。
		 * @param fromPosition 世界空间起始位置。
		 * @param toPosition 世界空间结束位置。
		 * @param out 碰撞结果。
		 * @param fromRotation 起始旋转。
		 * @param toRotation 结束旋转。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		shapeCast(shape:ColliderShape,fromPosition:Vector3,toPosition:Vector3,out?:HitResult,fromRotation?:Quaternion,toRotation?:Quaternion,collisonGroup?:number,collisionMask?:number,allowedCcdPenetration?:number):boolean;

		/**
		 * 形状检测所有碰撞的物体。
		 * @param shape 形状。
		 * @param fromPosition 世界空间起始位置。
		 * @param toPosition 世界空间结束位置。
		 * @param out 碰撞结果[数组元素会被回收]。
		 * @param fromRotation 起始旋转。
		 * @param toRotation 结束旋转。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		shapeCastAll(shape:ColliderShape,fromPosition:Vector3,toPosition:Vector3,out:HitResult[],fromRotation?:Quaternion,toRotation?:Quaternion,collisonGroup?:number,collisionMask?:number,allowedCcdPenetration?:number):boolean;

		/**
		 * 添加刚体运动的约束条件。
		 * @param constraint 约束。
		 * @param disableCollisionsBetweenLinkedBodies 是否禁用
		 */
		addConstraint(constraint:ConstraintComponent,disableCollisionsBetweenLinkedBodies?:boolean):void;

		/**
		 * 移除刚体运动的约束条件。
		 */
		removeConstraint(constraint:ConstraintComponent):void;

		/**
		 * 设置射线检测回调
		 * @param HITSRAYRESULTCALLBACK_FLAG值 
		 */
		setHitsRayResultCallbackFlag(flag?:number):void;

		/**
		 * 清除力。
		 */
		clearForces():void;
	}

	/**
	 * <code>PhysicsTriggerComponent</code> 类用于创建物理触发器组件。
	 */
	class PhysicsTriggerComponent extends PhysicsComponent  {

		/**
		 * 是否为触发器。
		 */
		get isTrigger():boolean;
		set isTrigger(value:boolean);

		/**
		 * 创建一个 <code>PhysicsTriggerComponent</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup:number,canCollideWith:number);
	}

	/**
	 * <code>PhysicsUpdateList</code> 类用于实现物理更新队列。
	 */
	class PhysicsUpdateList extends SingletonList<ISingletonElement>  {

		/**
		 * 创建一个新的 <code>PhysicsUpdateList</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Rigidbody3D</code> 类用于创建刚体碰撞器。
	 */
	class Rigidbody3D extends PhysicsTriggerComponent  {
		static TYPE_STATIC:number;
		static TYPE_DYNAMIC:number;
		static TYPE_KINEMATIC:number;

		/**
		 * 质量。
		 */
		get mass():number;
		set mass(value:number);

		/**
		 * 是否为运动物体，如果为true仅可通过transform属性移动物体,而非其他力相关属性。
		 */
		get isKinematic():boolean;
		set isKinematic(value:boolean);

		/**
		 * 刚体的线阻力。
		 */
		get linearDamping():number;
		set linearDamping(value:number);

		/**
		 * 刚体的角阻力。
		 */
		get angularDamping():number;
		set angularDamping(value:number);

		/**
		 * 是否重载重力。
		 */
		get overrideGravity():boolean;
		set overrideGravity(value:boolean);

		/**
		 * 重力。
		 */
		get gravity():Vector3;
		set gravity(value:Vector3);

		/**
		 * 总力。
		 */
		get totalForce():Vector3;

		/**
		 * 每个轴的线性运动缩放因子,如果某一轴的值为0表示冻结在该轴的线性运动。
		 */
		get linearFactor():Vector3;
		set linearFactor(value:Vector3);

		/**
		 * 线速度
		 */
		get linearVelocity():Vector3;
		set linearVelocity(value:Vector3);

		/**
		 * 每个轴的角度运动缩放因子,如果某一轴的值为0表示冻结在该轴的角度运动。
		 */
		get angularFactor():Vector3;
		set angularFactor(value:Vector3);

		/**
		 * 角速度。
		 */
		get angularVelocity():Vector3;
		set angularVelocity(value:Vector3);

		/**
		 * 刚体所有扭力。
		 */
		get totalTorque():Vector3;

		/**
		 * 是否进行碰撞检测。
		 */
		get detectCollisions():boolean;
		set detectCollisions(value:boolean);

		/**
		 * 是否处于睡眠状态。
		 */
		get isSleeping():boolean;

		/**
		 * 刚体睡眠的线速度阈值。
		 */
		get sleepLinearVelocity():number;
		set sleepLinearVelocity(value:number);

		/**
		 * 刚体睡眠的角速度阈值。
		 */
		get sleepAngularVelocity():number;
		set sleepAngularVelocity(value:number);
		get btColliderObject():number;

		/**
		 * 创建一个 <code>RigidBody3D</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup?:number,canCollideWith?:number);

		/**
		 * 应用作用力。
		 * @param force 作用力。
		 * @param localOffset 偏移,如果为null则为中心点
		 */
		applyForce(force:Vector3,localOffset?:Vector3):void;

		/**
		 * 应用扭转力。
		 * @param torque 扭转力。
		 */
		applyTorque(torque:Vector3):void;

		/**
		 * 应用冲量。
		 * @param impulse 冲量。
		 * @param localOffset 偏移,如果为null则为中心点。
		 */
		applyImpulse(impulse:Vector3,localOffset?:Vector3):void;

		/**
		 * 应用扭转冲量。
		 * @param torqueImpulse 
		 */
		applyTorqueImpulse(torqueImpulse:Vector3):void;

		/**
		 * 唤醒刚体。
		 */
		wakeUp():void;

		/**
		 * 清除应用到刚体上的所有力。
		 */
		clearForces():void;
	}

	/**
	 * <code>BoxColliderShape</code> 类用于创建盒子形状碰撞器。
	 */
	class BoxColliderShape extends ColliderShape  {

		/**
		 * X轴尺寸。
		 */
		get sizeX():number;

		/**
		 * Y轴尺寸。
		 */
		get sizeY():number;

		/**
		 * Z轴尺寸。
		 */
		get sizeZ():number;

		/**
		 * 创建一个新的 <code>BoxColliderShape</code> 实例。
		 * @param sizeX 盒子X轴尺寸。
		 * @param sizeY 盒子Y轴尺寸。
		 * @param sizeZ 盒子Z轴尺寸。
		 */

		constructor(sizeX?:number,sizeY?:number,sizeZ?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>CapsuleColliderShape</code> 类用于创建胶囊形状碰撞器。
	 */
	class CapsuleColliderShape extends ColliderShape  {

		/**
		 * 半径。
		 */
		get radius():number;

		/**
		 * 长度。
		 */
		get length():number;

		/**
		 * 方向。
		 */
		get orientation():number;

		/**
		 * 创建一个新的 <code>CapsuleColliderShape</code> 实例。
		 * @param 半径 。
		 * @param 高 (包含半径)。
		 * @param orientation 胶囊体方向。
		 */

		constructor(radius?:number,length?:number,orientation?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>ColliderShape</code> 类用于创建形状碰撞器的父类，该类为抽象类。
	 */
	class ColliderShape implements IClone  {

		/**
		 * 形状方向_X轴正向
		 */
		static SHAPEORIENTATION_UPX:number;

		/**
		 * 形状方向_Y轴正向
		 */
		static SHAPEORIENTATION_UPY:number;

		/**
		 * 形状方向_Z轴正向
		 */
		static SHAPEORIENTATION_UPZ:number;
		needsCustomCollisionCallback:boolean;

		/**
		 * 碰撞类型。
		 */
		get type():number;

		/**
		 * Shape的本地偏移。
		 */
		get localOffset():Vector3;
		set localOffset(value:Vector3);

		/**
		 * Shape的本地旋转。
		 */
		get localRotation():Quaternion;
		set localRotation(value:Quaternion);

		/**
		 * 创建一个新的 <code>ColliderShape</code> 实例。
		 */

		constructor();

		/**
		 * 更新本地偏移,如果修改LocalOffset或LocalRotation需要调用。
		 */
		updateLocalTransformations():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 销毁。
		 */
		destroy():void;
	}

	/**
	 * <code>CompoundColliderShape</code> 类用于创建组合碰撞器。
	 */
	class CompoundColliderShape extends ColliderShape  {

		/**
		 * 创建一个新的 <code>CompoundColliderShape</code> 实例。
		 */

		constructor();

		/**
		 * 添加子碰撞器形状。
		 * @param shape 子碰撞器形状。
		 */
		addChildShape(shape:ColliderShape):void;

		/**
		 * 移除子碰撞器形状。
		 * @param shape 子碰撞器形状。
		 */
		removeChildShape(shape:ColliderShape):void;

		/**
		 * 清空子碰撞器形状。
		 */
		clearChildShape():void;

		/**
		 * 获取子形状数量。
		 * @return 
		 */
		getChildShapeCount():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>ConeColliderShape</code> 类用于创建圆锥碰撞器。
	 */
	class ConeColliderShape extends ColliderShape  {
		private _orientation:any;
		private _radius:any;
		private _height:any;

		/**
		 * 半径。
		 */
		get radius():number;

		/**
		 * 高度。
		 */
		get height():number;

		/**
		 * 方向。
		 */
		get orientation():number;

		/**
		 * 创建一个新的 <code>ConeColliderShape</code> 实例。
		 * @param height 高。
		 * @param radius 半径。
		 */

		constructor(radius?:number,height?:number,orientation?:number);

		/**
		 * 克隆
		 * @inheritDoc 
		 * @override 
		 * @returns 克隆的ConeColliderShape实例
		 */
		clone():any;
	}

	/**
	 * <code>CylinderColliderShape</code> 类用于创建圆柱碰撞器。
	 */
	class CylinderColliderShape extends ColliderShape  {
		private _orientation:any;
		private _radius:any;
		private _height:any;

		/**
		 * 半径。
		 */
		get radius():number;

		/**
		 * 高度。
		 */
		get height():number;

		/**
		 * 方向。
		 */
		get orientation():number;

		/**
		 * 创建一个新的 <code>CylinderColliderShape</code> 实例。
		 * @param height 高。
		 * @param radius 半径。
		 */

		constructor(radius?:number,height?:number,orientation?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>MeshColliderShape</code> 类用于创建网格碰撞器。
	 */
	class MeshColliderShape extends ColliderShape  {

		/**
		 * 网格。
		 */
		get mesh():Mesh;
		set mesh(value:Mesh);

		/**
		 * 是否使用凸多边形。
		 */
		get convex():boolean;
		set convex(value:boolean);

		/**
		 * 创建一个新的 <code>MeshColliderShape</code> 实例。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>SphereColliderShape</code> 类用于创建球形碰撞器。
	 */
	class SphereColliderShape extends ColliderShape  {

		/**
		 * 半径。
		 */
		get radius():number;

		/**
		 * 创建一个新的 <code>SphereColliderShape</code> 实例。
		 * @param radius 半径。
		 */

		constructor(radius?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>StaticPlaneColliderShape</code> 类用于创建静态平面碰撞器。
	 */
	class StaticPlaneColliderShape extends ColliderShape  {

		/**
		 * 创建一个新的 <code>StaticPlaneColliderShape</code> 实例。
		 */

		constructor(normal:Vector3,offset:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * Laya物理类
	 * internal
	 */
	class Physics3D  {
	}

	/**
	 * <code>Collision</code> 类用于创建物理碰撞信息。
	 */
	class CannonCollision  {

		/**
		 * @readonly 
		 */
		contacts:CannonContactPoint[];

		/**
		 * @readonly 
		 */
		other:CannonPhysicsComponent;

		/**
		 * 创建一个 <code>Collision</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>CollisionMap</code> 类用于实现碰撞组合实例图。
	 */
	class CannonCollisionTool  {

		/**
		 * 创建一个 <code>CollisionMap</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>ContactPoint</code> 类用于创建物理碰撞信息。
	 */
	class CannonContactPoint  {

		/**
		 * 碰撞器A。
		 */
		colliderA:CannonPhysicsComponent;

		/**
		 * 碰撞器B。
		 */
		colliderB:CannonPhysicsComponent;

		/**
		 * 距离。
		 */
		distance:number;

		/**
		 * 法线。
		 */
		normal:Vector3;

		/**
		 * 碰撞器A的碰撞点。
		 */
		positionOnA:Vector3;

		/**
		 * 碰撞器B的碰撞点。
		 */
		positionOnB:Vector3;

		/**
		 * 创建一个 <code>ContactPoint</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>HitResult</code> 类用于实现射线检测或形状扫描的结果。
	 */
	class CannonHitResult  {

		/**
		 * 是否成功。
		 */
		succeeded:boolean;

		/**
		 * 发生碰撞的碰撞组件。
		 */
		collider:CannonPhysicsComponent;

		/**
		 * 碰撞点。
		 */
		point:Vector3;

		/**
		 * 碰撞法线。
		 */
		normal:Vector3;

		/**
		 * 碰撞分数。
		 */
		hitFraction:number;

		/**
		 * 创建一个 <code>HitResult</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>PhysicsCollider</code> 类用于创建物理碰撞器。
	 */
	class CannonPhysicsCollider extends CannonPhysicsTriggerComponent  {

		/**
		 * 创建一个 <code>PhysicsCollider</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup?:number,canCollideWith?:number);
	}

	/**
	 * <code>PhysicsComponent</code> 类用于创建物理组件的父类。
	 */
	class CannonPhysicsComponent extends Component  {

		/**
		 * 是否可以缩放Shape。
		 */
		canScaleShape:boolean;

		/**
		 * 弹力。
		 */
		get restitution():number;
		set restitution(value:number);

		/**
		 * 摩擦力。
		 */
		get friction():number;
		set friction(value:number);

		/**
		 * 碰撞形状。
		 */
		get colliderShape():CannonColliderShape;
		set colliderShape(value:CannonColliderShape);

		/**
		 * 模拟器。
		 */
		get simulation():CannonPhysicsSimulation;

		/**
		 * 所属碰撞组。
		 */
		get collisionGroup():number;
		set collisionGroup(value:number);

		/**
		 * 可碰撞的碰撞组,基于位运算。
		 */
		get canCollideWith():number;
		set canCollideWith(value:number);

		/**
		 * 创建一个 <code>PhysicsComponent</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup:number,canCollideWith:number);
	}

	/**
	 * <code>PhysicsSettings</code> 类用于创建物理配置信息。
	 */
	class CannonPhysicsSettings  {

		/**
		 * 标志集合。
		 */
		flags:number;

		/**
		 * 物理引擎在一帧中用于补偿减速的最大次数。
		 */
		maxSubSteps:number;

		/**
		 * 物理模拟器帧的间隔时间。
		 */
		fixedTimeStep:number;

		/**
		 * 物理松弛系数
		 */
		contactEquationRelaxation:number;

		/**
		 * 刚度系数
		 */
		contactEquationStiffness:number;

		/**
		 * 创建一个 <code>PhysicsSettings</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Simulation</code> 类用于创建物理模拟器。
	 */
	class CannonPhysicsSimulation  {
		private static _cannonPhysicsSimulation:any;
		static disableSimulation:boolean;

		/**
		 * 创建限制刚体运动的约束条件。
		 */
		static createConstraint():void;

		/**
		 * 物理引擎在一帧中用于补偿减速的最大次数：模拟器每帧允许的最大模拟次数，如果引擎运行缓慢,可能需要增加该次数，否则模拟器会丢失“时间",引擎间隔时间小于maxSubSteps*fixedTimeStep非常重要。
		 */
		maxSubSteps:number;

		/**
		 * 物理模拟器帧的间隔时间:通过减少fixedTimeStep可增加模拟精度，默认是1.0 / 60.0。
		 */
		fixedTimeStep:number;

		/**
		 * 获取重力。
		 */
		get gravity():Vector3;
		set gravity(value:Vector3);

		/**
		 * 获取重力。
		 */
		get solverIterations():number;
		set solverIterations(value:number);

		/**
		 * 射线检测第一个碰撞物体。
		 * @param from 起始位置。
		 * @param to 结束位置。
		 * @param out 碰撞结果。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		raycastFromTo(from:Vector3,to:Vector3,out?:CannonHitResult,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测所有碰撞的物体。
		 * @param from 起始位置。
		 * @param to 结束位置。
		 * @param out 碰撞结果[数组元素会被回收]。
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否成功。
		 */
		raycastAllFromTo(from:Vector3,to:Vector3,out:CannonHitResult[],collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测第一个碰撞物体。
		 * @param ray 射线
		 * @param outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
		 * @param distance 射线长度,默认为最大值
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否检测成功。
		 */
		rayCast(ray:Ray,outHitResult?:CannonHitResult,distance?:number,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 射线检测所有碰撞的物体。
		 * @param ray 射线
		 * @param out 碰撞结果[数组元素会被回收]。
		 * @param distance 射线长度,默认为最大值
		 * @param collisonGroup 射线所属碰撞组。
		 * @param collisionMask 与射线可产生碰撞的组。
		 * @return 是否检测成功。
		 */
		rayCastAll(ray:Ray,out:CannonHitResult[],distance?:number,collisonGroup?:number,collisionMask?:number):boolean;

		/**
		 * 清除力。
		 */
		clearForces():void;
	}

	/**
	 * <code>PhysicsTriggerComponent</code> 类用于创建物理触发器组件。
	 */
	class CannonPhysicsTriggerComponent extends CannonPhysicsComponent  {

		/**
		 * 是否为触发器。
		 */
		get isTrigger():boolean;
		set isTrigger(value:boolean);

		/**
		 * 创建一个 <code>PhysicsTriggerComponent</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup:number,canCollideWith:number);
	}

	/**
	 * <code>PhysicsUpdateList</code> 类用于实现物理更新队列。
	 */
	class CannonPhysicsUpdateList extends SingletonList<ISingletonElement>  {

		/**
		 * 创建一个新的 <code>PhysicsUpdateList</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Rigidbody3D</code> 类用于创建刚体碰撞器。
	 */
	class CannonRigidbody3D extends CannonPhysicsCollider  {
		static TYPE_STATIC:number;
		static TYPE_DYNAMIC:number;
		static TYPE_KINEMATIC:number;

		/**
		 * 质量。
		 */
		get mass():number;
		set mass(value:number);

		/**
		 * 是否为运动物体，如果为true仅可通过transform属性移动物体,而非其他力相关属性。
		 */
		get isKinematic():boolean;
		set isKinematic(value:boolean);

		/**
		 * 刚体的线阻力。
		 */
		get linearDamping():number;
		set linearDamping(value:number);

		/**
		 * 刚体的角阻力。
		 */
		get angularDamping():number;
		set angularDamping(value:number);

		/**
		 * 总力。
		 */
		get totalForce():Vector3;

		/**
		 * 线速度
		 */
		get linearVelocity():Vector3;
		set linearVelocity(value:Vector3);

		/**
		 * 角速度。
		 */
		get angularVelocity():Vector3;
		set angularVelocity(value:Vector3);

		/**
		 * 刚体所有扭力。
		 */
		get totalTorque():Vector3;

		/**
		 * 是否处于睡眠状态。
		 */
		get isSleeping():boolean;

		/**
		 * 刚体睡眠的线速度阈值。
		 */
		get sleepLinearVelocity():number;
		set sleepLinearVelocity(value:number);
		get btColliderObject():CANNON.Body;

		/**
		 * 创建一个 <code>RigidBody3D</code> 实例。
		 * @param collisionGroup 所属碰撞组。
		 * @param canCollideWith 可产生碰撞的碰撞组。
		 */

		constructor(collisionGroup?:number,canCollideWith?:number);

		/**
		 * 应用作用力。
		 * @param force 作用力。
		 * @param localOffset 偏移,如果为null则为中心点
		 */
		applyForce(force:Vector3,localOffset?:Vector3):void;

		/**
		 * 应用扭转力。
		 * @param torque 扭转力。
		 */
		applyTorque(torque:Vector3):void;

		/**
		 * 应用冲量。
		 * @param impulse 冲量。
		 * @param localOffset 偏移,如果为null则为中心点。
		 */
		applyImpulse(impulse:Vector3,localOffset?:Vector3):void;

		/**
		 * 唤醒刚体。
		 */
		wakeUp():void;

		/**
		 * 清除应用到刚体上的所有力。
		 */
		clearForces():void;
	}

	/**
	 * <code>BoxColliderShape</code> 类用于创建盒子形状碰撞器。
	 */
	class CannonBoxColliderShape extends CannonColliderShape  {

		/**
		 * X轴尺寸。
		 */
		get sizeX():number;

		/**
		 * Y轴尺寸。
		 */
		get sizeY():number;

		/**
		 * Z轴尺寸。
		 */
		get sizeZ():number;

		/**
		 * 创建一个新的 <code>BoxColliderShape</code> 实例。
		 * @param sizeX 盒子X轴尺寸。
		 * @param sizeY 盒子Y轴尺寸。
		 * @param sizeZ 盒子Z轴尺寸。
		 */

		constructor(sizeX?:number,sizeY?:number,sizeZ?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_setScale(scale:Vector3):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	/**
	 * <code>ColliderShape</code> 类用于创建形状碰撞器的父类，该类为抽象类。
	 */
	class CannonColliderShape implements IClone  {

		/**
		 * 形状方向_X轴正向
		 */
		static SHAPEORIENTATION_UPX:number;

		/**
		 * 形状方向_Y轴正向
		 */
		static SHAPEORIENTATION_UPY:number;

		/**
		 * 形状方向_Z轴正向
		 */
		static SHAPEORIENTATION_UPZ:number;
		needsCustomCollisionCallback:boolean;

		/**
		 * 碰撞类型。
		 */
		get type():number;

		/**
		 * Shape的本地偏移。
		 */
		get localOffset():Vector3;
		set localOffset(value:Vector3);

		/**
		 * Shape的本地旋转。
		 */
		get localRotation():Quaternion;
		set localRotation(value:Quaternion);

		/**
		 * 创建一个新的 <code>ColliderShape</code> 实例。
		 */

		constructor();

		/**
		 * 更新本地偏移,如果修改LocalOffset或LocalRotation需要调用。
		 */
		updateLocalTransformations():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 销毁。
		 */
		destroy():void;
	}

	/**
	 * <code>CompoundColliderShape</code> 类用于创建盒子形状碰撞器。
	 */
	class CannonCompoundColliderShape extends CannonColliderShape  {
		private static _tempCannonQue:any;
		private static _tempCannonVec:any;
		private physicColliderObject:any;

		/**
		 * 创建一个新的 <code>CompoundColliderShape</code> 实例。
		 */

		constructor();
		addChildShape(shape:CannonColliderShape,localOffset?:Vector3):void;

		/**
		 * 移除子碰撞器形状。
		 * @param shape 子碰撞器形状。
		 */
		removeChildShape(shape:CannonColliderShape):void;
		bindRigidBody(rigidbody:CannonPhysicsComponent):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_setScale(scale:Vector3):void;

		/**
		 * 获取子形状数量。
		 * @return 
		 */
		getChildShapeCount():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		cloneTo(destObject:any):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>SphereColliderShape</code> 类用于创建球形碰撞器。
	 */
	class CannonSphereColliderShape extends CannonColliderShape  {

		/**
		 * 半径。
		 */
		get radius():number;

		/**
		 * 创建一个新的 <code>SphereColliderShape</code> 实例。
		 * @param radius 半径。
		 */

		constructor(radius?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_setScale(scale:Vector3):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clone():any;
	}

	interface IReferenceCounter{

		/**
		 * 获得引用计数
		 */
		_getReferenceCount():number;

		/**
		 * 增加引用计数
		 */
		_addReference(count:number):void;

		/**
		 * 删除引用计数
		 */
		_removeReference(count:number):void;

		/**
		 * 清除引用计数
		 */
		_clearReference():void;
	}


	/**
	 * <code>Mesh</code> 类用于创建文件网格数据模板。
	 */
	class Mesh extends Resource implements IClone  {

		/**
		 * Mesh资源。
		 */
		static MESH:string;
		static MESH_INSTANCEBUFFER_TYPE_NORMAL:number;
		static MESH_INSTANCEBUFFER_TYPE_SIMPLEANIMATOR:number;

		/**
		 * 加载网格模板。
		 * @param url 模板地址。
		 * @param complete 完成回调。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * 网格的全局默认绑定动作逆矩阵。
		 */
		get inverseAbsoluteBindPoses():Matrix4x4[];

		/**
		 * 获取顶点个数。
		 */
		get vertexCount():number;

		/**
		 * 获取索引个数。
		 */
		get indexCount():number;

		/**
		 * SubMesh的个数。
		 */
		get subMeshCount():number;

		/**
		 * 边界。
		 */
		get bounds():Bounds;
		set bounds(value:Bounds);

		/**
		 * 索引格式。
		 */
		get indexFormat():IndexFormat;

		/**
		 * 创建一个 <code>Mesh</code> 实例,禁止使用。
		 * @param isReadable 是否可读。
		 */

		constructor(isReadable?:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;

		/**
		 * 根据获取子网格。
		 * @param index 索引。
		 */
		getSubMesh(index:number):SubMesh;

		/**
		 * 拷贝并填充位置数据至数组。
		 * @param positions 位置数组。
		 * @remark 该方法为拷贝操作，比较耗费性能。
		 */
		getPositions(positions:Vector3[]):void;

		/**
		 * 设置位置数据。
		 * @param positions 位置。
		 */
		setPositions(positions:Vector3[]):void;

		/**
		 * 拷贝并填充颜色数据至数组。
		 * @param colors 颜色数组。
		 * @remark 该方法为拷贝操作，比较耗费性能。
		 */
		getColors(colors:Color[]):void;

		/**
		 * 设置颜色数据。
		 * @param colors 颜色。
		 */
		setColors(colors:Color[]):void;

		/**
		 * 拷贝并填充纹理坐标数据至数组。
		 * @param uvs 纹理坐标数组。
		 * @param channel 纹理坐标通道。
		 * @remark 该方法为拷贝操作，比较耗费性能。
		 */
		getUVs(uvs:Vector2[],channel?:number):void;

		/**
		 * 设置纹理坐标数据。
		 * @param uvs 纹理坐标。
		 * @param channel 纹理坐标通道。
		 */
		setUVs(uvs:Vector2[],channel?:number):void;

		/**
		 * 拷贝并填充法线数据至数组。
		 * @param normals 法线数组。
		 * @remark 该方法为拷贝操作，比较耗费性能。
		 */
		getNormals(normals:Vector3[]):void;

		/**
		 * 设置法线数据。
		 * @param normals 法线。
		 */
		setNormals(normals:Vector3[]):void;

		/**
		 * 拷贝并填充切线数据至数组。
		 * @param tangents 切线。
		 */
		getTangents(tangents:Vector4[]):void;

		/**
		 * 设置切线数据。
		 * @param tangents 切线。
		 */
		setTangents(tangents:Vector4[]):void;

		/**
		 * 获取骨骼权重。
		 * @param boneWeights 骨骼权重。
		 */
		getBoneWeights(boneWeights:Vector4[]):void;

		/**
		 * 拷贝并填充骨骼权重数据至数组。
		 * @param boneWeights 骨骼权重。
		 */
		setBoneWeights(boneWeights:Vector4[]):void;

		/**
		 * 获取骨骼索引。
		 * @param boneIndices 骨骼索引。
		 */
		getBoneIndices(boneIndices:Vector4[]):void;

		/**
		 * 拷贝并填充骨骼索引数据至数组。
		 * @param boneWeights 骨骼索引。
		 */
		setBoneIndices(boneIndices:Vector4[]):void;

		/**
		 * 将Mesh标记为不可读,可减少内存，标记后不可再调用相关读取方法。
		 */
		markAsUnreadbale():void;

		/**
		 * 获取顶点声明。
		 */
		getVertexDeclaration():VertexDeclaration;

		/**
		 * 拷贝并获取顶点数据的副本。
		 * @return 顶点数据。
		 */
		getVertices():ArrayBuffer;

		/**
		 * 设置顶点数据。
		 * @param vertices 顶点数据。
		 */
		setVertices(vertices:ArrayBuffer):void;

		/**
		 * 拷贝并获取网格索引的副本。
		 * @return 网格索引。
		 */
		getIndices():Uint8Array|Uint16Array|Uint32Array;

		/**
		 * 设置网格索引。
		 * @param indices 网格索引。
		 */
		setIndices(indices:Uint8Array|Uint16Array|Uint32Array):void;

		/**
		 * 从模型位置数据生成包围盒。
		 */
		calculateBounds():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>PrimitiveMesh</code> 类用于创建简单网格。
	 */
	class PrimitiveMesh  {
		static __init__():void;

		/**
		 * 创建Box网格。
		 * @param long 半径
		 * @param height 垂直层数
		 * @param width 水平层数
		 * @return 
		 */
		static createBox(long?:number,height?:number,width?:number):Mesh;

		/**
		 * 创建一个胶囊体模型
		 * @param radius 半径
		 * @param height 高度
		 * @param stacks 水平层数,一般设为垂直层数的一半
		 * @param slices 垂直层数
		 */
		static createCapsule(radius?:number,height?:number,stacks?:number,slices?:number):Mesh;

		/**
		 * 创建一个圆锥体模型
		 * @param radius 半径
		 * @param height 高度
		 * @param slices 分段数
		 */
		static createCone(radius?:number,height?:number,slices?:number):Mesh;

		/**
		 * 创建一个圆柱体模型
		 * @param radius 半径
		 * @param height 高度
		 * @param slices 垂直层数
		 */
		static createCylinder(radius?:number,height?:number,slices?:number):Mesh;

		/**
		 * 创建一个平面模型
		 * @param long 长
		 * @param width 宽
		 */
		static createPlane(long?:number,width?:number,stacks?:number,slices?:number):Mesh;

		/**
		 * 创建一个四边形模型
		 * @param long 长
		 * @param width 宽
		 */
		static createQuad(long?:number,width?:number):Mesh;

		/**
		 * 创建一个球体模型
		 * @param radius 半径
		 * @param stacks 水平层数
		 * @param slices 垂直层数
		 */
		static createSphere(radius?:number,stacks?:number,slices?:number):Mesh;
	}

	/**
	 * <code>SkyBox</code> 类用于创建天空盒。
	 */
	class SkyBox extends SkyMesh  {
		static instance:SkyBox;

		/**
		 * 创建一个 <code>SkyBox</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>SkyDome</code> 类用于创建天空盒。
	 */
	class SkyDome extends SkyMesh  {
		static instance:SkyDome;

		/**
		 * 获取堆数。
		 */
		get stacks():number;

		/**
		 * 获取层数。
		 */
		get slices():number;

		/**
		 * 创建一个 <code>SkyDome</code> 实例。
		 * @param stacks 堆数。
		 * @param slices 层数。
		 */

		constructor(stacks?:number,slices?:number);
	}

	/**
	 * <code>SkyMesh</code> 类用于实现天空网格。
	 */
	class SkyMesh  {

		/**
		 * 创建一个新的 <code>SkyMesh</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>SkyRenderer</code> 类用于实现天空渲染器。
	 */
	class SkyRenderer  {

		/**
		 * 材质。
		 */
		get material():Material;
		set material(value:Material);

		/**
		 * 网格。
		 */
		get mesh():SkyMesh;
		set mesh(value:SkyMesh);

		/**
		 * 创建一个新的 <code>SkyRenderer</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>SubMesh</code> 类用于创建子网格数据模板。
	 */
	class SubMesh extends GeometryElement  {

		/**
		 * 获取索引数量。
		 */
		get indexCount():number;

		/**
		 * 创建一个 <code>SubMesh</code> 实例。
		 * @param mesh 网格数据模板。
		 */

		constructor(mesh:Mesh);

		/**
		 * 拷贝并获取子网格索引数据的副本。
		 */
		getIndices():Uint16Array|Uint32Array;

		/**
		 * 设置子网格索引。
		 * @param indices 
		 */
		setIndices(indices:Uint16Array):void;

		/**
		 * {@inheritDoc GeometryElement.destroy}
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * <code>MulSampleRenderTexture</code>类用于创建多重采样渲染目标
	 * webGL2.0多重采样才会生效
	 */
	class MulSampleRenderTexture extends RenderTexture  {

		/**
		 * 多重采样次数
		 */
		protected _mulSampler:number;

		/**
		 * 是否为多重采样贴图
		 */
		protected _mulSamplerRT:boolean;
		static createFromPool(width:number,height:number,format?:number,depthStencilFormat?:number,mulSamples?:number,mipmap?:boolean):MulSampleRenderTexture;

		/**
		 * 创建一个 <code>MulSampleRenderTexture</code> 实例。
		 * @param width 宽度。
		 * @param height 高度。
		 * @param format 纹理格式。
		 * @param depthStencilFormat 深度格式。
		 * @param mulSampler 多重采样点个数。
		 * @param mipmap 是否生成mipmap。
		 */

		constructor(width:number,height:number,format?:RenderTextureFormat,depthStencilFormat?:RenderTextureDepthFormat,mulSampler?:number,mipmap?:boolean);
		protected _create(width:number,height:number):void;
		protected _createGLDepthRenderbuffer(width:number,height:number):void;
		protected(width:number,height:number):void;
		_end():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;
	}

	/**
	 * <code>RenderTexture</code> 类用于创建渲染目标。
	 */
	class RenderTexture extends BaseTexture  {

		/**
		 * 获取当前激活的Rendertexture。
		 */
		static get currentActive():RenderTexture;

		/**
		 * 从对象池获取临时渲染目标。
		 */
		static createFromPool(width:number,height:number,format?:number,depthStencilFormat?:number,mulSamples?:number,mipmap?:boolean):RenderTexture;

		/**
		 * 回收渲染目标到对象池,释放后可通过createFromPool复用。
		 */
		static recoverToPool(renderTexture:RenderTexture):void;

		/**
		 * 绑定到主画布上的RenderTexture
		 */
		static get bindCanvasRender():RenderTexture;
		static set bindCanvasRender(value:RenderTexture);
		protected _mulSampler:number;

		/**
		 * @inrernal 是否使用多重采样
		 */
		protected _mulSamplerRT:boolean;
		protected _depthAttachMode:RTDEPTHATTACHMODE;

		/**
		 * 深度格式。
		 */
		get depthStencilFormat():number;

		/**
		 * @override 
		 */
		get defaulteTexture():BaseTexture;
		get mulSampler():number;
		get depthStencilTexture():BaseTexture;

		/**
		 * FramBuffer的DepthAttach绑定模式
		 */
		set depthAttachMode(value:RTDEPTHATTACHMODE);
		get depthAttachMode():RTDEPTHATTACHMODE;

		/**
		 * 创建一个 <code>RenderTexture</code> 实例。
		 * @param width 宽度。
		 * @param height 高度。
		 * @param format 纹理格式。
		 * @param depthStencilFormat 深度格式。
		 * @param mipmap 是否生成mipmap。
		 */

		constructor(width:number,height:number,format?:RenderTextureFormat,depthStencilFormat?:RenderTextureDepthFormat,mipmap?:boolean);

		/**
		 * 创建gl_Texture的类型，当渲染器拿到此RT时，会将gl_texture的值传给渲染
		 * @param width 
		 * @param height 
		 */
		protected _creatGlTexture(width:number,height:number):void;

		/**
		 * 创建gl_DepthTexture的类型，用来存储深度信息，可以拷贝出来当贴图用
		 * @param width 
		 * @param height 
		 */
		protected _createGLDepthTexture(width:number,height:number):void;

		/**
		 * 创建gl_DepthRender的类型，用来存储深度信息
		 * @param width 
		 * @param height 
		 */
		protected _createGLDepthRenderbuffer(width:number,height:number):void;

		/**
		 * 获得像素数据。
		 * @param x X像素坐标。
		 * @param y Y像素坐标。
		 * @param width 宽度。
		 * @param height 高度。
		 * @return 像素数据。
		 */
		getData(x:number,y:number,width:number,height:number,out:Uint8Array|Float32Array):Uint8Array|Float32Array;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;
	}

enum TextureCubeFace {
    /**+x */
    PositiveX = 0,
    /**-x */
    NegativeX = 1,
    /**+y */
    PositiveY = 2,
    /**-y */
    NegativeY = 3,
    /**+z */
    PositiveZ = 4,
    /**-z */
    NegativeZ = 5
}

	/**
	 * <code>TextureCube</code> 类用于生成立方体纹理。
	 */
	class TextureCube extends BaseTexture  {

		/**
		 * TextureCube资源。
		 */
		static TEXTURECUBE:string;
		static TEXTURECUBEBIN:string;

		/**
		 * @private 
		 */
		private static _blackTexture:any;

		/**
		 * @private 
		 */
		private static _grayTexture:any;

		/**
		 * 黑色纯色纹理。
		 */
		static get blackTexture():TextureCube;

		/**
		 * 灰色纯色纹理。
		 */
		static get grayTexture():TextureCube;

		/**
		 * @inheritDoc 
		 */
		static _parse(data:any,propertyParams?:any,constructParams?:any[]):TextureCube;

		/**
		 * @inheritDoc 
		 */
		static _parseBin(data:any,propertyParams?:any,constructParams?:any[]):TextureCube;

		/**
		 * 加载TextureCube。
		 * @param url TextureCube地址。
		 * @param complete 完成回调。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get defaulteTexture():BaseTexture;

		/**
		 * 创建一个 <code>TextureCube</code> 实例。
		 * @param format 贴图格式。
		 * @param mipmap 是否生成mipmap。
		 */

		constructor(size:number,format?:number,mipmap?:boolean);

		/**
		 * @private 
		 */
		private _setPixels:any;

		/**
		 * 通过六张图片源填充纹理。
		 * @param 图片源数组 。
		 */
		setSixSideImageSources(source:any[],premultiplyAlpha?:boolean):void;

		/**
		 * 通过六张图片源填充纹理。
		 * @param 图片源数组 。
		 */
		setSixSidePixels(pixels:Array<Uint8Array>,miplevel?:number):void;

		/**
		 * 通过图源设置一个面的颜色。
		 * @param face 面。
		 * @param imageSource 图源。
		 * @param miplevel 层级。
		 */
		setImageSource(face:TextureCubeFace,imageSource:HTMLImageElement|HTMLCanvasElement,miplevel?:number):void;
	}

	/**
	 * <code>DefineDatas</code> 类用于创建宏定义数据集合。
	 */
	class DefineDatas implements IClone  {

		/**
		 * 创建一个 <code>DefineDatas</code> 实例。
		 */

		constructor();

		/**
		 * 添加宏定义值。
		 * @param define 宏定义值。
		 */
		add(define:ShaderDefine):void;

		/**
		 * 移除宏定义。
		 * @param define 宏定义。
		 */
		remove(define:ShaderDefine):void;

		/**
		 * 添加宏定义集合。
		 * @param define 宏定义集合。
		 */
		addDefineDatas(define:DefineDatas):void;

		/**
		 * 移除宏定义集合。
		 * @param define 宏定义集合。
		 */
		removeDefineDatas(define:DefineDatas):void;

		/**
		 * 是否有宏定义。
		 * @param define 宏定义。
		 */
		has(define:ShaderDefine):boolean;

		/**
		 * 清空宏定义。
		 */
		clear():void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:any):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;
	}

	/**
	 * <code>Shader3D</code> 类用于创建Shader3D。
	 */
	class Shader3D  {

		/**
		 * 渲染状态_剔除。
		 */
		static RENDER_STATE_CULL:number;

		/**
		 * 渲染状态_混合。
		 */
		static RENDER_STATE_BLEND:number;

		/**
		 * 渲染状态_混合源。
		 */
		static RENDER_STATE_BLEND_SRC:number;

		/**
		 * 渲染状态_混合目标。
		 */
		static RENDER_STATE_BLEND_DST:number;

		/**
		 * 渲染状态_混合源RGB。
		 */
		static RENDER_STATE_BLEND_SRC_RGB:number;

		/**
		 * 渲染状态_混合目标RGB。
		 */
		static RENDER_STATE_BLEND_DST_RGB:number;

		/**
		 * 渲染状态_混合源ALPHA。
		 */
		static RENDER_STATE_BLEND_SRC_ALPHA:number;

		/**
		 * 渲染状态_混合目标ALPHA。
		 */
		static RENDER_STATE_BLEND_DST_ALPHA:number;

		/**
		 * 渲染状态_混合常量颜色。
		 */
		static RENDER_STATE_BLEND_CONST_COLOR:number;

		/**
		 * 渲染状态_混合方程。
		 */
		static RENDER_STATE_BLEND_EQUATION:number;

		/**
		 * 渲染状态_RGB混合方程。
		 */
		static RENDER_STATE_BLEND_EQUATION_RGB:number;

		/**
		 * 渲染状态_ALPHA混合方程。
		 */
		static RENDER_STATE_BLEND_EQUATION_ALPHA:number;

		/**
		 * 渲染状态_深度测试。
		 */
		static RENDER_STATE_DEPTH_TEST:number;

		/**
		 * 渲染状态_深度写入。
		 */
		static RENDER_STATE_DEPTH_WRITE:number;

		/**
		 * 渲染状态_模板测试。
		 */
		static RENDER_STATE_STENCIL_TEST:number;

		/**
		 * 渲染状态_模板写入
		 */
		static RENDER_STATE_STENCIL_WRITE:number;

		/**
		 * 渲染状态_模板写入值
		 */
		static RENDER_STATE_STENCIL_REF:number;

		/**
		 * 渲染状态_模板写入设置
		 */
		static RENDER_STATE_STENCIL_OP:number;

		/**
		 * shader变量提交周期，自定义。
		 */
		static PERIOD_CUSTOM:number;

		/**
		 * shader变量提交周期，逐材质。
		 */
		static PERIOD_MATERIAL:number;

		/**
		 * shader变量提交周期，逐精灵和相机，注：因为精灵包含MVP矩阵，为复合属性，所以摄像机发生变化时也应提交。
		 */
		static PERIOD_SPRITE:number;

		/**
		 * shader变量提交周期，逐相机。
		 */
		static PERIOD_CAMERA:number;

		/**
		 * shader变量提交周期，逐场景。
		 */
		static PERIOD_SCENE:number;

		/**
		 * 是否开启调试模式。
		 */
		static debugMode:boolean;

		/**
		 * 调试着色器变种集合。
		 */
		static readonly debugShaderVariantCollection:ShaderVariantCollection;

		/**
		 * 注册宏定义。
		 * @param name 
		 */
		static getDefineByName(name:string):ShaderDefine;

		/**
		 * 通过Shader属性名称获得唯一ID。
		 * @param name Shader属性名称。
		 * @return 唯一ID。
		 */
		static propertyNameToID(name:string):number;

		/**
		 * 添加函数库引用。
		 * @param fileName 文件名字。
		 * @param txt 文件内容
		 */
		static addInclude(fileName:string,txt:string):void;

		/**
		 * 通过宏定义名字编译shader。
		 * @param shaderName Shader名称。
		 * @param subShaderIndex 子着色器索引。
		 * @param passIndex 通道索引。
		 * @param defineNames 宏定义名字集合。
		 */
		static compileShaderByDefineNames(shaderName:string,subShaderIndex:number,passIndex:number,defineNames:string[]):void;

		/**
		 * 添加预编译shader文件，主要是处理宏定义
		 */
		static add(name:string,attributeMap?:any,uniformMap?:any,enableInstancing?:boolean,supportReflectionProbe?:boolean):Shader3D;

		/**
		 * 获取ShaderCompile3D。
		 * @param name 
		 * @return ShaderCompile3D。
		 */
		static find(name:string):Shader3D;

		/**
		 * 名字。
		 */
		get name():string;

		/**
		 * 创建一个 <code>Shader3D</code> 实例。
		 */

		constructor(name:string,attributeMap:any,uniformMap:any,enableInstancing:boolean,supportReflectionProbe:boolean);

		/**
		 * 添加子着色器。
		 * @param 子着色器 。
		 */
		addSubShader(subShader:SubShader):void;

		/**
		 * 在特定索引获取子着色器。
		 * @param index 索引。
		 * @return 子着色器。
		 */
		getSubShaderAt(index:number):SubShader;

		/**
		 * @deprecated 通过宏定义遮罩编译shader,建议使用compileShaderByDefineNames。
		 * @param shaderName Shader名称。
		 * @param subShaderIndex 子着色器索引。
		 * @param passIndex 通道索引。
		 * @param defineMask 宏定义遮罩集合。
		 */
		static compileShader(shaderName:string,subShaderIndex:number,passIndex:number,...defineMask:any[]):void;
	}

	/**
	 * 着色器数据类。
	 */
	class ShaderData implements IClone  {

		/**
		 * 增加Shader宏定义。
		 * @param value 宏定义。
		 */
		addDefine(define:ShaderDefine):void;

		/**
		 * 移除Shader宏定义。
		 * @param value 宏定义。
		 */
		removeDefine(define:ShaderDefine):void;

		/**
		 * 是否包含Shader宏定义。
		 * @param value 宏定义。
		 */
		hasDefine(define:ShaderDefine):boolean;

		/**
		 * 清空宏定义。
		 */
		clearDefine():void;

		/**
		 * 获取布尔。
		 * @param index shader索引。
		 * @return 布尔。
		 */
		getBool(index:number):boolean;

		/**
		 * 设置布尔。
		 * @param index shader索引。
		 * @param value 布尔。
		 */
		setBool(index:number,value:boolean):void;

		/**
		 * 获取整形。
		 * @param index shader索引。
		 * @return 整形。
		 */
		getInt(index:number):number;

		/**
		 * 设置整型。
		 * @param index shader索引。
		 * @param value 整形。
		 */
		setInt(index:number,value:number):void;

		/**
		 * 获取浮点。
		 * @param index shader索引。
		 * @return 浮点。
		 */
		getNumber(index:number):number;

		/**
		 * 设置浮点。
		 * @param index shader索引。
		 * @param value 浮点。
		 */
		setNumber(index:number,value:number):void;

		/**
		 * 获取Vector2向量。
		 * @param index shader索引。
		 * @return Vector2向量。
		 */
		getVector2(index:number):Vector2;

		/**
		 * 设置Vector2向量。
		 * @param index shader索引。
		 * @param value Vector2向量。
		 */
		setVector2(index:number,value:Vector2):void;

		/**
		 * 获取Vector3向量。
		 * @param index shader索引。
		 * @return Vector3向量。
		 */
		getVector3(index:number):Vector3;

		/**
		 * 设置Vector3向量。
		 * @param index shader索引。
		 * @param value Vector3向量。
		 */
		setVector3(index:number,value:Vector3):void;

		/**
		 * 获取颜色。
		 * @param index shader索引。
		 * @return 颜色向量。
		 */
		getVector(index:number):Vector4;

		/**
		 * 设置向量。
		 * @param index shader索引。
		 * @param value 向量。
		 */
		setVector(index:number,value:Vector4):void;

		/**
		 * 获取四元数。
		 * @param index shader索引。
		 * @return 四元。
		 */
		getQuaternion(index:number):Quaternion;

		/**
		 * 设置四元数。
		 * @param index shader索引。
		 * @param value 四元数。
		 */
		setQuaternion(index:number,value:Quaternion):void;

		/**
		 * 获取矩阵。
		 * @param index shader索引。
		 * @return 矩阵。
		 */
		getMatrix4x4(index:number):Matrix4x4;

		/**
		 * 设置矩阵。
		 * @param index shader索引。
		 * @param value 矩阵。
		 */
		setMatrix4x4(index:number,value:Matrix4x4):void;

		/**
		 * 获取Buffer。
		 * @param index shader索引。
		 * @return 
		 */
		getBuffer(shaderIndex:number):Float32Array;

		/**
		 * 设置Buffer。
		 * @param index shader索引。
		 * @param value buffer数据。
		 */
		setBuffer(index:number,value:Float32Array):void;

		/**
		 * 设置纹理。
		 * @param index shader索引。
		 * @param value 纹理。
		 */
		setTexture(index:number,value:BaseTexture):void;

		/**
		 * 获取纹理。
		 * @param index shader索引。
		 * @return 纹理。
		 */
		getTexture(index:number):BaseTexture;
		setValueData(index:number,value:any):void;
		getValueData(index:number):any;

		/**
		 * 设置Attribute。
		 * @param index shader索引。
		 * @param value 纹理。
		 */
		setAttribute(index:number,value:Int32Array):void;

		/**
		 * 获取Attribute。
		 * @param index shader索引。
		 * @return 纹理。
		 */
		getAttribute(index:number):any[];

		/**
		 * 获取长度。
		 * @return 长度。
		 */
		getLength():number;

		/**
		 * 设置长度。
		 * @param 长度 。
		 */
		setLength(value:number):void;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneTo(destObject:ShaderData):void;

		/**
		 * 克隆。
		 * @return 克隆副本。
		 */
		clone():any;

		/**
		 * 克隆。
		 * @param destObject 克隆源。
		 */
		cloneToForNative(destObject:any):void;
		needRenewArrayBufferForNative(index:number):void;
		getDataForNative():any[];
		setReferenceForNative(value:any):number;
		static setRuntimeValueMode(bReference:boolean):void;
		clearRuntimeCopyArray():void;
	}

	/**
	 * <code>ShaderDefine</code> 类用于定义宏数据。
	 */
	class ShaderDefine  {

		/**
		 * 创建一个宏定义的实例
		 * @param index 宏索引
		 * @param value 宏值
		 */

		constructor(index:number,value:number);
	}

	/**
	 * <code>ShaderPass</code> 类用于实现ShaderPass。
	 */
	class ShaderPass extends ShaderCompile  {

		/**
		 * 渲染状态。
		 */
		get renderState():RenderState;

		constructor(owner:SubShader,vs:string,ps:string,stateMap:{[key:string]:number;});

		/**
		 * @private 
		 */
		protected _compileToTree(parent:ShaderNode,lines:any[],start:number,includefiles:any[],defs:any):void;

		/**
		 * 添加标记。
		 * @param key 标记键。
		 * @param value 标记值。
		 */
		setTag(key:string,value:string):void;

		/**
		 * 获取标记值。
		 * @return key 标记键。
		 */
		getTag(key:string):string;
	}

	/**
	 * 着色器变种。
	 */
	class ShaderVariant  {

		/**
		 * 着色器。
		 */
		get shader():Shader3D;

		/**
		 * 子着色器索引。
		 */
		get subShaderIndex():number;

		/**
		 * 通道索引。
		 */
		get passIndex():number;

		/**
		 * 宏定义集合。
		 */
		get defineNames():Readonly<string[]>;

		/**
		 * 创建着色器变种。
		 * @param shader 着色器
		 * @param subShaderIndex 子着色器索引
		 * @param passIndex 通道索引
		 * @param defines 宏定义集合
		 */

		constructor(shader:Shader3D,subShaderIndex:number,passIndex:number,defines:string[]);

		/**
		 * 给着色器变种赋值。
		 * @param shader 着色器
		 * @param subShaderIndex 子着色器索引
		 * @param passIndex 通道索引
		 * @param defineNames 宏定义集合
		 */
		setValue(shader:Shader3D,subShaderIndex:number,passIndex:number,defineNames:string[]):void;

		/**
		 * 是否相等。
		 * @param other 其它着色器变种
		 * @return 是否相等。
		 */
		equal(other:ShaderVariant):boolean;

		/**
		 * 克隆。
		 * @return 着色器变种。
		 */
		clone():ShaderVariant;
	}

	/**
	 * 着色器变种集合。
	 */
	class ShaderVariantCollection  {

		/**
		 * 是否已经全部编译。
		 */
		get allCompiled():boolean;

		/**
		 * 包含的变种数量。
		 */
		get variantCount():number;

		/**
		 * 添加着色器变种。
		 * @param variant 着色器变种。
		 * @param 是否添加成功 。
		 */
		add(variant:ShaderVariant):boolean;

		/**
		 * 移除着色器变种。
		 * @param variant 着色器变种。
		 * @return 是否移除成功。
		 */
		remove(variant:ShaderVariant):boolean;

		/**
		 * 是否包含着色器变种。
		 * @param variant 着色器变种。
		 */
		contatins(variant:ShaderVariant):boolean;

		/**
		 * 通过索引获取着色器变种。
		 * @param index 索引。
		 * @returns 着色器变种。
		 */
		getByIndex(index:number):ShaderVariant;

		/**
		 * 清空。
		 */
		clear():void;

		/**
		 * 执行编译。
		 */
		compile():void;
	}

	/**
	 * <code>SubShader</code> 类用于创建SubShader。
	 */
	class SubShader  {

		/**
		 * 创建一个 <code>SubShader</code> 实例。
		 * @param attributeMap 顶点属性表。
		 * @param uniformMap uniform属性表。
		 */

		constructor(attributeMap:any,uniformMap:any);

		/**
		 * 添加标记。
		 * @param key 标记键。
		 * @param value 标记值。
		 */
		setFlag(key:string,value:string):void;

		/**
		 * 获取标记值。
		 * @return key 标记键。
		 */
		getFlag(key:string):string;

		/**
		 * 添加着色器Pass
		 * @param vs 
		 * @param ps 
		 * @param stateMap 
		 * @param pipelineMode 渲染管线模式。
		 */
		addShaderPass(vs:string,ps:string,stateMap?:{[key:string]:number;},pipelineMode?:string):ShaderPass;
	}

enum ShadowLightType {
    /**直射光 */
    DirectionLight = 0,
    /**聚光 */
    SpotLight = 1,
    /**点光 */
    PointLight = 2
}

	/**
	 * <code>TextMesh</code> 类用于创建文本网格。
	 */
	class TextMesh  {
		private _text:any;
		private _fontSize:any;
		private _color:any;

		/**
		 * 获取文本。
		 * @return 文本。
		 */
		get text():string;

		/**
		 * 设置文本。
		 * @param value 文本。
		 */
		set text(value:string);

		/**
		 * 获取字体尺寸。
		 * @param value 字体尺寸。
		 */
		get fontSize():number;

		/**
		 * 设置字体储存。
		 * @return 字体尺寸。
		 */
		set fontSize(value:number);

		/**
		 * 获取颜色。
		 * @return 颜色。
		 */
		get color():Color;

		/**
		 * 设置颜色。
		 * @param 颜色 。
		 */
		set color(value:Color);

		/**
		 * 创建一个新的 <code>TextMesh</code> 实例。
		 */

		constructor();
	}

	/**
	 * <code>Touch</code> 类用于实现触摸描述。
	 */
	class Touch implements ISingletonElement  {

		/**
		 * [实现IListPool接口]
		 */
		private _indexInList:any;

		/**
		 * 获取唯一识别ID。
		 * @return 唯一识别ID。
		 */
		get identifier():number;

		/**
		 * 获取触摸点的像素坐标。
		 * @return 触摸点的像素坐标 [只读]。
		 */
		get position():Vector2;

		/**
		 * [实现ISingletonElement接口]
		 */
		_getIndexInList():number;

		/**
		 * [实现ISingletonElement接口]
		 */
		_setIndexInList(index:number):void;
	}

	/**
	 * <code>Physics</code> 类用于简单物理检测。
	 */
	class Physics3DUtils  {

		/**
		 * 默认碰撞组
		 */
		static COLLISIONFILTERGROUP_DEFAULTFILTER:number;

		/**
		 * 静态碰撞组
		 */
		static COLLISIONFILTERGROUP_STATICFILTER:number;

		/**
		 * 运动学刚体碰撞组
		 */
		static COLLISIONFILTERGROUP_KINEMATICFILTER:number;

		/**
		 * 碎片碰撞组
		 */
		static COLLISIONFILTERGROUP_DEBRISFILTER:number;

		/**
		 * 传感器触发器
		 */
		static COLLISIONFILTERGROUP_SENSORTRIGGER:number;

		/**
		 * 字符过滤器
		 */
		static COLLISIONFILTERGROUP_CHARACTERFILTER:number;

		/**
		 * 自定义过滤1
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER1:number;

		/**
		 * 自定义过滤2
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER2:number;

		/**
		 * 自定义过滤3
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER3:number;

		/**
		 * 自定义过滤4
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER4:number;

		/**
		 * 自定义过滤5
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER5:number;

		/**
		 * 自定义过滤6
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER6:number;

		/**
		 * 自定义过滤7
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER7:number;

		/**
		 * 自定义过滤8
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER8:number;

		/**
		 * 自定义过滤9
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER9:number;

		/**
		 * 自定义过滤10
		 */
		static COLLISIONFILTERGROUP_CUSTOMFILTER10:number;

		/**
		 * 所有过滤
		 */
		static COLLISIONFILTERGROUP_ALLFILTER:number;

		/**
		 * 重力值。
		 */
		static gravity:Vector3;

		/**
		 * 创建一个 <code>Physics</code> 实例。
		 */

		constructor();

		/**
		 * 是否忽略两个碰撞器的碰撞检测。
		 * @param collider1 碰撞器一。
		 * @param collider2 碰撞器二。
		 * @param ignore 是否忽略。
		 */
		static setColliderCollision(collider1:PhysicsComponent,collider2:PhysicsComponent,collsion:boolean):void;

		/**
		 * 获取是否忽略两个碰撞器的碰撞检测。
		 * @param collider1 碰撞器一。
		 * @param collider2 碰撞器二。
		 * @return 是否忽略。
		 */
		static getIColliderCollision(collider1:PhysicsComponent,collider2:PhysicsComponent):boolean;
	}

	/**
	 * <code>Picker</code> 类用于创建拾取。
	 */
	class Picker  {
		private static _tempVector30:any;
		private static _tempVector31:any;
		private static _tempVector32:any;
		private static _tempVector33:any;
		private static _tempVector34:any;

		/**
		 * 创建一个 <code>Picker</code> 实例。
		 */

		constructor();

		/**
		 * 计算鼠标生成的射线。
		 * @param point 鼠标位置。
		 * @param viewPort 视口。
		 * @param projectionMatrix 透视投影矩阵。
		 * @param viewMatrix 视图矩阵。
		 * @param world 世界偏移矩阵。
		 * @return out  输出射线。
		 */
		static calculateCursorRay(point:Vector2,viewPort:Viewport,projectionMatrix:Matrix4x4,viewMatrix:Matrix4x4,world:Matrix4x4,out:Ray):void;

		/**
		 * 计算射线和三角形碰撞并返回碰撞距离。
		 * @param ray 射线。
		 * @param vertex1 顶点1。
		 * @param vertex2 顶点2。
		 * @param vertex3 顶点3。
		 * @return 射线距离三角形的距离，返回Number.NaN则不相交。
		 */
		static rayIntersectsTriangle(ray:Ray,vertex1:Vector3,vertex2:Vector3,vertex3:Vector3):number;
	}

	/**
	 */
	class Size  {

		/**
		 * 全局场景的屏幕大小
		 */
		static get fullScreen():Size;
		private _width:any;
		private _height:any;

		/**
		 * 宽度
		 */
		get width():number;

		/**
		 * 高度
		 */
		get height():number;

		/**
		 * 创建Size实例
		 * @param width 宽度
		 * @param height 高度
		 */

		constructor(width:number,height:number);
	}

	/**
	 * <code>Utils3D</code> 类用于创建3D工具。
	 */
	class Utils3D  {
		private static _tempVector3_0:any;
		private static _tempVector3_1:any;
		private static _tempArray16_0:any;
		private static _tempArray16_1:any;
		private static _tempArray16_2:any;
		private static _tempArray16_3:any;

		/**
		 * 通过数平移、旋转、缩放值计算到结果矩阵数组,骨骼动画专用。
		 * @param tx left矩阵数组。
		 * @param ty left矩阵数组的偏移。
		 * @param tz right矩阵数组。
		 * @param qx right矩阵数组的偏移。
		 * @param qy 输出矩阵数组。
		 * @param qz 输出矩阵数组的偏移。
		 * @param qw 输出矩阵数组的偏移。
		 * @param sx 输出矩阵数组的偏移。
		 * @param sy 输出矩阵数组的偏移。
		 * @param sz 输出矩阵数组的偏移。
		 * @param outArray 结果矩阵数组。
		 * @param outOffset 结果矩阵数组的偏移。
		 */
		private static _rotationTransformScaleSkinAnimation:any;

		/**
		 * 根据四元数旋转三维向量。
		 * @param source 源三维向量。
		 * @param rotation 旋转四元数。
		 * @param out 输出三维向量。
		 */
		static transformVector3ArrayByQuat(sourceArray:Float32Array,sourceOffset:number,rotation:Quaternion,outArray:Float32Array,outOffset:number):void;

		/**
		 * 通过数组数据计算矩阵乘法。
		 * @param leftArray left矩阵数组。
		 * @param leftOffset left矩阵数组的偏移。
		 * @param rightArray right矩阵数组。
		 * @param rightOffset right矩阵数组的偏移。
		 * @param outArray 输出矩阵数组。
		 * @param outOffset 输出矩阵数组的偏移。
		 */
		static mulMatrixByArray(leftArray:Float32Array,leftOffset:number,rightArray:Float32Array,rightOffset:number,outArray:Float32Array,outOffset:number):void;

		/**
		 * 通过数组数据计算矩阵乘法,rightArray和outArray不能为同一数组引用。
		 * @param leftArray left矩阵数组。
		 * @param leftOffset left矩阵数组的偏移。
		 * @param rightArray right矩阵数组。
		 * @param rightOffset right矩阵数组的偏移。
		 * @param outArray 结果矩阵数组。
		 * @param outOffset 结果矩阵数组的偏移。
		 */
		static mulMatrixByArrayFast(leftArray:Float32Array,leftOffset:number,rightArray:Float32Array,rightOffset:number,outArray:Float32Array,outOffset:number):void;

		/**
		 * 通过数组数据计算矩阵乘法,rightArray和outArray不能为同一数组引用。
		 * @param leftArray left矩阵数组。
		 * @param leftOffset left矩阵数组的偏移。
		 * @param rightMatrix right矩阵。
		 * @param outArray 结果矩阵数组。
		 * @param outOffset 结果矩阵数组的偏移。
		 */
		static mulMatrixByArrayAndMatrixFast(leftArray:Float32Array,leftOffset:number,rightMatrix:Matrix4x4,outArray:Float32Array,outOffset:number):void;

		/**
		 * 通过数平移、旋转、缩放值计算到结果矩阵数组。
		 * @param tX left矩阵数组。
		 * @param tY left矩阵数组的偏移。
		 * @param tZ right矩阵数组。
		 * @param qX right矩阵数组的偏移。
		 * @param qY 输出矩阵数组。
		 * @param qZ 输出矩阵数组的偏移。
		 * @param qW 输出矩阵数组的偏移。
		 * @param sX 输出矩阵数组的偏移。
		 * @param sY 输出矩阵数组的偏移。
		 * @param sZ 输出矩阵数组的偏移。
		 * @param outArray 结果矩阵数组。
		 * @param outOffset 结果矩阵数组的偏移。
		 */
		static createAffineTransformationArray(tX:number,tY:number,tZ:number,rX:number,rY:number,rZ:number,rW:number,sX:number,sY:number,sZ:number,outArray:Float32Array,outOffset:number):void;

		/**
		 * 通过矩阵转换一个三维向量数组到另外一个三维向量数组。
		 * @param source 源三维向量所在数组。
		 * @param sourceOffset 源三维向量数组偏移。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量所在数组。
		 * @param resultOffset 输出三维向量数组偏移。
		 */
		static transformVector3ArrayToVector3ArrayCoordinate(source:Float32Array,sourceOffset:number,transform:Matrix4x4,result:Float32Array,resultOffset:number):void;

		/**
		 * 通过矩阵转换一个三维向量数组到另外一个归一化的三维向量数组。
		 * @param source 源三维向量所在数组。
		 * @param sourceOffset 源三维向量数组偏移。
		 * @param transform 变换矩阵。
		 * @param result 输出三维向量所在数组。
		 * @param resultOffset 输出三维向量数组偏移。
		 */
		static transformVector3ArrayToVector3ArrayNormal(source:Float32Array,sourceOffset:number,transform:Matrix4x4,result:Float32Array,resultOffset:number):void;

		/**
		 * 获取URL版本字符。
		 * @param url 
		 * @return 
		 */
		static getURLVerion(url:string):string;

		/**
		 * 四元数旋转矩阵
		 * @param source 源数据
		 * @param rotation 旋转四元数Array
		 * @param out 输出数据
		 */
		static transformQuat(source:Vector3,rotation:Float32Array,out:Vector3):void;

		/**
		 * 修改四元数权重
		 * @param f 元数据
		 * @param weight 权重
		 * @param e 目标数据
		 */
		static quaternionWeight(f:Quaternion,weight:number,e:Quaternion):void;

		/**
		 * 将RenderTexture转换为Base64
		 * @param rendertexture 渲染Buffer
		 * @returns 
		 */
		static uint8ArrayToArrayBuffer(rendertexture:RenderTexture):String;
	}

	/**
	 * @author miner
类用于创建WebXR摄像机。
	 */
	class WebXRCamera extends Camera  {

		/**
		 * WebXRSessionManager
		 */
		private _webXRManager:any;

		/**
		 * override client
		 */
		private _clientWidth:any;

		/**
		 * override client
		 */
		private _clientHeight:any;

		/**
		 * 自定义渲染场景的渲染目标。
		 */
		get renderTarget():RenderTexture;

		/**
		 * 渲染
		 * @override 
		 * @param shader 
		 * @param replacementTag 
		 */
		render(shader?:Shader3D,replacementTag?:string):void;

		/**
		 * null function
		 */
		protected _calculateProjectionMatrix():void;

		/**
		 * destroy
		 */
		destroy():void;
	}

	/**
	 * @author miner
此类用来管理XRCamera
	 */
	class WebXRCameraManager  {

		/**
		 * reference Quaternin
		 */
		private _referenceQuaternion:any;

		/**
		 * reference Position
		 */
		private _referencedPosition:any;

		/**
		 * WebXR Session Manager
		 */
		private _webXRSessionManager:any;

		/**
		 * first Frame Flag
		 */
		private _firstFrame:any;

		/**
		 * WebXR RenderTexture
		 */
		private _XRRenderTexture:any;

		/**
		 * WebXRCamera Array
		 */
		private _rigCameras:any;

		/**
		 * Reference position
		 */
		private _position:any;

		/**
		 * parent
		 */
		owner:any;
		get position():Vector3;
		set position(newPosition:Vector3);
		set rotationQuaternion(value:Quaternion);
		get rotationQuaternion():Quaternion;
		get rigCameras():WebXRCamera[];

		/**
		 * 用来创建XRCamera管理类
		 * @param camera 
		 * @param manager 
		 */

		constructor(camera:any,manager?:WebXRSessionManager);

		/**
		 * updateFrame by WebXR Session
		 */
		_updateFromXRSession():void;

		/**
		 * update number of WebXRCamera
		 * @param viewCount 
		 */
		private _updateNumberOfRigCameras:any;

		/**
		 * TODO:update of Reference Space
		 */
		private _updateReferenceSpace:any;

		/**
		 * destroy
		 */
		destroy():void;
	}
	class WebXRCameraInfo  {

		/**
		 * depth far
		 */
		depthFar:number;

		/**
		 * depth near
		 */
		depthNear:number;

		/**
		 * camera
		 */
		camera:any;
	}

	/**
	 * 类用来管理WebXR
	 * @author miner
	 */
	class WebXRExperienceHelper  {

		/**
		 * single XRManager
		 */
		static xr_Manager:WebXRSessionManager;

		/**
		 * support webXR
		 */
		static supported:boolean;

		/**
		 * default WebLayer option
		 * XRWebGLLayerInit
		 */
		static canvasOptions:{p1: boolean;p2:boolean;p3:boolean;p4:boolean;p5:boolean;p6:boolean;};

		/**
		 * 支持XRSession模式
		 * @param sessionMode XRSessionMode = "inline" | "immersive-vr" | "immersive-ar";
		 * @returns 
		 */
		static supportXR<T>(sessionMode:string):Promise<T>;

		/**
		 * 申请WewXR交互
		 * @param sessionMode XRSessionMode
		 * @param referenceSpaceType referenceType = "viewer" | "local" | "local-floor" | "unbounded";
		 * @param cameraInfo WebXRCameraInfo webXRCamera设置
		 * @returns Promise<WebXRSessionManager>
		 */
		static enterXRAsync<T>(sessionMode:string,referenceSpaceType:string,cameraInfo:WebXRCameraInfo):Promise<T>;

		/**
		 * config WebXRCameraManager
		 * @param camera Camera
		 * @param manager WebXRSessionManager
		 * @returns 
		 */
		static setWebXRCamera(camera:Camera,manager:WebXRSessionManager):WebXRCameraManager;

		/**
		 * config WebXRInputManager
		 * @param sessionManager WebXRSessionManager
		 * @param cameraManager WebXRCameraManager
		 * @returns 
		 */
		static setWebXRInput(sessionManager:WebXRSessionManager,cameraManager:WebXRCameraManager):WebXRInputManager;
	}

	/**
	 * 类用来描述gamepad Axis
	 */
	class AxiGamepad extends EventDispatcher  {
		static EVENT_OUTPUT:string;

		/**
		 * 轴设备名字
		 */
		handness:string;

		/**
		 * 轴数量
		 */
		axisLength:number;

		/**
		 * axis Array
		 */
		private axisData:any;

		/**
		 * destroy
		 */
		destroy():void;
	}

	/**
	 * 类用来描述gamepad Button
	 */
	class ButtonGamepad extends EventDispatcher  {
		static EVENT_TOUCH_ENTER:string;
		static EVENT_TOUCH_STAY:string;
		static EVENT_TOUCH_OUT:string;
		static EVENT_PRESS_ENTER:string;
		static EVENT_PRESS_STAY:string;
		static EVENT_PRESS_OUT:string;
		static EVENT_PRESS_VALUE:string;

		/**
		 * The id of the gamepad
		 */
		handness:string;

		/**
		 * The index of the gamepad
		 */
		index:number;

		/**
		 * front touch state
		 */
		private lastTouch:any;
		private lastPress:any;
		private lastPressValue:any;

		/**
		 * current touch state
		 */
		private touch:any;
		private press:any;
		private pressValue:any;

		/**
		 * 类用于创建Button对象
		 * @param handness 设备名称
		 * @param index button缩影
		 */

		constructor(handness:string,index:number);

		/**
		 * destroy
		 */
		destroy():void;
	}

	/**
	 * @author miner
类用来描述输入设备
	 */
	class WebXRInput extends EventDispatcher  {
		static HANDNESS_LEFT:string;
		static HANDNESS_RIGHT:string;
		static EVENT_FRAMEUPDATA_WEBXRINPUT:string;
		private static tempQua:any;

		/**
		 * 预处理Button事件
		 */
		private preButtonEventList:any;

		/**
		 * 预处理axis事件
		 */
		private preAxisEventList:any;
		lastXRPose:any;

		/**
		 * handMode
		 */
		handness:string;

		/**
		 * input Ray
		 */
		ray:Ray;

		/**
		 * hand Pos
		 */
		position:Vector3;

		/**
		 * hand Rotate
		 */
		rotation:Quaternion;

		/**
		 * lastRayPos
		 */
		_lastXRPose:any;

		/**
		 * gamepad Button info
		 */
		gamepadButton:Array<ButtonGamepad>;

		/**
		 * gamepad axis Info
		 */
		gamepadAxis:AxiGamepad;

		constructor(handness:string);

		/**
		 * handle gamepad Event
		 */
		private _handleProcessGamepad:any;

		/**
		 * add button event
		 * @param index button索引
		 * @param type 事件类型
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 */
		addButtonEvent(index:number,type:string,caller:any,listener:Function):void;

		/**
		 * add axis event
		 * @param index axis索引
		 * @param type 事件类型
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 */
		addAxisEvent(index:number,type:string,caller:any,listener:Function):void;

		/**
		 * remove axis event
		 * @param index axis索引
		 * @param type 事件类型
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 */
		offAxisEvent(index:number,type:string,caller:any,listener:Function):void;

		/**
		 * remove Button event
		 * @param index axis索引
		 * @param type 事件类型
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 */
		offButtonEvent(index:number,type:string,caller:any,listener:Function):void;

		/**
		 * 销毁
		 */
		destroy():void;
	}

	/**
	 * @author miner
类用来管理输入设备
The path of the CDN the sample will fetch controller models from：
MeshSource https://cdn.jsdelivr.net/npm/
	 * @webxr-input-profiles /assets
	 * @ 1.0.9/dist/profiles/
	 */
	class WebXRInputManager  {
		static tempVec:Vector3;
		static tempVec1:Vector3;

		/**
		 * Session Manager
		 */
		private webXRSessionManager:any;

		/**
		 * webXRCamera Manager
		 */
		private webXRCameraManager:any;

		/**
		 * array of XRInput
		 */
		private controllers:any;

		/**
		 * bind of XRInput Node Render
		 */
		private controllerHandMesh:any;

		/**
		 * bind of XRInput Ray Render
		 */
		private controllerLineRender:any;

		/**
		 * line Color
		 */
		private lineColor:any;

		/**
		 * Ray length
		 */
		private rayLength:any;

		/**
		 * 类用于创建WebXRInput管理类
		 * @param webxrManager WebXR Session manager
		 * @param webXRCamera WebXR Manager
		 */

		constructor(webxrManager:WebXRSessionManager,webXRCamera:WebXRCameraManager);

		/**
		 * 更新输入挂点
		 * @param xrInput 
		 */
		private _updataMeshRender:any;

		/**
		 * WebXRInput帧循环
		 * @param xrFrame 
		 */
		private _updateFromXRFrame:any;

		/**
		 * 绑定输入设备渲染节点
		 * @param meshSprite 渲染挂点
		 * @param handness 设备名称left/right
		 */
		bindMeshNode(meshSprite:Sprite3D,handness:string):void;

		/**
		 * 绑定输入设备射线
		 * @param lineSprite 线
		 * @param handness 设备名称left/right
		 */
		bindRayNode(lineSprite:PixelLineSprite3D,handness:string):void;

		/**
		 * 获得输入设备
		 * @param handness 设备名称left/right
		 * @returns 
		 */
		getController(handness:string):WebXRInput;
	}

	/**
	 * @author miner
类用来创建WebXRRenderTexture
	 */
	class WebXRRenderTexture extends RenderTexture  {

		/**
		 * update mask
		 */
		frameLoop:number;

		/**
		 * 创建WebXRFrameBuffer
		 * @param frameBuffer 
		 */

		constructor();

		/**
		 * set frameBuffer
		 */
		set frameBuffer(value:any);

		/**
		 * No glframeBuffer create
		 * @param width 
		 * @param height 
		 */
		protected _create(width:number,height:number):void;
	}

	/**
	 * Manages an XRSession to work with layaAir engine
	 * @author miner
	 */
	class WebXRSessionManager extends EventDispatcher  {
		static EVENT_MANAGER_END:string;
		static EVENT_FRAME_LOOP:string;

		/**
		 * Underlying xr session
		 */
		session:any;

		/**
		 * XRReferenceSpace TODO
		 */
		viewerReferenceSpace:any;

		/**
		 * baseRefernceSpace
		 */
		baseReferenceSpace:any;

		/**
		 * Current XR  XRFrame
		 */
		currentFrame:any;

		/**
		 * WebXR timestamp updated every frame
		 */
		currentTimestamp:number;

		/**
		 * 默认高度补偿,在init失败后使用
		 */
		defaultHeightCompensation:number;

		/**
		 * XRReferenceSpace
		 */
		private _referenceSpace:any;

		/**
		 * "inline" | "immersive-vr" | "immersive-ar"
		 */
		private _sessionMode:any;

		/**
		 * session enable state
		 */
		private _sessionEnded:any;

		/**
		 * WebXR Base Layer
		 */
		private _baseLayer:any;

		/**
		 * web XRSystem
		 */
		private _xrNavigator:any;

		/**
		 * The current reference space used in this session.
		 * @returns XRReferenceSpace;
		 */
		get referenceSpace():any;

		/**
		 * set 参考空间
		 */
		set referenceSpace(newReferenceSpace:any);

		/**
		 * The mode for the managed XR session
		 */
		get sessionMode():any;

		/**
		 * Stops the xrSession and restores the render loop
		 */
		exitXR():void;

		/**
		 * Initializes the xr layer for the session
		 * @param xrSession 
		 * @param gl 
		 * @returns 
		 */
		initializeXRGL<T>(xrSession:any,gl:WebGLRenderingContext):Promise<T>;

		/**
		 * 浏览器是否支持WebXR
		 * @returns WebXR
		 */
		initializeAsync<T>():Promise<T>;

		/**
		 * Sessiopn模式是否支持
		 * @param sessionMode "inline" | "immersive-vr" | "immersive-ar"
		 * @returns A Promise that resolves to true if supported and false if not
		 */
		isSessionSupportedAsyn<T>(sessionMode:string):Promise<T>;

		/**
		 * 初始化Session
		 * @param xrSessionMode xrsessionMode
		 * @param xrSessionInit any initInfo
		 * @returns 
		 */
		initializeSessionAsync<T>(xrSessionMode?:string,xrSessionInit?:{}):Promise<T>;

		/**
		 * Resets the reference space to the one started the session
		 */
		resetReferenceSpace():void;

		/**
		 * Starts rendering to the xr layer
		 */
		runXRRenderLoop():void;
		endXRRenderLoop():void;

		/**
		 * Update
		 * @param xrFrame 
		 */
		private _updateByXrFrame:any;

		/**
		 * Sets the reference space on the xr session
		 * @param referenceSpaceType space to set
		 * @returns a promise that will resolve once the reference space has been set
		 */
		setReferenceSpaceTypeAsync<T>(referenceSpaceType?:string):Promise<T>;

		/**
		 * Updates the render state of the session
		 * @param state state to set
		 * @returns a promise that resolves once the render state has been updated
		 */
		updateRenderStateAsync(state:any):any;

		/**
		 * The current frame rate as reported by the device
		 */
		get currentFrameRate():number|undefined;

		/**
		 * A list of supported frame rates (only available in-session!
		 */
		get supportedFrameRates():Float32Array|undefined;

		/**
		 * Set the framerate of the session.
		 * @param rate the new framerate. This value needs to be in the supportedFrameRates array
		 * @returns a promise that resolves once the framerate has been set
		 */
		updateTargetFrameRate<T>(rate:number):Promise<T>;
		destroy():void;
	}

	/**
	 * 使用前可用<code>supported</code>查看浏览器支持。
	 */
	class Geolocation  {
		private static navigator:any;
		private static position:any;

		/**
		 * 由于权限被拒绝造成的地理信息获取失败。
		 */
		static PERMISSION_DENIED:number;

		/**
		 * 由于内部位置源返回了内部错误导致地理信息获取失败。
		 */
		static POSITION_UNAVAILABLE:number;

		/**
		 * 信息获取所用时长超出<code>timeout</code>所设置时长。
		 */
		static TIMEOUT:number;

		/**
		 * 是否支持。
		 */
		static supported:boolean;

		/**
		 * 如果<code>enableHighAccuracy</code>为true，并且设备能够提供一个更精确的位置，则会获取最佳可能的结果。
		 * 请注意,这可能会导致较慢的响应时间或增加电量消耗（如使用GPS）。
		 * 另一方面，如果设置为false，将会得到更快速的响应和更少的电量消耗。
		 * 默认值为false。
		 */
		static enableHighAccuracy:boolean;

		/**
		 * 表示允许设备获取位置的最长时间。默认为Infinity，意味着getCurentPosition()直到位置可用时才会返回信息。
		 */
		static timeout:number;

		/**
		 * 表示可被返回的缓存位置信息的最大时限。
		 * 如果设置为0，意味着设备不使用缓存位置，并且尝试获取实时位置。
		 * 如果设置为Infinity，设备必须返回缓存位置而无论其时限。
		 */
		static maximumAge:number;

		constructor();

		/**
		 * 获取设备当前位置。
		 * @param onSuccess 带有唯一<code>Position</code>参数的回调处理器。
		 * @param onError 可选的。带有错误信息的回调处理器。错误代码为Geolocation.PERMISSION_DENIED、Geolocation.POSITION_UNAVAILABLE和Geolocation.TIMEOUT之一。
		 */
		static getCurrentPosition(onSuccess:Handler,onError?:Handler):void;

		/**
		 * 监视设备当前位置。回调处理器在设备位置改变时被执行。
		 * @param onSuccess 带有唯一<code>Position</code>参数的回调处理器。
		 * @param onError 可选的。带有错误信息的回调处理器。错误代码为Geolocation.PERMISSION_DENIED、Geolocation.POSITION_UNAVAILABLE和Geolocation.TIMEOUT之一。
		 */
		static watchPosition(onSuccess:Handler,onError:Handler):number;

		/**
		 * 移除<code>watchPosition</code>安装的指定处理器。
		 * @param id 
		 */
		static clearWatch(id:number):void;
	}
	class GeolocationInfo  {
		private pos:any;
		private coords:any;

		/**
		 * 设置设备经纬度
		 * @param pos 
		 */
		setPosition(pos:any):void;

		/**
		 * 获取设备当前地理坐标的纬度
		 */
		get latitude():number;

		/**
		 * 获取设备当前地理坐标的经度
		 */
		get longitude():number;

		/**
		 * 获取设备当前地理坐标的高度
		 */
		get altitude():number;

		/**
		 * 获取设备当前地理坐标的精度
		 */
		get accuracy():number;

		/**
		 * 获取设备当前地理坐标的高度精度
		 */
		get altitudeAccuracy():number;

		/**
		 * 获取设备当前行进方向
		 */
		get heading():number;

		/**
		 * 获取设备当前的速度
		 */
		get speed():number;

		/**
		 * 获取设备得到当前位置的时间
		 */
		get timestamp():number;
	}

	/**
	 * <HtmlVideo>html多媒体数据<HtmlVideo>
	 */
	class HtmlVideo extends Bitmap  {
		video:HTMLVideoElement;
		protected _source:any;
		protected _w:number;
		protected _h:number;

		constructor();

		/**
		 * 创建一个 HtmlVideo 实例
		 */
		static create:Function;
		private createDomElement:any;

		/**
		 * 设置播放源路径
		 * @param url 播放源路径
		 * @param extension 播放源类型(1: MP4, 2: OGG)
		 */
		setSource(url:string,extension:number):void;
		private appendSource:any;

		/**
		 * 获取播放源
		 */
		getVideo():any;

		/**
		 * 销毁
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * Media用于捕捉摄像头和麦克风。可以捕捉任意之一，或者同时捕捉两者。<code>getCamera</code>前可以使用<code>supported()</code>检查当前浏览器是否支持。
	 * <b>NOTE:</b>
	 * <p>目前Media在移动平台只支持Android，不支持IOS。只可在FireFox完整地使用，Chrome测试时无法捕捉视频。</p>
	 */
	class Media  {

		constructor();

		/**
		 * 检查浏览器兼容性。
		 */
		static supported():boolean;

		/**
		 * 获取用户媒体。
		 * @param options 简单的可选项可以使<code>{ audio:true, video:true }</code>表示同时捕捉两者。详情见<i>https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia</i>。
		 * @param onSuccess 获取成功的处理器，唯一参数返回媒体的Blob地址，可以将其传给Video。
		 * @param onError 获取失败的处理器，唯一参数是Error。
		 */
		static getMedia(options:any,onSuccess:Handler,onError:Handler):void;
	}

const enum VIDEOTYPE {
    MP4 = 1,
    OGG = 2,
    CAMERA = 4,
    WEBM = 8
}

	/**
	 * <code>Video</code>将视频显示到Canvas上。<code>Video</code>可能不会在所有浏览器有效。
	 * <p>关于Video支持的所有事件参见：<i>http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp</i>。</p>
	 * <p>
	 * <b>注意：</b><br/>
	 * 在PC端可以在任何时机调用<code>play()</code>因此，可以在程序开始运行时就使Video开始播放。但是在移动端，只有在用户第一次触碰屏幕后才可以调用play()，所以移动端不可能在程序开始运行时就自动开始播放Video。
	 * </p>
	 * 
	 * <p>MDN Video链接： <i>https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video</i></p>
	 */
	class Video extends Sprite  {
		static MP4:number;
		static OGG:number;
		static CAMERA:number;
		static WEBM:number;

		/**
		 * 表示最有可能支持。
		 */
		static SUPPORT_PROBABLY:string;

		/**
		 * 表示可能支持。
		 */
		static SUPPORT_MAYBY:string;

		/**
		 * 表示不支持。
		 */
		static SUPPORT_NO:string;
		private htmlVideo:any;
		videoElement:any;
		private internalTexture:any;
		private _clickhandle:any;

		constructor(width?:number,height?:number);
		private static onAbort:any;
		private static onCanplay:any;
		private static onCanplaythrough:any;
		private static onDurationchange:any;
		private static onEmptied:any;
		private static onError:any;
		private static onLoadeddata:any;
		private static onLoadedmetadata:any;
		private static onLoadstart:any;
		private static onPause:any;
		private static onPlay:any;
		private static onPlaying:any;
		private static onProgress:any;
		private static onRatechange:any;
		private static onSeeked:any;
		private static onSeeking:any;
		private static onStalled:any;
		private static onSuspend:any;
		private static onTimeupdate:any;
		private static onVolumechange:any;
		private static onWaiting:any;
		private onPlayComplete:any;

		/**
		 * 设置播放源。
		 * @param url 播放源路径。
		 */
		load(url:string):void;

		/**
		 * 开始播放视频。
		 */
		play():void;

		/**
		 * 暂停视频播放。
		 */
		pause():void;

		/**
		 * 重新加载视频。
		 */
		reload():void;

		/**
		 * 检测是否支持播放指定格式视频。
		 * @param type 参数为Video.MP4 / Video.OGG / Video.WEBM之一。
		 * @return 表示支持的级别。可能的值：
<ul>
<li>"probably"，Video.SUPPORT_PROBABLY - 浏览器最可能支持该音频/视频类型</li>
<li>"maybe"，Video.SUPPORT_MAYBY - 浏览器也许支持该音频/视频类型</li>
<li>""，Video.SUPPORT_NO- （空字符串）浏览器不支持该音频/视频类型</li>
</ul>
		 */
		canPlayType(type:number):string;
		private renderCanvas:any;
		private onDocumentClick:any;

		/**
		 * buffered 属性返回 TimeRanges(JS)对象。TimeRanges 对象表示用户的音视频缓冲范围。缓冲范围指的是已缓冲音视频的时间范围。如果用户在音视频中跳跃播放，会得到多个缓冲范围。
		 * <p>buffered.length返回缓冲范围个数。如获取第一个缓冲范围则是buffered.start(0)和buffered.end(0)。以秒计。</p>
		 * @return TimeRanges(JS)对象
		 */
		get buffered():any;

		/**
		 * 获取当前播放源路径。
		 */
		get currentSrc():string;

		/**
		 * 设置和获取当前播放头位置。
		 */
		get currentTime():number;
		set currentTime(value:number);

		/**
		 * 设置和获取当前音量。
		 */
		set volume(value:number);
		get volume():number;

		/**
		 * 表示视频元素的就绪状态：
		 * <ul>
		 * <li>0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息</li>
		 * <li>1 = HAVE_METADATA - 关于音频/视频就绪的元数据</li>
		 * <li>2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒</li>
		 * <li>3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的</li>
		 * <li>4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放</li>
		 * </ul>
		 */
		get readyState():any;

		/**
		 * 获取视频源尺寸。ready事件触发后可用。
		 */
		get videoWidth():number;
		get videoHeight():number;

		/**
		 * 获取视频长度（秒）。ready事件触发后可用。
		 */
		get duration():number;

		/**
		 * 返回音频/视频的播放是否已结束
		 */
		get ended():boolean;

		/**
		 * 返回表示音频/视频错误状态的 MediaError（JS）对象。
		 */
		get error():boolean;

		/**
		 * 设置或返回音频/视频是否应在结束时重新播放。
		 */
		get loop():boolean;
		set loop(value:boolean);

		/**
		 * 设置视频的x坐标
		 * @override 
		 */
		set x(val:number);

		/**
		 * @override 
		 */
		get x():number;

		/**
		 * 设置视频的y坐标
		 * @override 
		 */
		set y(val:number);

		/**
		 * @override 
		 */
		get y():number;

		/**
		 * playbackRate 属性设置或返回音频/视频的当前播放速度。如：
		 * <ul>
		 * <li>1.0 正常速度</li>
		 * <li>0.5 半速（更慢）</li>
		 * <li>2.0 倍速（更快）</li>
		 * <li>-1.0 向后，正常速度</li>
		 * <li>-0.5 向后，半速</li>
		 * </ul>
		 * <p>只有 Google Chrome 和 Safari 支持 playbackRate 属性。</p>
		 */
		get playbackRate():number;
		set playbackRate(value:number);

		/**
		 * 获取和设置静音状态。
		 */
		get muted():boolean;
		set muted(value:boolean);

		/**
		 * 返回视频是否暂停
		 */
		get paused():boolean;

		/**
		 * preload 属性设置或返回是否在页面加载后立即加载视频。可赋值如下：
		 * <ul>
		 * <li>auto	指示一旦页面加载，则开始加载视频。</li>
		 * <li>metadata	指示当页面加载后仅加载音频/视频的元数据。</li>
		 * <li>none	指示页面加载后不应加载音频/视频。</li>
		 * </ul>
		 */
		get preload():string;
		set preload(value:string);

		/**
		 * 参见 <i>http://www.w3school.com.cn/tags/av_prop_seekable.asp</i>。
		 */
		get seekable():any;

		/**
		 * seeking 属性返回用户目前是否在音频/视频中寻址。
		 * 寻址中（Seeking）指的是用户在音频/视频中移动/跳跃到新的位置。
		 */
		get seeking():boolean;

		/**
		 * @param width 
		 * @param height 
		 * @override 
		 */
		size(width:number,height:number):Sprite;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * @override 
		 */
		get height():number;

		/**
		 * 销毁内部事件绑定。
		 * @override 
		 */
		destroy(detroyChildren?:boolean):void;
		private syncVideoPosition:any;
	}

	/**
	 * 加速度x/y/z的单位均为m/s²。
	 * 在硬件（陀螺仪）不支持的情况下，alpha、beta和gamma值为null。
	 * @author Survivor
	 */
	class AccelerationInfo  {

		/**
		 * x轴上的加速度值。
		 */
		x:number;

		/**
		 * y轴上的加速度值。
		 */
		y:number;

		/**
		 * z轴上的加速度值。
		 */
		z:number;

		constructor();
	}

	/**
	 * Accelerator.instance获取唯一的Accelerator引用，请勿调用构造函数。
	 * 
	 * <p>
	 * listen()的回调处理器接受四个参数：
	 * <ol>
	 * <li><b>acceleration</b>: 表示用户给予设备的加速度。</li>
	 * <li><b>accelerationIncludingGravity</b>: 设备受到的总加速度（包含重力）。</li>
	 * <li><b>rotationRate</b>: 设备的自转速率。</li>
	 * <li><b>interval</b>: 加速度获取的时间间隔（毫秒）。</li>
	 * </ol>
	 * </p>
	 * <p>
	 * <b>NOTE</b><br/>
	 * 如，rotationRate的alpha在apple和moz文档中都是z轴旋转角度，但是实测是x轴旋转角度。为了使各属性表示的值与文档所述相同，实际值与其他属性进行了对调。
	 * 其中：
	 * <ul>
	 * <li>alpha使用gamma值。</li>
	 * <li>beta使用alpha值。</li>
	 * <li>gamma使用beta。</li>
	 * </ul>
	 * 目前孰是孰非尚未可知，以此为注。
	 * </p>
	 */
	class Accelerator extends EventDispatcher  {

		/**
		 * Accelerator的唯一引用。
		 */
		private static _instance:any;
		static get instance():Accelerator;
		private static acceleration:any;
		private static accelerationIncludingGravity:any;
		private static rotationRate:any;

		constructor(singleton:number);

		/**
		 * 侦听加速器运动。
		 * @param observer 回调函数接受4个参数，见类说明。
		 * @override 
		 */
		on(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * 取消侦听加速器。
		 * @param handle 侦听加速器所用处理器。
		 * @override 
		 */
		off(type:string,caller:any,listener:Function,onceOnly?:boolean):EventDispatcher;
		private onDeviceOrientationChange:any;
		private static transformedAcceleration:any;

		/**
		 * 把加速度值转换为视觉上正确的加速度值。依赖于Browser.window.orientation，可能在部分低端机无效。
		 * @param acceleration 
		 * @return 
		 */
		static getTransformedAcceleration(acceleration:AccelerationInfo):AccelerationInfo;
	}

	/**
	 * 使用Gyroscope.instance获取唯一的Gyroscope引用，请勿调用构造函数。
	 * 
	 * <p>
	 * listen()的回调处理器接受两个参数：
	 * <code>function onOrientationChange(absolute:Boolean, info:RotationInfo):void</code>
	 * <ol>
	 * <li><b>absolute</b>: 指示设备是否可以提供绝对方位数据（指向地球坐标系），或者设备决定的任意坐标系。关于坐标系参见<i>https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained</i>。</li>
	 * <li><b>info</b>: <code>RotationInfo</code>类型参数，保存设备的旋转值。</li>
	 * </ol>
	 * </p>
	 * 
	 * <p>
	 * 浏览器兼容性参见：<i>http://caniuse.com/#search=deviceorientation</i>
	 * </p>
	 */
	class Gyroscope extends EventDispatcher  {
		private static info:any;

		/**
		 * Gyroscope的唯一引用。
		 */
		private static _instance:any;
		static get instance():Gyroscope;

		constructor(singleton:number);

		/**
		 * 监视陀螺仪运动。
		 * @param observer 回调函数接受一个Boolean类型的<code>absolute</code>和<code>GyroscopeInfo</code>类型参数。
		 * @override 
		 */
		on(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * 取消指定处理器对陀螺仪的监视。
		 * @param observer 
		 * @override 
		 */
		off(type:string,caller:any,listener:Function,onceOnly?:boolean):EventDispatcher;
		private onDeviceOrientationChange:any;
	}

	/**
	 * 保存旋转信息的类。请勿修改本类的属性。
	 * @author Survivor
	 */
	class RotationInfo  {

		/**
		 * <p>
		 * 指示设备是否可以提供绝对方位数据（指向地球坐标系），或者设备决定的任意坐标系。
		 * 关于坐标系参见<i>https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained</i>。
		 * </p>
		 * 需要注意的是，IOS环境下，该值始终为false。即使如此，你依旧可以从<code>alpha</code>中取得正确的值。
		 */
		absolute:boolean;

		/**
		 * Z轴旋转角度，其值范围从0至360。
		 * 若<code>absolute</code>为true或者在IOS中，alpha值是从北方到当前设备方向的角度值。
		 */
		alpha:number;

		/**
		 * X轴旋转角度, 其值范围从-180至180。代表设备从前至后的运动。
		 */
		beta:number;

		/**
		 * Y轴旋转角度，其值范围从-90至90。代表设备从左至右的运动。
		 */
		gamma:number;

		/**
		 * 罗盘数据的精确度（角度）。仅IOS可用。
		 */
		compassAccuracy:number;

		constructor();
	}

	/**
	 * Shake只能在支持此操作的设备上有效。
	 */
	class Shake extends EventDispatcher  {
		private throushold:any;
		private shakeInterval:any;
		private callback:any;
		private lastX:any;
		private lastY:any;
		private lastZ:any;
		private lastMillSecond:any;

		constructor();
		private static _instance:any;
		static get instance():Shake;

		/**
		 * 开始响应设备摇晃。
		 * @param throushold 响应的瞬时速度阈值，轻度摇晃的值约在5~10间。
		 * @param timeout 设备摇晃的响应间隔时间。
		 * @param callback 在设备摇晃触发时调用的处理器。
		 */
		start(throushold:number,interval:number):void;

		/**
		 * 停止响应设备摇晃。
		 */
		stop():void;
		private onShake:any;
		private isShaked:any;
	}

	/**
	 * 动画播放完毕后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 播放到某标签后调度。
	 * @eventType Event.LABEL
	 */

	/**
	 * <p> <code>Animation</code> 是Graphics动画类。实现了基于Graphics的动画创建、播放、控制接口。</p>
	 * <p>本类使用了动画模版缓存池，它以一定的内存开销来节省CPU开销，当相同的动画模版被多次使用时，相比于每次都创建新的动画模版，使用动画模版缓存池，只需创建一次，缓存之后多次复用，从而节省了动画模版创建的开销。</p>
	 * <p>动画模版缓存池，以key-value键值对存储，key可以自定义，也可以从指定的配置文件中读取，value为对应的动画模版，是一个Graphics对象数组，每个Graphics对象对应一个帧图像，动画的播放实质就是定时切换Graphics对象。</p>
	 * <p>使用set source、loadImages(...)、loadAtlas(...)、loadAnimation(...)方法可以创建动画模版。使用play(...)可以播放指定动画。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>Text</code> 实例。</caption>
package
{
import laya.display.Animation;
import laya.net.Loader;
import laya.utils.Handler;
public class Animation_Example
{
public function Animation_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
init();//初始化
}
private function init():void
{
var animation:Animation = new Animation();//创建一个 Animation 类的实例对象 animation 。
animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
animation.x = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
animation.y = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
animation.interval = 50;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
animation.play();//播放动画。
Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
}
}
}
	 * @example Animation_Example();
function Animation_Example(){
    Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
    Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
    init();//初始化
}
function init()
{
    var animation = new Laya.Animation();//创建一个 Animation 类的实例对象 animation 。
    animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
    animation.x = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
    animation.y = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
    animation.interval = 50;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
    animation.play();//播放动画。
    Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
}
	 * @example import Animation = laya.display.Animation;
class Animation_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.init();
    }
    private init(): void {
        var animation:Animation = new Laya.Animation();//创建一个 Animation 类的实例对象 animation 。
        animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
        animation.x = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
        animation.y = 200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
        animation.interval = 50;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
        animation.play();//播放动画。
        Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
    }
}
new Animation_Example();
	 */
	class Animation extends AnimationBase  {

		/**
		 * <p>动画模版缓存池，以key-value键值对存储，key可以自定义，也可以从指定的配置文件中读取，value为对应的动画模版，是一个Graphics对象数组，每个Graphics对象对应一个帧图像，动画的播放实质就是定时切换Graphics对象。</p>
		 * <p>使用loadImages(...)、loadAtlas(...)、loadAnimation(...)、set source方法可以创建动画模版。使用play(...)可以播放指定动画。</p>
		 */
		static framesMap:any;

		/**
		 * @private 
		 */
		protected _frames:any[];

		/**
		 * @private 
		 */
		protected _url:string;

		/**
		 * 创建一个新的 <code>Animation</code> 实例。
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * <p>开始播放动画。会在动画模版缓存池中查找key值为name的动画模版，存在则用此动画模版初始化当前序列帧， 如果不存在，则使用当前序列帧。</p>
		 * <p>play(...)方法被设计为在创建实例后的任何时候都可以被调用，调用后就处于播放状态，当相应的资源加载完毕、调用动画帧填充方法(set frames)或者将实例显示在舞台上时，会判断是否处于播放状态，如果是，则开始播放。</p>
		 * <p>配合wrapMode属性，可设置动画播放顺序类型。</p>
		 * @param start （可选）指定动画播放开始的索引(int)或帧标签(String)。帧标签可以通过addLabel(...)和removeLabel(...)进行添加和删除。
		 * @param loop （可选）是否循环播放。
		 * @param name （可选）动画模板在动画模版缓存池中的key，也可认为是动画名称。如果name为空，则播放当前动画序列帧；如果不为空，则在动画模版缓存池中寻找key值为name的动画模版，如果存在则用此动画模版初始化当前序列帧并播放，如果不存在，则仍然播放当前动画序列帧；如果没有当前动画的帧数据，则不播放，但该实例仍然处于播放状态。
		 * @override 
		 */
		play(start?:any,loop?:boolean,name?:string):void;

		/**
		 * @private 
		 */
		protected _setFramesFromCache(name:string,showWarn?:boolean):boolean;

		/**
		 * @private 
		 */
		private _copyLabels:any;

		/**
		 * @private 
		 * @override 
		 */
		protected _frameLoop():void;

		/**
		 * @private 
		 * @override 
		 */
		protected _displayToIndex(value:number):void;

		/**
		 * 当前动画的帧图像数组。本类中，每个帧图像是一个Graphics对象，而动画播放就是定时切换Graphics对象的过程。
		 */
		get frames():any[];
		set frames(value:any[]);

		/**
		 * <p>动画数据源。</p>
		 * <p>类型如下：<br/>
		 * 1. LayaAir IDE动画文件路径：使用此类型需要预加载所需的图集资源，否则会创建失败，如果不想预加载或者需要创建完毕的回调，请使用loadAnimation(...)方法；<br/>
		 * 2. 图集路径：使用此类型创建的动画模版不会被缓存到动画模版缓存池中，如果需要缓存或者创建完毕的回调，请使用loadAtlas(...)方法；<br/>
		 * 3. 图片路径集合：使用此类型创建的动画模版不会被缓存到动画模版缓存池中，如果需要缓存，请使用loadImages(...)方法。</p>
		 * @param value 数据源。比如：图集："xx/a1.atlas"；图片集合："a1.png,a2.png,a3.png"；LayaAir IDE动画"xx/a1.ani"。
		 */
		set source(value:string);

		/**
		 * 设置自动播放的动画名称，在LayaAir IDE中可以创建的多个动画组成的动画集合，选择其中一个动画名称进行播放。
		 */
		set autoAnimation(value:string);

		/**
		 * 是否自动播放，默认为false。如果设置为true，则动画被创建并添加到舞台后自动播放。
		 */
		set autoPlay(value:boolean);

		/**
		 * 停止动画播放，并清理对象属性。之后可存入对象池，方便对象复用。
		 * @override 
		 */
		clear():AnimationBase;

		/**
		 * <p>根据指定的动画模版初始化当前动画序列帧。选择动画模版的过程如下：1. 动画模版缓存池中key为cacheName的动画模版；2. 如果不存在，则加载指定的图片集合并创建动画模版。注意：只有指定不为空的cacheName，才能将创建好的动画模版以此为key缓存到动画模版缓存池，否则不进行缓存。</p>
		 * <p>动画模版缓存池是以一定的内存开销来节省CPU开销，当相同的动画模版被多次使用时，相比于每次都创建新的动画模版，使用动画模版缓存池，只需创建一次，缓存之后多次复用，从而节省了动画模版创建的开销。</p>
		 * <p>因为返回值为Animation对象本身，所以可以使用如下语法：loadImages(...).loadImages(...).play(...);。</p>
		 * @param urls 图片路径集合。需要创建动画模版时，会以此为数据源。参数形如：[url1,url2,url3,...]。
		 * @param cacheName （可选）动画模板在动画模版缓存池中的key。如果此参数不为空，表示使用动画模版缓存池。如果动画模版缓存池中存在key为cacheName的动画模版，则使用此模版。否则，创建新的动画模版，如果cacheName不为空，则以cacheName为key缓存到动画模版缓存池中，如果cacheName为空，不进行缓存。
		 * @return 返回Animation对象本身。
		 */
		loadImages(urls:any[],cacheName?:string):Animation;

		/**
		 * <p>根据指定的动画模版初始化当前动画序列帧。选择动画模版的过程如下：1. 动画模版缓存池中key为cacheName的动画模版；2. 如果不存在，则加载指定的图集并创建动画模版。</p>
		 * <p>注意：只有指定不为空的cacheName，才能将创建好的动画模版以此为key缓存到动画模版缓存池，否则不进行缓存。</p>
		 * <p>动画模版缓存池是以一定的内存开销来节省CPU开销，当相同的动画模版被多次使用时，相比于每次都创建新的动画模版，使用动画模版缓存池，只需创建一次，缓存之后多次复用，从而节省了动画模版创建的开销。</p>
		 * <p>因为返回值为Animation对象本身，所以可以使用如下语法：loadAtlas(...).loadAtlas(...).play(...);。</p>
		 * @param url 图集路径。需要创建动画模版时，会以此为数据源。
		 * @param loaded （可选）使用指定图集初始化动画完毕的回调。
		 * @param cacheName （可选）动画模板在动画模版缓存池中的key。如果此参数不为空，表示使用动画模版缓存池。如果动画模版缓存池中存在key为cacheName的动画模版，则使用此模版。否则，创建新的动画模版，如果cacheName不为空，则以cacheName为key缓存到动画模版缓存池中，如果cacheName为空，不进行缓存。
		 * @return 返回动画本身。
		 */
		loadAtlas(url:string,loaded?:Handler,cacheName?:string):Animation;

		/**
		 * <p>加载并解析由LayaAir IDE制作的动画文件，此文件中可能包含多个动画。默认帧率为在IDE中设计的帧率，如果调用过set interval，则使用此帧间隔对应的帧率。加载后创建动画模版，并缓存到动画模版缓存池，key "url#动画名称" 对应相应动画名称的动画模板，key "url#" 对应动画模版集合的默认动画模版。</p>
		 * <p>注意：如果调用本方法前，还没有预加载动画使用的图集，请将atlas参数指定为对应的图集路径，否则会导致动画创建失败。</p>
		 * <p>动画模版缓存池是以一定的内存开销来节省CPU开销，当相同的动画模版被多次使用时，相比于每次都创建新的动画模版，使用动画模版缓存池，只需创建一次，缓存之后多次复用，从而节省了动画模版创建的开销。</p>
		 * <p>因为返回值为Animation对象本身，所以可以使用如下语法：loadAnimation(...).loadAnimation(...).play(...);。</p>
		 * @param url 动画文件路径。可由LayaAir IDE创建并发布。
		 * @param loaded （可选）使用指定动画资源初始化动画完毕的回调。
		 * @param atlas （可选）动画用到的图集地址（可选）。
		 * @return 返回动画本身。
		 */
		loadAnimation(url:string,loaded?:Handler,atlas?:string):Animation;

		/**
		 * @private 
		 */
		private _loadAnimationData:any;

		/**
		 * <p>创建动画模板，多个动画可共享同一份动画模板，而不必每次都创建一份新的，从而节省创建Graphics集合的开销。</p>
		 * @param url 图集路径或者图片路径数组。如果是图集路径，需要相应图集已经被预加载，如果没有预加载，会导致创建失败。
		 * @param name 动画模板在动画模版缓存池中的key。如果不为空，则以此为key缓存动画模板，否则不缓存。
		 * @return 动画模板。
		 */
		static createFrames(url:string|string[],name:string):any[];

		/**
		 * <p>从动画模版缓存池中清除指定key值的动画数据。</p>
		 * <p>开发者在调用创建动画模版函数时，可以手动指定此值。而如果是由LayaAir IDE创建的动画集，解析后的key格式为："url#"：表示动画集的默认动画模版，如果以此值为参数，会清除整个动画集数据；"url#aniName"：表示相应名称的动画模版。</p>
		 * @param key 动画模板在动画模版缓存池中的key。
		 */
		static clearCache(key:string):void;
	}

	/**
	 * 动画播放完毕后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 播放到某标签后调度。
	 * @eventType Event.LABEL
	 */

	/**
	 * <p>动画基类，提供了基础的动画播放控制方法和帧标签事件相关功能。</p>
	 * <p>可以继承此类，但不要直接实例化此类，因为有些方法需要由子类实现。</p>
	 */
	class AnimationBase extends Sprite  {

		/**
		 * 动画播放顺序类型：正序播放。
		 */
		static WRAP_POSITIVE:number;

		/**
		 * 动画播放顺序类型：逆序播放。
		 */
		static WRAP_REVERSE:number;

		/**
		 * 动画播放顺序类型：pingpong播放(当按指定顺序播放完结尾后，如果继续播放，则会改变播放顺序)。
		 */
		static WRAP_PINGPONG:number;

		/**
		 * 是否循环播放，调用play(...)方法时，会将此值设置为指定的参数值。
		 */
		loop:boolean;

		/**
		 * 播放顺序类型：AnimationBase.WRAP_POSITIVE为正序播放(默认值)，AnimationBase.WRAP_REVERSE为倒序播放，AnimationBase.WRAP_PINGPONG为pingpong播放(当按指定顺序播放完结尾后，如果继续播发，则会改变播放顺序)。
		 */
		wrapMode:number;

		/**
		 * @private 播放间隔(单位：毫秒)。
		 */
		protected _interval:number;

		/**
		 * @private 
		 */
		protected _index:number;

		/**
		 * @private 
		 */
		protected _count:number;

		/**
		 * @private 
		 */
		protected _isPlaying:boolean;

		/**
		 * @private 
		 */
		protected _labels:any;

		/**
		 * 是否是逆序播放
		 */
		protected _isReverse:boolean;

		/**
		 * @private 
		 */
		protected _frameRateChanged:boolean;

		/**
		 * @private 
		 */
		protected _actionName:string;

		/**
		 * @private 
		 */
		private _controlNode:any;

		/**
		 * 可以继承此类，但不要直接实例化此类，因为有些方法需要由子类实现。
		 */

		constructor();

		/**
		 * <p>开始播放动画。play(...)方法被设计为在创建实例后的任何时候都可以被调用，当相应的资源加载完毕、调用动画帧填充方法(set frames)或者将实例显示在舞台上时，会判断是否正在播放中，如果是，则进行播放。</p>
		 * <p>配合wrapMode属性，可设置动画播放顺序类型。</p>
		 * @param start （可选）指定动画播放开始的索引(int)或帧标签(String)。帧标签可以通过addLabel(...)和removeLabel(...)进行添加和删除。
		 * @param loop （可选）是否循环播放。
		 * @param name （可选）动画名称。
		 */
		play(start?:any,loop?:boolean,name?:string):void;

		/**
		 * <p>动画播放的帧间隔时间(单位：毫秒)。默认值依赖于Config.animationInterval=50，通过Config.animationInterval可以修改默认帧间隔时间。</p>
		 * <p>要想为某动画设置独立的帧间隔时间，可以使用set interval，注意：如果动画正在播放，设置后会重置帧循环定时器的起始时间为当前时间，也就是说，如果频繁设置interval，会导致动画帧更新的时间间隔会比预想的要慢，甚至不更新。</p>
		 */
		get interval():number;
		set interval(value:number);

		/**
		 * @private 
		 */
		protected _getFrameByLabel(label:string):number;

		/**
		 * @private 
		 */
		protected _frameLoop():void;

		/**
		 * @private 
		 */
		protected _resumePlay():void;

		/**
		 * 停止动画播放。
		 */
		stop():void;

		/**
		 * 是否正在播放中。
		 */
		get isPlaying():boolean;

		/**
		 * 增加一个帧标签到指定索引的帧上。当动画播放到此索引的帧时会派发Event.LABEL事件，派发事件是在完成当前帧画面更新之后。
		 * @param label 帧标签名称
		 * @param index 帧索引
		 */
		addLabel(label:string,index:number):void;

		/**
		 * 删除指定的帧标签。
		 * @param label 帧标签名称。注意：如果为空，则删除所有帧标签！
		 */
		removeLabel(label:string):void;

		/**
		 * @private 
		 */
		private _removeLabelFromList:any;

		/**
		 * 将动画切换到指定帧并停在那里。
		 * @param position 帧索引或帧标签
		 */
		gotoAndStop(position:any):void;

		/**
		 * 动画当前帧的索引。
		 */
		get index():number;
		set index(value:number);

		/**
		 * @private 显示到某帧
		 * @param value 帧索引
		 */
		protected _displayToIndex(value:number):void;

		/**
		 * 当前动画中帧的总数。
		 */
		get count():number;

		/**
		 * 停止动画播放，并清理对象属性。之后可存入对象池，方便对象复用。
		 * @return 返回对象本身
		 */
		clear():AnimationBase;
	}

	/**
	 * <code>BitmapFont</code> 是位图字体类，用于定义位图字体信息。
	 * 字体制作及使用方法，请参考文章
	 * @see http://ldc2.layabox.com/doc/?nav=ch-js-1-2-5
	 */
	class BitmapFont  {
		private _texture:any;
		private _fontCharDic:any;
		private _fontWidthMap:any;
		private _complete:any;
		private _path:any;
		private _maxWidth:any;
		private _spaceWidth:any;
		private _padding:any;

		/**
		 * 当前位图字体字号，使用时，如果字号和设置不同，并且autoScaleSize=true，则按照设置字号比率进行缩放显示。
		 */
		fontSize:number;

		/**
		 * 表示是否根据实际使用的字体大小缩放位图字体大小。
		 */
		autoScaleSize:boolean;

		/**
		 * 字符间距（以像素为单位）。
		 */
		letterSpacing:number;

		/**
		 * 通过指定位图字体文件路径，加载位图字体文件，加载完成后会自动解析。
		 * @param path 位图字体文件的路径。
		 * @param complete 加载并解析完成的回调。
		 */
		loadFont(path:string,complete:Handler):void;

		/**
		 * @private 
		 */
		private _onLoaded:any;

		/**
		 * 解析字体文件。
		 * @param xml 字体文件XML。
		 * @param texture 字体的纹理。
		 */
		parseFont(xml:XMLDocument,texture:Texture):void;

		/**
		 * 解析字体文件。
		 * @param xml 字体文件XML。
		 * @param texture 字体的纹理。
		 */
		parseFont2(xml:XMLDocument,texture:Texture):void;

		/**
		 * 获取指定字符的字体纹理对象。
		 * @param char 字符。
		 * @return 指定的字体纹理对象。
		 */
		getCharTexture(char:string):Texture;

		/**
		 * 销毁位图字体，调用Text.unregisterBitmapFont 时，默认会销毁。
		 */
		destroy():void;

		/**
		 * 设置空格的宽（如果字体库有空格，这里就可以不用设置了）。
		 * @param spaceWidth 宽度，单位为像素。
		 */
		setSpaceWidth(spaceWidth:number):void;

		/**
		 * 获取指定字符的宽度。
		 * @param char 字符。
		 * @return 宽度。
		 */
		getCharWidth(char:string):number;

		/**
		 * 获取指定文本内容的宽度。
		 * @param text 文本内容。
		 * @return 宽度。
		 */
		getTextWidth(text:string):number;

		/**
		 * 获取最大字符宽度。
		 */
		getMaxWidth():number;

		/**
		 * 获取最大字符高度。
		 */
		getMaxHeight():number;
	}

	/**
	 * 透明命令
	 */
	class AlphaCmd  {
		static ID:string;

		/**
		 * 透明度
		 */
		alpha:number;

		/**
		 * @private 
		 */
		static create(alpha:number):AlphaCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 裁剪命令
	 */
	class ClipRectCmd  {
		static ID:string;

		/**
		 * X 轴偏移量。
		 */
		x:number;

		/**
		 * Y 轴偏移量。
		 */
		y:number;

		/**
		 * 宽度。
		 */
		width:number;

		/**
		 * 高度。
		 */
		height:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,width:number,height:number):ClipRectCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制圆形
	 */
	class DrawCircleCmd  {
		static ID:string;

		/**
		 * 圆点X 轴位置。
		 */
		x:number;

		/**
		 * 圆点Y 轴位置。
		 */
		y:number;

		/**
		 * 半径。
		 */
		radius:number;

		/**
		 * 填充颜色，或者填充绘图的渐变对象。
		 */
		fillColor:any;

		/**
		 * （可选）边框颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * （可选）边框宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		vid:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,radius:number,fillColor:any,lineColor:any,lineWidth:number,vid:number):DrawCircleCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制曲线
	 */
	class DrawCurvesCmd  {
		static ID:string;

		/**
		 * 开始绘制的 X 轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的 Y 轴位置。
		 */
		y:number;

		/**
		 * 线段的点集合，格式[controlX, controlY, anchorX, anchorY...]。
		 */
		points:number[]|null;

		/**
		 * 线段颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * （可选）线段宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,points:any[],lineColor:any,lineWidth:number):DrawCurvesCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制图片
	 */
	class DrawImageCmd  {
		static ID:string;

		/**
		 * 纹理。
		 */
		texture:Texture|null;

		/**
		 * （可选）X轴偏移量。
		 */
		x:number;

		/**
		 * （可选）Y轴偏移量。
		 */
		y:number;

		/**
		 * （可选）宽度。
		 */
		width:number;

		/**
		 * （可选）高度。
		 */
		height:number;

		/**
		 * @private 
		 */
		static create(texture:Texture,x:number,y:number,width:number,height:number):DrawImageCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制单条曲线
	 */
	class DrawLineCmd  {
		static ID:string;

		/**
		 * X轴开始位置。
		 */
		fromX:number;

		/**
		 * Y轴开始位置。
		 */
		fromY:number;

		/**
		 * X轴结束位置。
		 */
		toX:number;

		/**
		 * Y轴结束位置。
		 */
		toY:number;

		/**
		 * 颜色。
		 */
		lineColor:string;

		/**
		 * （可选）线条宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		vid:number;

		/**
		 * @private 
		 */
		static create(fromX:number,fromY:number,toX:number,toY:number,lineColor:string,lineWidth:number,vid:number):DrawLineCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制连续曲线
	 */
	class DrawLinesCmd  {
		static ID:string;

		/**
		 * 开始绘制的X轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的Y轴位置。
		 */
		y:number;

		/**
		 * 线段的点集合。格式:[x1,y1,x2,y2,x3,y3...]。
		 */
		points:number[]|null;

		/**
		 * 线段颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * （可选）线段宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		vid:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,points:any[],lineColor:any,lineWidth:number,vid:number):DrawLinesCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制粒子
	 * @private 
	 */
	class DrawParticleCmd  {
		static ID:string;
		private _templ:any;

		/**
		 * @private 
		 */
		static create(_temp:any):DrawParticleCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 根据路径绘制矢量图形
	 */
	class DrawPathCmd  {
		static ID:string;

		/**
		 * 开始绘制的 X 轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的 Y 轴位置。
		 */
		y:number;

		/**
		 * 路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]。
		 */
		paths:any[]|null;

		/**
		 * （可选）刷子定义，支持以下设置{fillStyle:"#FF0000"}。
		 */
		brush:any;

		/**
		 * （可选）画笔定义，支持以下设置{strokeStyle,lineWidth,lineJoin:"bevel|round|miter",lineCap:"butt|round|square",miterLimit}。
		 */
		pen:any;

		/**
		 * @private 
		 */
		static create(x:number,y:number,paths:any[],brush:any,pen:any):DrawPathCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制扇形
	 */
	class DrawPieCmd  {
		static ID:string;

		/**
		 * 开始绘制的 X 轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的 Y 轴位置。
		 */
		y:number;

		/**
		 * 扇形半径。
		 */
		radius:number;
		private _startAngle:any;
		private _endAngle:any;

		/**
		 * 填充颜色，或者填充绘图的渐变对象。
		 */
		fillColor:any;

		/**
		 * （可选）边框颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * （可选）边框宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		vid:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,radius:number,startAngle:number,endAngle:number,fillColor:any,lineColor:any,lineWidth:number,vid:number):DrawPieCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;

		/**
		 * 开始角度。
		 */
		get startAngle():number;
		set startAngle(value:number);

		/**
		 * 结束角度。
		 */
		get endAngle():number;
		set endAngle(value:number);
	}

	/**
	 * 绘制多边形
	 */
	class DrawPolyCmd  {
		static ID:string;

		/**
		 * 开始绘制的 X 轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的 Y 轴位置。
		 */
		y:number;

		/**
		 * 多边形的点集合。
		 */
		points:number[]|null;

		/**
		 * 填充颜色，或者填充绘图的渐变对象。
		 */
		fillColor:any;

		/**
		 * （可选）边框颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * 可选）边框宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		isConvexPolygon:boolean;

		/**
		 * @private 
		 */
		vid:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,points:any[],fillColor:any,lineColor:any,lineWidth:number,isConvexPolygon:boolean,vid:number):DrawPolyCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制矩形
	 */
	class DrawRectCmd  {
		static ID:string;

		/**
		 * 开始绘制的 X 轴位置。
		 */
		x:number;

		/**
		 * 开始绘制的 Y 轴位置。
		 */
		y:number;

		/**
		 * 矩形宽度。
		 */
		width:number;

		/**
		 * 矩形高度。
		 */
		height:number;

		/**
		 * 填充颜色，或者填充绘图的渐变对象。
		 */
		fillColor:any;

		/**
		 * （可选）边框颜色，或者填充绘图的渐变对象。
		 */
		lineColor:any;

		/**
		 * （可选）边框宽度。
		 */
		lineWidth:number;

		/**
		 * @private 
		 */
		static create(x:number,y:number,width:number,height:number,fillColor:any,lineColor:any,lineWidth:number):DrawRectCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制单个贴图
	 */
	class DrawTextureCmd  {
		static ID:string;

		/**
		 * 纹理。
		 */
		texture:Texture|null;

		/**
		 * （可选）X轴偏移量。
		 */
		x:number;

		/**
		 * （可选）Y轴偏移量。
		 */
		y:number;

		/**
		 * （可选）宽度。
		 */
		width:number;

		/**
		 * （可选）高度。
		 */
		height:number;

		/**
		 * （可选）矩阵信息。
		 */
		matrix:Matrix|null;

		/**
		 * （可选）透明度。
		 */
		alpha:number;

		/**
		 * （可选）颜色滤镜。
		 */
		color:string|null;
		colorFlt:ColorFilter|null;

		/**
		 * （可选）混合模式。
		 */
		blendMode:string|null;
		uv:number[]|null;

		/**
		 * @private 
		 */
		static create(texture:Texture,x:number,y:number,width:number,height:number,matrix:Matrix|null,alpha:number,color:string|null,blendMode:string|null,uv?:number[]):DrawTextureCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 根据坐标集合绘制多个贴图
	 */
	class DrawTexturesCmd  {
		static ID:string;

		/**
		 * 纹理。
		 */
		texture:Texture;

		/**
		 * 绘制次数和坐标。
		 */
		pos:any[];

		/**
		 * @private 
		 */
		static create(texture:Texture,pos:any[]):DrawTexturesCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制三角形命令
	 */
	class DrawTrianglesCmd  {
		static ID:string;

		/**
		 * 纹理。
		 */
		texture:Texture|null;

		/**
		 * X轴偏移量。
		 */
		x:number;

		/**
		 * Y轴偏移量。
		 */
		y:number;

		/**
		 * 顶点数组。
		 */
		vertices:Float32Array;

		/**
		 * UV数据。
		 */
		uvs:Float32Array;

		/**
		 * 顶点索引。
		 */
		indices:Uint16Array;

		/**
		 * 缩放矩阵。
		 */
		matrix:Matrix|null;

		/**
		 * alpha
		 */
		alpha:number;

		/**
		 * blend模式
		 */
		blendMode:string|null;

		/**
		 * 颜色变换
		 */
		color:ColorFilter;
		colorNum:number|null;

		/**
		 * @private 
		 */
		static create(texture:Texture,x:number,y:number,vertices:Float32Array,uvs:Float32Array,indices:Uint16Array,matrix:Matrix|null,alpha:number,color:string|null,blendMode:string|null,colorNum:number|null):DrawTrianglesCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 绘制文字
	 */
	class FillTextCmd  {
		static ID:string;
		private _text:any;
		_words:HTMLChar[]|null;

		/**
		 * 开始绘制文本的 x 坐标位置（相对于画布）。
		 */
		x:number;

		/**
		 * 开始绘制文本的 y 坐标位置（相对于画布）。
		 */
		y:number;
		private _font:any;
		private _color:any;
		private _borderColor:any;
		private _lineWidth:any;
		private _textAlign:any;
		private _fontColor:any;
		private _strokeColor:any;
		private static _defFontObj:any;
		private _fontObj:any;
		private _nTexAlign:any;

		/**
		 * @private 
		 */
		static create(text:string|WordText|null,words:HTMLChar[]|null,x:number,y:number,font:string,color:string|null,textAlign:string,lineWidth:number,borderColor:string|null):FillTextCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;

		/**
		 * 在画布上输出的文本。
		 */
		get text():string|WordText|null;
		set text(value:string|WordText|null);

		/**
		 * 定义字号和字体，比如"20px Arial"。
		 */
		get font():string;
		set font(value:string);

		/**
		 * 定义文本颜色，比如"#ff0000"。
		 */
		get color():string;
		set color(value:string);

		/**
		 * 文本对齐方式，可选值："left"，"center"，"right"。
		 */
		get textAlign():string;
		set textAlign(value:string);
	}

	/**
	 * 填充贴图
	 */
	class FillTextureCmd  {
		static ID:string;

		/**
		 * 纹理。
		 */
		texture:Texture;

		/**
		 * X轴偏移量。
		 */
		x:number;

		/**
		 * Y轴偏移量。
		 */
		y:number;

		/**
		 * （可选）宽度。
		 */
		width:number;

		/**
		 * （可选）高度。
		 */
		height:number;

		/**
		 * （可选）填充类型 repeat|repeat-x|repeat-y|no-repeat
		 */
		type:string;

		/**
		 * （可选）贴图纹理偏移
		 */
		offset:Point;

		/**
		 * @private 
		 */
		other:any;

		/**
		 * @private 
		 */
		static create(texture:Texture,x:number,y:number,width:number,height:number,type:string,offset:Point,other:any):FillTextureCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 恢复命令，和save配套使用
	 */
	class RestoreCmd  {
		static ID:string;

		/**
		 * @private 
		 */
		static create():RestoreCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 旋转命令
	 */
	class RotateCmd  {
		static ID:string;

		/**
		 * 旋转角度，以弧度计。
		 */
		angle:number;

		/**
		 * （可选）水平方向轴心点坐标。
		 */
		pivotX:number;

		/**
		 * （可选）垂直方向轴心点坐标。
		 */
		pivotY:number;

		/**
		 * @private 
		 */
		static create(angle:number,pivotX:number,pivotY:number):RotateCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 存储命令，和restore配套使用
	 */
	class SaveCmd  {
		static ID:string;

		/**
		 * @private 
		 */
		static create():SaveCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 缩放命令
	 */
	class ScaleCmd  {
		static ID:string;

		/**
		 * 水平方向缩放值。
		 */
		scaleX:number;

		/**
		 * 垂直方向缩放值。
		 */
		scaleY:number;

		/**
		 * （可选）水平方向轴心点坐标。
		 */
		pivotX:number;

		/**
		 * （可选）垂直方向轴心点坐标。
		 */
		pivotY:number;

		/**
		 * @private 
		 */
		static create(scaleX:number,scaleY:number,pivotX:number,pivotY:number):ScaleCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 矩阵命令
	 */
	class TransformCmd  {
		static ID:string;

		/**
		 * 矩阵。
		 */
		matrix:Matrix;

		/**
		 * （可选）水平方向轴心点坐标。
		 */
		pivotX:number;

		/**
		 * （可选）垂直方向轴心点坐标。
		 */
		pivotY:number;

		/**
		 * @private 
		 */
		static create(matrix:Matrix,pivotX:number,pivotY:number):TransformCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 位移命令
	 */
	class TranslateCmd  {
		static ID:string;

		/**
		 * 添加到水平坐标（x）上的值。
		 */
		tx:number;

		/**
		 * 添加到垂直坐标（y）上的值。
		 */
		ty:number;

		/**
		 * @private 
		 */
		static create(tx:number,ty:number):TranslateCmd;

		/**
		 * 回收到对象池
		 */
		recover():void;

		/**
		 * @private 
		 */
		run(context:Context,gx:number,gy:number):void;

		/**
		 * @private 
		 */
		get cmdID():string;
	}

	/**
	 * 元素样式
	 */
	class SpriteStyle  {
		static EMPTY:SpriteStyle;

		/**
		 * 水平缩放
		 */
		scaleX:number;

		/**
		 * 垂直缩放
		 */
		scaleY:number;

		/**
		 * 水平倾斜角度
		 */
		skewX:number;

		/**
		 * 垂直倾斜角度
		 */
		skewY:number;

		/**
		 * X轴心点
		 */
		pivotX:number;

		/**
		 * Y轴心点
		 */
		pivotY:number;

		/**
		 * 旋转角度
		 */
		rotation:number;

		/**
		 * 透明度
		 */
		alpha:number;

		/**
		 * 滚动区域
		 */
		scrollRect:Rectangle;

		/**
		 * 视口
		 */
		viewport:Rectangle;

		/**
		 * 点击区域
		 */
		hitArea:any;

		/**
		 * 滑动
		 */
		dragging:Dragging;

		/**
		 * 混合模式
		 */
		blendMode:string;

		constructor();

		/**
		 * 重置，方便下次复用
		 */
		reset():SpriteStyle;

		/**
		 * 回收
		 */
		recover():void;

		/**
		 * 从对象池中创建
		 */
		static create():SpriteStyle;
	}

	/**
	 * 文本的样式类
	 */
	class TextStyle extends SpriteStyle  {

		/**
		 * 一个已初始化的 <code>TextStyle</code> 实例。
		 */
		static EMPTY:TextStyle;

		/**
		 * 表示使用此文本格式的文本是否为斜体。
		 * @default false
		 */
		italic:boolean;

		/**
		 * <p>表示使用此文本格式的文本段落的水平对齐方式。</p>
		 * @default "left"
		 */
		align:string;

		/**
		 * <p>表示使用此文本格式的文本字段是否自动换行。</p>
		 * 如果 wordWrap 的值为 true，则该文本字段自动换行；如果值为 false，则该文本字段不自动换行。
		 * @default false。
		 */
		wordWrap:boolean;

		/**
		 * <p>垂直行间距（以像素为单位）</p>
		 */
		leading:number;

		/**
		 * <p>默认边距信息</p>
		 * <p>[左边距，上边距，右边距，下边距]（边距以像素为单位）</p>
		 */
		padding:any[];

		/**
		 * 文本背景颜色，以字符串表示。
		 */
		bgColor:string|null;

		/**
		 * 文本边框背景颜色，以字符串表示。
		 */
		borderColor:string|null;

		/**
		 * <p>指定文本字段是否是密码文本字段。</p>
		 * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
		 */
		asPassword:boolean;

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * 默认值0，表示不描边。
		 * @default 0
		 */
		stroke:number;

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * @default "#000000";
		 */
		strokeColor:string;

		/**
		 * 是否为粗体
		 */
		bold:boolean;

		/**
		 * 是否显示下划线
		 */
		underline:boolean;

		/**
		 * 下划线颜色
		 */
		underlineColor:string|null;

		/**
		 * 当前使用的位置字体。
		 */
		currBitmapFont:BitmapFont|null;

		/**
		 * @override 
		 */
		reset():SpriteStyle;

		/**
		 * @override 
		 */
		recover():void;

		/**
		 * 从对象池中创建
		 */
		static create():TextStyle;

		/**
		 * @inheritDoc 
		 */
		render(sprite:Sprite,context:Context,x:number,y:number):void;
	}

	/**
	 * <p> 动效模板。用于为指定目标对象添加动画效果。每个动效有唯一的目标对象，而同一个对象可以添加多个动效。 当一个动效开始播放时，其他动效会自动停止播放。</p>
	 * <p> 可以通过LayaAir IDE创建。 </p>
	 */
	class EffectAnimation extends FrameAnimation  {

		/**
		 * @private 动效开始事件。
		 */
		private static EFFECT_BEGIN:any;

		/**
		 * 本实例的目标对象。通过本实例控制目标对象的属性变化。
		 * @param v 指定的目标对象。
		 */
		set target(v:any);
		get target():any;

		/**
		 * @private 
		 */
		private _onOtherBegin:any;

		/**
		 * 设置开始播放的事件。本实例会侦听目标对象的指定事件，触发后播放相应动画效果。
		 * @param event 
		 */
		set playEvent(event:string);

		/**
		 * @param start 
		 * @param loop 
		 * @param name 
		 * @override 
		 */
		play(start?:any,loop?:boolean,name?:string):void;

		/**
		 * @private 
		 */
		private _recordInitData:any;

		/**
		 * 设置提供数据的类。
		 * @param classStr 类路径
		 */
		set effectClass(classStr:string);

		/**
		 * 设置动画数据。
		 * @param uiData 
		 */
		set effectData(uiData:any);

		/**
		 * @override 
		 */
		protected _displayNodeToFrame(node:any,frame:number,targetDic?:any):void;
	}

	/**
	 * 动画播放完毕后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 播放到某标签后调度。
	 * @eventType Event.LABEL
	 */

	/**
	 * 节点关键帧动画播放类。解析播放IDE内制作的节点动画。
	 */
	class FrameAnimation extends AnimationBase  {

		/**
		 * @private 
		 */
		private static _sortIndexFun:any;

		/**
		 * @private 
		 */
		protected _usedFrames:any[];

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		clear():AnimationBase;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _displayToIndex(value:number):void;

		/**
		 * @private 将节点设置到某一帧的状态
		 * @param node 节点ID
		 * @param frame 
		 * @param targetDic 节点表
		 */
		protected _displayNodeToFrame(node:any,frame:number,targetDic?:any):void;

		/**
		 * @private 计算帧数据
		 */
		private _calculateDatas:any;

		/**
		 * @private 计算某个节点的帧数据
		 */
		protected _calculateKeyFrames(node:any):void;

		/**
		 * 重置节点，使节点恢复到动画之前的状态，方便其他动画控制
		 */
		resetNodes():void;

		/**
		 * @private 计算节点某个属性的帧数据
		 */
		private _calculateNodePropFrames:any;

		/**
		 * @private 
		 */
		private _dealKeyFrame:any;

		/**
		 * @private 计算两个关键帧直接的帧数据
		 */
		private _calculateFrameValues:any;
	}

	/**
	 * <code>Graphics</code> 类用于创建绘图显示对象。Graphics可以同时绘制多个位图或者矢量图，还可以结合save，restore，transform，scale，rotate，translate，alpha等指令对绘图效果进行变化。
	 * Graphics以命令流方式存储，可以通过cmds属性访问所有命令流。Graphics是比Sprite更轻量级的对象，合理使用能提高应用性能(比如把大量的节点绘图改为一个节点的Graphics命令集合，能减少大量节点创建消耗)。
	 * @see laya.display.Sprite#graphics
	 */
	class Graphics  {

		/**
		 * @private 
		 */
		private _cmds:any;

		/**
		 * @private 
		 */
		protected _vectorgraphArray:any[]|null;

		/**
		 * @private 
		 */
		private _graphicBounds:any;

		/**
		 * @private 
		 */
		autoDestroy:boolean;

		constructor();

		/**
		 * <p>销毁此对象。</p>
		 */
		destroy():void;

		/**
		 * <p>清空绘制命令。</p>
		 * @param recoverCmds 是否回收绘图指令数组，设置为true，则对指令数组进行回收以节省内存开销，建议设置为true进行回收，但如果手动引用了数组，不建议回收
		 */
		clear(recoverCmds?:boolean):void;

		/**
		 * @private 
		 */
		private _clearBoundsCache:any;

		/**
		 * @private 
		 */
		private _initGraphicBounds:any;

		/**
		 * @private 命令流。存储了所有绘制命令。
		 */
		get cmds():any[];
		set cmds(value:any[]);

		/**
		 * 获取位置及宽高信息矩阵(比较耗CPU，频繁使用会造成卡顿，尽量少用)。
		 * @param realSize （可选）使用图片的真实大小，默认为false
		 * @return 位置与宽高组成的 一个 Rectangle 对象。
		 */
		getBounds(realSize?:boolean):Rectangle;

		/**
		 * @private 
		 * @param realSize （可选）使用图片的真实大小，默认为false
获取端点列表。
		 */
		getBoundPoints(realSize?:boolean):any[];

		/**
		 * 绘制单独图片
		 * @param texture 纹理。
		 * @param x （可选）X轴偏移量。
		 * @param y （可选）Y轴偏移量。
		 * @param width （可选）宽度。
		 * @param height （可选）高度。
		 */
		drawImage(texture:Texture,x?:number,y?:number,width?:number,height?:number):DrawImageCmd|null;

		/**
		 * 绘制纹理，相比drawImage功能更强大，性能会差一些
		 * @param texture 纹理。
		 * @param x （可选）X轴偏移量。
		 * @param y （可选）Y轴偏移量。
		 * @param width （可选）宽度。
		 * @param height （可选）高度。
		 * @param matrix （可选）矩阵信息。
		 * @param alpha （可选）透明度。
		 * @param color （可选）颜色滤镜。
		 * @param blendMode （可选）混合模式。
		 */
		drawTexture(texture:Texture|null,x?:number,y?:number,width?:number,height?:number,matrix?:Matrix|null,alpha?:number,color?:string|null,blendMode?:string|null,uv?:number[]):DrawTextureCmd|null;

		/**
		 * 批量绘制同样纹理。
		 * @param texture 纹理。
		 * @param pos 绘制次数和坐标。
		 */
		drawTextures(texture:Texture,pos:any[]):DrawTexturesCmd|null;

		/**
		 * 绘制一组三角形
		 * @param texture 纹理。
		 * @param x X轴偏移量。
		 * @param y Y轴偏移量。
		 * @param vertices 顶点数组。
		 * @param indices 顶点索引。
		 * @param uvData UV数据。
		 * @param matrix 缩放矩阵。
		 * @param alpha alpha
		 * @param color 颜色变换
		 * @param blendMode blend模式
		 */
		drawTriangles(texture:Texture,x:number,y:number,vertices:Float32Array,uvs:Float32Array,indices:Uint16Array,matrix?:Matrix|null,alpha?:number,color?:string|null,blendMode?:string|null,colorNum?:number):DrawTrianglesCmd;

		/**
		 * 用texture填充。
		 * @param texture 纹理。
		 * @param x X轴偏移量。
		 * @param y Y轴偏移量。
		 * @param width （可选）宽度。
		 * @param height （可选）高度。
		 * @param type （可选）填充类型 repeat|repeat-x|repeat-y|no-repeat
		 * @param offset （可选）贴图纹理偏移
		 */
		fillTexture(texture:Texture,x:number,y:number,width?:number,height?:number,type?:string,offset?:Point|null):FillTextureCmd|null;

		/**
		 * 设置剪裁区域，超出剪裁区域的坐标不显示。
		 * @param x X 轴偏移量。
		 * @param y Y 轴偏移量。
		 * @param width 宽度。
		 * @param height 高度。
		 */
		clipRect(x:number,y:number,width:number,height:number):ClipRectCmd;

		/**
		 * 在画布上绘制文本。
		 * @param text 在画布上输出的文本。
		 * @param x 开始绘制文本的 x 坐标位置（相对于画布）。
		 * @param y 开始绘制文本的 y 坐标位置（相对于画布）。
		 * @param font 定义字号和字体，比如"20px Arial"。
		 * @param color 定义文本颜色，比如"#ff0000"。
		 * @param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		 */
		fillText(text:string,x:number,y:number,font:string,color:string,textAlign:string):FillTextCmd;

		/**
		 * 在画布上绘制“被填充且镶边的”文本。
		 * @param text 在画布上输出的文本。
		 * @param x 开始绘制文本的 x 坐标位置（相对于画布）。
		 * @param y 开始绘制文本的 y 坐标位置（相对于画布）。
		 * @param font 定义字体和字号，比如"20px Arial"。
		 * @param fillColor 定义文本颜色，比如"#ff0000"。
		 * @param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		 * @param lineWidth 镶边线条宽度。
		 * @param borderColor 定义镶边文本颜色。
		 */
		fillBorderText(text:string,x:number,y:number,font:string,fillColor:string,textAlign:string,lineWidth:number,borderColor:string):FillTextCmd;

		/**
		 * * @private
		 */
		fillWords(words:any[],x:number,y:number,font:string,color:string):FillTextCmd;

		/**
		 * * @private
		 */
		fillBorderWords(words:any[],x:number,y:number,font:string,fillColor:string,borderColor:string,lineWidth:number):FillTextCmd;

		/**
		 * 在画布上绘制文本（没有填色）。文本的默认颜色是黑色。
		 * @param text 在画布上输出的文本。
		 * @param x 开始绘制文本的 x 坐标位置（相对于画布）。
		 * @param y 开始绘制文本的 y 坐标位置（相对于画布）。
		 * @param font 定义字体和字号，比如"20px Arial"。
		 * @param color 定义文本颜色，比如"#ff0000"。
		 * @param lineWidth 线条宽度。
		 * @param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		 */
		strokeText(text:string,x:number,y:number,font:string,color:string,lineWidth:number,textAlign:string):FillTextCmd;

		/**
		 * 设置透明度。
		 * @param value 透明度。
		 */
		alpha(alpha:number):AlphaCmd;

		/**
		 * 替换绘图的当前转换矩阵。
		 * @param mat 矩阵。
		 * @param pivotX （可选）水平方向轴心点坐标。
		 * @param pivotY （可选）垂直方向轴心点坐标。
		 */
		transform(matrix:Matrix,pivotX?:number,pivotY?:number):TransformCmd;

		/**
		 * 旋转当前绘图。(推荐使用transform，性能更高)
		 * @param angle 旋转角度，以弧度计。
		 * @param pivotX （可选）水平方向轴心点坐标。
		 * @param pivotY （可选）垂直方向轴心点坐标。
		 */
		rotate(angle:number,pivotX?:number,pivotY?:number):RotateCmd;

		/**
		 * 缩放当前绘图至更大或更小。(推荐使用transform，性能更高)
		 * @param scaleX 水平方向缩放值。
		 * @param scaleY 垂直方向缩放值。
		 * @param pivotX （可选）水平方向轴心点坐标。
		 * @param pivotY （可选）垂直方向轴心点坐标。
		 */
		scale(scaleX:number,scaleY:number,pivotX?:number,pivotY?:number):ScaleCmd;

		/**
		 * 重新映射画布上的 (0,0) 位置。
		 * @param x 添加到水平坐标（x）上的值。
		 * @param y 添加到垂直坐标（y）上的值。
		 */
		translate(tx:number,ty:number):TranslateCmd;

		/**
		 * 保存当前环境的状态。
		 */
		save():SaveCmd;

		/**
		 * 返回之前保存过的路径状态和属性。
		 */
		restore():RestoreCmd;

		/**
		 * @private 替换文本内容。
		 * @param text 文本内容。
		 * @return 替换成功则值为true，否则值为flase。
		 */
		replaceText(text:string):boolean;

		/**
		 * @private 
		 */
		private _isTextCmd:any;

		/**
		 * @private 替换文本颜色。
		 * @param color 颜色。
		 */
		replaceTextColor(color:string):void;

		/**
		 * @private 
		 */
		private _setTextCmdColor:any;

		/**
		 * 加载并显示一个图片。
		 * @param url 图片地址。
		 * @param x （可选）显示图片的x位置。
		 * @param y （可选）显示图片的y位置。
		 * @param width （可选）显示图片的宽度，设置为0表示使用图片默认宽度。
		 * @param height （可选）显示图片的高度，设置为0表示使用图片默认高度。
		 * @param complete （可选）加载完成回调。
		 */
		loadImage(url:string,x?:number,y?:number,width?:number,height?:number,complete?:Function|null):void;

		/**
		 * 绘制一条线。
		 * @param fromX X轴开始位置。
		 * @param fromY Y轴开始位置。
		 * @param toX X轴结束位置。
		 * @param toY Y轴结束位置。
		 * @param lineColor 颜色。
		 * @param lineWidth （可选）线条宽度。
		 */
		drawLine(fromX:number,fromY:number,toX:number,toY:number,lineColor:string,lineWidth?:number):DrawLineCmd;

		/**
		 * 绘制一系列线段。
		 * @param x 开始绘制的X轴位置。
		 * @param y 开始绘制的Y轴位置。
		 * @param points 线段的点集合。格式:[x1,y1,x2,y2,x3,y3...]。
		 * @param lineColor 线段颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）线段宽度。
		 */
		drawLines(x:number,y:number,points:any[],lineColor:any,lineWidth?:number):DrawLinesCmd|null;

		/**
		 * 绘制一系列曲线。
		 * @param x 开始绘制的 X 轴位置。
		 * @param y 开始绘制的 Y 轴位置。
		 * @param points 线段的点集合，格式[controlX, controlY, anchorX, anchorY...]。
		 * @param lineColor 线段颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）线段宽度。
		 */
		drawCurves(x:number,y:number,points:any[],lineColor:any,lineWidth?:number):DrawCurvesCmd;

		/**
		 * 绘制矩形。
		 * @param x 开始绘制的 X 轴位置。
		 * @param y 开始绘制的 Y 轴位置。
		 * @param width 矩形宽度。
		 * @param height 矩形高度。
		 * @param fillColor 填充颜色，或者填充绘图的渐变对象。
		 * @param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）边框宽度。
		 */
		drawRect(x:number,y:number,width:number,height:number,fillColor:any,lineColor?:any,lineWidth?:number):DrawRectCmd;

		/**
		 * 绘制圆形。
		 * @param x 圆点X 轴位置。
		 * @param y 圆点Y 轴位置。
		 * @param radius 半径。
		 * @param fillColor 填充颜色，或者填充绘图的渐变对象。
		 * @param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）边框宽度。
		 */
		drawCircle(x:number,y:number,radius:number,fillColor:any,lineColor?:any,lineWidth?:number):DrawCircleCmd;

		/**
		 * 绘制扇形。
		 * @param x 开始绘制的 X 轴位置。
		 * @param y 开始绘制的 Y 轴位置。
		 * @param radius 扇形半径。
		 * @param startAngle 开始角度。
		 * @param endAngle 结束角度。
		 * @param fillColor 填充颜色，或者填充绘图的渐变对象。
		 * @param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）边框宽度。
		 */
		drawPie(x:number,y:number,radius:number,startAngle:number,endAngle:number,fillColor:any,lineColor?:any,lineWidth?:number):DrawPieCmd;

		/**
		 * 绘制多边形。
		 * @param x 开始绘制的 X 轴位置。
		 * @param y 开始绘制的 Y 轴位置。
		 * @param points 多边形的点集合。
		 * @param fillColor 填充颜色，或者填充绘图的渐变对象。
		 * @param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
		 * @param lineWidth （可选）边框宽度。
		 */
		drawPoly(x:number,y:number,points:any[],fillColor:any,lineColor?:any,lineWidth?:number):DrawPolyCmd;

		/**
		 * 绘制路径。
		 * @param x 开始绘制的 X 轴位置。
		 * @param y 开始绘制的 Y 轴位置。
		 * @param paths 路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]。
		 * @param brush （可选）刷子定义，支持以下设置{fillStyle:"#FF0000"}。
		 * @param pen （可选）画笔定义，支持以下设置{strokeStyle,lineWidth,lineJoin:"bevel|round|miter",lineCap:"butt|round|square",miterLimit}。
		 */
		drawPath(x:number,y:number,paths:any[],brush?:any,pen?:any):DrawPathCmd;

		/**
		 * @private 绘制带九宫格的图片
		 * @param texture 
		 * @param x 
		 * @param y 
		 * @param width 
		 * @param height 
		 * @param sizeGrid 
		 */
		draw9Grid(texture:Texture,x:number,y:number,width:number,height:number,sizeGrid:any[]):void;
	}

	/**
	 * @private Graphic bounds数据类
	 */
	class GraphicsBounds  {

		/**
		 * @private 
		 */
		private static _tempMatrix:any;

		/**
		 * @private 
		 */
		private static _initMatrix:any;

		/**
		 * @private 
		 */
		private static _tempPoints:any;

		/**
		 * @private 
		 */
		private static _tempMatrixArrays:any;

		/**
		 * @private 
		 */
		private static _tempCmds:any;

		/**
		 * @private 
		 */
		private _temp:any;

		/**
		 * @private 
		 */
		private _bounds:any;

		/**
		 * @private 
		 */
		private _rstBoundPoints:any;

		/**
		 * @private 
		 */
		private _cacheBoundsType:any;

		/**
		 * 销毁
		 */
		destroy():void;

		/**
		 * 创建
		 */
		static create():GraphicsBounds;

		/**
		 * 重置数据
		 */
		reset():void;

		/**
		 * 获取位置及宽高信息矩阵(比较耗CPU，频繁使用会造成卡顿，尽量少用)。
		 * @param realSize （可选）使用图片的真实大小，默认为false
		 * @return 位置与宽高组成的 一个 Rectangle 对象。
		 */
		getBounds(realSize?:boolean):Rectangle;

		/**
		 * @private 
		 * @param realSize （可选）使用图片的真实大小，默认为false
获取端点列表。
		 */
		getBoundPoints(realSize?:boolean):any[];
		private _getCmdPoints:any;
		private _switchMatrix:any;
		private static _addPointArrToRst:any;
		private static _addPointToRst:any;

		/**
		 * 获得drawPie命令可能的产生的点。注意 这里只假设用在包围盒计算上。
		 * @param x 
		 * @param y 
		 * @param radius 
		 * @param startAngle 
		 * @param endAngle 
		 * @return 
		 */
		private _getPiePoints:any;
		private _getTriAngBBXPoints:any;
		private _getDraw9GridBBXPoints:any;
		private _getPathPoints:any;
	}

	/**
	 * 用户输入一个或多个文本字符时后调度。
	 * @eventType Event.INPUT
	 */

	/**
	 * 文本发生变化后调度。
	 * @eventType Event.CHANGE
	 */

	/**
	 * 用户在输入框内敲回车键后，将会调度 <code>enter</code> 事件。
	 * @eventType Event.ENTER
	 */

	/**
	 * 显示对象获得焦点后调度。
	 * @eventType Event.FOCUS
	 */

	/**
	 * 显示对象失去焦点后调度。
	 * @eventType Event.BLUR
	 */

	/**
	 * <p><code>Input</code> 类用于创建显示对象以显示和输入文本。</p>
	 * <p>Input 类封装了原生的文本输入框，由于不同浏览器的差异，会导致此对象的默认文本的位置与用户点击输入时的文本的位置有少许的偏差。</p>
	 */
	class Input extends Text  {

		/**
		 * 常规文本域。
		 */
		static TYPE_TEXT:string;

		/**
		 * password 类型用于密码域输入。
		 */
		static TYPE_PASSWORD:string;

		/**
		 * email 类型用于应该包含 e-mail 地址的输入域。
		 */
		static TYPE_EMAIL:string;

		/**
		 * url 类型用于应该包含 URL 地址的输入域。
		 */
		static TYPE_URL:string;

		/**
		 * number 类型用于应该包含数值的输入域。
		 */
		static TYPE_NUMBER:string;

		/**
		 * <p>range 类型用于应该包含一定范围内数字值的输入域。</p>
		 * <p>range 类型显示为滑动条。</p>
		 * <p>您还能够设定对所接受的数字的限定。</p>
		 */
		static TYPE_RANGE:string;

		/**
		 * 选取日、月、年。
		 */
		static TYPE_DATE:string;

		/**
		 * month - 选取月、年。
		 */
		static TYPE_MONTH:string;

		/**
		 * week - 选取周和年。
		 */
		static TYPE_WEEK:string;

		/**
		 * time - 选取时间（小时和分钟）。
		 */
		static TYPE_TIME:string;

		/**
		 * datetime - 选取时间、日、月、年（UTC 时间）。
		 */
		static TYPE_DATE_TIME:string;

		/**
		 * datetime-local - 选取时间、日、月、年（本地时间）。
		 */
		static TYPE_DATE_TIME_LOCAL:string;

		/**
		 * <p>search 类型用于搜索域，比如站点搜索或 Google 搜索。</p>
		 * <p>search 域显示为常规的文本域。</p>
		 */
		static TYPE_SEARCH:string;

		/**
		 * @private 
		 */
		protected static input:HTMLInputElement;

		/**
		 * @private 
		 */
		protected static area:HTMLTextAreaElement;

		/**
		 * @private 
		 */
		protected static inputElement:HTMLInputElement|HTMLTextAreaElement;

		/**
		 * @private 
		 */
		protected static inputContainer:HTMLDivElement;

		/**
		 * @private 
		 */
		protected static confirmButton:any;

		/**
		 * @private 
		 */
		protected static promptStyleDOM:any;

		/**
		 * @private 
		 */
		protected _focus:boolean;

		/**
		 * @private 
		 */
		protected _multiline:boolean;

		/**
		 * @private 
		 */
		protected _editable:boolean;

		/**
		 * @private 
		 */
		protected _restrictPattern:any;

		/**
		 * @private 
		 */
		protected _maxChars:number;
		private _type:any;

		/**
		 * 输入提示符。
		 */
		private _prompt:any;

		/**
		 * 输入提示符颜色。
		 */
		private _promptColor:any;
		private _originColor:any;
		private _content:any;

		/**
		 * @private 
		 */
		static IOS_IFRAME:boolean;
		private static inputHeight:any;

		/**
		 * 表示是否处于输入状态。
		 */
		static isInputting:boolean;

		/**
		 * 创建一个新的 <code>Input</code> 类实例。
		 */

		constructor();
		private static _popupInputMethod:any;
		private static _createInputElement:any;
		private static _initInput:any;
		private static _processInputting:any;
		private static _stopEvent:any;

		/**
		 * 设置光标位置和选取字符。
		 * @param startIndex 光标起始位置。
		 * @param endIndex 光标结束位置。
		 */
		setSelection(startIndex:number,endIndex:number):void;

		/**
		 * 表示是否是多行输入框。
		 */
		get multiline():boolean;
		set multiline(value:boolean);

		/**
		 * 获取对输入框的引用实例。
		 */
		get nativeInput():HTMLInputElement|HTMLTextAreaElement;
		private _onUnDisplay:any;
		private _onMouseDown:any;
		private static stageMatrix:any;

		/**
		 * 在输入期间，如果 Input 实例的位置改变，调用_syncInputTransform同步输入框的位置。
		 */
		private _syncInputTransform:any;

		/**
		 * 选中当前实例的所有文本。
		 */
		select():void;

		/**
		 * 表示焦点是否在此实例上。
		 */
		get focus():boolean;
		set focus(value:boolean);
		private _setInputMethod:any;
		private _focusIn:any;
		private _setPromptColor:any;

		/**
		 * @private 
		 */
		private _focusOut:any;

		/**
		 * @private 
		 */
		private _onKeyDown:any;

		/**
		 * 小游戏专用(解决键盘输入框内容和游戏输入框内容不同步的bug)
		 * @param value 
		 */
		miniGameTxt(value:string):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set text(value:string);

		/**
		 * @override 
		 */
		get text():string;

		/**
		 * @param text 
		 * @override 
		 */
		changeText(text:string):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set color(value:string);
		get color():string;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set bgColor(value:string);
		get bgColor():string;

		/**
		 * 限制输入的字符。
		 */
		get restrict():string;
		set restrict(pattern:string);

		/**
		 * 是否可编辑。
		 */
		set editable(value:boolean);
		get editable():boolean;

		/**
		 * <p>字符数量限制，默认为10000。</p>
		 * <p>设置字符数量限制时，小于等于0的值将会限制字符数量为10000。</p>
		 */
		get maxChars():number;
		set maxChars(value:number);

		/**
		 * 设置输入提示符。
		 */
		get prompt():string;
		set prompt(value:string);

		/**
		 * 设置输入提示符颜色。
		 */
		get promptColor():string;
		set promptColor(value:string);

		/**
		 * <p>输入框类型为Input静态常量之一。</p>
		 * <ul>
		 * <li>TYPE_TEXT</li>
		 * <li>TYPE_PASSWORD</li>
		 * <li>TYPE_EMAIL</li>
		 * <li>TYPE_URL</li>
		 * <li>TYPE_NUMBER</li>
		 * <li>TYPE_RANGE</li>
		 * <li>TYPE_DATE</li>
		 * <li>TYPE_MONTH</li>
		 * <li>TYPE_WEEK</li>
		 * <li>TYPE_TIME</li>
		 * <li>TYPE_DATE_TIME</li>
		 * <li>TYPE_DATE_TIME_LOCAL</li>
		 * </ul>
		 * <p>平台兼容性参见http://www.w3school.com.cn/html5/html_5_form_input_types.asp。</p>
		 */
		get type():string;
		set type(value:string);
	}

	/**
	 * 添加到父对象后调度。
	 * @eventType Event.ADDED
	 */

	/**
	 * 被父对象移除后调度。
	 * @eventType Event.REMOVED
	 */

	/**
	 * 加入节点树时调度。
	 * @eventType Event.DISPLAY
	 */

	/**
	 * 从节点树移除时调度。
	 * @eventType Event.UNDISPLAY
	 */

	/**
	 * <code>Node</code> 类是可放在显示列表中的所有对象的基类。该显示列表管理 Laya 运行时中显示的所有对象。使用 Node 类排列显示列表中的显示对象。Node 对象可以有子显示对象。
	 */
	class Node extends EventDispatcher  {

		/**
		 * @private 
		 */
		protected static ARRAY_EMPTY:any[];

		/**
		 * @private 
		 */
		private _bits:any;

		/**
		 * 节点名称。
		 */
		name:string;

		/**
		 * [只读]是否已经销毁。对象销毁后不能再使用。
		 */
		destroyed:boolean;

		constructor();
		createGLBuffer():void;

		/**
		 * <p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
		 * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 * @override 
		 */
		on(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * <p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
		 * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 * @override 
		 */
		once(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * <p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
		 * <p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
		 * @param destroyChild （可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 销毁时执行
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDestroy():void;

		/**
		 * 销毁所有子对象，不销毁自己本身。
		 */
		destroyChildren():void;

		/**
		 * 添加子节点。
		 * @param node 节点对象
		 * @return 返回添加的节点
		 */
		addChild(node:Node):Node;
		addInputChild(node:Node):Node;
		removeInputChild(node:Node):void;

		/**
		 * 批量增加子节点
		 * @param ...args 无数子节点。
		 */
		addChildren(...args:any[]):void;

		/**
		 * 添加子节点到指定的索引位置。
		 * @param node 节点对象。
		 * @param index 索引位置。
		 * @return 返回添加的节点。
		 */
		addChildAt(node:Node,index:number):Node;

		/**
		 * 根据子节点对象，获取子节点的索引位置。
		 * @param node 子节点。
		 * @return 子节点所在的索引位置。
		 */
		getChildIndex(node:Node):number;

		/**
		 * 根据子节点的名字，获取子节点对象。
		 * @param name 子节点的名字。
		 * @return 节点对象。
		 */
		getChildByName(name:string):Node;

		/**
		 * 根据子节点的索引位置，获取子节点对象。
		 * @param index 索引位置
		 * @return 子节点
		 */
		getChildAt(index:number):Node;

		/**
		 * 设置子节点的索引位置。
		 * @param node 子节点。
		 * @param index 新的索引。
		 * @return 返回子节点本身。
		 */
		setChildIndex(node:Node,index:number):Node;

		/**
		 * 子节点发生改变。
		 * @private 
		 * @param child 子节点。
		 */
		protected _childChanged(child?:Node):void;

		/**
		 * 删除子节点。
		 * @param node 子节点
		 * @return 被删除的节点
		 */
		removeChild(node:Node):Node;

		/**
		 * 从父容器删除自己，如已经被删除不会抛出异常。
		 * @return 当前节点（ Node ）对象。
		 */
		removeSelf():Node;

		/**
		 * 根据子节点名字删除对应的子节点对象，如果找不到不会抛出异常。
		 * @param name 对象名字。
		 * @return 查找到的节点（ Node ）对象。
		 */
		removeChildByName(name:string):Node;

		/**
		 * 根据子节点索引位置，删除对应的子节点对象。
		 * @param index 节点索引位置。
		 * @return 被删除的节点。
		 */
		removeChildAt(index:number):Node;

		/**
		 * 删除指定索引区间的所有子对象。
		 * @param beginIndex 开始索引。
		 * @param endIndex 结束索引。
		 * @return 当前节点对象。
		 */
		removeChildren(beginIndex?:number,endIndex?:number):Node;

		/**
		 * 替换子节点。
		 * 将传入的新节点对象替换到已有子节点索引位置处。
		 * @param newNode 新节点。
		 * @param oldNode 老节点。
		 * @return 返回新节点。
		 */
		replaceChild(newNode:Node,oldNode:Node):Node;

		/**
		 * 子对象数量。
		 */
		get numChildren():number;

		/**
		 * 父节点。
		 */
		get parent():Node;

		/**
		 * @private 
		 */
		protected _setParent(value:Node):void;

		/**
		 * 表示是否在显示列表中显示。
		 */
		get displayedInStage():boolean;

		/**
		 * @private 
		 */
		private _updateDisplayedInstage:any;

		/**
		 * 设置指定节点对象是否可见(是否在渲染列表中)。
		 * @private 
		 * @param node 节点。
		 * @param display 是否可见。
		 */
		private _displayChild:any;

		/**
		 * 当前容器是否包含指定的 <code>Node</code> 节点对象 。
		 * @param node 指定的 <code>Node</code> 节点对象 。
		 * @return 一个布尔值表示是否包含指定的 <code>Node</code> 节点对象 。
		 */
		contains(node:Node):boolean;

		/**
		 * 定时重复执行某函数。功能同Laya.timer.timerLoop()。
		 * @param delay 间隔时间(单位毫秒)。
		 * @param caller 执行域(this)。
		 * @param method 结束时的回调方法。
		 * @param args （可选）回调参数。
		 * @param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
		 * @param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
		 */
		timerLoop(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean,jumpFrame?:boolean):void;

		/**
		 * 定时执行某函数一次。功能同Laya.timer.timerOnce()。
		 * @param delay 延迟时间(单位毫秒)。
		 * @param caller 执行域(this)。
		 * @param method 结束时的回调方法。
		 * @param args （可选）回调参数。
		 * @param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
		 */
		timerOnce(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 定时重复执行某函数(基于帧率)。功能同Laya.timer.frameLoop()。
		 * @param delay 间隔几帧(单位为帧)。
		 * @param caller 执行域(this)。
		 * @param method 结束时的回调方法。
		 * @param args （可选）回调参数。
		 * @param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
		 */
		frameLoop(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 定时执行一次某函数(基于帧率)。功能同Laya.timer.frameOnce()。
		 * @param delay 延迟几帧(单位为帧)。
		 * @param caller 执行域(this)
		 * @param method 结束时的回调方法
		 * @param args （可选）回调参数
		 * @param coverBefore （可选）是否覆盖之前的延迟执行，默认为true
		 */
		frameOnce(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 清理定时器。功能同Laya.timer.clearTimer()。
		 * @param caller 执行域(this)。
		 * @param method 结束时的回调方法。
		 */
		clearTimer(caller:any,method:Function):void;

		/**
		 * <p>延迟运行指定的函数。</p>
		 * <p>在控件被显示在屏幕之前调用，一般用于延迟计算数据。</p>
		 * @param method 要执行的函数的名称。例如，functionName。
		 * @param args 传递给 <code>method</code> 函数的可选参数列表。
		 * @see #runCallLater()
		 */
		callLater(method:Function,args?:any[]):void;

		/**
		 * <p>如果有需要延迟调用的函数（通过 <code>callLater</code> 函数设置），则立即执行延迟调用函数。</p>
		 * @param method 要执行的函数名称。例如，functionName。
		 * @see #callLater()
		 */
		runCallLater(method:Function):void;

		/**
		 * @private 
		 */
		private _components:any;

		/**
		 * @private 
		 */
		private _activeChangeScripts:any;

		/**
		 * 获得所属场景。
		 * @return 场景。
		 */
		get scene():any;

		/**
		 * 获取自身是否激活。
		 * @return 自身是否激活。
		 */
		get active():boolean;

		/**
		 * 设置是否激活。
		 * @param value 是否激活。
		 */
		set active(value:boolean);

		/**
		 * 获取在场景中是否激活。
		 * @return 在场景中是否激活。
		 */
		get activeInHierarchy():boolean;

		/**
		 * @private 
		 */
		protected _onActive():void;

		/**
		 * @private 
		 */
		protected _onInActive():void;

		/**
		 * @private 
		 */
		protected _onActiveInScene():void;

		/**
		 * @private 
		 */
		protected _onInActiveInScene():void;

		/**
		 * 组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onAwake():void;

		/**
		 * 组件被启用后执行，比如节点被添加到舞台后
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onEnable():void;

		/**
		 * @private 
		 */
		private _activeScripts:any;

		/**
		 * @private 
		 */
		private _processInActive:any;

		/**
		 * @private 
		 */
		private _inActiveScripts:any;

		/**
		 * 组件被禁用时执行，比如从节点从舞台移除后
		 * 此方法为虚方法，使用时重写覆盖即可
		 */
		onDisable():void;

		/**
		 * @private 
		 */
		protected _onAdded():void;

		/**
		 * @private 
		 */
		protected _onRemoved():void;

		/**
		 * 添加组件实例。
		 * @param component 组建实例。
		 * @return 组件。
		 */
		addComponentIntance(component:Component):any;

		/**
		 * 添加组件。
		 * @param componentType 组件类型。
		 * @return 组件。
		 */
		addComponent(componentType:typeof Component):any;

		/**
		 * 获得组件实例，如果没有则返回为null
		 * @param componentType 组建类型
		 * @return 返回组件
		 */
		getComponent(componentType:typeof Component):any;

		/**
		 * 获得组件实例，如果没有则返回为null
		 * @param componentType 组建类型
		 * @return 返回组件数组
		 */
		getComponents(componentType:typeof Component):any[];

		/**
		 * @private 获取timer
		 */
		get timer():Timer;
	}

	/**
	 * 场景类，负责场景创建，加载，销毁等功能
	 * 场景被从节点移除后，并不会被自动垃圾机制回收，如果想回收，请调用destroy接口，可以通过unDestroyedScenes属性查看还未被销毁的场景列表
	 */
	class Scene extends Sprite  {

		/**
		 * 创建后，还未被销毁的场景列表，方便查看还未被销毁的场景列表，方便内存管理，本属性只读，请不要直接修改
		 */
		static unDestroyedScenes:any[];

		/**
		 * 获取根节点
		 */
		private static _root:any;

		/**
		 * @private 
		 */
		private static _loadPage:any;

		/**
		 * 场景被关闭后，是否自动销毁（销毁节点和使用到的资源），默认为false
		 */
		autoDestroyAtClosed:boolean;

		/**
		 * 场景地址
		 */
		url:string;

		/**
		 * 场景时钟
		 */
		private _timer:any;

		/**
		 * @private 
		 */
		private _viewCreated:any;

		constructor(createChildren?:boolean);

		/**
		 * @private 兼容老项目
		 */
		protected createChildren():void;

		/**
		 * 兼容加载模式
		 * 加载模式设置uimap
		 * @param url uimapJosn的url
		 */
		static setUIMap(url:string):void;

		/**
		 * @private 兼容老项目
装载场景视图。用于加载模式。
		 * @param path 场景地址。
		 */
		loadScene(path:string):void;
		private _onSceneLoaded:any;

		/**
		 * @private 兼容老项目
通过视图数据创建视图。
		 * @param uiView 视图数据信息。
		 */
		createView(view:any):void;

		/**
		 * 根据IDE内的节点id，获得节点实例
		 */
		getNodeByID(id:number):any;

		/**
		 * 打开场景。【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
		 * @param closeOther 是否关闭其他场景，默认为true（可选）
		 * @param param 打开页面的参数，会传递给onOpened方法（可选）
		 */
		open(closeOther?:boolean,param?:any):void;

		/**
		 * 场景打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
		 */
		onOpened(param:any):void;

		/**
		 * 关闭场景
		 * 【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
		 * @param type 关闭的原因，会传递给onClosed函数
		 */
		close(type?:string):void;

		/**
		 * 关闭完成后，调用此方法（如果有关闭动画，则在动画完成后执行）
		 * @param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null。
		 */
		onClosed(type?:string):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set scaleX(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get scaleX():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set scaleY(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get scaleY():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @private 
		 */
		protected _sizeChanged():void;

		/**
		 * 获取场景根容器
		 */
		static get root():Sprite;

		/**
		 * 场景时钟
		 * @override 
		 */
		get timer():Timer;
		set timer(value:Timer);

		/**
		 * 加载场景及场景使用到的资源
		 * @param url 场景地址
		 * @param complete 加载完成回调，返回场景实例（可选）
		 * @param progress 加载进度回调（可选）
		 */
		static load(url:string,complete?:Handler,progress?:Handler):void;

		/**
		 * 加载并打开场景
		 * @param url 场景地址
		 * @param closeOther 是否关闭其他场景，默认为true（可选），【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
		 * @param param 打开页面的参数，会传递给onOpened方法（可选）
		 * @param complete 打开完成回调，返回场景实例（可选）
		 * @param progress 加载进度回调（可选）
		 */
		static open(url:string,closeOther?:boolean,param?:any,complete?:Handler,progress?:Handler):void;

		/**
		 * @private 
		 */
		private static _onSceneLoaded:any;

		/**
		 * 根据地址，关闭场景（包括对话框）
		 * @param url 场景地址
		 * @param name 如果name不为空，name必须相同才能关闭
		 * @return 返回是否关闭成功，如果url找不到，则不成功
		 */
		static close(url:string,name?:string):boolean;

		/**
		 * 关闭所有场景，不包括对话框，如果关闭对话框，请使用Dialog.closeAll()
		 * 【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
		 */
		static closeAll():void;

		/**
		 * 根据地址，销毁场景（包括对话框）
		 * @param url 场景地址
		 * @param name 如果name不为空，name必须相同才能关闭
		 * @return 返回是否销毁成功，如果url找不到，则不成功
		 */
		static destroy(url:string,name?:string):boolean;

		/**
		 * 销毁当前没有被使用的资源,该函数会忽略lock=true的资源。
		 */
		static gc():void;

		/**
		 * 设置loading界面，引擎会在调用open方法后，延迟打开loading界面，在页面添加到舞台之后，关闭loading界面
		 * @param loadPage load界面实例
		 */
		static setLoadingPage(loadPage:Scene):void;

		/**
		 * 显示loading界面
		 * @param param 打开参数，如果是scene，则会传递给onOpened方法
		 * @param delay 延迟打开时间，默认500毫秒
		 */
		static showLoadingPage(param?:any,delay?:number):void;
		private static _showLoading:any;
		private static _hideLoading:any;

		/**
		 * 隐藏loading界面
		 * @param delay 延迟关闭时间，默认500毫秒
		 */
		static hideLoadingPage(delay?:number):void;
	}

	/**
	 * 在显示对象上按下后调度。
	 * @eventType Event.MOUSE_DOWN
	 */

	/**
	 * 在显示对象抬起后调度。
	 * @eventType Event.MOUSE_UP
	 */

	/**
	 * 鼠标在对象身上进行移动后调度
	 * @eventType Event.MOUSE_MOVE
	 */

	/**
	 * 鼠标经过对象后调度。
	 * @eventType Event.MOUSE_OVER
	 */

	/**
	 * 鼠标离开对象后调度。
	 * @eventType Event.MOUSE_OUT
	 */

	/**
	 * 鼠标点击对象后调度。
	 * @eventType Event.CLICK
	 */

	/**
	 * 开始拖动后调度。
	 * @eventType Event.DRAG_START
	 */

	/**
	 * 拖动中调度。
	 * @eventType Event.DRAG_MOVE
	 */

	/**
	 * 拖动结束后调度。
	 * @eventType Event.DRAG_END
	 */

	/**
	 * <p> <code>Sprite</code> 是基本的显示图形的显示列表节点。 <code>Sprite</code> 默认没有宽高，默认不接受鼠标事件。通过 <code>graphics</code> 可以绘制图片或者矢量图，支持旋转，缩放，位移等操作。<code>Sprite</code>同时也是容器类，可用来添加多个子节点。</p>
	 * <p>注意： <code>Sprite</code> 默认没有宽高，可以通过<code>getBounds</code>函数获取；也可手动设置宽高；还可以设置<code>autoSize=true</code>，然后再获取宽高。<code>Sprite</code>的宽高一般用于进行碰撞检测和排版，并不影响显示图像大小，如果需要更改显示图像大小，请使用 <code>scaleX</code> ， <code>scaleY</code> ， <code>scale</code>。</p>
	 * <p> <code>Sprite</code> 默认不接受鼠标事件，即<code>mouseEnabled=false</code>，但是只要对其监听任意鼠标事件，会自动打开自己以及所有父对象的<code>mouseEnabled=true</code>。所以一般也无需手动设置<code>mouseEnabled</code>。</p>
	 * <p>LayaAir引擎API设计精简巧妙。核心显示类只有一个<code>Sprite</code>。<code>Sprite</code>针对不同的情况做了渲染优化，所以保证一个类实现丰富功能的同时，又达到高性能。</p>
	 * @example <caption>创建了一个 <code>Sprite</code> 实例。</caption>
package
{
import laya.display.Sprite;
import laya.events.Event;

public class Sprite_Example
{
private var sprite:Sprite;
private var shape:Sprite
public function Sprite_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
onInit();
}
private function onInit():void
{
sprite = new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
sprite.x = 200;//设置 sprite 对象相对于父容器的水平方向坐标值。
sprite.y = 200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
sprite.pivotX = 0;//设置 sprite 对象的水平方法轴心点坐标。
sprite.pivotY = 0;//设置 sprite 对象的垂直方法轴心点坐标。
Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
sprite.on(Event.CLICK, this, onClickSprite);//给 sprite 对象添加点击事件侦听。
shape = new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
shape.graphics.drawRect(0, 0, 100, 100, "#ccff00", "#ff0000", 2);//绘制一个有边框的填充矩形。
shape.x = 400;//设置 shape 对象相对于父容器的水平方向坐标值。
shape.y = 200;//设置 shape 对象相对于父容器的垂直方向坐标值。
shape.width = 100;//设置 shape 对象的宽度。
shape.height = 100;//设置 shape 对象的高度。
shape.pivotX = 50;//设置 shape 对象的水平方法轴心点坐标。
shape.pivotY = 50;//设置 shape 对象的垂直方法轴心点坐标。
Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
shape.on(Event.CLICK, this, onClickShape);//给 shape 对象添加点击事件侦听。
}
private function onClickSprite():void
{
trace("点击 sprite 对象。");
sprite.rotation += 5;//旋转 sprite 对象。
}
private function onClickShape():void
{
trace("点击 shape 对象。");
shape.rotation += 5;//旋转 shape 对象。
}
}
}
	 * @example var sprite;
var shape;
Sprite_Example();
function Sprite_Example()
{
    Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
    Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
    onInit();
}
function onInit()
{
    sprite = new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
    sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
    sprite.x = 200;//设置 sprite 对象相对于父容器的水平方向坐标值。
    sprite.y = 200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
    sprite.pivotX = 0;//设置 sprite 对象的水平方法轴心点坐标。
    sprite.pivotY = 0;//设置 sprite 对象的垂直方法轴心点坐标。
    Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
    sprite.on(Event.CLICK, this, onClickSprite);//给 sprite 对象添加点击事件侦听。
     shape = new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
    shape.graphics.drawRect(0, 0, 100, 100, "#ccff00", "#ff0000", 2);//绘制一个有边框的填充矩形。
    shape.x = 400;//设置 shape 对象相对于父容器的水平方向坐标值。
    shape.y = 200;//设置 shape 对象相对于父容器的垂直方向坐标值。
    shape.width = 100;//设置 shape 对象的宽度。
    shape.height = 100;//设置 shape 对象的高度。
    shape.pivotX = 50;//设置 shape 对象的水平方法轴心点坐标。
    shape.pivotY = 50;//设置 shape 对象的垂直方法轴心点坐标。
    Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
    shape.on(laya.events.Event.CLICK, this, onClickShape);//给 shape 对象添加点击事件侦听。
}
function onClickSprite()
{
    console.log("点击 sprite 对象。");
    sprite.rotation += 5;//旋转 sprite 对象。
}
function onClickShape()
{
    console.log("点击 shape 对象。");
    shape.rotation += 5;//旋转 shape 对象。
}
	 * @example import Sprite = laya.display.Sprite;
class Sprite_Example {
    private sprite: Sprite;
    private shape: Sprite
    public Sprite_Example() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.onInit();
    }
    private onInit(): void {
        this.sprite = new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
        this.sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
        this.sprite.x = 200;//设置 sprite 对象相对于父容器的水平方向坐标值。
        this.sprite.y = 200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
        this.sprite.pivotX = 0;//设置 sprite 对象的水平方法轴心点坐标。
        this.sprite.pivotY = 0;//设置 sprite 对象的垂直方法轴心点坐标。
        Laya.stage.addChild(this.sprite);//将此 sprite 对象添加到显示列表。
        this.sprite.on(laya.events.Event.CLICK, this, this.onClickSprite);//给 sprite 对象添加点击事件侦听。
         this.shape = new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
        this.shape.graphics.drawRect(0, 0, 100, 100, "#ccff00", "#ff0000", 2);//绘制一个有边框的填充矩形。
        this.shape.x = 400;//设置 shape 对象相对于父容器的水平方向坐标值。
        this.shape.y = 200;//设置 shape 对象相对于父容器的垂直方向坐标值。
        this.shape.width = 100;//设置 shape 对象的宽度。
        this.shape.height = 100;//设置 shape 对象的高度。
        this.shape.pivotX = 50;//设置 shape 对象的水平方法轴心点坐标。
        this.shape.pivotY = 50;//设置 shape 对象的垂直方法轴心点坐标。
        Laya.stage.addChild(this.shape);//将此 shape 对象添加到显示列表。
        this.shape.on(laya.events.Event.CLICK, this, this.onClickShape);//给 shape 对象添加点击事件侦听。
    }
    private onClickSprite(): void {
        console.log("点击 sprite 对象。");
        this.sprite.rotation += 5;//旋转 sprite 对象。
    }
    private onClickShape(): void {
        console.log("点击 shape 对象。");
        this.shape.rotation += 5;//旋转 shape 对象。
    }
}
	 */
	class Sprite extends Node  {

		/**
		 * <p>鼠标事件与此对象的碰撞检测是否可穿透。碰撞检测发生在鼠标事件的捕获阶段，此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象。</p>
		 * <p>穿透表示鼠标事件发生的位置处于本对象绘图区域内时，才算命中，而与对象宽高和值为Rectangle对象的hitArea属性无关。如果sprite.hitArea值是HitArea对象，表示显式声明了此对象的鼠标事件响应区域，而忽略对象的宽高、mouseThrough属性。</p>
		 * <p>影响对象鼠标事件响应区域的属性为：width、height、hitArea，优先级顺序为：hitArea(type:HitArea)>hitArea(type:Rectangle)>width/height。</p>
		 * @default false	不可穿透，此对象的鼠标响应区域由width、height、hitArea属性决定。</p>
		 */
		mouseThrough:boolean;

		/**
		 * <p>指定是否自动计算宽高数据。默认值为 false 。</p>
		 * <p>Sprite宽高默认为0，并且不会随着绘制内容的变化而变化，如果想根据绘制内容获取宽高，可以设置本属性为true，或者通过getBounds方法获取。设置为true，对性能有一定影响。</p>
		 */
		autoSize:boolean;

		/**
		 * <p>指定鼠标事件检测是优先检测自身，还是优先检测其子对象。鼠标事件检测发生在鼠标事件的捕获阶段，此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象。</p>
		 * <p>如果为false，优先检测子对象，当有子对象被命中时，中断检测，获得命中目标。如果未命中任何子对象，最后再检测此对象；如果为true，则优先检测本对象，如果本对象没有被命中，直接中断检测，表示没有命中目标；如果本对象被命中，则进一步递归检测其子对象，以确认最终的命中目标。</p>
		 * <p>合理使用本属性，能减少鼠标事件检测的节点，提高性能。可以设置为true的情况：开发者并不关心此节点的子节点的鼠标事件检测结果，也就是以此节点作为其子节点的鼠标事件检测依据。</p>
		 * <p>Stage对象和UI的View组件默认为true。</p>
		 * @default false	优先检测此对象的子对象，当递归检测完所有子对象后，仍然没有找到目标对象，最后再检测此对象。
		 */
		hitTestPrior:boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		constructor();

		/**
		 * 根据zOrder进行重新排序。
		 */
		updateZOrder():void;

		/**
		 * 设置是否开启自定义渲染，只有开启自定义渲染，才能使用customRender函数渲染。
		 */
		set customRenderEnable(b:boolean);

		/**
		 * 指定显示对象是否缓存为静态图像，cacheAs时，子对象发生变化，会自动重新缓存，同时也可以手动调用reCache方法更新缓存。
		 * 建议把不经常变化的“复杂内容”缓存为静态图像，能极大提高渲染性能。cacheAs有"none"，"normal"和"bitmap"三个值可选。
		 * 默认为"none"，不做任何缓存。
		 * 当值为"normal"时，canvas模式下进行画布缓存，webgl模式下进行命令缓存。
		 * 当值为"bitmap"时，canvas模式下进行依然是画布缓存，webgl模式下使用renderTarget缓存。
		 * webgl下renderTarget缓存模式缺点：会额外创建renderTarget对象，增加内存开销，缓存面积有最大2048限制，不断重绘时会增加CPU开销。优点：大幅减少drawcall，渲染性能最高。
		 * webgl下命令缓存模式缺点：只会减少节点遍历及命令组织，不会减少drawcall数，性能中等。优点：没有额外内存开销，无需renderTarget支持。
		 */
		get cacheAs():string;
		set cacheAs(value:string);

		/**
		 * 更新_cnavas相关的状态
		 */
		private _checkCanvasEnable:any;

		/**
		 * 设置cacheAs为非空时此值才有效，staticCache=true时，子对象变化时不会自动更新缓存，只能通过调用reCache方法手动刷新。
		 */
		get staticCache():boolean;
		set staticCache(value:boolean);

		/**
		 * 在设置cacheAs的情况下，调用此方法会重新刷新缓存。
		 */
		reCache():void;
		getRepaint():number;

		/**
		 * 表示显示对象相对于父容器的水平方向坐标值。
		 */
		get x():number;
		set x(value:number);

		/**
		 * 表示显示对象相对于父容器的垂直方向坐标值。
		 */
		get y():number;
		set y(value:number);

		/**
		 * <p>显示对象的宽度，单位为像素，默认为0。</p>
		 * <p>此宽度用于鼠标碰撞检测，并不影响显示对象图像大小。需要对显示对象的图像进行缩放，请使用scale、scaleX、scaleY。</p>
		 * <p>可以通过getbounds获取显示对象图像的实际宽度。</p>
		 */
		get width():number;
		set width(value:number);
		set_width(value:number):void;
		get_width():number;

		/**
		 * <p>显示对象的高度，单位为像素，默认为0。</p>
		 * <p>此高度用于鼠标碰撞检测，并不影响显示对象图像大小。需要对显示对象的图像进行缩放，请使用scale、scaleX、scaleY。</p>
		 * <p>可以通过getbounds获取显示对象图像的实际高度。</p>
		 */
		get height():number;
		set height(value:number);
		set_height(value:number):void;
		get_height():number;

		/**
		 * <p>对象的显示宽度（以像素为单位）。</p>
		 */
		get displayWidth():number;

		/**
		 * <p>对象的显示高度（以像素为单位）。</p>
		 */
		get displayHeight():number;

		/**
		 * 设置对象bounds大小，如果有设置，则不再通过getBounds计算，合理使用能提高性能。
		 * @param bound bounds矩形区域
		 */
		setSelfBounds(bound:Rectangle):void;

		/**
		 * <p>获取本对象在父容器坐标系的矩形显示区域。</p>
		 * <p><b>注意：</b>计算量较大，尽量少用。</p>
		 * @return 矩形区域。
		 */
		getBounds():Rectangle;

		/**
		 * 获取本对象在自己坐标系的矩形显示区域。
		 * <p><b>注意：</b>计算量较大，尽量少用。</p>
		 * @return 矩形区域。
		 */
		getSelfBounds():Rectangle;

		/**
		 * 返回此实例中的绘图对象（ <code>Graphics</code> ）的显示区域，不包括子对象。
		 * @param realSize （可选）使用图片的真实大小，默认为false
		 * @return 一个 Rectangle 对象，表示获取到的显示区域。
		 */
		getGraphicBounds(realSize?:boolean):Rectangle;

		/**
		 * @private 获取样式。
		 * @return 样式 Style 。
		 */
		getStyle():SpriteStyle;

		/**
		 * @private 设置样式。
		 * @param value 样式。
		 */
		setStyle(value:SpriteStyle):void;

		/**
		 * X轴缩放值，默认值为1。设置为负数，可以实现水平反转效果，比如scaleX=-1。
		 */
		get scaleX():number;
		set scaleX(value:number);

		/**
		 * Y轴缩放值，默认值为1。设置为负数，可以实现垂直反转效果，比如scaleX=-1。
		 */
		get scaleY():number;
		set scaleY(value:number);
		set_scaleX(value:number):void;
		get_scaleX():number;
		set_scaleY(value:number):void;
		get_scaleY():number;

		/**
		 * 旋转角度，默认值为0。以角度为单位。
		 */
		get rotation():number;
		set rotation(value:number);

		/**
		 * 水平倾斜角度，默认值为0。以角度为单位。
		 */
		get skewX():number;
		set skewX(value:number);

		/**
		 * 垂直倾斜角度，默认值为0。以角度为单位。
		 */
		get skewY():number;
		set skewY(value:number);

		/**
		 * @private 
		 */
		protected _adjustTransform():Matrix;

		/**
		 * <p>对象的矩阵信息。通过设置矩阵可以实现节点旋转，缩放，位移效果。</p>
		 * <p>矩阵更多信息请参考 <code>Matrix</code></p>
		 */
		get transform():Matrix;
		set transform(value:Matrix);
		get_transform():Matrix;
		set_transform(value:Matrix):void;

		/**
		 * X轴 轴心点的位置，单位为像素，默认为0。轴心点会影响对象位置，缩放中心，旋转中心。
		 */
		get pivotX():number;
		set pivotX(value:number);

		/**
		 * Y轴 轴心点的位置，单位为像素，默认为0。轴心点会影响对象位置，缩放中心，旋转中心。
		 */
		get pivotY():number;
		set pivotY(value:number);

		/**
		 * 透明度，值为0-1，默认值为1，表示不透明。更改alpha值会影响drawcall。
		 */
		get alpha():number;
		set alpha(value:number);

		/**
		 * 表示是否可见，默认为true。如果设置不可见，节点将不被渲染。
		 */
		get visible():boolean;
		set visible(value:boolean);
		get_visible():boolean;
		set_visible(value:boolean):void;

		/**
		 * 指定要使用的混合模式。目前只支持"lighter"。
		 */
		get blendMode():string;
		set blendMode(value:string);

		/**
		 * 绘图对象。封装了绘制位图和矢量图的接口，Sprite所有的绘图操作都通过Graphics来实现的。
		 */
		get graphics():Graphics;
		set graphics(value:Graphics);

		/**
		 * <p>显示对象的滚动矩形范围，具有裁剪效果(如果只想限制子对象渲染区域，请使用viewport)</p>
		 * <p> srollRect和viewport的区别：<br/>
		 * 1.srollRect自带裁剪效果，viewport只影响子对象渲染是否渲染，不具有裁剪效果（性能更高）。<br/>
		 * 2.设置rect的x,y属性均能实现区域滚动效果，但scrollRect会保持0,0点位置不变。</p>
		 */
		get scrollRect():Rectangle;
		set scrollRect(value:Rectangle);

		/**
		 * <p>设置坐标位置。相当于分别设置x和y属性。</p>
		 * <p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.pos(...).scale(...);</p>
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 * @param speedMode （可选）是否极速模式，正常是调用this.x=value进行赋值，极速模式直接调用内部函数处理，如果未重写x,y属性，建议设置为急速模式性能更高。
		 * @return 返回对象本身。
		 */
		pos(x:number,y:number,speedMode?:boolean):Sprite;

		/**
		 * <p>设置轴心点。相当于分别设置pivotX和pivotY属性。</p>
		 * <p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.pivot(...).pos(50, 100);</p>
		 * @param x X轴心点。
		 * @param y Y轴心点。
		 * @return 返回对象本身。
		 */
		pivot(x:number,y:number):Sprite;

		/**
		 * <p>设置宽高。相当于分别设置width和height属性。</p>
		 * <p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.size(...).pos(50, 100);</p>
		 * @param width 宽度值。
		 * @param hegiht 高度值。
		 * @return 返回对象本身。
		 */
		size(width:number,height:number):Sprite;

		/**
		 * <p>设置缩放。相当于分别设置scaleX和scaleY属性。</p>
		 * <p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.scale(...).pos(50, 100);</p>
		 * @param scaleX X轴缩放比例。
		 * @param scaleY Y轴缩放比例。
		 * @param speedMode （可选）是否极速模式，正常是调用this.scaleX=value进行赋值，极速模式直接调用内部函数处理，如果未重写scaleX,scaleY属性，建议设置为急速模式性能更高。
		 * @return 返回对象本身。
		 */
		scale(scaleX:number,scaleY:number,speedMode?:boolean):Sprite;

		/**
		 * <p>设置倾斜角度。相当于分别设置skewX和skewY属性。</p>
		 * <p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.skew(...).pos(50, 100);</p>
		 * @param skewX 水平倾斜角度。
		 * @param skewY 垂直倾斜角度。
		 * @return 返回对象本身
		 */
		skew(skewX:number,skewY:number):Sprite;

		/**
		 * 更新、呈现显示对象。由系统调用。
		 * @param context 渲染的上下文引用。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 */
		render(ctx:Context,x:number,y:number):void;

		/**
		 * <p>绘制 当前<code>Sprite</code> 到 <code>Canvas</code> 上，并返回一个HtmlCanvas。</p>
		 * <p>绘制的结果可以当作图片源，再次绘制到其他Sprite里面，示例：</p>
		 * 
		 * var htmlCanvas:HTMLCanvas = sprite.drawToCanvas(100, 100, 0, 0);//把精灵绘制到canvas上面
		 * var sp:Sprite = new Sprite();//创建精灵
		 * sp.graphics.drawTexture(htmlCanvas.getTexture());//把截图绘制到精灵上
		 * Laya.stage.addChild(sp);//把精灵显示到舞台
		 * 
		 * <p>也可以获取原始图片数据，分享到网上，从而实现截图效果，示例：</p>
		 * 
		 * var htmlCanvas:HTMLCanvas = sprite.drawToCanvas(100, 100, 0, 0);//把精灵绘制到canvas上面
		 * htmlCanvas.toBase64("image/png",0.9);//打印图片base64信息，可以发给服务器或者保存为图片
		 * @param canvasWidth 画布宽度。
		 * @param canvasHeight 画布高度。
		 * @param x 绘制的 X 轴偏移量。
		 * @param y 绘制的 Y 轴偏移量。
		 * @return HTMLCanvas 对象。
		 */
		drawToCanvas(canvasWidth:number,canvasHeight:number,offsetX:number,offsetY:number):HTMLCanvas;

		/**
		 * 绘制到一个Texture对象
		 * @param canvasWidth 
		 * @param canvasHeight 
		 * @param offsetX 
		 * @param offsetY 
		 */
		drawToTexture(canvasWidth:number,canvasHeight:number,offsetX:number,offsetY:number,rt?:RenderTexture2D|null):Texture|RenderTexture2D;

		/**
		 * 把当前对象渲染到指定的贴图上。贴图由外部指定，避免每次都创建。
		 * @param offx 
		 * @param offy 
		 * @param tex 输出渲染结果
		 */
		drawToTexture3D(offx:number,offy:number,tex:Texture2D):void;

		/**
		 * @private 绘制到画布。
		 */
		static drawToCanvas(sprite:Sprite,_renderType:number,canvasWidth:number,canvasHeight:number,offsetX:number,offsetY:number):HTMLCanvas;
		static drawtocanvCtx:Context;

		/**
		 * @private 
		 */
		static drawToTexture(sprite:Sprite,_renderType:number,canvasWidth:number,canvasHeight:number,offsetX:number,offsetY:number,rt?:RenderTexture2D|null):Texture|RenderTexture2D;

		/**
		 * <p>自定义更新、呈现显示对象。一般用来扩展渲染模式，请合理使用，可能会导致在加速器上无法渲染。</p>
		 * <p><b>注意</b>不要在此函数内增加或删除树节点，否则会对树节点遍历造成影响。</p>
		 * @param context 渲染的上下文引用。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 */
		customRender(context:Context,x:number,y:number):void;

		/**
		 * 滤镜集合。可以设置多个滤镜组合。
		 */
		get filters():any[];
		set filters(value:any[]);

		/**
		 * 把本地坐标转换为相对stage的全局坐标。
		 * @param point 本地坐标点。
		 * @param createNewPoint （可选）是否创建一个新的Point对象作为返回值，默认为false，使用输入的point对象返回，减少对象创建开销。
		 * @param globalNode global节点，默认为Laya.stage
		 * @return 转换后的坐标的点。
		 */
		localToGlobal(point:Point,createNewPoint?:boolean,globalNode?:Sprite|null):Point;

		/**
		 * 把stage的全局坐标转换为本地坐标。
		 * @param point 全局坐标点。
		 * @param createNewPoint （可选）是否创建一个新的Point对象作为返回值，默认为false，使用输入的point对象返回，减少对象创建开销。
		 * @param globalNode global节点，默认为Laya.stage
		 * @return 转换后的坐标的点。
		 */
		globalToLocal(point:Point,createNewPoint?:boolean,globalNode?:Sprite|null):Point;

		/**
		 * 将本地坐标系坐标转转换到父容器坐标系。
		 * @param point 本地坐标点。
		 * @return 转换后的点。
		 */
		toParentPoint(point:Point):Point;

		/**
		 * 将父容器坐标系坐标转换到本地坐标系。
		 * @param point 父容器坐标点。
		 * @return 转换后的点。
		 */
		fromParentPoint(point:Point):Point;

		/**
		 * 将Stage坐标系坐标转换到本地坐标系。
		 * @param point 父容器坐标点。
		 * @return 转换后的点。
		 */
		fromStagePoint(point:Point):Point;

		/**
		 * <p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
		 * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 * @override 
		 */
		on(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * <p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
		 * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 * @override 
		 */
		once(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * @private 
		 */
		protected _onDisplay(v?:boolean):void;

		/**
		 * @private 
		 * @override 
		 */
		protected _setParent(value:Node):void;

		/**
		 * <p>加载并显示一个图片。相当于加载图片后，设置texture属性</p>
		 * <p>注意：2.0改动：多次调用，只会显示一个图片（1.0会显示多个图片）,x,y,width,height参数取消。</p>
		 * @param url 图片地址。
		 * @param complete （可选）加载完成回调。
		 * @return 返回精灵对象本身。
		 */
		loadImage(url:string,complete?:Handler):Sprite;

		/**
		 * 根据图片地址创建一个新的 <code>Sprite</code> 对象用于加载并显示此图片。
		 * @param url 图片地址。
		 * @return 返回新的 <code>Sprite</code> 对象。
		 */
		static fromImage(url:string):Sprite;

		/**
		 * cacheAs后，设置自己和父对象缓存失效。
		 */
		repaint(type?:number):void;

		/**
		 * @private 
		 * @override 
		 */
		protected _childChanged(child?:Node):void;

		/**
		 * cacheAs时，设置所有父对象缓存失效。
		 */
		parentRepaint(type?:number):void;

		/**
		 * 对舞台 <code>stage</code> 的引用。
		 */
		get stage():Stage;

		/**
		 * <p>可以设置一个Rectangle区域作为点击区域，或者设置一个<code>HitArea</code>实例作为点击区域，HitArea内可以设置可点击和不可点击区域。</p>
		 * <p>如果不设置hitArea，则根据宽高形成的区域进行碰撞。</p>
		 */
		get hitArea():any;
		set hitArea(value:any);

		/**
		 * <p>遮罩，可以设置一个对象(支持位图和矢量图)，根据对象形状进行遮罩显示。</p>
		 * <p>【注意】遮罩对象坐标系是相对遮罩对象本身的，和Flash机制不同</p>
		 */
		get mask():Sprite;
		set mask(value:Sprite);

		/**
		 * 是否接受鼠标事件。
		 * 默认为false，如果监听鼠标事件，则会自动设置本对象及父节点的属性 mouseEnable 的值都为 true（如果父节点手动设置为false，则不会更改）。
		 */
		get mouseEnabled():boolean;
		set mouseEnabled(value:boolean);

		/**
		 * 开始拖动此对象。
		 * @param area （可选）拖动区域，此区域为当前对象注册点活动区域（不包括对象宽高），可选。
		 * @param hasInertia （可选）鼠标松开后，是否还惯性滑动，默认为false，可选。
		 * @param elasticDistance （可选）橡皮筋效果的距离值，0为无橡皮筋效果，默认为0，可选。
		 * @param elasticBackTime （可选）橡皮筋回弹时间，单位为毫秒，默认为300毫秒，可选。
		 * @param data （可选）拖动事件携带的数据，可选。
		 * @param disableMouseEvent （可选）禁用其他对象的鼠标检测，默认为false，设置为true能提高性能。
		 * @param ratio （可选）惯性阻尼系数，影响惯性力度和时长。
		 */
		startDrag(area?:Rectangle,hasInertia?:boolean,elasticDistance?:number,elasticBackTime?:number,data?:any,disableMouseEvent?:boolean,ratio?:number):void;

		/**
		 * 停止拖动此对象。
		 */
		stopDrag():void;

		/**
		 * 检测某个点是否在此对象内。
		 * @param x 全局x坐标。
		 * @param y 全局y坐标。
		 * @return 表示是否在对象内。
		 */
		hitTestPoint(x:number,y:number):boolean;

		/**
		 * 获得相对于本对象上的鼠标坐标信息。
		 */
		getMousePoint():Point;

		/**
		 * 获得相对于stage的全局X轴缩放值（会叠加父亲节点的缩放值）。
		 */
		get globalScaleX():number;

		/**
		 * 获得相对于stage的全局旋转值（会叠加父亲节点的旋转值）。
		 */
		get globalRotation():number;

		/**
		 * 获得相对于stage的全局Y轴缩放值（会叠加父亲节点的缩放值）。
		 */
		get globalScaleY():number;

		/**
		 * 返回鼠标在此对象坐标系上的 X 轴坐标信息。
		 */
		get mouseX():number;

		/**
		 * 返回鼠标在此对象坐标系上的 Y 轴坐标信息。
		 */
		get mouseY():number;

		/**
		 * z排序，更改此值，则会按照值的大小对同一容器的所有对象重新排序。值越大，越靠上。默认为0，则根据添加顺序排序。
		 */
		get zOrder():number;
		set zOrder(value:number);

		/**
		 * 设置一个Texture实例，并显示此图片（如果之前有其他绘制，则会被清除掉）。
		 * 等同于graphics.clear();graphics.drawImage()，但性能更高
		 * 还可以赋值一个图片地址，则会自动加载图片，然后显示
		 */
		get texture():Texture;
		set texture(value:Texture);

		/**
		 * <p>视口大小，视口外的子对象，将不被渲染(如果想实现裁剪效果，请使用srollRect)，合理使用能提高渲染性能。比如由一个个小图片拼成的地图块，viewport外面的小图片将不渲染</p>
		 * <p>srollRect和viewport的区别：<br/>
		 * 1. srollRect自带裁剪效果，viewport只影响子对象渲染是否渲染，不具有裁剪效果（性能更高）。<br/>
		 * 2. 设置rect的x,y属性均能实现区域滚动效果，但scrollRect会保持0,0点位置不变。</p>
		 * @default null
		 */
		get viewport():Rectangle;
		set viewport(value:Rectangle);

		/**
		 * @private 
		 */
		captureMouseEvent(exclusive:boolean):void;

		/**
		 * @private 
		 */
		releaseMouseEvent():void;
		set drawCallOptimize(value:boolean);
		get drawCallOptimize():boolean;
	}

	/**
	 * @private 
	 */
	class SpriteConst  {

		/**
		 * @private 
		 */
		static ALPHA:number;

		/**
		 * @private 
		 */
		static TRANSFORM:number;

		/**
		 * @private 
		 */
		static BLEND:number;

		/**
		 * @private 
		 */
		static CANVAS:number;

		/**
		 * @private 
		 */
		static FILTERS:number;

		/**
		 * @private 
		 */
		static MASK:number;

		/**
		 * @private 
		 */
		static CLIP:number;

		/**
		 * @private 
		 */
		static STYLE:number;

		/**
		 * @private 
		 */
		static TEXTURE:number;

		/**
		 * @private 
		 */
		static GRAPHICS:number;

		/**
		 * @private 
		 */
		static LAYAGL3D:number;

		/**
		 * @private 
		 */
		static CUSTOM:number;

		/**
		 * @private 
		 */
		static ONECHILD:number;

		/**
		 * @private 
		 */
		static CHILDS:number;

		/**
		 * @private 
		 */
		static REPAINT_NONE:number;

		/**
		 * @private 
		 */
		static REPAINT_NODE:number;

		/**
		 * @private 
		 */
		static REPAINT_CACHE:number;

		/**
		 * @private 
		 */
		static REPAINT_ALL:number;
	}

	/**
	 * stage大小经过重新调整时进行调度。
	 * @eventType Event.RESIZE
	 */

	/**
	 * 舞台获得焦点时调度。比如浏览器或者当前标签处于后台，重新切换回来时进行调度。
	 * @eventType Event.FOCUS
	 */

	/**
	 * 舞台失去焦点时调度。比如浏览器或者当前标签被切换到后台后调度。
	 * @eventType Event.BLUR
	 */

	/**
	 * 舞台焦点变化时调度，使用Laya.stage.isFocused可以获取当前舞台是否获得焦点。
	 * @eventType Event.FOCUS_CHANGE
	 */

	/**
	 * 舞台可见性发生变化时调度（比如浏览器或者当前标签被切换到后台后调度），使用Laya.stage.isVisibility可以获取当前是否处于显示状态。
	 * @eventType Event.VISIBILITY_CHANGE
	 */

	/**
	 * 浏览器全屏更改时调度，比如进入全屏或者退出全屏。
	 * @eventType Event.FULL_SCREEN_CHANGE
	 */

	/**
	 * <p> <code>Stage</code> 是舞台类，显示列表的根节点，所有显示对象都在舞台上显示。通过 Laya.stage 单例访问。</p>
	 * <p>Stage提供几种适配模式，不同的适配模式会产生不同的画布大小，画布越大，渲染压力越大，所以要选择合适的适配方案。</p>
	 * <p>Stage提供不同的帧率模式，帧率越高，渲染压力越大，越费电，合理使用帧率甚至动态更改帧率有利于改进手机耗电。</p>
	 */
	class Stage extends Sprite  {

		/**
		 * 应用保持设计宽高不变，不缩放不变形，stage的宽高等于设计宽高。
		 */
		static SCALE_NOSCALE:string;

		/**
		 * 应用根据屏幕大小铺满全屏，非等比缩放会变形，stage的宽高等于设计宽高。
		 */
		static SCALE_EXACTFIT:string;

		/**
		 * 应用显示全部内容，按照最小比率缩放，等比缩放不变形，一边可能会留空白，stage的宽高等于设计宽高。
		 */
		static SCALE_SHOWALL:string;

		/**
		 * 应用按照最大比率缩放显示，宽或高方向会显示一部分，等比缩放不变形，stage的宽高等于设计宽高。
		 */
		static SCALE_NOBORDER:string;

		/**
		 * 应用保持设计宽高不变，不缩放不变形，stage的宽高等于屏幕宽高。
		 */
		static SCALE_FULL:string;

		/**
		 * 应用保持设计宽度不变，高度根据屏幕比缩放，stage的宽度等于设计高度，高度根据屏幕比率大小而变化
		 */
		static SCALE_FIXED_WIDTH:string;

		/**
		 * 应用保持设计高度不变，宽度根据屏幕比缩放，stage的高度等于设计宽度，宽度根据屏幕比率大小而变化
		 */
		static SCALE_FIXED_HEIGHT:string;

		/**
		 * 应用保持设计比例不变，全屏显示全部内容(类似showall，但showall非全屏，会有黑边)，根据屏幕长宽比，自动选择使用SCALE_FIXED_WIDTH或SCALE_FIXED_HEIGHT
		 */
		static SCALE_FIXED_AUTO:string;

		/**
		 * 画布水平居左对齐。
		 */
		static ALIGN_LEFT:string;

		/**
		 * 画布水平居右对齐。
		 */
		static ALIGN_RIGHT:string;

		/**
		 * 画布水平居中对齐。
		 */
		static ALIGN_CENTER:string;

		/**
		 * 画布垂直居上对齐。
		 */
		static ALIGN_TOP:string;

		/**
		 * 画布垂直居中对齐。
		 */
		static ALIGN_MIDDLE:string;

		/**
		 * 画布垂直居下对齐。
		 */
		static ALIGN_BOTTOM:string;

		/**
		 * 不更改屏幕。
		 */
		static SCREEN_NONE:string;

		/**
		 * 自动横屏。
		 */
		static SCREEN_HORIZONTAL:string;

		/**
		 * 自动竖屏。
		 */
		static SCREEN_VERTICAL:string;

		/**
		 * 全速模式，以60的帧率运行。
		 */
		static FRAME_FAST:string;

		/**
		 * 慢速模式，以30的帧率运行。
		 */
		static FRAME_SLOW:string;

		/**
		 * 自动模式，以30的帧率运行，但鼠标活动后会自动加速到60，鼠标不动2秒后降低为30帧，以节省消耗。
		 */
		static FRAME_MOUSE:string;

		/**
		 * 休眠模式，以1的帧率运行
		 */
		static FRAME_SLEEP:string;

		/**
		 * 当前焦点对象，此对象会影响当前键盘事件的派发主体。
		 */
		focus:Node;

		/**
		 * @private 相对浏览器左上角的偏移，弃用，请使用_canvasTransform。
		 */
		offset:Point;

		/**
		 * 帧率类型，支持三种模式：fast-60帧(默认)，slow-30帧，mouse-30帧（鼠标活动后会自动加速到60，鼠标不动2秒后降低为30帧，以节省消耗），sleep-1帧。
		 */
		private _frameRate:any;

		/**
		 * 设计宽度（初始化时设置的宽度Laya.init(width,height)）
		 */
		designWidth:number;

		/**
		 * 设计高度（初始化时设置的高度Laya.init(width,height)）
		 */
		designHeight:number;

		/**
		 * 画布是否发生翻转。
		 */
		canvasRotation:boolean;

		/**
		 * 画布的旋转角度。
		 */
		canvasDegree:number;

		/**
		 * <p>设置是否渲染，设置为false，可以停止渲染，画面会停留到最后一次渲染上，减少cpu消耗，此设置不影响时钟。</p>
		 * <p>比如非激活状态，可以设置renderingEnabled=false以节省消耗。</p>
		 */
		renderingEnabled:boolean;

		/**
		 * 是否启用屏幕适配，可以适配后，在某个时候关闭屏幕适配，防止某些操作导致的屏幕意外改变
		 */
		screenAdaptationEnabled:boolean;

		/**
		 * @private 
		 */
		private _screenMode:any;

		/**
		 * @private 
		 */
		private _scaleMode:any;

		/**
		 * @private 
		 */
		private _alignV:any;

		/**
		 * @private 
		 */
		private _alignH:any;

		/**
		 * @private 
		 */
		private _bgColor:any;

		/**
		 * @private 
		 */
		private _mouseMoveTime:any;

		/**
		 * @private 
		 */
		private _renderCount:any;

		/**
		 * @private 
		 */
		private _safariOffsetY:any;

		/**
		 * @private 
		 */
		private _frameStartTime:any;

		/**
		 * @private 
		 */
		private _previousOrientation:any;

		/**
		 * @private 
		 */
		private _isFocused:any;

		/**
		 * @private 
		 */
		private _isVisibility:any;

		/**
		 * @private 
		 */
		private _globalRepaintSet:any;

		/**
		 * @private 
		 */
		private _globalRepaintGet:any;

		/**
		 * 使用物理分辨率作为canvas大小，会改进渲染效果，但是会降低性能
		 */
		useRetinalCanvas:boolean;

		/**
		 * 场景类，引擎中只有一个stage实例，此实例可以通过Laya.stage访问。
		 */

		constructor();

		/**
		 * @private 在移动端输入时，输入法弹出期间不进行画布尺寸重置。
		 */
		private _isInputting:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		set transform(value:Matrix);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get transform():Matrix;

		/**
		 * 舞台是否获得焦点。
		 */
		get isFocused():boolean;

		/**
		 * 舞台是否处于可见状态(是否进入后台)。
		 */
		get isVisibility():boolean;

		/**
		 * @private 
		 */
		private _changeCanvasSize:any;

		/**
		 * @private 
		 */
		protected _resetCanvas():void;

		/**
		 * 设置屏幕大小，场景会根据屏幕大小进行适配。可以动态调用此方法，来更改游戏显示的大小。
		 * @param screenWidth 屏幕宽度。
		 * @param screenHeight 屏幕高度。
		 */
		setScreenSize(screenWidth:number,screenHeight:number):void;

		/**
		 * @private 
		 */
		private _formatData:any;

		/**
		 * <p>缩放模式。默认值为 "noscale"。</p>
		 * <p><ul>取值范围：
		 * <li>"noscale" ：不缩放；</li>
		 * <li>"exactfit" ：全屏不等比缩放；</li>
		 * <li>"showall" ：最小比例缩放；</li>
		 * <li>"noborder" ：最大比例缩放；</li>
		 * <li>"full" ：不缩放，stage的宽高等于屏幕宽高；</li>
		 * <li>"fixedwidth" ：宽度不变，高度根据屏幕比缩放；</li>
		 * <li>"fixedheight" ：高度不变，宽度根据屏幕比缩放；</li>
		 * <li>"fixedauto" ：根据宽高比，自动选择使用fixedwidth或fixedheight；</li>
		 * </ul></p>
		 */
		get scaleMode():string;
		set scaleMode(value:string);

		/**
		 * <p>水平对齐方式。默认值为"left"。</p>
		 * <p><ul>取值范围：
		 * <li>"left" ：居左对齐；</li>
		 * <li>"center" ：居中对齐；</li>
		 * <li>"right" ：居右对齐；</li>
		 * </ul></p>
		 */
		get alignH():string;
		set alignH(value:string);

		/**
		 * <p>垂直对齐方式。默认值为"top"。</p>
		 * <p><ul>取值范围：
		 * <li>"top" ：居顶部对齐；</li>
		 * <li>"middle" ：居中对齐；</li>
		 * <li>"bottom" ：居底部对齐；</li>
		 * </ul></p>
		 */
		get alignV():string;
		set alignV(value:string);

		/**
		 * 舞台的背景颜色，默认为黑色，null为透明。
		 */
		get bgColor():string;
		set bgColor(value:string);

		/**
		 * 鼠标在 Stage 上的 X 轴坐标。@override
		 */
		get mouseX():number;

		/**
		 * 鼠标在 Stage 上的 Y 轴坐标。@override
		 */
		get mouseY():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		getMousePoint():Point;

		/**
		 * 当前视窗由缩放模式导致的 X 轴缩放系数。
		 */
		get clientScaleX():number;

		/**
		 * 当前视窗由缩放模式导致的 Y 轴缩放系数。
		 */
		get clientScaleY():number;

		/**
		 * <p>场景布局类型。</p>
		 * <p><ul>取值范围：
		 * <li>"none" ：不更改屏幕</li>
		 * <li>"horizontal" ：自动横屏</li>
		 * <li>"vertical" ：自动竖屏</li>
		 * </ul></p>
		 */
		get screenMode():string;
		set screenMode(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		repaint(type?:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		parentRepaint(type?:number):void;

		/**
		 * @private 
		 */
		getFrameTm():number;

		/**
		 * @private 
		 */
		private _onmouseMove:any;

		/**
		 * <p>获得距当前帧开始后，过了多少时间，单位为毫秒。</p>
		 * <p>可以用来判断函数内时间消耗，通过合理控制每帧函数处理消耗时长，避免一帧做事情太多，对复杂计算分帧处理，能有效降低帧率波动。</p>
		 */
		getTimeFromFrameStart():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set visible(value:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get visible():boolean;

		/**
		 * @private 
		 */
		static clear:Function;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		render(context:Context,x:number,y:number):void;
		renderToNative(context:Context,x:number,y:number):void;
		private _updateTimers:any;

		/**
		 * <p>是否开启全屏，用户点击后进入全屏。</p>
		 * <p>兼容性提示：部分浏览器不允许点击进入全屏，比如Iphone等。</p>
		 */
		set fullScreenEnabled(value:boolean);
		get frameRate():string;
		set frameRate(value:string);

		/**
		 * @private 
		 */
		private _requestFullscreen:any;

		/**
		 * @private 
		 */
		private _fullScreenChanged:any;

		/**
		 * 退出全屏模式
		 */
		exitFullscreen():void;

		/**
		 * @private 
		 */
		isGlobalRepaint():boolean;

		/**
		 * @private 
		 */
		setGlobalRepaint():void;

		/**
		 * @private 
		 */
		add3DUI(uibase:Sprite):void;

		/**
		 * @private 
		 */
		remove3DUI(uibase:Sprite):boolean;
	}

	/**
	 * 文本内容发生改变后调度。
	 * @eventType Event.CHANGE
	 */

	/**
	 * <p> <code>Text</code> 类用于创建显示对象以显示文本。</p>
	 * <p>
	 * 注意：如果运行时系统找不到设定的字体，则用系统默认的字体渲染文字，从而导致显示异常。(通常电脑上显示正常，在一些移动端因缺少设置的字体而显示异常)。
	 * </p>
	 * @example package
{
	import laya.display.Text;
	public class Text_Example
	{
		public function Text_Example()
		{
			Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
			Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
			onInit();
		}
		private function onInit():void
		{
			var text:Text = new Text();//创建一个 Text 类的实例对象 text 。
			text.text = "这个是一个 Text 文本示例。";
			text.color = "#008fff";//设置 text 的文本颜色。
			text.font = "Arial";//设置 text 的文本字体。
			text.bold = true;//设置 text 的文本显示为粗体。
			text.fontSize = 30;//设置 text 的字体大小。
			text.wordWrap = true;//设置 text 的文本自动换行。
			text.x = 100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
			text.y = 100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
			text.width = 300;//设置 text 的宽度。
			text.height = 200;//设置 text 的高度。
			text.italic = true;//设置 text 的文本显示为斜体。
			text.borderColor = "#fff000";//设置 text 的文本边框颜色。
			Laya.stage.addChild(text);//将 text 添加到显示列表。
		}
	}
}
	 * @example Text_Example();
function Text_Example()
{
    Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
    Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
    onInit();
}
function onInit()
{
    var text = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    text.text = "这个是一个 Text 文本示例。";
    text.color = "#008fff";//设置 text 的文本颜色。
    text.font = "Arial";//设置 text 的文本字体。
    text.bold = true;//设置 text 的文本显示为粗体。
    text.fontSize = 30;//设置 text 的字体大小。
    text.wordWrap = true;//设置 text 的文本自动换行。
    text.x = 100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
    text.y = 100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
    text.width = 300;//设置 text 的宽度。
    text.height = 200;//设置 text 的高度。
    text.italic = true;//设置 text 的文本显示为斜体。
    text.borderColor = "#fff000";//设置 text 的文本边框颜色。
    Laya.stage.addChild(text);//将 text 添加到显示列表。
}
	 * @example class Text_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.onInit();
    }
    private onInit(): void {
        var text: laya.display.Text = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
        text.text = "这个是一个 Text 文本示例。";
        text.color = "#008fff";//设置 text 的文本颜色。
        text.font = "Arial";//设置 text 的文本字体。
        text.bold = true;//设置 text 的文本显示为粗体。
        text.fontSize = 30;//设置 text 的字体大小。
        text.wordWrap = true;//设置 text 的文本自动换行。
        text.x = 100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
        text.y = 100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
        text.width = 300;//设置 text 的宽度。
        text.height = 200;//设置 text 的高度。
        text.italic = true;//设置 text 的文本显示为斜体。
        text.borderColor = "#fff000";//设置 text 的文本边框颜色。
        Laya.stage.addChild(text);//将 text 添加到显示列表。
    }
}
	 */
	class Text extends Sprite  {

		/**
		 * visible不进行任何裁切。
		 */
		static VISIBLE:string;

		/**
		 * scroll 不显示文本域外的字符像素，并且支持 scroll 接口。
		 */
		static SCROLL:string;

		/**
		 * hidden 不显示超出文本域的字符。
		 */
		static HIDDEN:string;

		/**
		 * 默认文本大小，默认为12
		 */
		static defaultFontSize:number;

		/**
		 * 默认文本字体，默认为Arial
		 */
		static defaultFont:string;

		/**
		 * @private 
		 */
		static defaultFontStr():string;

		/**
		 * 语言包，是一个包含key:value的集合，用key索引，替换为目标value语言
		 */
		static langPacks:any;

		/**
		 * WebGL下，文字会被拆分为单个字符进行渲染，一些语系不能拆开显示，比如阿拉伯文，这时可以设置isComplexText=true，禁用文字拆分。
		 */
		static isComplexText:boolean;

		/**
		 * 在IOS下，一些字体会找不到，引擎提供了字体映射功能，比如默认会把 "黑体" 映射为 "黑体-简"，更多映射，可以自己添加
		 */
		static fontFamilyMap:any;

		/**
		 * @private 位图字体字典。
		 */
		private static _bitmapFonts:any;
		static CharacterCache:boolean;

		/**
		 * 是否是从右向左的显示顺序
		 */
		static RightToLeft:boolean;

		/**
		 * @private 
		 */
		private _clipPoint:any;

		/**
		 * @private 表示文本内容字符串。
		 */
		protected _text:string;

		/**
		 * @private 表示文本内容是否发生改变。
		 */
		protected _isChanged:boolean;

		/**
		 * @private 表示文本的宽度，以像素为单位。
		 */
		protected _textWidth:number;

		/**
		 * @private 表示文本的高度，以像素为单位。
		 */
		protected _textHeight:number;

		/**
		 * @private 存储文字行数信息。
		 */
		protected _lines:string[]|null;

		/**
		 * @private 保存每行宽度
		 */
		protected _lineWidths:number[]|null;

		/**
		 * @private 文本的内容位置 X 轴信息。
		 */
		protected _startX:number;

		/**
		 * @private 文本的内容位置X轴信息。
		 */
		protected _startY:number;

		/**
		 * @private 
		 */
		protected _words:WordText[]|null;

		/**
		 * @private 
		 */
		protected _charSize:any;

		/**
		 * @private 
		 */
		protected _valign:string;

		/**
		 * @private 
		 */
		private _singleCharRender:any;

		/**
		 * <p>overflow 指定文本超出文本域后的行为。其值为"hidden"、"visible"和"scroll"之一。</p>
		 * <p>性能从高到低依次为：hidden > visible > scroll。</p>
		 */
		overflow:string;

		/**
		 * 创建一个新的 <code>Text</code> 实例。
		 */

		constructor();

		/**
		 * @private 获取样式。
		 * @return 样式 Style 。
		 * @override 
		 */
		getStyle():SpriteStyle;
		protected _getTextStyle():TextStyle;

		/**
		 * 注册位图字体。
		 * @param name 位图字体的名称。
		 * @param bitmapFont 位图字体文件。
		 */
		static registerBitmapFont(name:string,bitmapFont:BitmapFont):void;

		/**
		 * 移除注册的位图字体文件。
		 * @param name 位图字体的名称。
		 * @param destroy 是否销毁指定的字体文件。
		 */
		static unregisterBitmapFont(name:string,destroy?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		getGraphicBounds(realSize?:boolean):Rectangle;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * 表示文本的宽度，以像素为单位。
		 */
		get textWidth():number;

		/**
		 * 表示文本的高度，以像素为单位。
		 */
		get textHeight():number;

		/**
		 * 当前文本的内容字符串。
		 */
		get text():string;
		get_text():string;
		set_text(value:string):void;
		set text(value:string);

		/**
		 * <p>根据指定的文本，从语言包中取当前语言的文本内容。并对此文本中的{i}文本进行替换。</p>
		 * <p>设置Text.langPacks语言包后，即可使用lang获取里面的语言</p>
		 * <p>例如：
		 * <li>（1）text 的值为“我的名字”，先取到这个文本对应的当前语言版本里的值“My name”，将“My name”设置为当前文本的内容。</li>
		 * <li>（2）text 的值为“恭喜你赢得{0}个钻石，{1}经验。”，arg1 的值为100，arg2 的值为200。
		 *  			则先取到这个文本对应的当前语言版本里的值“Congratulations on your winning {0} diamonds, {1} experience.”，
		 *  			然后将文本里的{0}、{1}，依据括号里的数字从0开始替换为 arg1、arg2 的值。
		 *  			将替换处理后的文本“Congratulations on your winning 100 diamonds, 200 experience.”设置为当前文本的内容。
		 * </li>
		 * </p>
		 * @param text 文本内容。
		 * @param ...args 文本替换参数。
		 */
		lang(text:string,arg1?:any,arg2?:any,arg3?:any,arg4?:any,arg5?:any,arg6?:any,arg7?:any,arg8?:any,arg9?:any,arg10?:any):void;

		/**
		 * <p>文本的字体名称，以字符串形式表示。</p>
		 * <p>默认值为："Arial"，可以通过Text.defaultFont设置默认字体。</p>
		 * <p>如果运行时系统找不到设定的字体，则用系统默认的字体渲染文字，从而导致显示异常。(通常电脑上显示正常，在一些移动端因缺少设置的字体而显示异常)。</p>
		 * @see laya.display.Text#defaultFont
		 */
		get font():string;
		set font(value:string);

		/**
		 * <p>指定文本的字体大小（以像素为单位）。</p>
		 * <p>默认为20像素，可以通过 <code>Text.defaultFontSize</code> 设置默认大小。</p>
		 */
		get fontSize():number;
		set fontSize(value:number);

		/**
		 * <p>指定文本是否为粗体字。</p>
		 * <p>默认值为 false，这意味着不使用粗体字。如果值为 true，则文本为粗体字。</p>
		 */
		get bold():boolean;
		set bold(value:boolean);

		/**
		 * <p>表示文本的颜色值。可以通过 <code>Text.defaultColor</code> 设置默认颜色。</p>
		 * <p>默认值为黑色。</p>
		 */
		get color():string;
		set color(value:string);
		get_color():string;
		set_color(value:string):void;

		/**
		 * <p>表示使用此文本格式的文本是否为斜体。</p>
		 * <p>默认值为 false，这意味着不使用斜体。如果值为 true，则文本为斜体。</p>
		 */
		get italic():boolean;
		set italic(value:boolean);

		/**
		 * <p>表示文本的水平显示方式。</p>
		 * <p><b>取值：</b>
		 * <li>"left"： 居左对齐显示。</li>
		 * <li>"center"： 居中对齐显示。</li>
		 * <li>"right"： 居右对齐显示。</li>
		 * </p>
		 */
		get align():string;
		set align(value:string);

		/**
		 * <p>表示文本的垂直显示方式。</p>
		 * <p><b>取值：</b>
		 * <li>"top"： 居顶部对齐显示。</li>
		 * <li>"middle"： 居中对齐显示。</li>
		 * <li>"bottom"： 居底部对齐显示。</li>
		 * </p>
		 */
		get valign():string;
		set valign(value:string);

		/**
		 * <p>表示文本是否自动换行，默认为false。</p>
		 * <p>若值为true，则自动换行；否则不自动换行。</p>
		 */
		get wordWrap():boolean;
		set wordWrap(value:boolean);

		/**
		 * 垂直行间距（以像素为单位）。
		 */
		get leading():number;
		set leading(value:number);

		/**
		 * <p>边距信息。</p>
		 * <p>数据格式：[上边距，右边距，下边距，左边距]（边距以像素为单位）。</p>
		 */
		get padding():any[];
		set padding(value:any[]);

		/**
		 * 文本背景颜色，以字符串表示。
		 */
		get bgColor():string;
		set bgColor(value:string);
		set_bgColor(value:string):void;
		get_bgColor():string;

		/**
		 * 文本边框背景颜色，以字符串表示。
		 */
		get borderColor():string;
		set borderColor(value:string);

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * <p>默认值0，表示不描边。</p>
		 */
		get stroke():number;
		set stroke(value:number);

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * <p>默认值为 "#000000"（黑色）;</p>
		 */
		get strokeColor():string;
		set strokeColor(value:string);

		/**
		 * @private 一个布尔值，表示文本的属性是否有改变。若为true表示有改变。
		 */
		protected set isChanged(value:boolean);

		/**
		 * @private 
		 */
		protected _getContextFont():string;

		/**
		 * @private 
		 */
		protected _isPassWordMode():boolean;

		/**
		 * @private 
		 */
		protected _getPassWordTxt(txt:string):string;

		/**
		 * @private 渲染文字。
		 * @param begin 开始渲染的行索引。
		 * @param visibleLineCount 渲染的行数。
		 */
		protected _renderText():void;

		/**
		 * @private 绘制下划线
		 * @param x 本行坐标
		 * @param y 本行坐标
		 * @param lineIndex 本行索引
		 */
		private _drawUnderline:any;

		/**
		 * <p>排版文本。</p>
		 * <p>进行宽高计算，渲染、重绘文本。</p>
		 */
		typeset():void;

		/**
		 * @private 
		 */
		private _evalTextSize:any;

		/**
		 * @private 
		 */
		private _checkEnabledViewportOrNot:any;

		/**
		 * <p>快速更改显示文本。不进行排版计算，效率较高。</p>
		 * <p>如果只更改文字内容，不更改文字样式，建议使用此接口，能提高效率。</p>
		 * @param text 文本内容。
		 */
		changeText(text:string):void;

		/**
		 * @private 分析文本换行。
		 */
		protected _parseLines(text:string):void;

		/**
		 * @private 解析行文本。
		 * @param line 某行的文本。
		 * @param wordWrapWidth 文本的显示宽度。
		 */
		protected _parseLine(line:string,wordWrapWidth:number):void;

		/**
		 * @private 
		 */
		private _getTextWidth:any;

		/**
		 * @private 获取换行所需的宽度。
		 */
		private _getWordWrapWidth:any;

		/**
		 * 返回字符在本类实例的父坐标系下的坐标。
		 * @param charIndex 索引位置。
		 * @param out （可选）输出的Point引用。
		 * @return Point 字符在本类实例的父坐标系下的坐标。如果out参数不为空，则将结果赋值给指定的Point对象，否则创建一个新的Point对象返回。建议使用Point.TEMP作为out参数，可以省去Point对象创建和垃圾回收的开销，尤其是在需要频繁执行的逻辑中，比如帧循环和MOUSE_MOVE事件回调函数里面。
		 */
		getCharPoint(charIndex:number,out?:Point):Point;

		/**
		 * <p>设置横向滚动量。</p>
		 * <p>即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。</p>
		 */
		set scrollX(value:number);

		/**
		 * 获取横向滚动量。
		 */
		get scrollX():number;

		/**
		 * 设置纵向滚动量（px)。即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。
		 */
		set scrollY(value:number);

		/**
		 * 获取纵向滚动量。
		 */
		get scrollY():number;

		/**
		 * 获取横向可滚动最大值。
		 */
		get maxScrollX():number;

		/**
		 * 获取纵向可滚动最大值。
		 */
		get maxScrollY():number;

		/**
		 * 返回文字行信息
		 */
		get lines():any[];

		/**
		 * 下划线的颜色，为null则使用字体颜色。
		 */
		get underlineColor():string;
		set underlineColor(value:string);

		/**
		 * 是否显示下划线。
		 */
		get underline():boolean;
		set underline(value:boolean);

		/**
		 * 设置是否单个字符渲染，如果Textd的内容一直改变，例如是一个增加的数字，就设置这个，防止无效占用缓存
		 */
		set singleCharRender(value:boolean);
		get singleCharRender():boolean;
	}

	/**
	 * ...
	 * @author ww
	 */
	class BlurFilterSetter extends FilterSetterBase  {
		private _strength:any;

		constructor();

		/**
		 * @override 
		 */
		protected buildFilter():void;
		get strength():number;
		set strength(value:number);
	}

	/**
	 * @Script {name:ButtonEffect}
	 * @author ww
	 */
	class ButtonEffect  {
		private _tar:any;
		private _curState:any;
		private _curTween:any;

		/**
		 * effectScale
		 * @prop {name:effectScale,type:number, tips:"缩放值",default:"1.5"}
		 */
		effectScale:number;

		/**
		 * tweenTime
		 * @prop {name:tweenTime,type:number, tips:"缓动时长",default:"300"}
		 */
		tweenTime:number;

		/**
		 * effectEase
		 * @prop {name:effectEase,type:ease, tips:"效果缓动类型"}
		 */
		effectEase:string;

		/**
		 * backEase
		 * @prop {name:backEase,type:ease, tips:"恢复缓动类型"}
		 */
		backEase:string;

		/**
		 * 设置控制对象
		 * @param tar 
		 */
		set target(tar:Sprite);
		private toChangedState:any;
		private toInitState:any;
		private tweenComplete:any;
	}

	/**
	 * ...
	 * @author ww
	 */
	class ColorFilterSetter extends FilterSetterBase  {

		/**
		 * brightness 亮度,范围:-100~100
		 */
		private _brightness:any;

		/**
		 * contrast 对比度,范围:-100~100
		 */
		private _contrast:any;

		/**
		 * saturation 饱和度,范围:-100~100
		 */
		private _saturation:any;

		/**
		 * hue 色调,范围:-180~180
		 */
		private _hue:any;

		/**
		 * red red增量,范围:0~255
		 */
		private _red:any;

		/**
		 * green green增量,范围:0~255
		 */
		private _green:any;

		/**
		 * blue blue增量,范围:0~255
		 */
		private _blue:any;

		/**
		 * alpha alpha增量,范围:0~255
		 */
		private _alpha:any;

		constructor();

		/**
		 * @override 
		 */
		protected buildFilter():void;
		get brightness():number;
		set brightness(value:number);
		get contrast():number;
		set contrast(value:number);
		get saturation():number;
		set saturation(value:number);
		get hue():number;
		set hue(value:number);
		get red():number;
		set red(value:number);
		get green():number;
		set green(value:number);
		get blue():number;
		set blue(value:number);
		private _color:any;
		get color():string;
		set color(value:string);
		get alpha():number;
		set alpha(value:number);
	}

	/**
	 * 效果插件基类，基于对象池管理
	 */
	class EffectBase extends Component  {

		/**
		 * 动画持续时间，单位为毫秒
		 */
		duration:number;

		/**
		 * 动画延迟时间，单位为毫秒
		 */
		delay:number;

		/**
		 * 重复次数，默认为播放一次
		 */
		repeat:number;

		/**
		 * 缓动类型，如果为空，则默认为匀速播放
		 */
		ease:string;

		/**
		 * 触发事件，如果为空，则创建时触发
		 */
		eventName:string;

		/**
		 * 效用作用的目标对象，如果为空，则是脚本所在的节点本身
		 */
		target:Sprite;

		/**
		 * 效果结束后，是否自动移除节点
		 */
		autoDestroyAtComplete:boolean;
		protected _comlete:Handler;
		protected _tween:Tween;
		protected _exeTween():void;
		protected _doTween():Tween;

		/**
		 * @override 
		 */
		onReset():void;
	}

	/**
	 * 淡入效果
	 */
	class FadeIn extends EffectBase  {

		/**
		 * @override 
		 */
		protected _doTween():Tween;
	}

	/**
	 * 淡出效果
	 */
	class FadeOut extends EffectBase  {

		/**
		 * @override 
		 */
		protected _doTween():Tween;
	}

	/**
	 * ...
	 * @author ww
	 */
	class FilterSetterBase  {
		_filter:any;

		constructor();
		paramChanged():void;
		protected buildFilter():void;
		protected addFilter(sprite:Sprite):void;
		protected removeFilter(sprite:Sprite):void;
		private _target:any;
		set target(value:any);
	}

	/**
	 * ...
	 * @author ww
	 */
	class GlowFilterSetter extends FilterSetterBase  {

		/**
		 * 滤镜的颜色
		 */
		private _color:any;

		/**
		 * 边缘模糊的大小 0~20
		 */
		private _blur:any;

		/**
		 * X轴方向的偏移
		 */
		private _offX:any;

		/**
		 * Y轴方向的偏移
		 */
		private _offY:any;

		constructor();

		/**
		 * @override 
		 */
		protected buildFilter():void;
		get color():string;
		set color(value:string);
		get blur():number;
		set blur(value:number);
		get offX():number;
		set offX(value:number);
		get offY():number;
		set offY(value:number);
	}

	/**
	 * <code>Event</code> 是事件类型的集合。一般当发生事件时，<code>Event</code> 对象将作为参数传递给事件侦听器。
	 */
	class Event  {

		/**
		 * 一个空的 Event 对象。用于事件派发中转使用。
		 */
		static EMPTY:Event;

		/**
		 * 定义 mousedown 事件对象的 type 属性值。
		 */
		static MOUSE_DOWN:string;

		/**
		 * 定义 mouseup 事件对象的 type 属性值。
		 */
		static MOUSE_UP:string;

		/**
		 * 定义 click 事件对象的 type 属性值。
		 */
		static CLICK:string;

		/**
		 * 定义 rightmousedown 事件对象的 type 属性值。
		 */
		static RIGHT_MOUSE_DOWN:string;

		/**
		 * 定义 rightmouseup 事件对象的 type 属性值。
		 */
		static RIGHT_MOUSE_UP:string;

		/**
		 * 定义 rightclick 事件对象的 type 属性值。
		 */
		static RIGHT_CLICK:string;

		/**
		 * 定义 mousemove 事件对象的 type 属性值。
		 */
		static MOUSE_MOVE:string;

		/**
		 * 定义 mouseover 事件对象的 type 属性值。
		 */
		static MOUSE_OVER:string;

		/**
		 * 定义 mouseout 事件对象的 type 属性值。
		 */
		static MOUSE_OUT:string;

		/**
		 * 定义 mousewheel 事件对象的 type 属性值。
		 */
		static MOUSE_WHEEL:string;

		/**
		 * 定义 mouseover 事件对象的 type 属性值。
		 */
		static ROLL_OVER:string;

		/**
		 * 定义 mouseout 事件对象的 type 属性值。
		 */
		static ROLL_OUT:string;

		/**
		 * 定义 doubleclick 事件对象的 type 属性值。
		 */
		static DOUBLE_CLICK:string;

		/**
		 * 定义 change 事件对象的 type 属性值。
		 */
		static CHANGE:string;

		/**
		 * 定义 changed 事件对象的 type 属性值。
		 */
		static CHANGED:string;

		/**
		 * 定义 resize 事件对象的 type 属性值。
		 */
		static RESIZE:string;

		/**
		 * 定义 added 事件对象的 type 属性值。
		 */
		static ADDED:string;

		/**
		 * 定义 removed 事件对象的 type 属性值。
		 */
		static REMOVED:string;

		/**
		 * 定义 display 事件对象的 type 属性值。
		 */
		static DISPLAY:string;

		/**
		 * 定义 undisplay 事件对象的 type 属性值。
		 */
		static UNDISPLAY:string;

		/**
		 * 定义 error 事件对象的 type 属性值。
		 */
		static ERROR:string;

		/**
		 * 定义 complete 事件对象的 type 属性值。
		 */
		static COMPLETE:string;

		/**
		 * 定义 loaded 事件对象的 type 属性值。
		 */
		static LOADED:string;

		/**
		 * 定义 loaded 事件对象的 type 属性值。
		 */
		static READY:string;

		/**
		 * 定义 progress 事件对象的 type 属性值。
		 */
		static PROGRESS:string;

		/**
		 * 定义 input 事件对象的 type 属性值。
		 */
		static INPUT:string;

		/**
		 * 定义 render 事件对象的 type 属性值。
		 */
		static RENDER:string;

		/**
		 * 定义 open 事件对象的 type 属性值。
		 */
		static OPEN:string;

		/**
		 * 定义 message 事件对象的 type 属性值。
		 */
		static MESSAGE:string;

		/**
		 * 定义 close 事件对象的 type 属性值。
		 */
		static CLOSE:string;

		/**
		 * 定义 keydown 事件对象的 type 属性值。
		 */
		static KEY_DOWN:string;

		/**
		 * 定义 keypress 事件对象的 type 属性值。
		 */
		static KEY_PRESS:string;

		/**
		 * 定义 keyup 事件对象的 type 属性值。
		 */
		static KEY_UP:string;

		/**
		 * 定义 frame 事件对象的 type 属性值。
		 */
		static FRAME:string;

		/**
		 * 定义 dragstart 事件对象的 type 属性值。
		 */
		static DRAG_START:string;

		/**
		 * 定义 dragmove 事件对象的 type 属性值。
		 */
		static DRAG_MOVE:string;

		/**
		 * 定义 dragend 事件对象的 type 属性值。
		 */
		static DRAG_END:string;

		/**
		 * 定义 enter 事件对象的 type 属性值。
		 */
		static ENTER:string;

		/**
		 * 定义 select 事件对象的 type 属性值。
		 */
		static SELECT:string;

		/**
		 * 定义 blur 事件对象的 type 属性值。
		 */
		static BLUR:string;

		/**
		 * 定义 focus 事件对象的 type 属性值。
		 */
		static FOCUS:string;

		/**
		 * 定义 visibilitychange 事件对象的 type 属性值。
		 */
		static VISIBILITY_CHANGE:string;

		/**
		 * 定义 focuschange 事件对象的 type 属性值。
		 */
		static FOCUS_CHANGE:string;

		/**
		 * 定义 played 事件对象的 type 属性值。
		 */
		static PLAYED:string;

		/**
		 * 定义 paused 事件对象的 type 属性值。
		 */
		static PAUSED:string;

		/**
		 * 定义 stopped 事件对象的 type 属性值。
		 */
		static STOPPED:string;

		/**
		 * 定义 start 事件对象的 type 属性值。
		 */
		static START:string;

		/**
		 * 定义 end 事件对象的 type 属性值。
		 */
		static END:string;

		/**
		 * 定义 componentadded 事件对象的 type 属性值。
		 */
		static COMPONENT_ADDED:string;

		/**
		 * 定义 componentremoved 事件对象的 type 属性值。
		 */
		static COMPONENT_REMOVED:string;

		/**
		 * 定义 released 事件对象的 type 属性值。
		 */
		static RELEASED:string;

		/**
		 * 定义 link 事件对象的 type 属性值。
		 */
		static LINK:string;

		/**
		 * 定义 label 事件对象的 type 属性值。
		 */
		static LABEL:string;

		/**
		 * 浏览器全屏更改时触发
		 */
		static FULL_SCREEN_CHANGE:string;

		/**
		 * 显卡设备丢失时触发
		 */
		static DEVICE_LOST:string;

		/**
		 * 世界矩阵更新时触发。
		 */
		static TRANSFORM_CHANGED:string;

		/**
		 * 更换动作时触发。
		 */
		static ANIMATION_CHANGED:string;

		/**
		 * 拖尾渲染节点改变时触发。
		 */
		static TRAIL_FILTER_CHANGE:string;

		/**
		 * 物理碰撞开始
		 */
		static TRIGGER_ENTER:string;

		/**
		 * 物理碰撞持续
		 */
		static TRIGGER_STAY:string;

		/**
		 * 物理碰撞结束
		 */
		static TRIGGER_EXIT:string;

		/**
		 * 事件类型。
		 */
		type:string;

		/**
		 * 原生浏览器事件。
		 */
		nativeEvent:any;

		/**
		 * 事件目标触发对象。
		 */
		target:Sprite;

		/**
		 * 事件当前冒泡对象。
		 */
		currentTarget:Sprite;

		/**
		 * 分配给触摸点的唯一标识号（作为 int）。
		 */
		touchId:number;

		/**
		 * 键盘值
		 */
		keyCode:number;

		/**
		 * 滚轮滑动增量
		 */
		delta:number;

		/**
		 * 设置事件数据。
		 * @param type 事件类型。
		 * @param currentTarget 事件目标触发对象。
		 * @param target 事件当前冒泡对象。
		 * @return 返回当前 Event 对象。
		 */
		setTo(type:string,currentTarget:Sprite,target:Sprite):Event;

		/**
		 * 阻止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。
		 */
		stopPropagation():void;

		/**
		 * 触摸点列表。
		 */
		get touches():any[];

		/**
		 * 表示 Alt 键是处于活动状态 (true) 还是非活动状态 (false)。
		 */
		get altKey():boolean;

		/**
		 * 表示 Ctrl 键是处于活动状态 (true) 还是非活动状态 (false)。
		 */
		get ctrlKey():boolean;

		/**
		 * 表示 Shift 键是处于活动状态 (true) 还是非活动状态 (false)。
		 */
		get shiftKey():boolean;

		/**
		 * 包含按下或释放的键的字符代码值。字符代码值为英文键盘值。
		 */
		get charCode():boolean;

		/**
		 * 表示键在键盘上的位置。这对于区分在键盘上多次出现的键非常有用。<br>
		 * 例如，您可以根据此属性的值来区分左 Shift 键和右 Shift 键：左 Shift 键的值为 KeyLocation.LEFT，右 Shift 键的值为 KeyLocation.RIGHT。另一个示例是区分标准键盘 (KeyLocation.STANDARD) 与数字键盘 (KeyLocation.NUM_PAD) 上按下的数字键。
		 */
		get keyLocation():number;

		/**
		 * 鼠标在 Stage 上的 X 轴坐标
		 */
		get stageX():number;

		/**
		 * 鼠标在 Stage 上的 Y 轴坐标
		 */
		get stageY():number;
	}

	/**
	 * <code>EventDispatcher</code> 类是可调度事件的所有类的基类。
	 */
	class EventDispatcher  {

		/**
		 * @private 
		 */
		static MOUSE_EVENTS:any;

		/**
		 * @private 
		 */
		private _events:any;

		/**
		 * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
		 * @param type 事件的类型。
		 * @return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
		 */
		hasListener(type:string):boolean;

		/**
		 * 派发事件。
		 * @param type 事件类型。
		 * @param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
		 * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
		 */
		event(type:string,data?:any):boolean;

		/**
		 * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 */
		on(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param args （可选）事件侦听函数的回调参数。
		 * @return 此 EventDispatcher 对象。
		 */
		once(type:string,caller:any,listener:Function,args?:any[]):EventDispatcher;

		/**
		 * 从 EventDispatcher 对象中删除侦听器。
		 * @param type 事件的类型。
		 * @param caller 事件侦听函数的执行域。
		 * @param listener 事件侦听函数。
		 * @param onceOnly （可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
		 * @return 此 EventDispatcher 对象。
		 */
		off(type:string,caller:any,listener:Function,onceOnly?:boolean):EventDispatcher;

		/**
		 * 从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
		 * @param type （可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
		 * @return 此 EventDispatcher 对象。
		 */
		offAll(type?:string):EventDispatcher;

		/**
		 * 移除caller为target的所有事件监听
		 * @param caller caller对象
		 */
		offAllCaller(caller:any):EventDispatcher;
		private _recoverHandlers:any;

		/**
		 * 检测指定事件类型是否是鼠标事件。
		 * @param type 事件的类型。
		 * @return 如果是鼠标事件，则值为 true;否则，值为 false。
		 */
		isMouseEvent(type:string):boolean;
	}

	/**
	 * <code>Keyboard</code> 类的属性是一些常数，这些常数表示控制游戏时最常用的键。
	 */
	class Keyboard  {

		/**
		 * 与 0 的键控代码值 (48) 关联的常数。
		 */
		static NUMBER_0:number;

		/**
		 * 与 1 的键控代码值 (49) 关联的常数。
		 */
		static NUMBER_1:number;

		/**
		 * 与 2 的键控代码值 (50) 关联的常数。
		 */
		static NUMBER_2:number;

		/**
		 * 与 3 的键控代码值 (51) 关联的常数。
		 */
		static NUMBER_3:number;

		/**
		 * 与 4 的键控代码值 (52) 关联的常数。
		 */
		static NUMBER_4:number;

		/**
		 * 与 5 的键控代码值 (53) 关联的常数。
		 */
		static NUMBER_5:number;

		/**
		 * 与 6 的键控代码值 (54) 关联的常数。
		 */
		static NUMBER_6:number;

		/**
		 * 与 7 的键控代码值 (55) 关联的常数。
		 */
		static NUMBER_7:number;

		/**
		 * 与 8 的键控代码值 (56) 关联的常数。
		 */
		static NUMBER_8:number;

		/**
		 * 与 9 的键控代码值 (57) 关联的常数。
		 */
		static NUMBER_9:number;

		/**
		 * 与 A 键的键控代码值 (65) 关联的常数。
		 */
		static A:number;

		/**
		 * 与 B 键的键控代码值 (66) 关联的常数。
		 */
		static B:number;

		/**
		 * 与 C 键的键控代码值 (67) 关联的常数。
		 */
		static C:number;

		/**
		 * 与 D 键的键控代码值 (68) 关联的常数。
		 */
		static D:number;

		/**
		 * 与 E 键的键控代码值 (69) 关联的常数。
		 */
		static E:number;

		/**
		 * 与 F 键的键控代码值 (70) 关联的常数。
		 */
		static F:number;

		/**
		 * 与 G 键的键控代码值 (71) 关联的常数。
		 */
		static G:number;

		/**
		 * 与 H 键的键控代码值 (72) 关联的常数。
		 */
		static H:number;

		/**
		 * 与 I 键的键控代码值 (73) 关联的常数。
		 */
		static I:number;

		/**
		 * 与 J 键的键控代码值 (74) 关联的常数。
		 */
		static J:number;

		/**
		 * 与 K 键的键控代码值 (75) 关联的常数。
		 */
		static K:number;

		/**
		 * 与 L 键的键控代码值 (76) 关联的常数。
		 */
		static L:number;

		/**
		 * 与 M 键的键控代码值 (77) 关联的常数。
		 */
		static M:number;

		/**
		 * 与 N 键的键控代码值 (78) 关联的常数。
		 */
		static N:number;

		/**
		 * 与 O 键的键控代码值 (79) 关联的常数。
		 */
		static O:number;

		/**
		 * 与 P 键的键控代码值 (80) 关联的常数。
		 */
		static P:number;

		/**
		 * 与 Q 键的键控代码值 (81) 关联的常数。
		 */
		static Q:number;

		/**
		 * 与 R 键的键控代码值 (82) 关联的常数。
		 */
		static R:number;

		/**
		 * 与 S 键的键控代码值 (83) 关联的常数。
		 */
		static S:number;

		/**
		 * 与 T 键的键控代码值 (84) 关联的常数。
		 */
		static T:number;

		/**
		 * 与 U 键的键控代码值 (85) 关联的常数。
		 */
		static U:number;

		/**
		 * 与 V 键的键控代码值 (86) 关联的常数。
		 */
		static V:number;

		/**
		 * 与 W 键的键控代码值 (87) 关联的常数。
		 */
		static W:number;

		/**
		 * 与 X 键的键控代码值 (88) 关联的常数。
		 */
		static X:number;

		/**
		 * 与 Y 键的键控代码值 (89) 关联的常数。
		 */
		static Y:number;

		/**
		 * 与 Z 键的键控代码值 (90) 关联的常数。
		 */
		static Z:number;

		/**
		 * 与 F1 的键控代码值 (112) 关联的常数。
		 */
		static F1:number;

		/**
		 * 与 F2 的键控代码值 (113) 关联的常数。
		 */
		static F2:number;

		/**
		 * 与 F3 的键控代码值 (114) 关联的常数。
		 */
		static F3:number;

		/**
		 * 与 F4 的键控代码值 (115) 关联的常数。
		 */
		static F4:number;

		/**
		 * 与 F5 的键控代码值 (116) 关联的常数。
		 */
		static F5:number;

		/**
		 * 与 F6 的键控代码值 (117) 关联的常数。
		 */
		static F6:number;

		/**
		 * 与 F7 的键控代码值 (118) 关联的常数。
		 */
		static F7:number;

		/**
		 * 与 F8 的键控代码值 (119) 关联的常数。
		 */
		static F8:number;

		/**
		 * 与 F9 的键控代码值 (120) 关联的常数。
		 */
		static F9:number;

		/**
		 * 与 F10 的键控代码值 (121) 关联的常数。
		 */
		static F10:number;

		/**
		 * 与 F11 的键控代码值 (122) 关联的常数。
		 */
		static F11:number;

		/**
		 * 与 F12 的键控代码值 (123) 关联的常数。
		 */
		static F12:number;

		/**
		 * 与 F13 的键控代码值 (124) 关联的常数。
		 */
		static F13:number;

		/**
		 * 与 F14 的键控代码值 (125) 关联的常数。
		 */
		static F14:number;

		/**
		 * 与 F15 的键控代码值 (126) 关联的常数。
		 */
		static F15:number;

		/**
		 * 与数字键盘的伪键控代码 (21) 关联的常数。
		 */
		static NUMPAD:number;

		/**
		 * 与数字键盘上的数字 0 的键控代码值 (96) 关联的常数。
		 */
		static NUMPAD_0:number;

		/**
		 * 与数字键盘上的数字 1 的键控代码值 (97) 关联的常数。
		 */
		static NUMPAD_1:number;

		/**
		 * 与数字键盘上的数字 2 的键控代码值 (98) 关联的常数。
		 */
		static NUMPAD_2:number;

		/**
		 * 与数字键盘上的数字 3 的键控代码值 (99) 关联的常数。
		 */
		static NUMPAD_3:number;

		/**
		 * 与数字键盘上的数字 4 的键控代码值 (100) 关联的常数。
		 */
		static NUMPAD_4:number;

		/**
		 * 与数字键盘上的数字 5 的键控代码值 (101) 关联的常数。
		 */
		static NUMPAD_5:number;

		/**
		 * 与数字键盘上的数字 6 的键控代码值 (102) 关联的常数。
		 */
		static NUMPAD_6:number;

		/**
		 * 与数字键盘上的数字 7 的键控代码值 (103) 关联的常数。
		 */
		static NUMPAD_7:number;

		/**
		 * 与数字键盘上的数字 8 的键控代码值 (104) 关联的常数。
		 */
		static NUMPAD_8:number;

		/**
		 * 与数字键盘上的数字 9 的键控代码值 (105) 关联的常数。
		 */
		static NUMPAD_9:number;

		/**
		 * 与数字键盘上的加号 (+) 的键控代码值 (107) 关联的常数。
		 */
		static NUMPAD_ADD:number;

		/**
		 * 与数字键盘上的小数点 (.) 的键控代码值 (110) 关联的常数。
		 */
		static NUMPAD_DECIMAL:number;

		/**
		 * 与数字键盘上的除号 (/) 的键控代码值 (111) 关联的常数。
		 */
		static NUMPAD_DIVIDE:number;

		/**
		 * 与数字键盘上的 Enter 的键控代码值 (108) 关联的常数。
		 */
		static NUMPAD_ENTER:number;

		/**
		 * 与数字键盘上的乘号 (*) 的键控代码值 (106) 关联的常数。
		 */
		static NUMPAD_MULTIPLY:number;

		/**
		 * 与数字键盘上的减号 (-) 的键控代码值 (109) 关联的常数。
		 */
		static NUMPAD_SUBTRACT:number;

		/**
		 * 与 ; 键的键控代码值 (186) 关联的常数。
		 */
		static SEMICOLON:number;

		/**
		 * 与 = 键的键控代码值 (187) 关联的常数。
		 */
		static EQUAL:number;

		/**
		 * 与 F15 的键控代码值 (188) 关联的常数。
		 */
		static COMMA:number;

		/**
		 * 与 - 键的键控代码值 (189) 关联的常数。
		 */
		static MINUS:number;

		/**
		 * 与 . 键的键控代码值 (190) 关联的常数。
		 */
		static PERIOD:number;

		/**
		 * 与 / 键的键控代码值 (191) 关联的常数。
		 */
		static SLASH:number;

		/**
		 * 与 ` 键的键控代码值 (192) 关联的常数。
		 */
		static BACKQUOTE:number;

		/**
		 * 与 [ 键的键控代码值 (219) 关联的常数。
		 */
		static LEFTBRACKET:number;

		/**
		 * 与 \ 键的键控代码值 (220) 关联的常数。
		 */
		static BACKSLASH:number;

		/**
		 * 与 ] 键的键控代码值 (221) 关联的常数。
		 */
		static RIGHTBRACKET:number;

		/**
		 * 与 ' 键的键控代码值 (222) 关联的常数。
		 */
		static QUOTE:number;

		/**
		 * 与 Alternate (Option) 键的键控代码值 (18) 关联的常数。
		 */
		static ALTERNATE:number;

		/**
		 * 与 Backspace 的键控代码值 (8) 关联的常数。
		 */
		static BACKSPACE:number;

		/**
		 * 与 Caps Lock 的键控代码值 (20) 关联的常数。
		 */
		static CAPS_LOCK:number;

		/**
		 * 与 Mac 命令键 (15) 关联的常数。
		 */
		static COMMAND:number;

		/**
		 * 与 Ctrl 的键控代码值 (17) 关联的常数。
		 */
		static CONTROL:number;

		/**
		 * 与 Delete 的键控代码值 (46) 关联的常数。
		 */
		static DELETE:number;

		/**
		 * 与 Enter 的键控代码值 (13) 关联的常数。
		 */
		static ENTER:number;

		/**
		 * 与 Esc 的键控代码值 (27) 关联的常数。
		 */
		static ESCAPE:number;

		/**
		 * 与 Page Up 的键控代码值 (33) 关联的常数。
		 */
		static PAGE_UP:number;

		/**
		 * 与 Page Down 的键控代码值 (34) 关联的常数。
		 */
		static PAGE_DOWN:number;

		/**
		 * 与 End 的键控代码值 (35) 关联的常数。
		 */
		static END:number;

		/**
		 * 与 Home 的键控代码值 (36) 关联的常数。
		 */
		static HOME:number;

		/**
		 * 与向左箭头键的键控代码值 (37) 关联的常数。
		 */
		static LEFT:number;

		/**
		 * 与向上箭头键的键控代码值 (38) 关联的常数。
		 */
		static UP:number;

		/**
		 * 与向右箭头键的键控代码值 (39) 关联的常数。
		 */
		static RIGHT:number;

		/**
		 * 与向下箭头键的键控代码值 (40) 关联的常数。
		 */
		static DOWN:number;

		/**
		 * 与 Shift 的键控代码值 (16) 关联的常数。
		 */
		static SHIFT:number;

		/**
		 * 与空格键的键控代码值 (32) 关联的常数。
		 */
		static SPACE:number;

		/**
		 * 与 Tab 的键控代码值 (9) 关联的常数。
		 */
		static TAB:number;

		/**
		 * 与 Insert 的键控代码值 (45) 关联的常数。
		 */
		static INSERT:number;
	}

	/**
	 * <p><code>KeyBoardManager</code> 是键盘事件管理类。该类从浏览器中接收键盘事件，并派发该事件。</p>
	 * <p>派发事件时若 Stage.focus 为空则只从 Stage 上派发该事件，否则将从 Stage.focus 对象开始一直冒泡派发该事件。所以在 Laya.stage 上监听键盘事件一定能够收到，如果在其他地方监听，则必须处在Stage.focus的冒泡链上才能收到该事件。</p>
	 * <p>用户可以通过代码 Laya.stage.focus=someNode 的方式来设置focus对象。</p>
	 * <p>用户可统一的根据事件对象中 e.keyCode 来判断按键类型，该属性兼容了不同浏览器的实现。</p>
	 */
	class KeyBoardManager  {
		private static _pressKeys:any;

		/**
		 * 是否开启键盘事件，默认为true
		 */
		static enabled:boolean;
		private static _addEvent:any;
		private static _dispatch:any;

		/**
		 * 返回指定键是否被按下。
		 * @param key 键值。
		 * @return 是否被按下。
		 */
		static hasKeyDown(key:number):boolean;
	}

	/**
	 * <p><code>KeyLocation</code> 类包含表示在键盘或类似键盘的输入设备上按键位置的常量。</p>
	 * <p><code>KeyLocation</code> 常数用在键盘事件对象的 <code>keyLocation </code>属性中。</p>
	 */
	class KeyLocation  {

		/**
		 * 表示激活的键不区分位于左侧还是右侧，也不区分是否位于数字键盘（或者是使用对应于数字键盘的虚拟键激活的）。
		 */
		static STANDARD:number;

		/**
		 * 表示激活的键在左侧键位置（此键有多个可能的位置）。
		 */
		static LEFT:number;

		/**
		 * 表示激活的键在右侧键位置（此键有多个可能的位置）。
		 */
		static RIGHT:number;

		/**
		 * <p>表示激活的键位于数字键盘或者是使用对应于数字键盘的虚拟键激活的。</p>
		 * <p>注意：此属性只在flash模式下有效。</p>
		 */
		static NUM_PAD:number;
	}

	/**
	 * <p><code>MouseManager</code> 是鼠标、触摸交互管理器。</p>
	 * <p>鼠标事件流包括捕获阶段、目标阶段、冒泡阶段。<br/>
	 * 捕获阶段：此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象；<br/>
	 * 目标阶段：找到命中的目标对象；<br/>
	 * 冒泡阶段：事件离开目标对象，按节点层级向上逐层通知，直到到达舞台的过程。</p>
	 */
	class MouseManager  {

		/**
		 * MouseManager 单例引用。
		 */
		static instance:MouseManager;

		/**
		 * 是否开启鼠标检测，默认为true
		 */
		static enabled:boolean;

		/**
		 * 是否开启多点触控
		 */
		static multiTouchEnabled:boolean;

		/**
		 * canvas 上的鼠标X坐标。
		 */
		mouseX:number;

		/**
		 * canvas 上的鼠标Y坐标。
		 */
		mouseY:number;

		/**
		 * 是否禁用除 stage 以外的鼠标事件检测。
		 */
		disableMouseEvent:boolean;

		/**
		 * 鼠标按下的时间。单位为毫秒。
		 */
		mouseDownTime:number;

		/**
		 * 鼠标移动精度。
		 */
		mouseMoveAccuracy:number;

		/**
		 * @private 
		 */
		private static _isTouchRespond:any;
		private _stage:any;

		/**
		 * @private 希望capture鼠标事件的对象。
		 */
		private _captureSp:any;

		/**
		 * @private 现在不支持直接把绝对坐标转到本地坐标，只能一级一级做下去，因此记录一下这个链
		 */
		private _captureChain:any;

		/**
		 * @private capture对象独占消息
		 */
		private _captureExlusiveMode:any;

		/**
		 * @private 在发送事件的过程中，是否发送给了_captureSp
		 */
		private _hitCaputreSp:any;
		private _point:any;
		private _rect:any;
		private _target:any;
		private _lastMoveTimer:any;
		private _isLeftMouse:any;
		private _prePoint:any;
		private _touchIDs:any;
		private _curTouchID:any;
		private _id:any;
		private static _isFirstTouch:any;

		/**
		 * @private 初始化。
		 */
		__init__(stage:Stage,canvas:any):void;
		private _tTouchID:any;
		private initEvent:any;
		private checkMouseWheel:any;
		private onMouseMove:any;
		private onMouseDown:any;
		private onMouseUp:any;
		private check:any;
		private hitTest:any;
		private _checkAllBaseUI:any;

		/**
		 * 处理3d界面。
		 * @param mousex 
		 * @param mousey 
		 * @param callback 
		 * @return 
		 */
		check3DUI(mousex:number,mousey:number,callback:Function):boolean;
		handleExclusiveCapture(mousex:number,mousey:number,callback:Function):boolean;
		handleCapture(mousex:number,mousey:number,callback:Function):boolean;

		/**
		 * 执行事件处理。
		 */
		runEvent(evt:any):void;

		/**
		 * @param sp 
		 * @param exlusive 是否是独占模式
		 */
		setCapture(sp:Sprite,exclusive?:boolean):void;
		releaseCapture():void;
	}

	/**
	 * @private Touch事件管理类，处理多点触控下的鼠标事件
	 */
	class TouchManager  {
		static I:TouchManager;
		private static _oldArr:any;
		private static _newArr:any;
		private static _tEleArr:any;

		/**
		 * 当前over的touch表
		 */
		private preOvers:any;

		/**
		 * 当前down的touch表
		 */
		private preDowns:any;
		private preRightDowns:any;

		/**
		 * 是否启用
		 */
		enable:boolean;
		private _lastClickTime:any;
		private _clearTempArrs:any;

		/**
		 * 从touch表里查找对应touchID的数据
		 * @param touchID touch ID
		 * @param arr touch表
		 * @return 
		 */
		private getTouchFromArr:any;

		/**
		 * 从touch表里移除一个元素
		 * @param touchID touch ID
		 * @param arr touch表
		 */
		private removeTouchFromArr:any;

		/**
		 * 创建一个touch数据
		 * @param ele 当前的根节点
		 * @param touchID touchID
		 * @return 
		 */
		private createTouchO:any;

		/**
		 * 处理touchStart
		 * @param ele 根节点
		 * @param touchID touchID
		 * @param isLeft （可选）是否为左键
		 */
		onMouseDown(ele:any,touchID:number,isLeft?:boolean):void;

		/**
		 * 派发事件。
		 * @param eles 对象列表。
		 * @param type 事件类型。
		 */
		private sendEvents:any;

		/**
		 * 获取对象列表。
		 * @param start 起始节点。
		 * @param end 结束节点。
		 * @param rst 返回值。如果此值不为空，则将其赋值为计算结果，从而避免创建新数组；如果此值为空，则创建新数组返回。
		 * @return Array 返回节点列表。
		 */
		private getEles:any;

		/**
		 * touchMove时处理out事件和over时间。
		 * @param eleNew 新的根节点。
		 * @param elePre 旧的根节点。
		 * @param touchID （可选）touchID，默认为0。
		 */
		private checkMouseOutAndOverOfMove:any;

		/**
		 * 处理TouchMove事件
		 * @param ele 根节点
		 * @param touchID touchID
		 */
		onMouseMove(ele:any,touchID:number):void;
		getLastOvers():any[];
		stageMouseOut():void;

		/**
		 * 处理TouchEnd事件
		 * @param ele 根节点
		 * @param touchID touchID
		 * @param isLeft 是否为左键
		 */
		onMouseUp(ele:any,touchID:number,isLeft?:boolean):void;
	}

	/**
	 * 模糊滤镜
	 */
	class BlurFilter extends Filter  {

		/**
		 * 模糊滤镜的强度(值越大，越不清晰
		 */
		strength:number;
		strength_sig2_2sig2_gauss1:any[];
		strength_sig2_native:Float32Array;
		renderFunc:any;

		/**
		 * 模糊滤镜
		 * @param strength 模糊滤镜的强度值
		 */

		constructor(strength?:number);

		/**
		 * @private 当前滤镜的类型
		 * @override 
		 */
		get type():number;
		getStrenth_sig2_2sig2_native():Float32Array;
	}

	/**
	 * @private 
	 */
	class BlurFilterGLRender  {
		private static blurinfo:any;
		render(rt:RenderTexture2D,ctx:Context,width:number,height:number,filter:BlurFilter):void;
		setShaderInfo(shader:Value2D,filter:BlurFilter,w:number,h:number):void;
	}

	/**
	 * <p><code>ColorFilter</code> 是颜色滤镜。使用 ColorFilter 类可以将 4 x 5 矩阵转换应用于输入图像上的每个像素的 RGBA 颜色和 Alpha 值，以生成具有一组新的 RGBA 颜色和 Alpha 值的结果。该类允许饱和度更改、色相旋转、亮度转 Alpha 以及各种其他效果。您可以将滤镜应用于任何显示对象（即，从 Sprite 类继承的对象）。</p>
	 * <p>注意：对于 RGBA 值，最高有效字节代表红色通道值，其后的有效字节分别代表绿色、蓝色和 Alpha 通道值。</p>
	 */
	class ColorFilter extends Filter implements IFilter  {

		/**
		 * 对比度列表
		 */
		private static DELTA_INDEX:any;

		/**
		 * 灰色矩阵
		 */
		private static GRAY_MATRIX:any;

		/**
		 * 单位矩阵,表示什么效果都没有
		 */
		private static IDENTITY_MATRIX:any;

		/**
		 * 标准矩阵长度
		 */
		private static LENGTH:any;

		/**
		 * 当前使用的矩阵
		 */
		private _matrix:any;

		/**
		 * 创建一个 <code>ColorFilter</code> 实例。
		 * @param mat （可选）由 20 个项目（排列成 4 x 5 矩阵）组成的数组，用于颜色转换。
		 */

		constructor(mat?:any[]);

		/**
		 * 设置为灰色滤镜
		 */
		gray():ColorFilter;

		/**
		 * 设置为变色滤镜
		 * @param red 红色增量,范围:0~255
		 * @param green 绿色增量,范围:0~255
		 * @param blue 蓝色增量,范围:0~255
		 * @param alpha alpha,范围:0~1
		 */
		color(red?:number,green?:number,blue?:number,alpha?:number):ColorFilter;

		/**
		 * 设置滤镜色
		 * @param color 颜色值
		 */
		setColor(color:string):ColorFilter;

		/**
		 * 设置矩阵数据
		 * @param matrix 由 20 个项目（排列成 4 x 5 矩阵）组成的数组
		 * @return this
		 */
		setByMatrix(matrix:any[]):ColorFilter;

		/**
		 * @private 
		 * @override 
		 */
		get type():number;

		/**
		 * 调整颜色，包括亮度，对比度，饱和度和色调
		 * @param brightness 亮度,范围:-100~100
		 * @param contrast 对比度,范围:-100~100
		 * @param saturation 饱和度,范围:-100~100
		 * @param hue 色调,范围:-180~180
		 * @return this
		 */
		adjustColor(brightness:number,contrast:number,saturation:number,hue:number):ColorFilter;

		/**
		 * 调整亮度
		 * @param brightness 亮度,范围:-100~100
		 * @return this
		 */
		adjustBrightness(brightness:number):ColorFilter;

		/**
		 * 调整对比度
		 * @param contrast 对比度,范围:-100~100
		 * @return this
		 */
		adjustContrast(contrast:number):ColorFilter;

		/**
		 * 调整饱和度
		 * @param saturation 饱和度,范围:-100~100
		 * @return this
		 */
		adjustSaturation(saturation:number):ColorFilter;

		/**
		 * 调整色调
		 * @param hue 色调,范围:-180~180
		 * @return this
		 */
		adjustHue(hue:number):ColorFilter;

		/**
		 * 重置成单位矩阵，去除滤镜效果
		 */
		reset():ColorFilter;

		/**
		 * 矩阵乘法
		 * @param matrix 
		 * @return this
		 */
		private _multiplyMatrix:any;

		/**
		 * 规范值的范围
		 * @param val 当前值
		 * @param limit 值的范围-limit~limit
		 */
		private _clampValue:any;

		/**
		 * 规范矩阵,将矩阵调整到正确的大小
		 * @param matrix 需要调整的矩阵
		 */
		private _fixMatrix:any;

		/**
		 * 复制矩阵
		 */
		private _copyMatrix:any;
	}

	/**
	 * <code>Filter</code> 是滤镜基类。
	 */
	class Filter implements IFilter  {

		/**
		 * @private 模糊滤镜。
		 */
		static BLUR:number;

		/**
		 * @private 颜色滤镜。
		 */
		static COLOR:number;

		/**
		 * @private 发光滤镜。
		 */
		static GLOW:number;

		/**
		 * 创建一个 <code>Filter</code> 实例。
		 */

		constructor();

		/**
		 * @private 滤镜类型。
		 */
		get type():number;
		static _filter:(this:RenderSprite,sprite:Sprite,context:Context,x:number,y:number) =>void;
	}

	/**
	 * 发光滤镜(也可以当成阴影滤使用）
	 */
	class GlowFilter extends Filter  {

		/**
		 * 数据的存储，顺序R,G,B,A,blurWidth,offX,offY;
		 */
		private _elements:any;

		/**
		 * 滤镜的颜色
		 */
		private _color:any;

		/**
		 * 创建发光滤镜
		 * @param color 滤镜的颜色
		 * @param blur 边缘模糊的大小
		 * @param offX X轴方向的偏移
		 * @param offY Y轴方向的偏移
		 */

		constructor(color:string,blur?:number,offX?:number,offY?:number);

		/**
		 * @private 滤镜类型
		 * @override 
		 */
		get type():number;

		/**
		 * @private 
		 */
		get offY():number;

		/**
		 * @private 
		 */
		set offY(value:number);

		/**
		 * @private 
		 */
		get offX():number;

		/**
		 * @private 
		 */
		set offX(value:number);

		/**
		 * @private 
		 */
		getColor():any[];

		/**
		 * @private 
		 */
		get blur():number;

		/**
		 * @private 
		 */
		set blur(value:number);
		getColorNative():Float32Array;
		getBlurInfo1Native():Float32Array;
		getBlurInfo2Native():Float32Array;
	}

	/**
	 * @private 
	 */
	class GlowFilterGLRender  {
		private setShaderInfo:any;
		render(rt:RenderTexture2D,ctx:Context,width:number,height:number,filter:GlowFilter):void;
	}

	interface IFilter{
		type:number;
	}


const enum glTFAccessorComponentType {
    /** Byte */
    BYTE = 5120,
    /** Unsigned Byte */
    UNSIGNED_BYTE = 5121,
    /** Short */
    SHORT = 5122,
    /** Unsigned Short */
    UNSIGNED_SHORT = 5123,
    /** Unsigned Int */
    UNSIGNED_INT = 5125,
    /** Float */
    FLOAT = 5126
}

const enum glTFAccessorType {
    /** Scalar */
    SCALAR = "SCALAR",
    /** Vector2 */
    VEC2 = "VEC2",
    /** Vector3 */
    VEC3 = "VEC3",
    /** Vector4 */
    VEC4 = "VEC4",
    /** Matrix2x2 */
    MAT2 = "MAT2",
    /** Matrix3x3 */
    MAT3 = "MAT3",
    /** Matrix4x4 */
    MAT4 = "MAT4"
}

const enum glTFAnimationChannelTargetPath {
    /** Translation */
    TRANSLATION = "translation",
    /** Rotation */
    ROTATION = "rotation",
    /** Scale */
    SCALE = "scale",
    /** Weights */
    WEIGHTS = "weights"
}

const enum glTFAnimationSamplerInterpolation {
    /** The animated values are linearly interpolated between keyframes */
    LINEAR = "LINEAR",
    /** The animated values remain constant to the output of the first keyframe, until the next keyframe */
    STEP = "STEP",
    /** The animation's interpolation is computed using a cubic spline with specified tangents */
    CUBICSPLINE = "CUBICSPLINE"
}

const enum glTFCameraType {
    /** A perspective camera containing properties to create a perspective projection matrix  */
    PERSPECTIVE = "perspective",
    /**  An orthographic camera containing properties to create an orthographic projection matrix */
    ORTHOGRAPHIC = "orthographic"
}

const enum glTFImageMimeType {
    /**  JPEG Mime-type */
    JPEG = "image/jpeg",
    /** PNG Mime-type */
    PNG = "image/png"
}

const enum glTFMaterialAlphaMode {
    /**  The alpha value is ignored and the rendered output is fully opaque */
    OPAQUE = "OPAQUE",
    /** The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value */
    MASK = "MASK",
    /** The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator) */
    BLEND = "BLEND"
}

const enum glTFMeshPrimitiveMode {
    /** Points */
    POINTS = 0,
    /** Lines */
    LINES = 1,
    /** Line Loop */
    LINE_LOOP = 2,
    /** Line Strip */
    LINE_STRIP = 3,
    /** Triangles */
    TRIANGLES = 4,
    /** Triangle Strip */
    TRIANGLE_STRIP = 5,
    /** Triangle Fan */
    TRIANGLE_FAN = 6
}

const enum glTFTextureMagFilter {
    /** Nearest */
    NEAREST = 9728,
    /**  Linear */
    LINEAR = 9729
}

const enum glTFTextureMinFilter {
    /**  Nearest */
    NEAREST = 9728,
    /** Linear */
    LINEAR = 9729,
    /** Nearest Mip-Map Nearest */
    NEAREST_MIPMAP_NEAREST = 9984,
    /** Linear Mipmap Nearest */
    LINEAR_MIPMAP_NEAREST = 9985,
    /** Nearest Mipmap Linear */
    NEAREST_MIPMAP_LINEAR = 9986,
    /** Linear Mipmap Linear */
    LINEAR_MIPMAP_LINEAR = 9987
}

const enum glTFTextureWrapMode {
    /** Clamp to Edge */
    CLAMP_TO_EDGE = 33071,
    /** Mirrored Repeat */
    MIRRORED_REPEAT = 33648,
    /** Repeat */
    REPEAT = 10497
}

	interface glTFNodeProperty{

		/**
		 * Dictionary object with extension-specific objects.
		 */
		extensions?:{[key:string]:any;};

		/**
		 * Application-specific data.
		 */
		extras?:any;
	}


	interface glTFChildNodeProperty{

		/**
		 * The user-defined name of this object.
		 */
		name?:string;
	}


	interface glTFAccessorSparseIndeces extends glTFNodeProperty {

		/**
		 * The index of the bufferView with sparse indices. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target
		 */
		bufferView:number;

		/**
		 * The offset relative to the start of the bufferView in bytes. Must be aligned
		 */
		byteOffset?:number;

		/**
		 * The indices data type.  Valid values correspond to WebGL enums: 5121 (UNSIGNED_BYTE), 5123 (UNSIGNED_SHORT), 5125 (UNSIGNED_INT)
		 */
		componentType:glTFAccessorComponentType;
	}


	interface glTFAccessorSparseValues extends glTFNodeProperty {

		/**
		 * The index of the bufferView with sparse values. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target
		 */
		bufferView:number;

		/**
		 * The offset relative to the start of the bufferView in bytes. Must be aligned
		 */
		byteOffset?:number;
	}


	interface glTFAccessorSparse extends glTFNodeProperty {

		/**
		 * Number of entries stored in the sparse array.
		 */
		count:number;

		/**
		 * Index array of size count that points to those accessor attributes that deviate from their initialization value. Indices must strictly increase
		 */
		indices:glTFAccessorSparseIndeces;

		/**
		 * Array of size count times number of components, storing the displaced accessor attributes pointed by indices. Substituted values must have the same componentType and number of components as the base accessor
		 */
		values:glTFAccessorSparseValues;
	}


	interface glTFAccessor extends glTFNodeProperty {

		/**
		 * The index of the bufferView.
		 */
		bufferView?:number;

		/**
		 * The offset relative to the start of the bufferView in bytes.
		 */
		byteOffset?:number;

		/**
		 * The datatype of components in the attribute.
		 */
		componentType:glTFAccessorComponentType;

		/**
		 * Specifies whether integer data values should be normalized.
		 */
		normalized?:boolean;

		/**
		 * The number of attributes referenced by this accessor.
		 */
		count:number;

		/**
		 * Specifies if the attribute is a scalar, vector, or matrix.
		 */
		type:glTFAccessorType;

		/**
		 * Maximum value of each component in this attribute.
		 */
		max?:number[];

		/**
		 * Minimum value of each component in this attribute.
		 */
		min?:number[];

		/**
		 * Sparse storage of attributes that deviate from their initialization value.
		 */
		sparse?:glTFAccessorSparse;
	}


	interface glTFAnimationChannelTarget extends glTFNodeProperty {

		/**
		 * The index of the node to target
		 */
		node:number;

		/**
		 * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
		 */
		path:glTFAnimationChannelTargetPath;
	}


	interface glTFAnimationChannel extends glTFNodeProperty {

		/**
		 * * The index of a sampler in this animation used to compute the value for the target
		 */
		sampler:number;

		/**
		 * * The index of the node and TRS property to target
		 */
		target:glTFAnimationChannelTarget;
	}


	interface glTFAnimationSampler extends glTFNodeProperty {

		/**
		 * The index of an accessor containing keyframe input values, e.g., time
		 */
		input:number;

		/**
		 * Interpolation algorithm
		 */
		interpolation?:glTFAnimationSamplerInterpolation;

		/**
		 * The index of an accessor, containing keyframe output values
		 */
		output:number;
	}


	interface glTFAnimation extends glTFNodeProperty,glTFChildNodeProperty {

		/**
		 * An array of channels, each of which targets an animation's sampler at a node's property
		 */
		channels:glTFAnimationChannel[];

		/**
		 * An array of samplers that combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target)
		 */
		samplers:glTFAnimationSampler[];
	}


	interface glTFAsset extends glTFChildNodeProperty {

		/**
		 * A copyright message suitable for display to credit the content creator.
		 */
		copyright?:string;

		/**
		 * Tool that generated this glTF model. Useful for debugging.
		 */
		generator?:string;

		/**
		 * The glTF version that this asset targets.
		 */
		version:string;

		/**
		 * The minimum glTF version that this asset targets.
		 */
		minVersion?:string;
	}


	interface glTFBuffer extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The uri of the buffer.  Relative paths are relative to the .gltf file.  Instead of referencing an external file, the uri can also be a data-uri
		 */
		uri?:string;

		/**
		 * The length of the buffer in bytes
		 */
		byteLength:number;
	}


	interface glTFBufferView extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The index of the buffer
		 */
		buffer:number;

		/**
		 * The offset into the buffer in bytes
		 */
		byteOffset?:number;

		/**
		 * The lenth of the bufferView in bytes
		 */
		byteLength:number;

		/**
		 * The stride, in bytes
		 */
		byteStride?:number;
	}


	interface glTFCameraOrthographic extends glTFNodeProperty {

		/**
		 * The floating-point horizontal magnification of the view. Must not be zero
		 */
		xmag:number;

		/**
		 * The floating-point vertical magnification of the view. Must not be zero
		 */
		ymag:number;

		/**
		 * The floating-point distance to the far clipping plane. zfar must be greater than znear
		 */
		zfar:number;

		/**
		 * The floating-point distance to the near clipping plane
		 */
		znear:number;
	}


	interface glTFCameraPerspective extends glTFNodeProperty {

		/**
		 * The floating-point aspect ratio of the field of view
		 */
		aspectRatio?:number;

		/**
		 * The floating-point vertical field of view in radians
		 */
		yfov:number;

		/**
		 * The floating-point distance to the far clipping plane
		 */
		zfar?:number;

		/**
		 * The floating-point distance to the near clipping plane
		 */
		znear:number;
	}


	interface glTFCamera extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * An orthographic camera containing properties to create an orthographic projection matrix
		 */
		orthographic?:glTFCameraOrthographic;

		/**
		 * A perspective camera containing properties to create a perspective projection matrix
		 */
		perspective?:glTFCameraPerspective;

		/**
		 * Specifies if the camera uses a perspective or orthographic projection
		 */
		type:glTFCameraType;
	}


	interface glTFImage extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The uri of the image.  Relative paths are relative to the .gltf file.  Instead of referencing an external file, the uri can also be a data-uri.  The image format must be jpg or png
		 */
		uri?:string;

		/**
		 * The image's MIME type
		 */
		mimeType?:glTFImageMimeType;

		/**
		 * The index of the bufferView that contains the image. Use this instead of the image's uri property
		 */
		bufferView?:number;
	}


	interface glTFTextureInfo extends glTFNodeProperty {

		/**
		 * The index of the texture
		 */
		index:number;

		/**
		 * The set index of texture's TEXCOORD attribute used for texture coordinate mapping
		 */
		texCoord?:number;
	}


	interface glTFMaterialPbrMetallicRoughness extends glTFNodeProperty {

		/**
		 * The material's base color factor
		 */
		baseColorFactor?:number[];

		/**
		 * The base color texture
		 */
		baseColorTexture?:glTFTextureInfo;

		/**
		 * The metalness of the material
		 */
		metallicFactor?:number;

		/**
		 * The roughness of the material
		 */
		roughnessFactor?:number;

		/**
		 * The metallic-roughness texture
		 */
		metallicRoughnessTexture?:glTFTextureInfo;
	}


	interface glTFMaterialNormalTextureInfo extends glTFTextureInfo {

		/**
		 * The scalar multiplier applied to each normal vector of the normal texture
		 */
		scale?:number;
	}


	interface glTFMaterialOcclusionTextureInfo extends glTFTextureInfo {

		/**
		 * A scalar multiplier controlling the amount of occlusion applied
		 */
		strength?:number;
	}


	interface glTFMaterial extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology. When not specified, all the default values of pbrMetallicRoughness apply
		 */
		pbrMetallicRoughness?:glTFMaterialPbrMetallicRoughness;

		/**
		 * The normal map texture
		 */
		normalTexture?:glTFMaterialNormalTextureInfo;

		/**
		 * The occlusion map texture
		 */
		occlusionTexture?:glTFMaterialOcclusionTextureInfo;

		/**
		 * The emissive map texture
		 */
		emissiveTexture?:glTFTextureInfo;

		/**
		 * The RGB components of the emissive color of the material. These values are linear. If an emissiveTexture is specified, this value is multiplied with the texel values
		 */
		emissiveFactor?:number[];

		/**
		 * The alpha rendering mode of the material
		 */
		alphaMode?:glTFMaterialAlphaMode;

		/**
		 * The alpha cutoff value of the material
		 */
		alphaCutoff?:number;

		/**
		 * Specifies whether the material is double sided
		 */
		doubleSided?:boolean;
	}


	interface glTFMeshPrimitive extends glTFNodeProperty {

		/**
		 * A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data
		 */
		attributes:{[key:string]:number;};

		/**
		 * The index of the accessor that contains the indices
		 */
		indices?:number;

		/**
		 * The index of the material to apply to this primitive when rendering
		 */
		material?:number;

		/**
		 * The type of primitives to render. All valid values correspond to WebGL enums
		 */
		mode?:glTFMeshPrimitiveMode;

		/**
		 * An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only POSITION, NORMAL, and TANGENT supported) to their deviations in the Morph Target
		 */
		targets?:{
        [name: string]: number;
    }[];
	}


	interface glTFMesh extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * An array of primitives, each defining geometry to be rendered with a material
		 */
		primitives:glTFMeshPrimitive[];

		/**
		 * Array of weights to be applied to the Morph Targets
		 */
		weights?:number[];
	}


	interface glTFNode extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The index of the camera referenced by this node
		 */
		camera?:number;

		/**
		 * The indices of this node's children
		 */
		children?:number[];

		/**
		 * The index of the skin referenced by this node
		 */
		skin?:number;

		/**
		 * A floating-point 4x4 transformation matrix stored in column-major order
		 */
		matrix?:number[];

		/**
		 * The index of the mesh in this node
		 */
		mesh?:number;

		/**
		 * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar
		 */
		rotation?:number[];

		/**
		 * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes
		 */
		scale?:number[];

		/**
		 * The node's translation along the x, y, and z axes
		 */
		translation?:number[];

		/**
		 * The weights of the instantiated Morph Target. Number of elements must match number of Morph Targets of used mesh
		 */
		weights?:number[];
	}


	interface glTFSampler extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
		 */
		magFilter?:glTFTextureMagFilter;

		/**
		 * Minification filter.  All valid values correspond to WebGL enums
		 */
		minFilter?:glTFTextureMinFilter;

		/**
		 * S (U) wrapping mode.  All valid values correspond to WebGL enums
		 */
		wrapS?:glTFTextureWrapMode;

		/**
		 * T (V) wrapping mode.  All valid values correspond to WebGL enums
		 */
		wrapT?:glTFTextureWrapMode;
	}


	interface glTFScene extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The indices of each root node
		 */
		nodes:number[];
	}


	interface glTFSkin extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied
		 */
		inverseBindMatrices?:number;

		/**
		 * The index of the node used as a skeleton root. When undefined, joints transforms resolve to scene root
		 */
		skeleton?:number;

		/**
		 * Indices of skeleton nodes, used as joints in this skin.  The array length must be the same as the count property of the inverseBindMatrices accessor (when defined)
		 */
		joints:number[];
	}


	interface glTFTexture extends glTFChildNodeProperty,glTFNodeProperty {

		/**
		 * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering should be used
		 */
		sampler?:number;

		/**
		 * The index of the image used by this texture
		 */
		source:number;
	}


	interface glTF extends glTFNodeProperty {

		/**
		 * An array of accessors. An accessor is a typed view into a bufferView
		 */
		accessors?:glTFAccessor[];

		/**
		 * An array of keyframe animations
		 */
		animations?:glTFAnimation[];

		/**
		 * Metadata about the glTF asset
		 */
		asset:glTFAsset;

		/**
		 * An array of buffers.  A buffer points to binary geometry, animation, or skins
		 */
		buffers?:glTFBuffer[];

		/**
		 * An array of bufferViews.  A bufferView is a view into a buffer generally representing a subset of the buffer
		 */
		bufferViews?:glTFBufferView[];

		/**
		 * An array of cameras
		 */
		cameras?:glTFCamera[];

		/**
		 * Names of glTF extensions used somewhere in this asset
		 */
		extensionsUsed?:string[];

		/**
		 * Names of glTF extensions required to properly load this asset
		 */
		extensionsRequired?:string[];

		/**
		 * An array of images.  An image defines data used to create a texture
		 */
		images?:glTFImage[];

		/**
		 * An array of materials.  A material defines the appearance of a primitive
		 */
		materials?:glTFMaterial[];

		/**
		 * An array of meshes.  A mesh is a set of primitives to be rendered
		 */
		meshes?:glTFMesh[];

		/**
		 * An array of nodes
		 */
		nodes?:glTFNode[];

		/**
		 * An array of samplers.  A sampler contains properties for texture filtering and wrapping modes
		 */
		samplers?:glTFSampler[];

		/**
		 * The index of the default scene
		 */
		scene?:number;

		/**
		 * An array of scenes
		 */
		scenes?:glTFScene[];

		/**
		 * An array of skins.  A skin is defined by joints and matrices
		 */
		skins?:glTFSkin[];

		/**
		 * An array of textures
		 */
		textures?:glTFTexture[];
	}


	/**
	 * <code>glTFLoader</code> 类可用来加载 gltf 2.0 文件
	 */
	class glTFLoader  {

		/**
		 * glTF 资源
		 */
		static GLTF:string;

		/**
		 * glTF base64 Texture
		 */
		static GLTFBASE64TEX:string;

		/**
		 * 初始化 glTF Loader
		 */
		static init():void;
	}

	/**
	 * <code>glTFUtils<code> 用于解析 glTF 2.0 对象
	 */
	class glTFUtils  {
		static Extensions:{[key:string]:Handler;};

		/**
		 * 保存 extra 处理函数对象
		 */
		static Extras:{[key:string]:{[key:string]:Handler;};};

		/**
		 * 注册 extra 处理函数
		 * @param context 
		 * @param extraName 
		 * @param handler 
		 */
		static RegisterExtra(context:string,extraName:string,handler:Handler):void;

		/**
		 * 取消注册 extra 处理函数
		 * @param context 
		 * @param extraName 
		 * @param recoverHandler 
		 */
		static UnRegisterExtra(context:string,extraName:string,recoverHandler?:boolean):void;

		/**
		 * 根据数据类型获取分量
		 * @param type 
		 */
		static getAccessorComponentsNum(type:glTFAccessorType):number;

		/**
		 * 获取 attribute 分量
		 * @param attriStr 
		 */
		static getAttributeNum(attriStr:string):number;

		/**
		 * 获取 accessor buffer 数据
		 * @param accessorIndex 
		 */
		static getBufferwithAccessorIndex(accessorIndex:number):Float32Array|Int16Array|Uint8Array|Uint32Array|Uint16Array|Int8Array;

		/**
		 * 判断 Texture 是否需要 mipmap
		 * @param glTFImage 
		 * @param glTFSampler 
		 */
		static getTextureMipmap(glTFSampler:glTFSampler):boolean;

		/**
		 * 获取 Texture format
		 * @param glTFImage 
		 */
		static getTextureFormat(glTFImage:glTFImage):number;

		/**
		 * 获取 Texture filter mode
		 * @param glTFSampler 
		 */
		static getTextureFilterMode(glTFSampler:glTFSampler):number;

		/**
		 * 获取 Texture warp mode
		 * @param mode 
		 */
		static getTextureWrapMode(mode:glTFTextureWrapMode):number;

		/**
		 * 获取 Texture 初始化参数
		 * @param glTFImage 
		 * @param glTFSampler 
		 */
		static getTextureConstructParams(glTFImage:glTFImage,glTFSampler:glTFSampler):any[];

		/**
		 * 获取 Texture 属性参数
		 * @param glTFImage 
		 * @param glTFSampler 
		 */
		static getTexturePropertyParams(glTFSampler:glTFSampler):any;

		/**
		 * 根据 glTFTextureInfo 获取 Texture2D
		 * @param glTFTextureInfo 
		 */
		static getTexturewithInfo(glTFTextureInfo:glTFTextureInfo):Texture2D;

		/**
		 * 根据 glTFMaterial 节点数据创建 default Material
		 * @param glTFMaterial 
		 */
		static _createdefaultMaterial(glTFMaterial:glTFMaterial):PBRStandardMaterial;

		/**
		 * 应用 pbrMetallicRoughness 数据
		 * @param pbrMetallicRoughness 
		 * @param layaPBRMaterial 
		 */
		static applyPBRMetallicRoughness(pbrMetallicRoughness:glTFMaterialPbrMetallicRoughness,layaPBRMaterial:PBRStandardMaterial):void;

		/**
		 * 获取 gltf mesh 中 material
		 * @param glTFMesh 
		 */
		static pickMeshMaterials(glTFMesh:glTFMesh):Material[];

		/**
		 * 创建 glTFScene 节点
		 * @param glTFScene 
		 */
		static _createSceneNode(glTFScene:glTFScene):Sprite3D;

		/**
		 * 应用 Transform 信息
		 * @param glTFNode 
		 * @param sprite 
		 */
		static applyTransform(glTFNode:glTFNode,sprite:Sprite3D):void;

		/**
		 * 创建 节点对象
		 * @param glTFNode 
		 */
		static _createSprite3D(glTFNode:glTFNode):Sprite3D;

		/**
		 * 创建 MeshSprite3D 对象
		 * @param glTFNode 
		 */
		static _createMeshSprite3D(glTFNode:glTFNode):MeshSprite3D;

		/**
		 * 创建 MeshSprite3D 对象
		 * @param glTFNode 
		 */
		static _createSkinnedMeshSprite3D(glTFNode:glTFNode):SkinnedMeshSprite3D;

		/**
		 * 创建 Mesh
		 * @param mesh 
		 */
		static _createMesh(glTFMesh:glTFMesh,glTFSkin?:glTFSkin):Mesh;

		/**
		 * 计算 SkinnedMeshSprite3D local bounds
		 * @param skinned 
		 */
		static calSkinnedSpriteLocalBounds(skinned:SkinnedMeshSprite3D):void;

		/**
		 * @interna 获取 Animator 根节点
		 */
		static getAnimationRoot(channels:glTFAnimationChannel[]):Sprite3D;
	}

	/**
	 * HTML图文类，用于显示html内容
	 * 
	 * 支持的标签如下:
	 * a:链接标签，点击后会派发"link"事件 比如:<a href='alink'>a</a>
	 * div:div容器标签，比如:<div>abc</div>
	 * span:行内元素标签，比如:<span style='color:#ff0000'>abc</span>
	 * p:行元素标签，p标签会自动换行，div不会，比如:<p>abc</p>
	 * img:图片标签，比如:<img src='res/boy.png'></img>
	 * br:换行标签，比如:<div>abc<br/>def</div>
	 * style:样式标签，比如:<div style='width:130px;height:50px;color:#ff0000'>abc</div>
	 * link:外链样式标签，可以加载一个css文件来当style使用，比如:<link type='text/css' href='html/test.css'/>
	 * 
	 * style支持的属性如下:
	 * italic:true|false;					是否是斜体
	 * bold:true|false;						是否是粗体
	 * letter-spacing:10px;					字间距
	 * font-family:宋体; 					字体
	 * font-size:20px;						字体大小
	 * font-weight:bold:none;				字体是否是粗体，功能同bold
	 * color:#ff0000;						字体颜色
	 * stroke:2px;							字体描边宽度
	 * strokeColor:#ff0000;					字体描边颜色
	 * padding:10px 10px 20px 20px;			边缘的距离
	 * vertical-align:top|bottom|middle;	垂直对齐方式
	 * align:left|right|center;				水平对齐方式
	 * line-height:20px;					行高
	 * background-color:#ff0000;			背景颜色
	 * border-color:#ff0000;				边框颜色
	 * width:100px;							对象宽度
	 * height:100px;						对象高度
	 * 
	 * 示例用法：
	 * var div:HTMLDivElement=new HTMLDivElement();
	 * div.innerHTML = "<link type='text/css' href='html/test.css'/><a href='alink'>a</a><div style='width:130px;height:50px;color:#ff0000'>div</div><br/><span style='font-weight:bold;color:#ffffff;font-size:30px;stroke:2px;italic:true;'>span</span><span style='letter-spacing:5px'>span2</span><p>p</p><img src='res/boy.png'></img>";
	 */
	class HTMLDivElement extends Sprite  {

		/**
		 * @private 
		 */
		private _recList:any;

		/**
		 * @private 
		 */
		private _innerHTML:any;

		/**
		 * @private 
		 */
		private _repaintState:any;

		constructor();

		/**
		 * @private 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @private 
		 */
		private _htmlDivRepaint:any;
		private _updateGraphicWork:any;
		private _setGraphicDirty:any;

		/**
		 * @private 
		 */
		private _doClears:any;

		/**
		 * @private 
		 */
		private _updateGraphic:any;

		/**
		 * 获取HTML样式
		 */
		get style():HTMLStyle;

		/**
		 * 设置标签内容
		 */
		set innerHTML(text:string);
		private _refresh:any;
		set width(value:number);
		get width():number;
		set height(value:number);
		get height():number;

		/**
		 * 获取內容宽度
		 */
		get contextWidth():number;

		/**
		 * 获取內容高度
		 */
		get contextHeight():number;

		/**
		 * @private 
		 */
		private _onMouseClick:any;

		/**
		 * @private 
		 */
		private _eventLink:any;
	}

	/**
	 * @private 
	 */
	class HTMLDivParser extends HTMLElement  {

		/**
		 * 实际内容的高
		 */
		contextHeight:number;

		/**
		 * 实际内容的宽
		 */
		contextWidth:number;

		/**
		 * @private 
		 */
		private _htmlBounds:any;

		/**
		 * @private 
		 */
		private _boundsRec:any;

		/**
		 * 重绘回调
		 */
		repaintHandler:Handler;

		/**
		 * @override 
		 */
		reset():HTMLElement;

		/**
		 * 设置标签内容
		 */
		set innerHTML(text:string);

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * 追加内容，解析并对显示对象排版
		 * @param text 
		 */
		appendHTML(text:string):void;

		/**
		 * 获取bounds
		 * @return 
		 */
		getBounds():Rectangle;

		/**
		 * @override 
		 */
		parentRepaint(recreate?:boolean):void;

		/**
		 * @private 对显示内容进行排版
		 */
		layout():void;

		/**
		 * 获取对象的高
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * 获取对象的宽
		 * @override 
		 */
		get width():number;
	}

	/**
	 * @private 
	 */
	class HTMLDocument  {
		static document:HTMLDocument;
		all:{[key:string]:HTMLElement;};
		styleSheets:any;
		getElementById(id:string):HTMLElement;
		setElementById(id:string,e:HTMLElement):void;
	}

enum HTMLElementType {
    /**基础类型 */
    BASE = 0,
    /**图片类型 */
    IMAGE = 1
}

	/**
	 * @private 
	 */
	class HTMLElement  {
		private static _EMPTYTEXT:any;
		eletype:HTMLElementType;
		URI:URL;
		parent:HTMLElement;
		_style:HTMLStyle;
		protected _text:any;
		protected _children:any[];
		protected _x:number;
		protected _y:number;
		protected _width:number;
		protected _height:number;

		/**
		 * 格式化指定的地址并返回。
		 * @param url 地址。
		 * @param base 基础路径，如果没有，则使用basePath。
		 * @return 格式化处理后的地址。
		 */
		static formatURL1(url:string,basePath?:string):string;

		constructor();
		protected _creates():void;

		/**
		 * 重置
		 */
		reset():HTMLElement;
		set id(value:string);
		repaint(recreate?:boolean):void;
		parentRepaint(recreate?:boolean):void;
		set innerTEXT(value:string);
		get innerTEXT():string;
		protected _setParent(value:HTMLElement):void;
		appendChild(c:HTMLElement):HTMLElement;
		addChild(c:HTMLElement):HTMLElement;
		removeChild(c:HTMLElement):HTMLElement;
		static getClassName(tar:any):string;

		/**
		 * <p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
		 * <p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
		 * @param destroyChild （可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		 */
		destroy():void;

		/**
		 * 销毁所有子对象，不销毁自己本身。
		 */
		destroyChildren():void;
		get style():HTMLStyle;
		set x(v:number);
		get x():number;
		set y(v:number);
		get y():number;
		get width():number;
		set width(value:number);
		get height():number;
		set height(value:number);
		set href(url:string);
		get href():string;
		formatURL(url:string):string;
		set color(value:string);
		set className(value:string);
		drawToGraphic(graphic:Graphics,gX:number,gY:number,recList:any[]):void;
		renderSelfToGraphic(graphic:Graphics,gX:number,gY:number,recList:any[]):void;
		private workLines:any;
		private createOneLine:any;
	}

	/**
	 * @private 
	 */
	class HTMLHitRect  {
		rec:Rectangle;
		href:string;

		constructor();
		reset():HTMLHitRect;
		recover():void;
		static create():HTMLHitRect;
	}

	/**
	 * iframe标签类，目前用于加载外并解析数据
	 */
	class HTMLIframeElement extends HTMLDivElement  {

		constructor();

		/**
		 * 加载html文件，并解析数据
		 * @param url 
		 */
		set href(url:string);
	}

	/**
	 * @private 
	 */
	class HTMLImageElement extends HTMLElement  {
		private _tex:any;
		private _url:any;

		constructor();

		/**
		 * @override 
		 */
		reset():HTMLElement;
		set src(url:string);
		private onloaded:any;

		/**
		 * @param graphic 
		 * @param gX 
		 * @param gY 
		 * @param recList 
		 * @override 
		 */
		renderSelfToGraphic(graphic:Graphics,gX:number,gY:number,recList:any[]):void;
	}

	/**
	 * @private 
	 */
	class HTMLLinkElement extends HTMLElement  {
		static _cuttingStyle:RegExp;
		type:string;
		private _loader:any;

		/**
		 * @override 
		 */
		protected _creates():void;

		/**
		 * @param graphic 
		 * @param gX 
		 * @param gY 
		 * @param recList 
		 * @override 
		 */
		drawToGraphic(graphic:Graphics,gX:number,gY:number,recList:any[]):void;

		/**
		 * @override 
		 */
		reset():HTMLElement;

		/**
		 * @override 
		 */
		set href(url:string);

		/**
		 * @override 
		 */
		get href():string;
	}

	/**
	 * @private 
	 */
	class HTMLStyleElement extends HTMLElement  {

		/**
		 * @override 
		 */
		protected _creates():void;

		/**
		 * @param graphic 
		 * @param gX 
		 * @param gY 
		 * @param recList 
		 * @override 
		 */
		drawToGraphic(graphic:Graphics,gX:number,gY:number,recList:any[]):void;

		/**
		 * @override 
		 */
		reset():HTMLElement;

		/**
		 * 解析样式
		 * @override 
		 */
		set innerTEXT(value:string);

		/**
		 * @override 
		 */
		get innerTEXT():string;
	}

	/**
	 * @private 
	 */
	class HTMLExtendStyle  {
		static EMPTY:HTMLExtendStyle;

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * 默认值0，表示不描边。
		 * @default 0
		 */
		stroke:number;

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * @default "#000000";
		 */
		strokeColor:string;

		/**
		 * <p>垂直行间距（以像素为单位）</p>
		 */
		leading:number;

		/**
		 * 行高。
		 */
		lineHeight:number;
		letterSpacing:number;
		href:string;

		constructor();
		reset():HTMLExtendStyle;
		recover():void;

		/**
		 * 从对象池中创建
		 */
		static create():HTMLExtendStyle;
	}

	/**
	 * @private 
	 */
	class HTMLParse  {
		private static char255:any;
		private static spacePattern:any;
		private static char255AndOneSpacePattern:any;
		private static _htmlClassMapShort:any;

		/**
		 * 根据类型获取对应的节点
		 * @param type 
		 */
		static getInstance(type:string):any;

		/**
		 * 解析HTML
		 * @param ower 
		 * @param xmlString 
		 * @param url 
		 */
		static parse(ower:HTMLDivParser,xmlString:string,url:URL):void;

		/**
		 * 解析xml节点 该函数会被递归调用
		 * @param xml 
		 */
		private static _parseXML:any;
	}

	/**
	 * @private 
	 */
	class HTMLStyle  {
		private static _CSSTOVALUE:any;
		private static _parseCSSRegExp:any;

		/**
		 * 需要继承的属性
		 */
		private static _inheritProps:any;

		/**
		 * 水平居左对齐方式。
		 */
		static ALIGN_LEFT:string;

		/**
		 * 水平居中对齐方式。
		 */
		static ALIGN_CENTER:string;

		/**
		 * 水平居右对齐方式。
		 */
		static ALIGN_RIGHT:string;

		/**
		 * 垂直居中对齐方式。
		 */
		static VALIGN_TOP:string;

		/**
		 * 垂直居中对齐方式。
		 */
		static VALIGN_MIDDLE:string;

		/**
		 * 垂直居底部对齐方式。
		 */
		static VALIGN_BOTTOM:string;

		/**
		 * 样式表信息。
		 */
		static styleSheets:any;

		/**
		 * 添加布局。
		 */
		static ADDLAYOUTED:number;
		private static _PADDING:any;
		protected static _HEIGHT_SET:number;
		protected static _LINE_ELEMENT:number;
		protected static _NOWARP:number;
		protected static _WIDTHAUTO:number;
		protected static _BOLD:number;
		protected static _ITALIC:number;

		/**
		 * @private 
		 */
		protected static _CSS_BLOCK:number;

		/**
		 * @private 
		 */
		protected static _DISPLAY_NONE:number;

		/**
		 * @private 
		 */
		protected static _ABSOLUTE:number;

		/**
		 * @private 
		 */
		protected static _WIDTH_SET:number;
		protected static alignVDic:any;
		protected static align_Value:any;
		protected static vAlign_Value:any;
		protected static _ALIGN:number;
		protected static _VALIGN:number;
		fontSize:number;
		family:string;
		color:string;
		ower:HTMLElement;
		private _extendStyle:any;
		textDecoration:string;

		/**
		 * 文本背景颜色，以字符串表示。
		 */
		bgColor:string;

		/**
		 * 文本边框背景颜色，以字符串表示。
		 */
		borderColor:string;

		/**
		 * 边距信息。
		 */
		padding:any[];

		constructor();
		private _getExtendStyle:any;
		get href():string;
		set href(value:string);

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * 默认值0，表示不描边。
		 * @default 0
		 */
		get stroke():number;
		set stroke(value:number);

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * @default "#000000";
		 */
		get strokeColor():string;
		set strokeColor(value:string);

		/**
		 * <p>垂直行间距（以像素为单位）</p>
		 */
		get leading():number;
		set leading(value:number);

		/**
		 * 行高。
		 */
		get lineHeight():number;
		set lineHeight(value:number);
		set align(v:string);

		/**
		 * <p>表示使用此文本格式的文本段落的水平对齐方式。</p>
		 * @default "left"
		 */
		get align():string;
		set valign(v:string);

		/**
		 * <p>表示使用此文本格式的文本段落的水平对齐方式。</p>
		 * @default "left"
		 */
		get valign():string;

		/**
		 * 字体样式字符串。
		 */
		set font(value:string);
		get font():string;

		/**
		 * 是否显示为块级元素。
		 */
		set block(value:boolean);

		/**
		 * 表示元素是否显示为块级元素。
		 */
		get block():boolean;

		/**
		 * 重置，方便下次复用
		 */
		reset():HTMLStyle;

		/**
		 * 回收
		 */
		recover():void;

		/**
		 * 从对象池中创建
		 */
		static create():HTMLStyle;

		/**
		 * 复制传入的 CSSStyle 属性值。
		 * @param src 待复制的 CSSStyle 对象。
		 */
		inherit(src:HTMLStyle):void;

		/**
		 * 表示是否换行。
		 */
		get wordWrap():boolean;
		set wordWrap(value:boolean);

		/**
		 * 是否为粗体
		 */
		get bold():boolean;
		set bold(value:boolean);
		get fontWeight():string;
		set fontWeight(value:string);

		/**
		 * 表示使用此文本格式的文本是否为斜体。
		 * @default false
		 */
		get italic():boolean;
		set italic(value:boolean);

		/**
		 * @inheritDoc 
		 */
		widthed(sprite:any):boolean;
		set whiteSpace(type:string);

		/**
		 * 设置如何处理元素内的空白。
		 */
		get whiteSpace():string;

		/**
		 * 宽度。
		 */
		set width(w:any);

		/**
		 * 高度。
		 */
		set height(h:any);

		/**
		 * 是否已设置高度。
		 * @param sprite 显示对象 Sprite。
		 * @return 一个Boolean 表示是否已设置高度。
		 */
		heighted(sprite:any):boolean;

		/**
		 * 设置宽高。
		 * @param w 宽度。
		 * @param h 高度。
		 */
		size(w:number,h:number):void;

		/**
		 * 是否是行元素。
		 */
		getLineElement():boolean;
		setLineElement(value:boolean):void;

		/**
		 * 间距。
		 */
		get letterSpacing():number;
		set letterSpacing(d:number);

		/**
		 * 设置 CSS 样式字符串。
		 * @param text CSS样式字符串。
		 */
		cssText(text:string):void;

		/**
		 * 根据传入的属性名、属性值列表，设置此对象的属性值。
		 * @param attrs 属性名与属性值列表。
		 */
		attrs(attrs:any[]):void;
		set position(value:string);

		/**
		 * 元素的定位类型。
		 */
		get position():string;

		/**
		 * @inheritDoc 
		 */
		get absolute():boolean;

		/**
		 * @inheritDoc 
		 */
		get paddingLeft():number;

		/**
		 * @inheritDoc 
		 */
		get paddingTop():number;

		/**
		 * 通过传入的分割符，分割解析CSS样式字符串，返回样式列表。
		 * @param text CSS样式字符串。
		 * @param clipWord 分割符；
		 * @return 样式列表。
		 */
		static parseOneCSS(text:string,clipWord:string):any[];

		/**
		 * 解析 CSS 样式文本。
		 * @param text CSS 样式文本。
		 * @param uri URL对象。
		 */
		static parseCSS(text:string,uri:URL):void;
	}

	interface ILayout{
		x:number;
		y:number;
		width:number;
		height:number;
	}


	/**
	 * @private HTML的布局类
对HTML的显示对象进行排版
	 */
	class Layout  {
		private static DIV_ELEMENT_PADDING:any;
		private static _will:any;
		static later(element:HTMLElement):void;
		static layout(element:HTMLElement):any[];
		static _multiLineLayout(element:HTMLElement):any[];
	}

	/**
	 * @private 
	 */
	class LayoutLine  {
		elements:ILayout[];
		x:number;
		y:number;
		w:number;
		h:number;
		wordStartIndex:number;
		minTextHeight:number;
		mWidth:number;

		/**
		 * 底对齐（默认）
		 * @param left 
		 * @param width 
		 * @param dy 
		 * @param align 水平
		 * @param valign 垂直
		 * @param lineHeight 行高
		 */
		updatePos(left:number,width:number,lineNum:number,dy:number,align:string,valign:string,lineHeight:number):void;
	}

	/**
	 * @private CommandEncoder
	 */
	class CommandEncoder  {

		constructor(layagl:any,reserveSize:number,adjustSize:number,isSyncToRenderThread:boolean);
		getArrayData():any[];
		getPtrID():number;
		beginEncoding():void;
		endEncoding():void;
		clearEncoding():void;
		getCount():number;
		add_ShaderValue(o:any):void;
		addShaderUniform(one:any):void;
	}

	/**
	 * ...
	 * @author ww
	 */
	class QuickTestTool  {
		private static showedDic:any;
		private static _rendertypeToStrDic:any;
		private static _typeToNameDic:any;
		static getMCDName(type:number):string;
		static showRenderTypeInfo(type:any,force?:boolean):void;
		static __init__():void;
		_renderType:number;
		_repaint:number;
		_x:number;
		_y:number;

		constructor();

		/**
		 * 更新、呈现显示对象。由系统调用。
		 * @param context 渲染的上下文引用。
		 * @param x X轴坐标。
		 * @param y Y轴坐标。
		 */
		render(context:Context,x:number,y:number):void;
		private static _PreStageRender:any;
		private static _countDic:any;
		private static _countStart:any;
		private static _i:any;
		private static _countEnd:any;
		static showCountInfo():void;
		static enableQuickTest():void;
	}

	/**
	 * 地图的每层都会分块渲染处理
	 * 本类就是地图的块数据
	 * @author ...
	 */
	class GridSprite extends Sprite  {

		/**
		 * 相对于地图X轴的坐标
		 */
		relativeX:number;

		/**
		 * 相对于地图Y轴的坐标
		 */
		relativeY:number;

		/**
		 * 是否用于对象层的独立物件
		 */
		isAloneObject:boolean;

		/**
		 * 当前GRID中是否有动画
		 */
		isHaveAnimation:boolean;

		/**
		 * 当前GRID包含的动画
		 */
		aniSpriteArray:any[];

		/**
		 * 当前GRID包含多少个TILE(包含动画)
		 */
		drawImageNum:number;
		private _map:any;

		/**
		 * 传入必要的参数，用于裁剪，跟确认此对象类型
		 * @param map 把地图的引用传进来，参与一些裁剪计算
		 * @param objectKey true:表示当前GridSprite是个活动对象，可以控制，false:地图层的组成块
		 */
		initData(map:TiledMap,objectKey?:boolean):void;

		/**
		 * 把一个动画对象绑定到当前GridSprite
		 * @param sprite 动画的显示对象
		 */
		addAniSprite(sprite:TileAniSprite):void;

		/**
		 * 显示当前GridSprite，并把上面的动画全部显示
		 */
		show():void;

		/**
		 * 隐藏当前GridSprite，并把上面绑定的动画全部移除
		 */
		hide():void;

		/**
		 * 刷新坐标，当我们自己控制一个GridSprite移动时，需要调用此函数，手动刷新
		 */
		updatePos():void;

		/**
		 * 重置当前对象的所有属性
		 */
		clearAll():void;
	}

	/**
	 * 地图支持多层渲染（例如，地表层，植被层，建筑层等）
	 * 本类就是层级类
	 * @author ...
	 */
	class MapLayer extends Sprite  {
		private _map:any;
		private _tileWidthHalf:any;
		private _tileHeightHalf:any;
		private _mapWidthHalf:any;
		private _mapHeightHalf:any;
		private _objDic:any;
		private _dataDic:any;
		private _tempMapPos:any;
		private _properties:any;

		/**
		 * 被合到的层
		 */
		tarLayer:MapLayer;

		/**
		 * 当前Layer的名称
		 */
		layerName:string;

		/**
		 * 解析LAYER数据，以及初始化一些数据
		 * @param layerData 地图数据中，layer数据的引用
		 * @param map 地图的引用
		 */
		init(layerData:any,map:TiledMap):void;

		/**
		 * ****************************************对外接口********************************************
		 */

		/**
		 * 通过名字获取控制对象，如果找不到返回为null
		 * @param objName 所要获取对象的名字
		 * @return 
		 */
		getObjectByName(objName:string):GridSprite;

		/**
		 * 通过名字获取数据，如果找不到返回为null
		 * @param objName 所要获取对象的名字
		 * @return 
		 */
		getObjectDataByName(objName:string):any;

		/**
		 * 得到地图层的自定义属性
		 * @param name 
		 * @return 
		 */
		getLayerProperties(name:string):any;

		/**
		 * 得到指定格子的数据
		 * @param tileX 格子坐标X
		 * @param tileY 格子坐标Y
		 * @return 
		 */
		getTileData(tileX:number,tileY:number):number;

		/**
		 * 通过地图坐标得到屏幕坐标
		 * @param tileX 格子坐标X
		 * @param tileY 格子坐标Y
		 * @param screenPos 把计算好的屏幕坐标数据，放到此对象中
		 */
		getScreenPositionByTilePos(tileX:number,tileY:number,screenPos?:Point):void;

		/**
		 * 通过屏幕坐标来获取选中格子的数据
		 * @param screenX 屏幕坐标x
		 * @param screenY 屏幕坐标y
		 * @return 
		 */
		getTileDataByScreenPos(screenX:number,screenY:number):number;

		/**
		 * 通过屏幕坐标来获取选中格子的索引
		 * @param screenX 屏幕坐标x
		 * @param screenY 屏幕坐标y
		 * @param result 把计算好的格子坐标，放到此对象中
		 * @return 
		 */
		getTilePositionByScreenPos(screenX:number,screenY:number,result?:Point):boolean;

		/**
		 * ********************************************************************************************
		 */

		/**
		 * 得到一个GridSprite
		 * @param gridX 当前Grid的X轴索引
		 * @param gridY 当前Grid的Y轴索引
		 * @return 一个GridSprite对象
		 */
		getDrawSprite(gridX:number,gridY:number):GridSprite;

		/**
		 * 更新此层中块的坐标
		 * 手动刷新的目的是，保持层级的宽和高保持最小，加快渲染
		 */
		updateGridPos():void;

		/**
		 * @private 把tile画到指定的显示对象上
		 * @param gridSprite 被指定显示的目标
		 * @param tileX 格子的X轴坐标
		 * @param tileY 格子的Y轴坐标
		 * @return 
		 */
		drawTileTexture(gridSprite:GridSprite,tileX:number,tileY:number):boolean;

		/**
		 * @private 清理当前对象
		 */
		clearAll():void;
	}

	/**
	 * TildMap的动画显示对象（一个动画（TileTexSet），可以绑定多个动画显示对象（TileAniSprite））
	 * @author ...
	 */
	class TileAniSprite extends Sprite  {
		private _tileTextureSet:any;
		private _aniName:any;

		/**
		 * 确定当前显示对象的名称以及属于哪个动画
		 * @param aniName 当前动画显示对象的名字，名字唯一
		 * @param tileTextureSet 当前显示对象属于哪个动画（一个动画，可以绑定多个同类显示对象）
		 */
		setTileTextureSet(aniName:string,tileTextureSet:TileTexSet):void;

		/**
		 * 把当前动画加入到对应的动画刷新列表中
		 */
		show():void;

		/**
		 * 把当前动画从对应的动画刷新列表中移除
		 */
		hide():void;

		/**
		 * 清理
		 */
		clearAll():void;
	}

	/**
	 * tiledMap是整个地图的核心
	 * 地图以层级来划分地图（例如：地表层，植被层，建筑层）
	 * 每层又以分块（GridSprite)来处理显示对象，只显示在视口区域的区
	 * 每块又包括N*N个格子（tile)
	 * 格子类型又分为动画格子跟图片格子两种
	 * @author ...
	 */
	class TiledMap  {

		/**
		 * 四边形地图
		 */
		static ORIENTATION_ORTHOGONAL:string;

		/**
		 * 菱形地图
		 */
		static ORIENTATION_ISOMETRIC:string;

		/**
		 * 45度交错地图
		 */
		static ORIENTATION_STAGGERED:string;

		/**
		 * 六边形地图
		 */
		static ORIENTATION_HEXAGONAL:string;

		/**
		 * 地图格子从左上角开始渲染
		 */
		static RENDERORDER_RIGHTDOWN:string;

		/**
		 * 地图格子从左下角开始渲染
		 */
		static RENDERORDER_RIGHTUP:string;

		/**
		 * 地图格子从右上角开始渲染
		 */
		static RENDERORDER_LEFTDOWN:string;

		/**
		 * 地图格子右下角开始渲染
		 */
		static RENDERORDER_LEFTUP:string;
		private _jsonData:any;
		private _tileTexSetArr:any;
		private _texArray:any;
		private _x:any;
		private _y:any;
		private _width:any;
		private _height:any;
		private _mapW:any;
		private _mapH:any;
		private _mapTileW:any;
		private _mapTileH:any;
		private _rect:any;
		private _paddingRect:any;
		private _mapSprite:any;
		private _layerArray:any;
		private _renderLayerArray:any;
		private _gridArray:any;
		private _showGridKey:any;
		private _totalGridNum:any;
		private _gridW:any;
		private _gridH:any;
		private _gridWidth:any;
		private _gridHeight:any;
		private _jsonLoader:any;
		private _loader:any;
		private _tileSetArray:any;
		private _currTileSet:any;
		private _completeHandler:any;
		private _mapRect:any;
		private _mapLastRect:any;
		private _index:any;
		private _animationDic:any;
		private _properties:any;
		private _tileProperties:any;
		private _tileProperties2:any;
		private _orientation:any;
		private _renderOrder:any;
		private _colorArray:any;
		private _scale:any;
		private _pivotScaleX:any;
		private _pivotScaleY:any;
		private _centerX:any;
		private _centerY:any;
		private _viewPortWidth:any;
		private _viewPortHeight:any;
		private _enableLinear:any;
		private _resPath:any;
		private _pathArray:any;
		private _limitRange:any;

		/**
		 * 是否自动缓存没有动画的地块
		 */
		autoCache:boolean;

		/**
		 * 自动缓存类型,地图较大时建议使用normal
		 */
		autoCacheType:string;

		/**
		 * 是否合并图层,开启合并图层时，图层属性内可添加layer属性，运行时将会将相邻的layer属性相同的图层进行合并以提高性能
		 */
		enableMergeLayer:boolean;

		/**
		 * 是否移除被覆盖的格子,地块可添加type属性，type不为0时表示不透明，被不透明地块遮挡的地块将会被剔除以提高性能
		 */
		removeCoveredTile:boolean;

		/**
		 * 是否显示大格子里显示的贴图数量
		 */
		showGridTextureCount:boolean;

		/**
		 * 是否调整地块边缘消除缩放导致的缝隙
		 */
		antiCrack:boolean;

		/**
		 * 是否在加载完成之后cache所有大格子
		 */
		cacheAllAfterInit:boolean;

		constructor();

		/**
		 * 创建地图
		 * @param mapName JSON文件名字
		 * @param viewRect 视口区域
		 * @param completeHandler 地图创建完成的回调函数
		 * @param viewRectPadding 视口扩充区域，把视口区域上、下、左、右扩充一下，防止视口移动时的穿帮
		 * @param gridSize grid大小
		 * @param enableLinear 是否开启线性取样（为false时，可以解决地图黑线的问题，但画质会锐化）
		 * @param limitRange 把地图限制在显示区域
		 */
		createMap(mapName:string,viewRect:Rectangle,completeHandler:Handler,viewRectPadding?:Rectangle,gridSize?:Point,enableLinear?:boolean,limitRange?:boolean):void;

		/**
		 * json文件读取成功后，解析里面的纹理数据，进行加载
		 * @param e JSON数据
		 */
		private onJsonComplete:any;

		/**
		 * 合并路径
		 * @param resPath 
		 * @param relativePath 
		 * @return 
		 */
		private mergePath:any;
		private _texutreStartDic:any;

		/**
		 * 纹理加载完成，如果所有的纹理加载，开始初始化地图
		 * @param e 纹理数据
		 */
		private onTextureComplete:any;
		private adptTexture:any;

		/**
		 * 初始化地图
		 */
		private initMap:any;
		private addTileProperties:any;
		getTileUserData(id:number,sign:string,defaultV?:any):any;
		private adptTiledMapData:any;
		private removeCoverd:any;
		private collectCovers:any;

		/**
		 * 得到一块指定的地图纹理
		 * @param index 纹理的索引值，默认从1开始
		 * @return 
		 */
		getTexture(index:number):TileTexSet;

		/**
		 * 得到地图的自定义属性
		 * @param name 属性名称
		 * @return 
		 */
		getMapProperties(name:string):any;

		/**
		 * 得到tile自定义属性
		 * @param index 地图块索引
		 * @param id 具体的TileSetID
		 * @param name 属性名称
		 * @return 
		 */
		getTileProperties(index:number,id:number,name:string):any;

		/**
		 * 通过纹理索引，生成一个可控制物件
		 * @param index 纹理的索引值，默认从1开始
		 * @return 
		 */
		getSprite(index:number,width:number,height:number):GridSprite;

		/**
		 * 设置视口的缩放中心点（例如：scaleX= scaleY= 0.5,就是以视口中心缩放）
		 * @param scaleX 
		 * @param scaleY 
		 */
		setViewPortPivotByScale(scaleX:number,scaleY:number):void;

		/**
		 * 设置地图缩放
		 * @param scale 
		 */
		set scale(scale:number);

		/**
		 * 得到当前地图的缩放
		 */
		get scale():number;

		/**
		 * 移动视口
		 * @param moveX 视口的坐标x
		 * @param moveY 视口的坐标y
		 */
		moveViewPort(moveX:number,moveY:number):void;

		/**
		 * 改变视口大小
		 * @param moveX 视口的坐标x
		 * @param moveY 视口的坐标y
		 * @param width 视口的宽
		 * @param height 视口的高
		 */
		changeViewPort(moveX:number,moveY:number,width:number,height:number):void;

		/**
		 * 在锚点的基础上计算，通过宽和高，重新计算视口
		 * @param width 新视口宽
		 * @param height 新视口高
		 * @param rect 返回的结果
		 * @return 
		 */
		changeViewPortBySize(width:number,height:number,rect?:Rectangle):Rectangle;

		/**
		 * 刷新视口
		 */
		private updateViewPort:any;

		/**
		 * GRID裁剪
		 */
		private clipViewPort:any;

		/**
		 * 显示指定的GRID
		 * @param gridX 
		 * @param gridY 
		 */
		private showGrid:any;
		private cacheAllGrid:any;
		private static _tempCanvas:any;
		private cacheGridsArray:any;
		private getGridArray:any;

		/**
		 * 隐藏指定的GRID
		 * @param gridX 
		 * @param gridY 
		 */
		private hideGrid:any;

		/**
		 * 得到对象层上的某一个物品
		 * @param layerName 层的名称
		 * @param objectName 所找物品的名称
		 * @return 
		 */
		getLayerObject(layerName:string,objectName:string):GridSprite;

		/**
		 * 销毁地图
		 */
		destroy():void;

		/**
		 * **************************地图的基本数据**************************
		 */

		/**
		 * 格子的宽度
		 */
		get tileWidth():number;

		/**
		 * 格子的高度
		 */
		get tileHeight():number;

		/**
		 * 地图的宽度
		 */
		get width():number;

		/**
		 * 地图的高度
		 */
		get height():number;

		/**
		 * 地图横向的格子数
		 */
		get numColumnsTile():number;

		/**
		 * 地图竖向的格子数
		 */
		get numRowsTile():number;

		/**
		 * @private 视口x坐标
		 */
		get viewPortX():number;

		/**
		 * @private 视口的y坐标
		 */
		get viewPortY():number;

		/**
		 * @private 视口的宽度
		 */
		get viewPortWidth():number;

		/**
		 * @private 视口的高度
		 */
		get viewPortHeight():number;

		/**
		 * 地图的x坐标
		 */
		get x():number;

		/**
		 * 地图的y坐标
		 */
		get y():number;

		/**
		 * 块的宽度
		 */
		get gridWidth():number;

		/**
		 * 块的高度
		 */
		get gridHeight():number;

		/**
		 * 地图的横向块数
		 */
		get numColumnsGrid():number;

		/**
		 * 地图的坚向块数
		 */
		get numRowsGrid():number;

		/**
		 * 当前地图类型
		 */
		get orientation():string;

		/**
		 * tile渲染顺序
		 */
		get renderOrder():string;

		/**
		 * ***************************************对外接口*********************************************
		 */

		/**
		 * 整个地图的显示容器
		 * @return 地图的显示容器
		 */
		mapSprite():Sprite;

		/**
		 * 得到指定的MapLayer
		 * @param layerName 要找的层名称
		 * @return 
		 */
		getLayerByName(layerName:string):MapLayer;

		/**
		 * 通过索引得MapLayer
		 * @param index 要找的层索引
		 * @return 
		 */
		getLayerByIndex(index:number):MapLayer;
	}

	/**
	 * 此类是子纹理类，也包括同类动画的管理
	 * TiledMap会把纹理分割成无数子纹理，也可以把其中的某块子纹理替换成一个动画序列
	 * 本类的实现就是如果发现子纹理被替换成一个动画序列，animationKey会被设为true
	 * 即animationKey为true,就使用TileAniSprite来做显示，把动画序列根据时间画到TileAniSprite上
	 * @author ...
	 */
	class TileTexSet  {

		/**
		 * 唯一标识
		 */
		gid:number;

		/**
		 * 子纹理的引用
		 */
		texture:Texture;

		/**
		 * 纹理显示时的坐标偏移X
		 */
		offX:number;

		/**
		 * 纹理显示时的坐标偏移Y
		 */
		offY:number;

		/**
		 * 当前要播放动画的纹理序列
		 */
		textureArray:any[];

		/**
		 * 当前动画每帧的时间间隔
		 */
		durationTimeArray:any[];

		/**
		 * 动画播放的总时间
		 */
		animationTotalTime:number;

		/**
		 * true表示当前纹理，是一组动画，false表示当前只有一个纹理
		 */
		isAnimation:boolean;
		private _spriteNum:any;
		private _aniDic:any;
		private _frameIndex:any;
		private _time:any;
		private _interval:any;
		private _preFrameTime:any;

		/**
		 * 加入一个动画显示对象到此动画中
		 * @param aniName //显示对象的名字
		 * @param sprite //显示对象
		 */
		addAniSprite(aniName:string,sprite:TileAniSprite):void;

		/**
		 * 把动画画到所有注册的SPRITE上
		 */
		private animate:any;
		private drawTexture:any;

		/**
		 * 移除不需要更新的SPRITE
		 * @param _name 
		 */
		removeAniSprite(_name:string):void;

		/**
		 * 显示当前动画的使用情况
		 */
		showDebugInfo():string;

		/**
		 * 清理
		 */
		clearAll():void;
	}

	/**
	 * @private 计算贝塞尔曲线的工具类。
	 */
	class Bezier  {

		/**
		 * 工具类单例
		 */
		static I:Bezier;

		/**
		 * @private 
		 */
		private _controlPoints:any;

		/**
		 * @private 
		 */
		private _calFun:any;

		/**
		 * @private 
		 */
		private _switchPoint:any;

		/**
		 * 计算二次贝塞尔点。
		 */
		getPoint2(t:number,rst:any[]):void;

		/**
		 * 计算三次贝塞尔点
		 */
		getPoint3(t:number,rst:any[]):void;

		/**
		 * 计算贝塞尔点序列
		 */
		insertPoints(count:number,rst:any[]):void;

		/**
		 * 获取贝塞尔曲线上的点。
		 * @param pList 控制点[x0,y0,x1,y1...]
		 * @param inSertCount 每次曲线的插值数量
		 */
		getBezierPoints(pList:any[],inSertCount?:number,count?:number):any[];
	}

	/**
	 * @private 凸包算法。
	 */
	class GrahamScan  {
		private static _mPointList:any;
		private static _tempPointList:any;
		private static _temPList:any;
		private static _temArr:any;
		static multiply(p1:Point,p2:Point,p0:Point):number;

		/**
		 * 计算两个点的距离。
		 * @param p1 
		 * @param p2 
		 * @return 
		 */
		static dis(p1:Point,p2:Point):number;
		private static _getPoints:any;

		/**
		 * 将数组 src 从索引0位置 依次取 cout 个项添加至 tst 数组的尾部。
		 * @param rst 原始数组，用于添加新的子元素。
		 * @param src 用于取子元素的数组。
		 * @param count 需要取得子元素个数。
		 * @return 添加完子元素的 rst 对象。
		 */
		static getFrom(rst:any[],src:any[],count:number):any[];

		/**
		 * 将数组 src 从末尾索引位置往头部索引位置方向 依次取 cout 个项添加至 tst 数组的尾部。
		 * @param rst 原始数组，用于添加新的子元素。
		 * @param src 用于取子元素的数组。
		 * @param count 需要取得子元素个数。
		 * @return 添加完子元素的 rst 对象。
		 */
		static getFromR(rst:any[],src:any[],count:number):any[];

		/**
		 * [x,y...]列表 转 Point列表
		 * @param pList Point列表
		 * @return [x,y...]列表
		 */
		static pListToPointList(pList:any[],tempUse?:boolean):any[];

		/**
		 * Point列表转[x,y...]列表
		 * @param pointList Point列表
		 * @return [x,y...]列表
		 */
		static pointListToPlist(pointList:any[]):any[];

		/**
		 * 寻找包括所有点的最小多边形顶点集合
		 * @param pList 形如[x0,y0,x1,y1...]的点列表
		 * @return 最小多边形顶点集合
		 */
		static scanPList(pList:any[]):any[];

		/**
		 * 寻找包括所有点的最小多边形顶点集合
		 * @param PointSet Point列表
		 * @return 最小多边形顶点集合
		 */
		static scan(PointSet:any[]):any[];
	}

	/**
	 * @private <code>MathUtil</code> 是一个数据处理工具类。
	 */
	class MathUtil  {
		static subtractVector3(l:Float32Array,r:Float32Array,o:Float32Array):void;
		static lerp(left:number,right:number,amount:number):number;
		static scaleVector3(f:Float32Array,b:number,e:Float32Array):void;
		static lerpVector3(l:Float32Array,r:Float32Array,t:number,o:Float32Array):void;
		static lerpVector4(l:Float32Array,r:Float32Array,t:number,o:Float32Array):void;
		static slerpQuaternionArray(a:Float32Array,Offset1:number,b:Float32Array,Offset2:number,t:number,out:Float32Array,Offset3:number):Float32Array;

		/**
		 * 获取指定的两个点组成的线段的角度值。
		 * @param x0 点一的 X 轴坐标值。
		 * @param y0 点一的 Y 轴坐标值。
		 * @param x1 点二的 X 轴坐标值。
		 * @param y1 点二的 Y 轴坐标值。
		 * @return 角度值。
		 */
		static getRotation(x0:number,y0:number,x1:number,y1:number):number;

		/**
		 * 一个用来确定数组元素排序顺序的比较函数。
		 * @param a 待比较数字。
		 * @param b 待比较数字。
		 * @return 如果a等于b 则值为0；如果b>a则值为1；如果b<则值为-1。
		 */
		static sortBigFirst(a:number,b:number):number;

		/**
		 * 一个用来确定数组元素排序顺序的比较函数。
		 * @param a 待比较数字。
		 * @param b 待比较数字。
		 * @return 如果a等于b 则值为0；如果b>a则值为-1；如果b<则值为1。
		 */
		static sortSmallFirst(a:number,b:number):number;

		/**
		 * 将指定的元素转为数字进行比较。
		 * @param a 待比较元素。
		 * @param b 待比较元素。
		 * @return b、a转化成数字的差值 (b-a)。
		 */
		static sortNumBigFirst(a:any,b:any):number;

		/**
		 * 将指定的元素转为数字进行比较。
		 * @param a 待比较元素。
		 * @param b 待比较元素。
		 * @return a、b转化成数字的差值 (a-b)。
		 */
		static sortNumSmallFirst(a:any,b:any):number;

		/**
		 * 返回根据对象指定的属性进行排序的比较函数。
		 * @param key 排序要依据的元素属性名。
		 * @param bigFirst 如果值为true，则按照由大到小的顺序进行排序，否则按照由小到大的顺序进行排序。
		 * @param forceNum 如果值为true，则将排序的元素转为数字进行比较。
		 * @return 排序函数。
		 */
		static sortByKey(key:string,bigFirst?:boolean,forceNum?:boolean):(a:any,b:any) =>number;
	}

	/**
	 * <p> <code>Matrix</code> 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。</p>
	 * <p>您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix 对象应用于 Transform 对象的 matrix 属性，然后应用该 Transform 对象作为显示对象的 transform 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。</p>
	 */
	class Matrix  {

		/**
		 * @private 一个初始化的 <code>Matrix</code> 对象，不允许修改此对象内容。
		 */
		static EMPTY:Matrix;

		/**
		 * 用于中转使用的 <code>Matrix</code> 对象。
		 */
		static TEMP:Matrix;

		/**
		 * 缩放或旋转图像时影响像素沿 x 轴定位的值。
		 */
		a:number;

		/**
		 * 旋转或倾斜图像时影响像素沿 y 轴定位的值。
		 */
		b:number;

		/**
		 * 旋转或倾斜图像时影响像素沿 x 轴定位的值。
		 */
		c:number;

		/**
		 * 缩放或旋转图像时影响像素沿 y 轴定位的值。
		 */
		d:number;

		/**
		 * 沿 x 轴平移每个点的距离。
		 */
		tx:number;

		/**
		 * 沿 y 轴平移每个点的距离。
		 */
		ty:number;

		/**
		 * 使用指定参数创建新的 <code>Matrix</code> 对象。
		 * @param a （可选）缩放或旋转图像时影响像素沿 x 轴定位的值。
		 * @param b （可选）旋转或倾斜图像时影响像素沿 y 轴定位的值。
		 * @param c （可选）旋转或倾斜图像时影响像素沿 x 轴定位的值。
		 * @param d （可选）缩放或旋转图像时影响像素沿 y 轴定位的值。
		 * @param tx （可选）沿 x 轴平移每个点的距离。
		 * @param ty （可选）沿 y 轴平移每个点的距离。
		 */

		constructor(a?:number,b?:number,c?:number,d?:number,tx?:number,ty?:number,nums?:number);

		/**
		 * 将本矩阵设置为单位矩阵。
		 * @return 返回当前矩形。
		 */
		identity():Matrix;

		/**
		 * 设置沿 x 、y 轴平移每个点的距离。
		 * @param x 沿 x 轴平移每个点的距离。
		 * @param y 沿 y 轴平移每个点的距离。
		 * @return 返回对象本身
		 */
		setTranslate(x:number,y:number):Matrix;

		/**
		 * 沿 x 和 y 轴平移矩阵，平移的变化量由 x 和 y 参数指定。
		 * @param x 沿 x 轴向右移动的量（以像素为单位）。
		 * @param y 沿 y 轴向下移动的量（以像素为单位）。
		 * @return 返回此矩形对象。
		 */
		translate(x:number,y:number):Matrix;

		/**
		 * 对矩阵应用缩放转换。
		 * @param x 用于沿 x 轴缩放对象的乘数。
		 * @param y 用于沿 y 轴缩放对象的乘数。
		 * @return 返回矩阵对象本身
		 */
		scale(x:number,y:number):Matrix;

		/**
		 * 对 Matrix 对象应用旋转转换。
		 * @param angle 以弧度为单位的旋转角度。
		 * @return 返回矩阵对象本身
		 */
		rotate(angle:number):Matrix;

		/**
		 * 对 Matrix 对象应用倾斜转换。
		 * @param x 沿着 X 轴的 2D 倾斜弧度。
		 * @param y 沿着 Y 轴的 2D 倾斜弧度。
		 * @return 当前 Matrix 对象。
		 */
		skew(x:number,y:number):Matrix;

		/**
		 * 对指定的点应用当前矩阵的逆转化并返回此点。
		 * @param out 待转化的点 Point 对象。
		 * @return 返回out
		 */
		invertTransformPoint(out:Point):Point;

		/**
		 * 将 Matrix 对象表示的几何转换应用于指定点。
		 * @param out 用来设定输出结果的点。
		 * @return 返回out
		 */
		transformPoint(out:Point):Point;

		/**
		 * 将 Matrix 对象表示的几何转换应用于指定点，忽略tx、ty。
		 * @param out 用来设定输出结果的点。
		 * @return 返回out
		 */
		transformPointN(out:Point):Point;

		/**
		 * 获取 X 轴缩放值。
		 * @return X 轴缩放值。
		 */
		getScaleX():number;

		/**
		 * 获取 Y 轴缩放值。
		 * @return Y 轴缩放值。
		 */
		getScaleY():number;

		/**
		 * 执行原始矩阵的逆转换。
		 * @return 当前矩阵对象。
		 */
		invert():Matrix;

		/**
		 * 将 Matrix 的成员设置为指定值。
		 * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
		 * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
		 * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
		 * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
		 * @param tx 沿 x 轴平移每个点的距离。
		 * @param ty 沿 y 轴平移每个点的距离。
		 * @return 当前矩阵对象。
		 */
		setTo(a:number,b:number,c:number,d:number,tx:number,ty:number):Matrix;

		/**
		 * 将指定矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
		 * @param matrix 要连接到源矩阵的矩阵。
		 * @return 当前矩阵。
		 */
		concat(matrix:Matrix):Matrix;

		/**
		 * 将指定的两个矩阵相乘后的结果赋值给指定的输出对象。
		 * @param m1 矩阵一。
		 * @param m2 矩阵二。
		 * @param out 输出对象。
		 * @return 结果输出对象 out。
		 */
		static mul(m1:Matrix,m2:Matrix,out:Matrix):Matrix;

		/**
		 * 将指定的两个矩阵相乘，结果赋值给指定的输出数组，长度为16。
		 * @param m1 矩阵一。
		 * @param m2 矩阵二。
		 * @param out 输出对象Array。
		 * @return 结果输出对象 out。
		 */
		static mul16(m1:Matrix,m2:Matrix,out:any[]):any[];

		/**
		 * @private 对矩阵应用缩放转换。反向相乘
		 * @param x 用于沿 x 轴缩放对象的乘数。
		 * @param y 用于沿 y 轴缩放对象的乘数。
		 */
		scaleEx(x:number,y:number):void;

		/**
		 * @private 对 Matrix 对象应用旋转转换。反向相乘
		 * @param angle 以弧度为单位的旋转角度。
		 */
		rotateEx(angle:number):void;

		/**
		 * 返回此 Matrix 对象的副本。
		 * @return 与原始实例具有完全相同的属性的新 Matrix 实例。
		 */
		clone():Matrix;

		/**
		 * 将当前 Matrix 对象中的所有矩阵数据复制到指定的 Matrix 对象中。
		 * @param dec 要复制当前矩阵数据的 Matrix 对象。
		 * @return 已复制当前矩阵数据的 Matrix 对象。
		 */
		copyTo(dec:Matrix):Matrix;

		/**
		 * 返回列出该 Matrix 对象属性的文本值。
		 * @return 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
		 */
		toString():string;

		/**
		 * 销毁此对象。
		 */
		destroy():void;

		/**
		 * 回收到对象池，方便复用
		 */
		recover():void;

		/**
		 * 从对象池中创建一个 <code>Matrix</code> 对象。
		 * @return <code>Matrix</code> 对象。
		 */
		static create():Matrix;
	}

	/**
	 * <code>Point</code> 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
	 */
	class Point  {

		/**
		 * 临时使用的公用对象。
		 */
		static TEMP:Point;

		/**
		 * @private 全局空的point对象(x=0，y=0)，不允许修改此对象内容
		 */
		static EMPTY:Point;

		/**
		 * 该点的水平坐标。
		 */
		x:number;

		/**
		 * 该点的垂直坐标。
		 */
		y:number;

		/**
		 * 根据指定坐标，创建一个新的 <code>Point</code> 对象。
		 * @param x （可选）水平坐标。
		 * @param y （可选）垂直坐标。
		 */

		constructor(x?:number,y?:number);

		/**
		 * 从对象池创建
		 */
		static create():Point;

		/**
		 * 将 <code>Point</code> 的成员设置为指定值。
		 * @param x 水平坐标。
		 * @param y 垂直坐标。
		 * @return 当前 Point 对象。
		 */
		setTo(x:number,y:number):Point;

		/**
		 * 重置
		 */
		reset():Point;

		/**
		 * 回收到对象池，方便复用
		 */
		recover():void;

		/**
		 * 计算当前点和目标点(x，y)的距离。
		 * @param x 水平坐标。
		 * @param y 垂直坐标。
		 * @return 返回当前点和目标点之间的距离。
		 */
		distance(x:number,y:number):number;

		/**
		 * 返回包含 x 和 y 坐标的值的字符串。
		 */
		toString():string;

		/**
		 * 标准化向量。
		 */
		normalize():void;

		/**
		 * copy point坐标
		 * @param point 需要被copy的point
		 */
		copy(point:Point):Point;
	}

	/**
	 * <p><code>Rectangle</code> 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。</p>
	 * <p>Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。</p>
	 */
	class Rectangle  {

		/**
		 * @private 全局空的矩形区域x=0,y=0,width=0,height=0，不允许修改此对象内容
		 */
		static EMPTY:Rectangle;

		/**
		 * 全局临时的矩形区域，此对象用于全局复用，以减少对象创建
		 */
		static TEMP:Rectangle;

		/**
		 * @private 
		 */
		private static _temB:any;

		/**
		 * @private 
		 */
		private static _temA:any;

		/**
		 * 矩形左上角的 X 轴坐标。
		 */
		x:number;

		/**
		 * 矩形左上角的 Y 轴坐标。
		 */
		y:number;

		/**
		 * 矩形的宽度。
		 */
		width:number;

		/**
		 * 矩形的高度。
		 */
		height:number;

		/**
		 * 创建一个 <code>Rectangle</code> 对象。
		 * @param x 矩形左上角的 X 轴坐标。
		 * @param y 矩形左上角的 Y 轴坐标。
		 * @param width 矩形的宽度。
		 * @param height 矩形的高度。
		 */

		constructor(x?:number,y?:number,width?:number,height?:number);

		/**
		 * 此矩形右侧的 X 轴坐标。 x 和 width 属性的和。
		 */
		get right():number;

		/**
		 * 此矩形底端的 Y 轴坐标。y 和 height 属性的和。
		 */
		get bottom():number;

		/**
		 * 将 Rectangle 的属性设置为指定值。
		 * @param x x 矩形左上角的 X 轴坐标。
		 * @param y x 矩形左上角的 Y 轴坐标。
		 * @param width 矩形的宽度。
		 * @param height 矩形的高。
		 * @return 返回属性值修改后的矩形对象本身。
		 */
		setTo(x:number,y:number,width:number,height:number):Rectangle;

		/**
		 * 重置
		 */
		reset():Rectangle;

		/**
		 * 回收
		 */
		recover():void;

		/**
		 * 创建
		 */
		static create():Rectangle;

		/**
		 * 复制 source 对象的属性值到此矩形对象中。
		 * @param sourceRect 源 Rectangle 对象。
		 * @return 返回属性值修改后的矩形对象本身。
		 */
		copyFrom(source:Rectangle):Rectangle;

		/**
		 * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
		 * @param x 点的 X 轴坐标值（水平位置）。
		 * @param y 点的 Y 轴坐标值（垂直位置）。
		 * @return 如果 Rectangle 对象包含指定的点，则值为 true；否则为 false。
		 */
		contains(x:number,y:number):boolean;

		/**
		 * 确定在 rect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
		 * @param rect Rectangle 对象。
		 * @return 如果传入的矩形对象与此对象相交，则返回 true 值，否则返回 false。
		 */
		intersects(rect:Rectangle):boolean;

		/**
		 * 如果在 rect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，则此方法返回null。
		 * @param rect 待比较的矩形区域。
		 * @param out （可选）待输出的矩形区域。如果为空则创建一个新的。建议：尽量复用对象，减少对象创建消耗。
		 * @return 返回相交的矩形区域对象。
		 */
		intersection(rect:Rectangle,out?:Rectangle|null):Rectangle|null;

		/**
		 * <p>矩形联合，通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。</p>
		 * <p>注意：union() 方法忽略高度或宽度值为 0 的矩形，如：var rect2:Rectangle = new Rectangle(300,300,50,0);</p>
		 * @param 要添加到此 Rectangle 对象的 Rectangle 对象。
		 * @param out 用于存储输出结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。Rectangle.TEMP对象用于对象复用。
		 * @return 充当两个矩形的联合的新 Rectangle 对象。
		 */
		union(source:Rectangle,out?:Rectangle|null):Rectangle;

		/**
		 * 返回一个 Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
		 * @param out （可选）用于存储结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。。Rectangle.TEMP对象用于对象复用。
		 * @return Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
		 */
		clone(out?:Rectangle|null):Rectangle;

		/**
		 * 当前 Rectangle 对象的水平位置 x 和垂直位置 y 以及高度 width 和宽度 height 以逗号连接成的字符串。
		 */
		toString():string;

		/**
		 * 检测传入的 Rectangle 对象的属性是否与当前 Rectangle 对象的属性 x、y、width、height 属性值都相等。
		 * @param rect 待比较的 Rectangle 对象。
		 * @return 如果判断的属性都相等，则返回 true ,否则返回 false。
		 */
		equals(rect:Rectangle):boolean;

		/**
		 * <p>为当前矩形对象加一个点，以使当前矩形扩展为包含当前矩形和此点的最小矩形。</p>
		 * <p>此方法会修改本对象。</p>
		 * @param x 点的 X 坐标。
		 * @param y 点的 Y 坐标。
		 * @return 返回此 Rectangle 对象。
		 */
		addPoint(x:number,y:number):Rectangle;

		/**
		 * 确定此 Rectangle 对象是否为空。
		 * @return 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
		 */
		isEmpty():boolean;
	}

	/**
	 * @private 使用Audio标签播放声音
	 */
	class AudioSound extends EventDispatcher  {

		/**
		 * @private 
		 */
		private static _audioCache:any;

		/**
		 * 声音URL
		 */
		url:string;

		/**
		 * 播放用的audio标签
		 */
		audio:HTMLAudioElement;

		/**
		 * 是否已加载完成
		 */
		loaded:boolean;

		/**
		 * 释放声音
		 */
		dispose():void;

		/**
		 * @private 
		 */
		private static _makeMusicOK:any;

		/**
		 * 加载声音
		 * @param url 
		 */
		load(url:string):void;

		/**
		 * 播放声音
		 * @param startTime 起始时间
		 * @param loops 循环次数
		 * @return 
		 */
		play(startTime?:number,loops?:number):SoundChannel;

		/**
		 * 获取总时间。
		 */
		get duration():number;
	}

	/**
	 * @private audio标签播放声音的音轨控制
	 */
	class AudioSoundChannel extends SoundChannel  {

		/**
		 * 播放用的audio标签
		 */
		private _audio:any;
		private _onEnd:any;
		private _resumePlay:any;

		constructor(audio:HTMLAudioElement);
		private __onEnd:any;
		private __resumePlay:any;

		/**
		 * 播放
		 * @override 
		 */
		play():void;

		/**
		 * 当前播放到的位置
		 * @return 
		 * @override 
		 */
		get position():number;

		/**
		 * 获取总时间。
		 * @override 
		 */
		get duration():number;

		/**
		 * 停止播放
		 * @override 
		 */
		stop():void;

		/**
		 * @override 
		 */
		pause():void;

		/**
		 * @override 
		 */
		resume():void;

		/**
		 * 设置音量
		 * @param v 
		 * @override 
		 */
		set volume(v:number);

		/**
		 * 获取音量
		 * @return 
		 * @override 
		 */
		get volume():number;
	}

	/**
	 * <code>Sound</code> 类是用来播放控制声音的类。
	 * 引擎默认有两套声音方案，优先使用WebAudio播放声音，如果WebAudio不可用，则用H5Audio播放，H5Audio在部分机器上有兼容问题（比如不能混音，播放有延迟等）。
	 */
	class Sound extends EventDispatcher  {

		/**
		 * 加载声音。
		 * @param url 地址。
		 */
		load(url:string):void;

		/**
		 * 播放声音。
		 * @param startTime 开始时间,单位秒
		 * @param loops 循环次数,0表示一直循环
		 * @return 声道 SoundChannel 对象。
		 */
		play(startTime?:number,loops?:number):SoundChannel;

		/**
		 * 获取总时间。
		 */
		get duration():number;

		/**
		 * 释放声音资源。
		 */
		dispose():void;
	}

	/**
	 * <p> <code>SoundChannel</code> 用来控制程序中的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。</p>
	 * <p> <code>SoundChannel</code> 类包含控制声音的播放、暂停、停止、音量的方法，以及获取声音的播放状态、总时间、当前播放时间、总循环次数、播放地址等信息的方法。</p>
	 */
	class SoundChannel extends EventDispatcher  {

		/**
		 * 声音地址。
		 */
		url:string;

		/**
		 * 循环次数。
		 */
		loops:number;

		/**
		 * 播放声音开始时间。
		 */
		startTime:number;

		/**
		 * 表示声音是否已暂停。
		 */
		isStopped:boolean;

		/**
		 * 播放完成处理器。
		 */
		completeHandler:Handler;

		/**
		 * 音量范围从 0（静音）至 1（最大音量）。
		 */
		set volume(v:number);
		get volume():number;

		/**
		 * 获取当前播放时间，单位是秒。
		 */
		get position():number;

		/**
		 * 获取总时间，单位是秒。
		 */
		get duration():number;

		/**
		 * 播放声音。
		 */
		play():void;

		/**
		 * 停止播放。
		 */
		stop():void;

		/**
		 * 暂停播放。
		 */
		pause():void;

		/**
		 * 继续播放。
		 */
		resume():void;

		/**
		 * private
		 */
		protected __runComplete(handler:Handler):void;
	}

	/**
	 * <code>SoundManager</code> 是一个声音管理类。提供了对背景音乐、音效的播放控制方法。
	 * 引擎默认有两套声音方案：WebAudio和H5Audio
	 * 播放音效，优先使用WebAudio播放声音，如果WebAudio不可用，则用H5Audio播放，H5Audio在部分机器上有兼容问题（比如不能混音，播放有延迟等）。
	 * 播放背景音乐，则使用H5Audio播放（使用WebAudio会增加特别大的内存，并且要等加载完毕后才能播放，有延迟）
	 * 建议背景音乐用mp3类型，音效用wav或者mp3类型（如果打包为app，音效只能用wav格式）。
	 * 详细教程及声音格式请参考：http://ldc2.layabox.com/doc/?nav=ch-as-1-7-0
	 */
	class SoundManager  {

		/**
		 * 背景音乐音量。
		 * @default 1
		 */
		static musicVolume:number;

		/**
		 * 音效音量。
		 * @default 1
		 */
		static soundVolume:number;

		/**
		 * 声音播放速率。
		 * @default 1
		 */
		static playbackRate:number;

		/**
		 * 背景音乐使用Audio标签播放。
		 * @default true
		 */
		private static _useAudioMusic:any;

		/**
		 * @private 是否静音，默认为false。
		 */
		private static _muted:any;

		/**
		 * @private 是否音效静音，默认为false。
		 */
		private static _soundMuted:any;

		/**
		 * @private 是否背景音乐静音，默认为false。
		 */
		private static _musicMuted:any;

		/**
		 * @private 当前背景音乐声道。
		 */
		private static _musicChannel:any;

		/**
		 * @private 当前播放的Channel列表。
		 */
		private static _channels:any;

		/**
		 * @private 
		 */
		private static _autoStopMusic:any;

		/**
		 * @private 
		 */
		private static _blurPaused:any;

		/**
		 * @private 
		 */
		private static _isActive:any;

		/**
		 * @private 
		 */
		private static _lastSoundUsedTimeDic:any;

		/**
		 * @private 
		 */
		private static _isCheckingDispose:any;

		/**
		 * 音效播放后自动删除。
		 * @default true
		 */
		static autoReleaseSound:boolean;

		/**
		 * 添加播放的声音实例。
		 * @param channel <code>SoundChannel</code> 对象。
		 */
		static addChannel(channel:SoundChannel):void;

		/**
		 * 移除播放的声音实例。
		 * @param channel <code>SoundChannel</code> 对象。
		 */
		static removeChannel(channel:SoundChannel):void;

		/**
		 * @private 
		 */
		static disposeSoundLater(url:string):void;

		/**
		 * @private 
		 */
		private static _checkDisposeSound:any;

		/**
		 * @private 
		 */
		static disposeSoundIfNotUsed(url:string):void;

		/**
		 * 失去焦点后是否自动停止背景音乐。
		 * @param v Boolean 失去焦点后是否自动停止背景音乐。
		 */
		static set autoStopMusic(v:boolean);

		/**
		 * 失去焦点后是否自动停止背景音乐。
		 */
		static get autoStopMusic():boolean;
		private static _visibilityChange:any;
		private static _stageOnBlur:any;
		private static _recoverWebAudio:any;
		private static _stageOnFocus:any;

		/**
		 * 背景音乐和所有音效是否静音。
		 */
		static set muted(value:boolean);
		static get muted():boolean;

		/**
		 * 所有音效（不包括背景音乐）是否静音。
		 */
		static set soundMuted(value:boolean);
		static get soundMuted():boolean;

		/**
		 * 背景音乐（不包括音效）是否静音。
		 */
		static set musicMuted(value:boolean);
		static get musicMuted():boolean;
		static get useAudioMusic():boolean;
		static set useAudioMusic(value:boolean);

		/**
		 * 播放音效。音效可以同时播放多个。
		 * @param url 声音文件地址。
		 * @param loops 循环次数,0表示无限循环。
		 * @param complete 声音播放完成回调  Handler对象。
		 * @param soundClass 使用哪个声音类进行播放，null表示自动选择。
		 * @param startTime 声音播放起始时间。
		 * @return SoundChannel对象，通过此对象可以对声音进行控制，以及获取声音信息。
		 */
		static playSound(url:string,loops?:number,complete?:Handler,soundClass?:new () => any,startTime?:number):SoundChannel;

		/**
		 * 释放声音资源。
		 * @param url 声音播放地址。
		 */
		static destroySound(url:string):void;

		/**
		 * 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播放当前的背景音乐。
		 * @param url 声音文件地址。
		 * @param loops 循环次数,0表示无限循环。
		 * @param complete 声音播放完成回调,complete 结果参数 true: 播放完成, false/undefined ：stop触发的complete。
		 * @param startTime 声音播放起始时间。
		 * @return SoundChannel对象，通过此对象可以对声音进行控制，以及获取声音信息。
		 */
		static playMusic(url:string,loops?:number,complete?:Handler,startTime?:number):SoundChannel;

		/**
		 * 停止声音播放。此方法能够停止任意声音的播放（包括背景音乐和音效），只需传入对应的声音播放地址。
		 * @param url 声音文件地址。
		 */
		static stopSound(url:string):void;

		/**
		 * 停止播放所有声音（包括背景音乐和音效）。
		 */
		static stopAll():void;

		/**
		 * 停止播放所有音效（不包括背景音乐）。
		 */
		static stopAllSound():void;

		/**
		 * 停止播放背景音乐（不包括音效）。
		 * @param url 声音文件地址。
		 */
		static stopMusic():void;

		/**
		 * 设置声音音量。根据参数不同，可以分别设置指定声音（背景音乐或音效）音量或者所有音效（不包括背景音乐）音量。
		 * @param volume 音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
		 * @param url (default = null)声音播放地址。默认为null。为空表示设置所有音效（不包括背景音乐）的音量，不为空表示设置指定声音（背景音乐或音效）的音量。
		 */
		static setSoundVolume(volume:number,url?:string):void;

		/**
		 * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
		 * @param volume 音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
		 */
		static setMusicVolume(volume:number):void;

		/**
		 * 设置指定声音的音量。
		 * @param url 声音文件url
		 * @param volume 音量。初始值为1。
		 */
		private static _setVolume:any;
	}

	/**
	 * @private 
	 */
	class SoundNode extends Sprite  {
		url:string;
		private _channel:any;
		private _tar:any;
		private _playEvents:any;
		private _stopEvents:any;

		constructor();

		/**
		 * @private 
		 */
		private _onParentChange:any;

		/**
		 * 播放
		 * @param loops 循环次数
		 * @param complete 完成回调
		 */
		play(loops?:number,complete?:Handler):void;

		/**
		 * 停止播放
		 */
		stop():void;

		/**
		 * @private 
		 */
		private _setPlayAction:any;

		/**
		 * @private 
		 */
		private _setPlayActions:any;

		/**
		 * 设置触发播放的事件
		 * @param events 
		 */
		set playEvent(events:string);

		/**
		 * 设置控制播放的对象
		 * @param tar 
		 */
		set target(tar:Sprite);

		/**
		 * 设置触发停止的事件
		 * @param events 
		 */
		set stopEvent(events:string);
	}

	/**
	 * @private web audio api方式播放声音
	 */
	class WebAudioSound extends EventDispatcher  {
		private static _dataCache:any;

		/**
		 * 是否支持web audio api
		 */
		static webAudioEnabled:boolean;

		/**
		 * 播放设备
		 */
		static ctx:any;

		/**
		 * 当前要解码的声音文件列表
		 */
		static buffs:any[];

		/**
		 * 是否在解码中
		 */
		static isDecoding:boolean;

		/**
		 * 用于播放解锁声音以及解决Ios9版本的内存释放
		 */
		static _miniBuffer:any;

		/**
		 * 事件派发器，用于处理加载解码完成事件的广播
		 */
		static e:EventDispatcher;

		/**
		 * 是否已解锁声音播放
		 */
		private static _unlocked:any;

		/**
		 * 当前解码的声音信息
		 */
		static tInfo:any;
		private static __loadingSound:any;

		/**
		 * 声音URL
		 */
		url:string;

		/**
		 * 是否已加载完成
		 */
		loaded:boolean;

		/**
		 * 声音文件数据
		 */
		data:ArrayBuffer;

		/**
		 * 声音原始文件数据
		 */
		audioBuffer:any;

		/**
		 * 待播放的声音列表
		 */
		private __toPlays:any;

		/**
		 * @private 
		 */
		private _disposed:any;

		/**
		 * 解码声音文件
		 */
		static decode():void;

		/**
		 * 解码成功回调
		 * @param audioBuffer 
		 */
		private static _done:any;

		/**
		 * 解码失败回调
		 * @return 
		 */
		private static _fail:any;

		/**
		 * 播放声音以解锁IOS的声音
		 */
		private static _playEmptySound:any;

		/**
		 * 尝试解锁声音
		 */
		private static _unlock:any;
		static initWebAudio():void;

		/**
		 * 加载声音
		 * @param url 
		 */
		load(url:string):void;
		private _err:any;
		private _loaded:any;
		private _removeLoadEvents:any;
		private __playAfterLoaded:any;

		/**
		 * 播放声音
		 * @param startTime 起始时间
		 * @param loops 循环次数
		 * @return 
		 */
		play(startTime?:number,loops?:number,channel?:WebAudioSoundChannel):SoundChannel;
		get duration():number;
		dispose():void;
	}

	/**
	 * @private web audio api方式播放声音的音轨控制
	 */
	class WebAudioSoundChannel extends SoundChannel  {

		/**
		 * 声音原始文件数据
		 */
		audioBuffer:any;

		/**
		 * gain节点
		 */
		private gain:any;

		/**
		 * 播放用的数据
		 */
		private bufferSource:any;

		/**
		 * 当前时间
		 */
		private _currentTime:any;

		/**
		 * 当前音量
		 */
		private _volume:any;

		/**
		 * 播放开始时的时间戳
		 */
		private _startTime:any;
		private _pauseTime:any;

		/**
		 * 播放设备
		 */
		private context:any;
		private _onPlayEnd:any;
		private static _tryCleanFailed:any;
		static SetTargetDelay:number;

		constructor();

		/**
		 * 播放声音
		 * @override 
		 */
		play():void;
		private __onPlayEnd:any;

		/**
		 * 获取当前播放位置
		 * @override 
		 */
		get position():number;

		/**
		 * @override 
		 */
		get duration():number;
		private _clearBufferSource:any;
		private _tryClearBuffer:any;

		/**
		 * 停止播放
		 * @override 
		 */
		stop():void;

		/**
		 * @override 
		 */
		pause():void;

		/**
		 * @override 
		 */
		resume():void;

		/**
		 * 设置音量
		 * @override 
		 */
		set volume(v:number);

		/**
		 * 获取音量
		 * @override 
		 */
		get volume():number;
	}

	/**
	 * @private 
	 */
	class AtlasInfoManager  {
		private static _fileLoadDic:any;
		static enable(infoFile:string,callback?:Handler|null):void;

		/**
		 * @private 
		 */
		private static _onInfoLoaded:any;
		static getFileLoadPath(file:string):string;
	}

	/**
	 * 请求进度改变时调度。
	 * @eventType Event.PROGRESS
	 */

	/**
	 * 请求结束后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 请求出错时调度。
	 * @eventType Event.ERROR
	 */

	/**
	 * <p> <code>HttpRequest</code> 通过封装 HTML <code>XMLHttpRequest</code> 对象提供了对 HTTP 协议的完全的访问，包括做出 POST 和 HEAD 请求以及普通的 GET 请求的能力。 <code>HttpRequest</code> 只提供以异步的形式返回 Web 服务器的响应，并且能够以文本或者二进制的形式返回内容。</p>
	 * <p><b>注意：</b>建议每次请求都使用新的 <code>HttpRequest</code> 对象，因为每次调用该对象的send方法时，都会清空之前设置的数据，并重置 HTTP 请求的状态，这会导致之前还未返回响应的请求被重置，从而得不到之前请求的响应结果。</p>
	 */
	class HttpRequest extends EventDispatcher  {

		/**
		 * @private 
		 */
		protected _http:XMLHttpRequest;

		/**
		 * @private 
		 */
		private static _urlEncode:any;

		/**
		 * @private 
		 */
		protected _responseType:string;

		/**
		 * @private 
		 */
		protected _data:any;

		/**
		 * @private 
		 */
		protected _url:string;

		/**
		 * 发送 HTTP 请求。
		 * @param url 请求的地址。大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。
		 * @param data (default = null)发送的数据。
		 * @param method (default = "get")用于请求的 HTTP 方法。值包括 "get"、"post"、"head"。
		 * @param responseType (default = "text")Web 服务器的响应类型，可设置为 "text"、"json"、"xml"、"arraybuffer"。
		 * @param headers (default = null) HTTP 请求的头部信息。参数形如key-value数组：key是头部的名称，不应该包括空白、冒号或换行；value是头部的值，不应该包括换行。比如["Content-Type", "application/json"]。
		 */
		send(url:string,data?:any,method?:string,responseType?:string,headers?:any[]|null):void;

		/**
		 * @private 请求进度的侦听处理函数。
		 * @param e 事件对象。
		 */
		protected _onProgress(e:any):void;

		/**
		 * @private 请求中断的侦听处理函数。
		 * @param e 事件对象。
		 */
		protected _onAbort(e:any):void;

		/**
		 * @private 请求出错侦的听处理函数。
		 * @param e 事件对象。
		 */
		protected _onError(e:any):void;

		/**
		 * @private 请求消息返回的侦听处理函数。
		 * @param e 事件对象。
		 */
		protected _onLoad(e:any):void;

		/**
		 * @private 请求错误的处理函数。
		 * @param message 错误信息。
		 */
		protected error(message:string):void;

		/**
		 * @private 请求成功完成的处理函数。
		 */
		protected complete():void;

		/**
		 * @private 清除当前请求。
		 */
		protected clear():void;

		/**
		 * 请求的地址。
		 */
		get url():string;

		/**
		 * 返回的数据。
		 */
		get data():any;

		/**
		 * 本对象所封装的原生 XMLHttpRequest 引用。
		 */
		get http():any;
	}

	/**
	 * 加载进度发生改变时调度。
	 * @eventType Event.PROGRESS
	 */

	/**
	 * 加载完成后调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 加载出错时调度。
	 * @eventType Event.ERROR
	 */

	/**
	 * <code>Loader</code> 类可用来加载文本、JSON、XML、二进制、图像等资源。
	 */
	class Loader extends EventDispatcher  {

		/**
		 * 文本类型，加载完成后返回文本。
		 */
		static TEXT:string;

		/**
		 * JSON 类型，加载完成后返回json数据。
		 */
		static JSON:string;

		/**
		 * prefab 类型，加载完成后返回Prefab实例。
		 */
		static PREFAB:string;

		/**
		 * XML 类型，加载完成后返回domXML。
		 */
		static XML:string;

		/**
		 * 二进制类型，加载完成后返回arraybuffer二进制数据。
		 */
		static BUFFER:string;

		/**
		 * 纹理类型，加载完成后返回Texture。
		 */
		static IMAGE:string;

		/**
		 * 声音类型，加载完成后返回sound。
		 */
		static SOUND:string;

		/**
		 * 图集类型，加载完成后返回图集json信息(并创建图集内小图Texture)。
		 */
		static ATLAS:string;

		/**
		 * 位图字体类型，加载完成后返回BitmapFont，加载后，会根据文件名自动注册为位图字体。
		 */
		static FONT:string;

		/**
		 * TTF字体类型，加载完成后返回null。
		 */
		static TTF:string;

		/**
		 * 预加载文件类型，加载完成后自动解析到preLoadedMap。
		 */
		static PLF:string;

		/**
		 * 二进制预加载文件类型，加载完成后自动解析到preLoadedMap。
		 */
		static PLFB:string;

		/**
		 * Hierarchy资源。
		 */
		static HIERARCHY:string;

		/**
		 * Mesh资源。
		 */
		static MESH:string;

		/**
		 * Material资源。
		 */
		static MATERIAL:string;

		/**
		 * Texture2D资源。
		 */
		static TEXTURE2D:string;

		/**
		 * TextureCube资源。
		 */
		static TEXTURECUBE:string;

		/**
		 * AnimationClip资源。
		 */
		static ANIMATIONCLIP:string;

		/**
		 * Avatar资源。
		 */
		static AVATAR:string;

		/**
		 * Terrain资源。
		 */
		static TERRAINHEIGHTDATA:string;

		/**
		 * Terrain资源。
		 */
		static TERRAINRES:string;

		/**
		 * 文件后缀和类型对应表。
		 */
		static typeMap:{[key:string]:string;};

		/**
		 * 资源解析函数对应表，用来扩展更多类型的资源加载解析。
		 */
		static parserMap:any;

		/**
		 * 每帧加载完成回调使用的最大超时时间，如果超时，则下帧再处理，防止帧卡顿。
		 */
		static maxTimeOut:number;

		/**
		 * 资源分组对应表。
		 */
		static groupMap:{[key:string]:string[];};

		/**
		 * 已加载的资源池。
		 */
		static loadedMap:{[key:string]:any;};

		/**
		 * 已加载的图集资源池。
		 */
		static atlasMap:{[key:string]:any[];};

		/**
		 * 已加载的纹理资源池。
		 */
		static textureMap:{[key:string]:Texture;};

		/**
		 * @private 已加载的数据文件。
		 */
		static preLoadedMap:{[key:string]:ArrayBuffer;};

		/**
		 * @private 引用image对象，防止垃圾回收
		 */
		protected static _imgCache:{[key:string]:HTMLImageElement;};

		/**
		 * @private 
		 */
		protected static _loaders:Loader[];

		/**
		 * @private 
		 */
		protected static _isWorking:boolean;

		/**
		 * @private 
		 */
		protected static _startIndex:number;

		/**
		 * 获取指定资源地址的数据类型。
		 * @param url 资源地址。
		 * @return 数据类型。
		 */
		static getTypeFromUrl(url:string):string;

		/**
		 * @private 
		 */
		protected _url:string;

		/**
		 * @private 
		 */
		protected _type:string;

		/**
		 * @private 
		 */
		protected _http:HttpRequest;

		/**
		 * @private 
		 */
		protected _useWorkerLoader:boolean;

		/**
		 * 加载资源。加载错误会派发 Event.ERROR 事件，参数为错误信息。
		 * @param url 资源地址。
		 * @param type (default = null)资源类型。可选值为：Loader.TEXT、Loader.JSON、Loader.XML、Loader.BUFFER、Loader.IMAGE、Loader.SOUND、Loader.ATLAS、Loader.FONT。如果为null，则根据文件后缀分析类型。
		 * @param cache (default = true)是否缓存数据。
		 * @param group (default = null)分组名称。
		 * @param ignoreCache (default = false)是否忽略缓存，强制重新加载。
		 * @param useWorkerLoader (default = false)是否使用worker加载（只针对IMAGE类型和ATLAS类型，并且浏览器支持的情况下生效）
		 */
		load(url:string,type?:string|null,cache?:boolean,group?:string|null,ignoreCache?:boolean,useWorkerLoader?:boolean):void;

		/**
		 * @private onload、onprocess、onerror必须写在本类
		 */
		private _loadHttpRequest:any;

		/**
		 * @private 
		 */
		private _loadHtmlImage:any;

		/**
		 * @private 加载TTF资源。
		 * @param url 资源地址。
		 */
		protected _loadTTF(url:string):void;

		/**
		 * @private 
		 */
		protected _loadImage(url:string,isformatURL?:boolean):void;

		/**
		 * @private 
		 */
		protected onProgress(value:number):void;

		/**
		 * @private 
		 */
		protected onError(message:string):void;

		/**
		 * 资源加载完成的处理函数。
		 * @param data 数据。
		 */
		protected onLoaded(data?:any):void;
		private parsePLFData:any;
		private parsePLFBData:any;
		private parseOnePLFBFile:any;

		/**
		 * 加载完成。
		 * @param data 加载的数据。
		 */
		protected complete(data:any):void;

		/**
		 * @private 
		 */
		private static checkNext:any;

		/**
		 * 结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
		 * @param content 加载后的数据
		 */
		endLoad(content?:any):void;

		/**
		 * 加载地址。
		 */
		get url():string;

		/**
		 * 加载类型。
		 */
		get type():string;

		/**
		 * 是否缓存。
		 */
		get cache():boolean;

		/**
		 * 返回的数据。
		 */
		get data():any;

		/**
		 * 清理指定资源地址的缓存。
		 * @param url 资源地址。
		 */
		static clearRes(url:string):void;

		/**
		 * 销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
		 * 相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
		 * 而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
		 * @param url 图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas"); Loader.clearTextureRes("hall/bg.jpg");
		 */
		static clearTextureRes(url:string):void;

		/**
		 * 获取指定资源地址的资源或纹理。
		 * @param url 资源地址。
		 * @return 返回资源。
		 */
		static getRes(url:string):any;

		/**
		 * 获取指定资源地址的图集地址列表。
		 * @param url 图集地址。
		 * @return 返回地址集合。
		 */
		static getAtlas(url:string):any[];

		/**
		 * 缓存资源。
		 * 如果资源已经存在则缓存失败。
		 * @param url 资源地址。
		 * @param data 要缓存的内容。
		 */
		static cacheRes(url:string,data:any):void;

		/**
		 * 强制缓存资源。不做任何检查。
		 * @param url 资源地址。
		 * @param data 要缓存的内容。
		 */
		static cacheResForce(url:string,data:any):void;

		/**
		 * 缓存Teture。
		 * @param url 资源地址。
		 * @param data 要缓存的Texture。
		 */
		static cacheTexture(url:string,data:Texture):void;

		/**
		 * 设置资源分组。
		 * @param url 资源地址。
		 * @param group 分组名。
		 */
		static setGroup(url:string,group:string):void;

		/**
		 * 根据分组清理资源。
		 * @param group 分组名。
		 */
		static clearResByGroup(group:string):void;
	}

	/**
	 * 所有资源加载完成时调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 任何资源加载出错时调度。
	 * @eventType Event.ERROR
	 */

	/**
	 * <p> <code>LoaderManager</code> 类用于用于批量加载资源。此类是单例，不要手动实例化此类，请通过Laya.loader访问。</p>
	 * <p>全部队列加载完成，会派发 Event.COMPLETE 事件；如果队列中任意一个加载失败，会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
	 * <p> <code>LoaderManager</code> 类提供了以下几种功能：<br/>
	 * 多线程：默认5个加载线程，可以通过maxLoader属性修改线程数量；<br/>
	 * 多优先级：有0-4共5个优先级，优先级高的优先加载。0最高，4最低；<br/>
	 * 重复过滤：自动过滤重复加载（不会有多个相同地址的资源同时加载）以及复用缓存资源，防止重复加载；<br/>
	 * 错误重试：资源加载失败后，会重试加载（以最低优先级插入加载队列），retryNum设定加载失败后重试次数，retryDelay设定加载重试的时间间隔。</p>
	 * @see laya.net.Loader
	 */
	class LoaderManager extends EventDispatcher  {

		/**
		 * @private 
		 */
		private static _resMap:any;

		/**
		 * @private 
		 */
		static createMap:any;

		/**
		 * 加载出错后的重试次数，默认重试一次
		 */
		retryNum:number;

		/**
		 * 延迟时间多久再进行错误重试，默认立即重试
		 */
		retryDelay:number;

		/**
		 * 最大下载线程，默认为5个
		 */
		maxLoader:number;

		/**
		 * @private 
		 */
		private _loaders:any;

		/**
		 * @private 
		 */
		private _loaderCount:any;

		/**
		 * @private 
		 */
		private _resInfos:any;

		/**
		 * @private 
		 */
		private _infoPool:any;

		/**
		 * @private 
		 */
		private _maxPriority:any;

		/**
		 * @private 
		 */
		private _failRes:any;

		/**
		 * @private 
		 */
		private _statInfo:any;

		/**
		 * @private 
		 */
		getProgress():number;

		/**
		 * @private 
		 */
		resetProgress():void;

		/**
		 * <p>创建一个新的 <code>LoaderManager</code> 实例。</p>
		 * <p><b>注意：</b>请使用Laya.loader加载资源，这是一个单例，不要手动实例化此类，否则会导致不可预料的问题。</p>
		 */

		constructor();

		/**
		 * <p>根据clas类型创建一个未初始化资源的对象，随后进行异步加载，资源加载完成后，初始化对象的资源，并通过此对象派发 Event.LOADED 事件，事件回调参数值为此对象本身。套嵌资源的子资源会保留资源路径"?"后的部分。</p>
		 * <p>如果url为数组，返回true；否则返回指定的资源类对象，可以通过侦听此对象的 Event.LOADED 事件来判断资源是否已经加载完毕。</p>
		 * <p><b>注意：</b>cache参数只能对文件后缀为atlas的资源进行缓存控制，其他资源会忽略缓存，强制重新加载。</p>
		 * @param url 资源地址或者数组。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：[{url:xx,clas:xx,priority:xx,params:xx},{url:xx,clas:xx,priority:xx,params:xx}]。
		 * @param complete 加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
		 * @param progress 资源加载进度回调，回调参数值为当前资源加载的进度信息(0-1)。
		 * @param type 资源类型。
		 * @param constructParams 资源构造函数参数。
		 * @param propertyParams 资源属性参数。
		 * @param priority (default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
		 * @param cache 是否缓存加载的资源。
		 * @return 如果url为数组，返回true；否则返回指定的资源类对象。
		 */
		create(url:string|(string | createItem)[],complete?:Handler|null,progress?:Handler|null,type?:string|null,constructParams?:any[]|null,propertyParams?:any,priority?:number,cache?:boolean):void;

		/**
		 * @private 
		 */
		private _createOne:any;

		/**
		 * <p>加载资源。资源加载错误时，本对象会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
		 * <p>因为返回值为 LoaderManager 对象本身，所以可以使用如下语法：loaderManager.load(...).load(...);</p>
		 * @param url 要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"]；复杂数组[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]。
		 * @param complete 加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
		 * @param progress 加载进度回调。回调参数值为当前资源的加载进度信息(0-1)。
		 * @param type 资源类型。比如：Loader.IMAGE。
		 * @param priority (default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
		 * @param cache 是否缓存加载结果。
		 * @param group 分组，方便对资源进行管理。
		 * @param ignoreCache 是否忽略缓存，强制重新加载。
		 * @param useWorkerLoader (default = false)是否使用worker加载（只针对IMAGE类型和ATLAS类型，并且浏览器支持的情况下生效）
		 * @return 此 LoaderManager 对象本身。
		 */
		load(url:string|(string | loadItem)[],complete?:Handler|null,progress?:Handler|null,type?:string|null,priority?:number,cache?:boolean,group?:string|null,ignoreCache?:boolean,useWorkerLoader?:boolean):LoaderManager;
		private _resInfoLoaded:any;
		private _next:any;
		private _doLoad:any;
		private _endLoad:any;
		private _addReTry:any;

		/**
		 * 清理指定资源地址缓存。
		 * @param url 资源地址。
		 */
		clearRes(url:string):void;

		/**
		 * 销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
		 * 相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
		 * 而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
		 * 【注意】如果图片本身在自动合集里面（默认图片小于512*512），内存是不能被销毁的，此图片被大图合集管理器管理
		 * @param url 图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas"); Loader.clearTextureRes("hall/bg.jpg");
		 */
		clearTextureRes(url:string):void;

		/**
		 * 获取指定资源地址的资源。
		 * @param url 资源地址。
		 * @return 返回资源。
		 */
		getRes(url:string):any;

		/**
		 * 缓存资源。
		 * @param url 资源地址。
		 * @param data 要缓存的内容。
		 */
		cacheRes(url:string,data:any):void;

		/**
		 * 设置资源分组。
		 * @param url 资源地址。
		 * @param group 分组名
		 */
		setGroup(url:string,group:string):void;

		/**
		 * 根据分组清理资源。
		 * @param group 分组名
		 */
		clearResByGroup(group:string):void;

		/**
		 * @private 缓存资源。
		 * @param url 资源地址。
		 * @param data 要缓存的内容。
		 */
		static cacheRes(url:string,data:any):void;

		/**
		 * 清理当前未完成的加载，所有未加载的内容全部停止加载。
		 */
		clearUnLoaded():void;

		/**
		 * 根据地址集合清理掉未加载的内容
		 * @param urls 资源地址集合
		 */
		cancelLoadByUrls(urls:any[]):void;

		/**
		 * 根据地址清理掉未加载的内容
		 * @param url 资源地址
		 */
		cancelLoadByUrl(url:string):void;

		/**
		 * @private 加载数组里面的资源。
		 * @param arr 简单：["a.png","b.png"]，复杂[{url:"a.png",type:Loader.IMAGE,size:100,priority:1,useWorkerLoader:true},{url:"b.json",type:Loader.JSON,size:50,priority:1}]
		 */
		private _loadAssets:any;

		/**
		 * 解码Texture或者图集
		 * @param urls texture地址或者图集地址集合
		 */
		decodeBitmaps(urls:any[]):void;
		private _decodeTexture:any;
	}

	interface loadItem{
	}


	interface createItem{
		url:string;

		/**
		 * 资源类型
		 */
		type?:string;
		priority?:number;
		group?:string;

		/**
		 * 资源属性参数。
		 */
		propertyParams?:any[];

		/**
		 * 资源构造函数参数。
		 */
		constructParams?:any[];
		progress?:number;
	}


	/**
	 * <p> <code>LocalStorage</code> 类用于没有时间限制的数据存储。</p>
	 */
	class LocalStorage  {

		/**
		 * @ 基础类
		 */
		static _baseClass:any;

		/**
		 * 数据列表。
		 */
		static items:any;

		/**
		 * 表示是否支持  <code>LocalStorage</code>。
		 */
		static support:boolean;

		/**
		 * 存储指定键名和键值，字符串类型。
		 * @param key 键名。
		 * @param value 键值。
		 */
		static setItem(key:string,value:string):void;

		/**
		 * 获取指定键名的值。
		 * @param key 键名。
		 * @return 字符串型值。
		 */
		static getItem(key:string):string;

		/**
		 * 存储指定键名及其对应的 <code>Object</code> 类型值。
		 * @param key 键名。
		 * @param value 键值。是 <code>Object</code> 类型，此致会被转化为 JSON 字符串存储。
		 */
		static setJSON(key:string,value:any):void;

		/**
		 * 获取指定键名对应的 <code>Object</code> 类型值。
		 * @param key 键名。
		 * @return <code>Object</code> 类型值
		 */
		static getJSON(key:string):any;

		/**
		 * 删除指定键名的信息。
		 * @param key 键名。
		 */
		static removeItem(key:string):void;

		/**
		 * 清除本地存储信息。
		 */
		static clear():void;
	}

	/**
	 * <p>资源版本的生成由layacmd或IDE完成，使用 <code>ResourceVersion</code> 简化使用过程。</p>
	 * <p>调用 <code>enable</code> 启用资源版本管理。</p>
	 */
	class ResourceVersion  {

		/**
		 * 基于文件夹的资源管理方式（老版本IDE默认类型）
		 */
		static FOLDER_VERSION:number;

		/**
		 * 基于文件名映射管理方式（新版本IDE默认类型）
		 */
		static FILENAME_VERSION:number;

		/**
		 * 版本清单
		 */
		static manifest:any;

		/**
		 * 当前使用的版本管理类型
		 */
		static type:number;

		/**
		 * <p>启用资源版本管理。</p>
		 * <p>由于只有发布版本需要资源管理。因此没有资源管理文件时，可以设置manifestFile为null或者不存在的路径。</p>
		 * @param manifestFile 清单（json）文件的路径。
		 * @param callback 清单（json）文件加载完成后执行。
		 * @param type FOLDER_VERSION为基于文件夹管理方式（老版本IDE默认类型），FILENAME_VERSION为基于文件名映射管理（新版本IDE默认类型
		 */
		static enable(manifestFile:string,callback:Handler,type?:number):void;
		private static onManifestLoaded:any;

		/**
		 * 为加载路径添加版本前缀。
		 * @param originURL 源路径。
		 * @return 格式化后的新路径。
		 */
		static addVersionPrefix(originURL:string):string;
	}

	/**
	 * @private 场景资源加载器
	 */
	class SceneLoader extends EventDispatcher  {
		static LoadableExtensions:any;
		static No3dLoadTypes:any;
		totalCount:number;
		private _completeHandler:any;
		private _toLoadList:any;
		private _isLoading:any;
		private _curUrl:any;

		constructor();
		reset():void;
		get leftCount():number;
		get loadedCount():number;
		load(url:any,is3D?:boolean,ifCheck?:boolean):void;
		private _addToLoadList:any;
		private _checkNext:any;
		private loadOne:any;
		private onOneLoadComplete:any;
		getProgress():number;
	}

	/**
	 * 连接建立成功后调度。
	 * @eventType Event.OPEN
	 */

	/**
	 * 接收到数据后调度。
	 * @eventType Event.MESSAGE
	 */

	/**
	 * 连接被关闭后调度。
	 * @eventType Event.CLOSE
	 */

	/**
	 * 出现异常后调度。
	 * @eventType Event.ERROR
	 */

	/**
	 * <p> <code>Socket</code> 封装了 HTML5 WebSocket ，允许服务器端与客户端进行全双工（full-duplex）的实时通信，并且允许跨域通信。在建立连接后，服务器和 Browser/Client Agent 都能主动的向对方发送或接收文本和二进制数据。</p>
	 * <p>要使用 <code>Socket</code> 类的方法，请先使用构造函数 <code>new Socket</code> 创建一个 <code>Socket</code> 对象。 <code>Socket</code> 以异步方式传输和接收数据。</p>
	 */
	class Socket extends EventDispatcher  {

		/**
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。</p>
		 * <p> LITTLE_ENDIAN ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 * <p> BIG_ENDIAN ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。</p>
		 */
		static LITTLE_ENDIAN:string;

		/**
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。</p>
		 * <p> BIG_ENDIAN ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。</p>
		 * <p> LITTLE_ENDIAN ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 */
		static BIG_ENDIAN:string;

		/**
		 * @private 
		 */
		protected _socket:any;

		/**
		 * @private 
		 */
		private _connected:any;

		/**
		 * @private 
		 */
		private _addInputPosition:any;

		/**
		 * @private 
		 */
		private _input:any;

		/**
		 * @private 
		 */
		private _output:any;

		/**
		 * 不再缓存服务端发来的数据，如果传输的数据为字符串格式，建议设置为true，减少二进制转换消耗。
		 */
		disableInput:boolean;

		/**
		 * 用来发送和接收数据的 <code>Byte</code> 类。
		 */
		private _byteClass:any;

		/**
		 * <p>子协议名称。子协议名称字符串，或由多个子协议名称字符串构成的数组。必须在调用 connect 或者 connectByUrl 之前进行赋值，否则无效。</p>
		 * <p>指定后，只有当服务器选择了其中的某个子协议，连接才能建立成功，否则建立失败，派发 Event.ERROR 事件。</p>
		 * @see https://html.spec.whatwg.org/multipage/comms.html#dom-websocket
		 */
		protocols:any;

		/**
		 * 缓存的服务端发来的数据。
		 */
		get input():any;

		/**
		 * 表示需要发送至服务端的缓冲区中的数据。
		 */
		get output():any;

		/**
		 * 表示此 Socket 对象目前是否已连接。
		 */
		get connected():boolean;

		/**
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。</p>
		 * <p> LITTLE_ENDIAN ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 * <p> BIG_ENDIAN ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。</p>
		 */
		get endian():string;
		set endian(value:string);

		/**
		 * <p>创建新的 Socket 对象。默认字节序为 Socket.BIG_ENDIAN 。若未指定参数，将创建一个最初处于断开状态的套接字。若指定了有效参数，则尝试连接到指定的主机和端口。</p>
		 * @param host 服务器地址。
		 * @param port 服务器端口。
		 * @param byteClass 用于接收和发送数据的 Byte 类。如果为 null ，则使用 Byte 类，也可传入 Byte 类的子类。
		 * @param protocols 子协议名称。子协议名称字符串，或由多个子协议名称字符串构成的数组
		 * @see laya.utils.Byte
		 */

		constructor(host?:string|null,port?:number,byteClass?:new () => any,protocols?:any[]|null);

		/**
		 * <p>连接到指定的主机和端口。</p>
		 * <p>连接成功派发 Event.OPEN 事件；连接失败派发 Event.ERROR 事件；连接被关闭派发 Event.CLOSE 事件；接收到数据派发 Event.MESSAGE 事件； 除了 Event.MESSAGE 事件参数为数据内容，其他事件参数都是原生的 HTML DOM Event 对象。</p>
		 * @param host 服务器地址。
		 * @param port 服务器端口。
		 */
		connect(host:string,port:number):void;

		/**
		 * <p>连接到指定的服务端 WebSocket URL。 URL 类似 ws://yourdomain:port。</p>
		 * <p>连接成功派发 Event.OPEN 事件；连接失败派发 Event.ERROR 事件；连接被关闭派发 Event.CLOSE 事件；接收到数据派发 Event.MESSAGE 事件； 除了 Event.MESSAGE 事件参数为数据内容，其他事件参数都是原生的 HTML DOM Event 对象。</p>
		 * @param url 要连接的服务端 WebSocket URL。 URL 类似 ws://yourdomain:port。
		 */
		connectByUrl(url:string):void;

		/**
		 * 清理Socket：关闭Socket链接，关闭事件监听，重置Socket
		 */
		cleanSocket():void;

		/**
		 * 关闭连接。
		 */
		close():void;

		/**
		 * @private 连接建立成功 。
		 */
		protected _onOpen(e:any):void;

		/**
		 * @private 接收到数据处理方法。
		 * @param msg 数据。
		 */
		protected _onMessage(msg:any):void;

		/**
		 * @private 连接被关闭处理方法。
		 */
		protected _onClose(e:any):void;

		/**
		 * @private 出现异常处理方法。
		 */
		protected _onError(e:any):void;

		/**
		 * 发送数据到服务器。
		 * @param data 需要发送的数据，可以是String或者ArrayBuffer。
		 */
		send(data:any):void;

		/**
		 * 发送缓冲区中的数据到服务器。
		 */
		flush():void;
	}

	/**
	 * @private 
	 */
	class TTFLoader  {
		private static _testString:any;
		fontName:string;
		complete:Handler|null;
		err:Handler|null;
		private _fontTxt:any;
		private _url:any;
		private _div:any;
		private _txtWidth:any;
		private _http:any;
		load(fontPath:string):void;
		private _loadConch:any;
		private _onHttpLoaded:any;
		private _clearHttp:any;
		private _onErr:any;
		private _complete:any;
		private _checkComplete:any;
		private _loadWithFontFace:any;
		private _createDiv:any;
		private _loadWithCSS:any;
	}

	/**
	 * <p><code>URL</code> 提供URL格式化，URL版本管理的类。</p>
	 * <p>引擎加载资源的时候，会自动调用formatURL函数格式化URL路径</p>
	 * <p>通过basePath属性可以设置网络基础路径</p>
	 * <p>通过设置customFormat函数，可以自定义URL格式化的方式</p>
	 * <p>除了默认的通过增加后缀的格式化外，通过VersionManager类，可以开启IDE提供的，基于目录的管理方式来替代 "?v=" 的管理方式</p>
	 * @see laya.net.VersionManager
	 */
	class URL  {

		/**
		 * URL地址版本映射表，比如{"aaa/bb.png":99,"aaa/bb.png":12}，默认情况下，通过formatURL格式化后，会自动生成为"aaa/bb.png?v=99"的一个地址
		 */
		static version:any;

		/**
		 * @private 
		 */
		private _url:any;

		/**
		 * @private 
		 */
		private _path:any;

		/**
		 * 兼容微信不支持加载scene后缀场景，设置为true，则会把scene加载替换为json
		 */
		static exportSceneToJson:boolean;

		/**
		 * 创建一个新的 <code>URL</code> 实例。
		 */

		constructor(url:string);

		/**
		 * 格式化后的地址。
		 */
		get url():string;

		/**
		 * 地址的文件夹路径（不包括文件名）。
		 */
		get path():string;

		/**
		 * root路径。只针对'~'类型的url路径有效
		 */
		static rootPath:string;
		static set basePath(value:string);

		/**
		 * 基础路径。如果不设置，默认为当前网页的路径。最终地址将被格式化为 basePath+相对URL地址，
		 */
		static get basePath():string;

		/**
		 * 自定义URL格式化的方式。例如： customFormat = function(url:String):String{}
		 */
		static customFormat:Function;

		/**
		 * 格式化指定的地址并返回。
		 * @param url 地址。
		 * @param base 基础路径，如果没有，则使用basePath。
		 * @return 格式化处理后的地址。
		 */
		static formatURL(url:string):string;

		/**
		 * 获取指定 URL 的文件夹路径（不包括文件名）。
		 * <p><b>注意：</b>末尾有斜杠（/）。</p>
		 * @param url url地址。
		 * @return 返回文件夹路径。
		 */
		static getPath(url:string):string;

		/**
		 * 获取指定 URL 的文件名。
		 * @param url 地址。
		 * @return 返回文件名。
		 */
		static getFileName(url:string):string;

		/**
		 * @private 
		 */
		private static _adpteTypeList:any;

		/**
		 * @private 兼容微信
		 */
		static getAdptedFilePath(url:string):string;
	}

	/**
	 * @private Worker Image加载器
	 */
	class WorkerLoader extends EventDispatcher  {

		/**
		 * 单例
		 */
		static I:WorkerLoader;

		/**
		 * worker.js的路径
		 */
		static workerPath:string;

		/**
		 * @private 
		 */
		private static _preLoadFun:any;

		/**
		 * @private 
		 */
		private static _enable:any;

		/**
		 * @private 
		 */
		private static _tryEnabled:any;

		/**
		 * 使用的Worker对象。
		 */
		worker:Worker;

		/**
		 * @private 
		 */
		protected _useWorkerLoader:boolean;

		constructor();

		/**
		 * 是否支持worker
		 * @return 是否支持worker
		 */
		static workerSupported():boolean;

		/**
		 * 尝试启用WorkerLoader,只有第一次调用有效
		 */
		static enableWorkerLoader():void;

		/**
		 * 是否启用。
		 */
		static set enable(value:boolean);
		static get enable():boolean;

		/**
		 * @private 
		 */
		private workerMessage:any;

		/**
		 * @private 
		 */
		private imageLoaded:any;

		/**
		 * 加载图片
		 * @param url 图片地址
		 */
		loadImage(url:string):void;

		/**
		 * @private 加载图片资源。
		 * @param url 资源地址。
		 */
		protected _loadImage(url:string):void;
	}

	/**
	 * @private 
	 */
	class Emitter2D extends EmitterBase  {
		setting:ParticleSetting;
		private _posRange:any;
		private _canvasTemplate:any;
		private _emitFun:any;

		constructor(_template:ParticleTemplateBase);
		set template(template:ParticleTemplateBase);
		get template():ParticleTemplateBase;

		/**
		 * @override 
		 */
		emit():void;
		getRandom(value:number):number;
		webGLEmit():void;
		canvasEmit():void;
	}

	/**
	 * <code>EmitterBase</code> 类是粒子发射器类
	 */
	class EmitterBase  {

		/**
		 * 积累的帧时间
		 */
		protected _frameTime:number;

		/**
		 * 粒子发射速率
		 */
		protected _emissionRate:number;

		/**
		 * 当前剩余发射时间
		 */
		protected _emissionTime:number;

		/**
		 * 发射粒子最小时间间隔
		 */
		minEmissionTime:number;

		/**
		 * 设置粒子粒子模板
		 * @param particleTemplate 粒子模板
		 */
		set particleTemplate(particleTemplate:ParticleTemplateBase);

		/**
		 * 设置粒子发射速率
		 * @param emissionRate 粒子发射速率 (个/秒)
		 */
		set emissionRate(_emissionRate:number);

		/**
		 * 获取粒子发射速率
		 * @return 发射速率  粒子发射速率 (个/秒)
		 */
		get emissionRate():number;

		/**
		 * 开始发射粒子
		 * @param duration 发射持续的时间(秒)
		 */
		start(duration?:number):void;

		/**
		 * 停止发射粒子
		 * @param clearParticles 是否清理当前的粒子
		 */
		stop():void;

		/**
		 * 清理当前的活跃粒子
		 * @param clearTexture 是否清理贴图数据,若清除贴图数据将无法再播放
		 */
		clear():void;

		/**
		 * 发射一个粒子
		 */
		emit():void;

		/**
		 * 时钟前进
		 * @param passedTime 前进时间
		 */
		advanceTime(passedTime?:number):void;
	}

	/**
	 * <code>Particle2D</code> 类是2D粒子播放类
	 */
	class Particle2D extends Sprite  {

		/**
		 * @private 
		 */
		private _matrix4:any;

		/**
		 * @private 
		 */
		private _particleTemplate:any;

		/**
		 * @private 
		 */
		private _canvasTemplate:any;

		/**
		 * @private 
		 */
		private _emitter:any;

		/**
		 * 是否自动播放
		 */
		autoPlay:boolean;
		tempCmd:any;

		/**
		 * 创建一个新的 <code>Particle2D</code> 类实例。
		 * @param setting 粒子配置数据
		 */

		constructor(setting:ParticleSetting);

		/**
		 * 设置 粒子文件地址
		 * @param path 粒子文件地址
		 */
		set url(url:string);

		/**
		 * 加载粒子文件
		 * @param url 粒子文件地址
		 */
		load(url:string):void;

		/**
		 * 设置粒子配置数据
		 * @param settings 粒子配置数据
		 */
		setParticleSetting(setting:ParticleSetting):void;

		/**
		 * 获取粒子发射器
		 */
		get emitter():EmitterBase;

		/**
		 * 播放
		 */
		play():void;

		/**
		 * 停止
		 */
		stop():void;

		/**
		 * @private 
		 */
		private _loop:any;

		/**
		 * 时钟前进
		 * @param passedTime 时钟前进时间
		 */
		advanceTime(passedTime?:number):void;

		/**
		 * @param context 
		 * @param x 
		 * @param y 
		 * @override 
		 */
		customRender(context:Context,x:number,y:number):void;

		/**
		 * @param destroyChild 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * @private 
	 */
	class ParticleData  {
		private static _tempVelocity:any;
		private static _tempStartColor:any;
		private static _tempEndColor:any;
		private static _tempSizeRotation:any;
		private static _tempRadius:any;
		private static _tempRadian:any;
		position:Float32Array;
		velocity:Float32Array;
		startColor:Float32Array;
		endColor:Float32Array;
		sizeRotation:Float32Array;
		radius:Float32Array;
		radian:Float32Array;
		durationAddScale:number;
		time:number;

		constructor();
		static Create(settings:ParticleSetting,position:Float32Array,velocity:Float32Array,time:number):ParticleData;
	}

	/**
	 * @private 
	 */
	class ParticleEmitter  {
		private _templet:any;
		private _timeBetweenParticles:any;
		private _previousPosition:any;
		private _timeLeftOver:any;
		private _tempVelocity:any;
		private _tempPosition:any;

		constructor(templet:ParticleTemplateBase,particlesPerSecond:number,initialPosition:Float32Array);
		update(elapsedTime:number,newPosition:Float32Array):void;
	}

	/**
	 * <code>ParticleSettings</code> 类是粒子配置数据类
	 */
	class ParticleSetting  {

		/**
		 * 贴图
		 */
		textureName:string;

		/**
		 * 贴图个数,默认为1可不设置
		 */
		textureCount:number;

		/**
		 * 由于循环队列判断算法，最大饱和粒子数为maxPartices-1
		 */
		maxPartices:number;

		/**
		 * 粒子持续时间(单位:秒）
		 */
		duration:number;

		/**
		 * 如果大于0，某些粒子的持续时间会小于其他粒子,并具有随机性(单位:无）
		 */
		ageAddScale:number;

		/**
		 * 粒子受发射器速度的敏感度（需在自定义发射器中编码设置）
		 */
		emitterVelocitySensitivity:number;

		/**
		 * 最小开始尺寸（单位：2D像素、3D坐标）
		 */
		minStartSize:number;

		/**
		 * 最大开始尺寸（单位：2D像素、3D坐标）
		 */
		maxStartSize:number;

		/**
		 * 最小结束尺寸（单位：2D像素、3D坐标）
		 */
		minEndSize:number;

		/**
		 * 最大结束尺寸（单位：2D像素、3D坐标）
		 */
		maxEndSize:number;

		/**
		 * 最小水平速度（单位：2D像素、3D坐标）
		 */
		minHorizontalVelocity:number;

		/**
		 * 最大水平速度（单位：2D像素、3D坐标）
		 */
		maxHorizontalVelocity:number;

		/**
		 * 最小垂直速度（单位：2D像素、3D坐标）
		 */
		minVerticalVelocity:number;

		/**
		 * 最大垂直速度（单位：2D像素、3D坐标）
		 */
		maxVerticalVelocity:number;

		/**
		 * 等于1时粒子从出生到消亡保持一致的速度，等于0时粒子消亡时速度为0，大于1时粒子会保持加速（单位：无）
		 */
		endVelocity:number;

		/**
		 * （单位：2D像素、3D坐标）
		 */
		gravity:Float32Array;

		/**
		 * 最小旋转速度（单位：2D弧度/秒、3D弧度/秒）
		 */
		minRotateSpeed:number;

		/**
		 * 最大旋转速度（单位：2D弧度/秒、3D弧度/秒）
		 */
		maxRotateSpeed:number;

		/**
		 * 最小开始半径（单位：2D像素、3D坐标）
		 */
		minStartRadius:number;

		/**
		 * 最大开始半径（单位：2D像素、3D坐标）
		 */
		maxStartRadius:number;

		/**
		 * 最小结束半径（单位：2D像素、3D坐标）
		 */
		minEndRadius:number;

		/**
		 * 最大结束半径（单位：2D像素、3D坐标）
		 */
		maxEndRadius:number;

		/**
		 * 最小水平开始弧度（单位：2D弧度、3D弧度）
		 */
		minHorizontalStartRadian:number;

		/**
		 * 最大水平开始弧度（单位：2D弧度、3D弧度）
		 */
		maxHorizontalStartRadian:number;

		/**
		 * 最小垂直开始弧度（单位：2D弧度、3D弧度）
		 */
		minVerticalStartRadian:number;

		/**
		 * 最大垂直开始弧度（单位：2D弧度、3D弧度）
		 */
		maxVerticalStartRadian:number;

		/**
		 * 是否使用结束弧度,false为结束时与起始弧度保持一致,true为根据minHorizontalEndRadian、maxHorizontalEndRadian、minVerticalEndRadian、maxVerticalEndRadian计算结束弧度。
		 */
		useEndRadian:boolean;

		/**
		 * 最小水平结束弧度（单位：2D弧度、3D弧度）
		 */
		minHorizontalEndRadian:number;

		/**
		 * 最大水平结束弧度（单位：2D弧度、3D弧度）
		 */
		maxHorizontalEndRadian:number;

		/**
		 * 最小垂直结束弧度（单位：2D弧度、3D弧度）
		 */
		minVerticalEndRadian:number;

		/**
		 * 最大垂直结束弧度（单位：2D弧度、3D弧度）
		 */
		maxVerticalEndRadian:number;

		/**
		 * 最小开始颜色
		 */
		minStartColor:Float32Array;

		/**
		 * 最大开始颜色
		 */
		maxStartColor:Float32Array;

		/**
		 * 最小结束颜色
		 */
		minEndColor:Float32Array;

		/**
		 * 最大结束颜色
		 */
		maxEndColor:Float32Array;

		/**
		 * false代表RGBA整体插值，true代表RGBA逐分量插值
		 */
		colorComponentInter:boolean;

		/**
		 * false代表使用参数颜色数据，true代表使用原图颜色数据
		 */
		disableColor:boolean;

		/**
		 * 混合模式，待调整，引擎中暂无BlendState抽象
		 */
		blendState:number;

		/**
		 * 发射器类型,"point","box","sphere","ring"
		 */
		emitterType:string;

		/**
		 * 发射器发射速率
		 */
		emissionRate:number;

		/**
		 * 点发射器位置
		 */
		pointEmitterPosition:Float32Array;

		/**
		 * 点发射器位置随机值
		 */
		pointEmitterPositionVariance:Float32Array;

		/**
		 * 点发射器速度
		 */
		pointEmitterVelocity:Float32Array;

		/**
		 * 点发射器速度随机值
		 */
		pointEmitterVelocityAddVariance:Float32Array;

		/**
		 * 盒发射器中心位置
		 */
		boxEmitterCenterPosition:Float32Array;

		/**
		 * 盒发射器尺寸
		 */
		boxEmitterSize:Float32Array;

		/**
		 * 盒发射器速度
		 */
		boxEmitterVelocity:Float32Array;

		/**
		 * 盒发射器速度随机值
		 */
		boxEmitterVelocityAddVariance:Float32Array;

		/**
		 * 球发射器中心位置
		 */
		sphereEmitterCenterPosition:Float32Array;

		/**
		 * 球发射器半径
		 */
		sphereEmitterRadius:number;

		/**
		 * 球发射器速度
		 */
		sphereEmitterVelocity:number;

		/**
		 * 球发射器速度随机值
		 */
		sphereEmitterVelocityAddVariance:number;

		/**
		 * 环发射器中心位置
		 */
		ringEmitterCenterPosition:Float32Array;

		/**
		 * 环发射器半径
		 */
		ringEmitterRadius:number;

		/**
		 * 环发射器速度
		 */
		ringEmitterVelocity:number;

		/**
		 * 环发射器速度随机值
		 */
		ringEmitterVelocityAddVariance:number;

		/**
		 * 环发射器up向量，0代表X轴,1代表Y轴,2代表Z轴
		 */
		ringEmitterUp:number;

		/**
		 * 发射器位置随机值,2D使用
		 */
		positionVariance:Float32Array;

		/**
		 * 创建一个新的 <code>ParticleSettings</code> 类实例。
		 */

		constructor();
		private static _defaultSetting:any;
		static checkSetting(setting:any):void;
	}

	/**
	 * <code>ParticleTemplateBase</code> 类是粒子模板基类
	 */
	class ParticleTemplateBase  {

		/**
		 * 粒子配置数据
		 */
		settings:ParticleSetting;

		/**
		 * 粒子贴图
		 */
		protected texture:Texture;

		/**
		 * 创建一个新的 <code>ParticleTemplateBase</code> 类实例。
		 */

		constructor();

		/**
		 * 添加一个粒子
		 * @param position 粒子位置
		 * @param velocity 粒子速度
		 */
		addParticleArray(position:Float32Array,velocity:Float32Array):void;
	}

	/**
	 * @private 
	 */
	class ParticleTemplateWebGL extends ParticleTemplateBase  {
		protected _vertices:Float32Array;
		protected _mesh:MeshParticle2D;
		protected _conchMesh:any;
		protected _floatCountPerVertex:number;
		protected _firstActiveElement:number;
		protected _firstNewElement:number;
		protected _firstFreeElement:number;
		protected _firstRetiredElement:number;
		protected _drawCounter:number;

		constructor(parSetting:ParticleSetting);
		reUse(context:Context,pos:number):number;
		protected initialize():void;
		update(elapsedTime:number):void;
		private retireActiveParticles:any;
		private freeRetiredParticles:any;
		addNewParticlesToVertexBuffer():void;

		/**
		 * @param position 
		 * @param velocity 
		 * @override 
		 */
		addParticleArray(position:Float32Array,velocity:Float32Array):void;
	}

	/**
	 * @private 
	 */
	class ParticleShader extends Shader  {
		static vs:string;
		static ps:string;

		constructor();
	}

	/**
	 * 2D矩形碰撞体
	 */
	class BoxCollider extends ColliderBase  {

		/**
		 * 相对节点的x轴偏移
		 */
		private _x:any;

		/**
		 * 相对节点的y轴偏移
		 */
		private _y:any;

		/**
		 * 矩形宽度
		 */
		private _width:any;

		/**
		 * 矩形高度
		 */
		private _height:any;

		/**
		 * @override 
		 */
		protected getDef():any;
		private _setShape:any;

		/**
		 * 相对节点的x轴偏移
		 */
		get x():number;
		set x(value:number);

		/**
		 * 相对节点的y轴偏移
		 */
		get y():number;
		set y(value:number);

		/**
		 * 矩形宽度
		 */
		get width():number;
		set width(value:number);

		/**
		 * 矩形高度
		 */
		get height():number;
		set height(value:number);

		/**
		 * @private 重置形状
		 * @override 
		 */
		resetShape(re?:boolean):void;
	}

	/**
	 * 2D线形碰撞体
	 */
	class ChainCollider extends ColliderBase  {

		/**
		 * 相对节点的x轴偏移
		 */
		private _x:any;

		/**
		 * 相对节点的y轴偏移
		 */
		private _y:any;

		/**
		 * 用逗号隔开的点的集合，格式：x,y,x,y ...
		 */
		private _points:any;

		/**
		 * 是否是闭环，注意不要有自相交的链接形状，它可能不能正常工作
		 */
		private _loop:any;

		/**
		 * @override 
		 */
		protected getDef():any;
		private _setShape:any;

		/**
		 * 相对节点的x轴偏移
		 */
		get x():number;
		set x(value:number);

		/**
		 * 相对节点的y轴偏移
		 */
		get y():number;
		set y(value:number);

		/**
		 * 用逗号隔开的点的集合，格式：x,y,x,y ...
		 */
		get points():string;
		set points(value:string);

		/**
		 * 是否是闭环，注意不要有自相交的链接形状，它可能不能正常工作
		 */
		get loop():boolean;
		set loop(value:boolean);
	}

	/**
	 * 2D圆形碰撞体
	 */
	class CircleCollider extends ColliderBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * 相对节点的x轴偏移
		 */
		private _x:any;

		/**
		 * 相对节点的y轴偏移
		 */
		private _y:any;

		/**
		 * 圆形半径，必须为正数
		 */
		private _radius:any;

		/**
		 * @override 
		 */
		protected getDef():any;
		private _setShape:any;

		/**
		 * 相对节点的x轴偏移
		 */
		get x():number;
		set x(value:number);

		/**
		 * 相对节点的y轴偏移
		 */
		get y():number;
		set y(value:number);

		/**
		 * 圆形半径，必须为正数
		 */
		get radius():number;
		set radius(value:number);

		/**
		 * @private 重置形状
		 * @override 
		 */
		resetShape(re?:boolean):void;
	}

	/**
	 * 碰撞体基类
	 */
	class ColliderBase extends Component  {

		/**
		 * 是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应
		 */
		private _isSensor:any;

		/**
		 * 密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10
		 */
		private _density:any;

		/**
		 * 摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2
		 */
		private _friction:any;

		/**
		 * 弹性系数，取值范围0-1，值越大，弹性越大，默认值为0
		 */
		private _restitution:any;

		/**
		 * 标签
		 */
		label:string;

		/**
		 * @private b2Shape对象
		 */
		protected _shape:any;

		/**
		 * @private b2FixtureDef对象
		 */
		protected _def:any;

		/**
		 * [只读]b2Fixture对象
		 */
		fixture:any;

		/**
		 * [只读]刚体引用
		 */
		rigidBody:RigidBody;

		/**
		 * @private 获取碰撞体信息
		 */
		protected getDef():any;
		private _checkRigidBody:any;

		/**
		 * 是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应
		 */
		get isSensor():boolean;
		set isSensor(value:boolean);

		/**
		 * 密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10
		 */
		get density():number;
		set density(value:number);

		/**
		 * 摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2
		 */
		get friction():number;
		set friction(value:number);

		/**
		 * 弹性系数，取值范围0-1，值越大，弹性越大，默认值为0
		 */
		get restitution():number;
		set restitution(value:number);

		/**
		 * @private 碰撞体参数发生变化后，刷新物理世界碰撞信息
		 */
		refresh():void;

		/**
		 * @private 重置形状
		 */
		resetShape(re?:boolean):void;

		/**
		 * 获取是否为单实例组件。
		 * @override 
		 */
		get isSingleton():boolean;
	}

	/**
	 * JS实现Box2D SayGoodbyeParticle
	 * 相关类型对象被隐性移除时触发对应的SayGoodBye方法
	 */
	class DestructionListener  {

		/**
		 * Joint被隐性移除时触发
		 * @param params box2d的Joint相关对象
		 */
		SayGoodbyeJoint(params:any):void;

		/**
		 * Fixtures被隐性移除时触发
		 * @param params box2d的Fixtures相关对象
		 */
		SayGoodbyeFixture(params:any):void;

		/**
		 * ParticleGroup被隐性移除时触发
		 * @param params box2d的ParticleGroup相关对象
		 */
		SayGoodbyeParticleGroup(params:any):void;

		/**
		 * Particle被隐性移除时触发
		 * @param params box2d的Particle相关对象
		 */
		SayGoodbyeParticle(params:any):void;
	}

	/**
	 * 2D边框碰撞体
	 */
	class EdgeCollider extends ColliderBase  {

		/**
		 * 相对节点的x轴偏移
		 */
		private _x:any;

		/**
		 * 相对节点的y轴偏移
		 */
		private _y:any;

		/**
		 * 用逗号隔开的点的集合，注意只有两个点，格式：x,y,x,y
		 */
		private _points:any;

		/**
		 * @override 
		 */
		protected getDef():any;
		private _setShape:any;

		/**
		 * 相对节点的x轴偏移
		 */
		get x():number;
		set x(value:number);

		/**
		 * 相对节点的y轴偏移
		 */
		get y():number;
		set y(value:number);

		/**
		 * 用逗号隔开的点的集合，注意只有两个点，格式：x,y,x,y
		 */
		get points():string;
		set points(value:string);
	}

	/**
	 * 距离关节：两个物体上面各自有一点，两点之间的距离固定不变
	 */
	class DistanceJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体，可不设置，默认为左上角空刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]自身刚体链接点，是相对于自身刚体的左上角位置偏移
		 */
		selfAnchor:any[];

		/**
		 * [首次设置有效]链接刚体链接点，是相对于otherBody的左上角位置偏移
		 */
		otherAnchor:any[];

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 约束的目标静止长度
		 */
		private _length:any;

		/**
		 * 约束的最小长度，-1表示使用默认值
		 */
		private _maxLength:any;

		/**
		 * 约束的最大长度，-1表示使用默认值
		 */
		private _minLength:any;

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		private _frequency:any;

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		private _dampingRatio:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 约束的目标静止长度
		 */
		get length():number;
		set length(value:number);

		/**
		 * 约束的最小长度
		 */
		get minLength():number;
		set minLength(value:number);

		/**
		 * 约束的最大长度
		 */
		get maxLength():number;
		set maxLength(value:number);

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		get frequency():number;
		set frequency(value:number);

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		get damping():number;
		set damping(value:number);
	}

	/**
	 * 齿轮关节：用来模拟两个齿轮间的约束关系，齿轮旋转时，产生的动量有两种输出方式，一种是齿轮本身的角速度，另一种是齿轮表面的线速度
	 */
	class GearJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]要绑定的第1个关节，类型可以是RevoluteJoint或者PrismaticJoint
		 */
		joint1:any;

		/**
		 * [首次设置有效]要绑定的第2个关节，类型可以是RevoluteJoint或者PrismaticJoint
		 */
		joint2:any;

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 两个齿轮角速度比例，默认1
		 */
		private _ratio:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 两个齿轮角速度比例，默认1
		 */
		get ratio():number;
		set ratio(value:number);
	}

	/**
	 * 关节基类
	 */
	class JointBase extends Component  {

		/**
		 * 原生关节对象
		 */
		protected _joint:any;

		/**
		 * [只读]原生关节对象
		 */
		get joint():any;
		protected _createJoint():void;

		/**
		 * 获取是否为单实例组件。
		 * @override 
		 */
		get isSingleton():boolean;
	}

	/**
	 * 马达关节：用来限制两个刚体，使其相对位置和角度保持不变
	 */
	class MotorJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 基于otherBody坐标位置的偏移量，也是selfBody的目标位置
		 */
		private _linearOffset:any;

		/**
		 * 基于otherBody的角度偏移量，也是selfBody的目标角度
		 */
		private _angularOffset:any;

		/**
		 * 当selfBody偏离目标位置时，为使其恢复到目标位置，马达关节所施加的最大作用力
		 */
		private _maxForce:any;

		/**
		 * 当selfBody角度与目标角度不同时，为使其达到目标角度，马达关节施加的最大扭力
		 */
		private _maxTorque:any;

		/**
		 * selfBody向目标位置移动时的缓动因子，取值0~1，值越大速度越快
		 */
		private _correctionFactor:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 基于otherBody坐标位置的偏移量，也是selfBody的目标位置
		 */
		get linearOffset():any[];
		set linearOffset(value:any[]);

		/**
		 * 基于otherBody的角度偏移量，也是selfBody的目标角度
		 */
		get angularOffset():number;
		set angularOffset(value:number);

		/**
		 * 当selfBody偏离目标位置时，为使其恢复到目标位置，马达关节所施加的最大作用力
		 */
		get maxForce():number;
		set maxForce(value:number);

		/**
		 * 当selfBody角度与目标角度不同时，为使其达到目标角度，马达关节施加的最大扭力
		 */
		get maxTorque():number;
		set maxTorque(value:number);

		/**
		 * selfBody向目标位置移动时的缓动因子，取值0~1，值越大速度越快
		 */
		get correctionFactor():number;
		set correctionFactor(value:number);
	}

	/**
	 * 鼠标关节：鼠标关节用于通过鼠标来操控物体。它试图将物体拖向当前鼠标光标的位置。而在旋转方面就没有限制。
	 */
	class MouseJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移，如果不设置，则根据鼠标点击点作为连接点
		 */
		anchor:any[];

		/**
		 * 鼠标关节在拖曳刚体bodyB时施加的最大作用力
		 */
		private _maxForce:any;

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		private _frequency:any;

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		private _dampingRatio:any;
		private onMouseDown:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;
		private onStageMouseUp:any;
		private onMouseMove:any;

		/**
		 * 鼠标关节在拖曳刚体bodyB时施加的最大作用力
		 */
		get maxForce():number;
		set maxForce(value:number);

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		get frequency():number;
		set frequency(value:number);

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		get damping():number;
		set damping(value:number);
	}

	/**
	 * 平移关节：移动关节允许两个物体沿指定轴相对移动，它会阻止相对旋转
	 */
	class PrismaticJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体，可不设置，默认为左上角空刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]关节的控制点，是相对于自身刚体的左上角位置偏移
		 */
		anchor:any[];

		/**
		 * [首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右
		 */
		axis:any[];

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		private _enableMotor:any;

		/**
		 * 启用马达后，在axis坐标轴上移动可以达到的最大速度
		 */
		private _motorSpeed:any;

		/**
		 * 启用马达后，可以施加的最大作用力
		 */
		private _maxMotorForce:any;

		/**
		 * 是否对刚体的移动范围加以约束
		 */
		private _enableLimit:any;

		/**
		 * 启用约束后，刚体移动范围的下限，是距离anchor的偏移量
		 */
		private _lowerTranslation:any;

		/**
		 * 启用约束后，刚体移动范围的上限，是距离anchor的偏移量
		 */
		private _upperTranslation:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		get enableMotor():boolean;
		set enableMotor(value:boolean);

		/**
		 * 启用马达后，在axis坐标轴上移动可以达到的最大速度
		 */
		get motorSpeed():number;
		set motorSpeed(value:number);

		/**
		 * 启用马达后，可以施加的最大作用力
		 */
		get maxMotorForce():number;
		set maxMotorForce(value:number);

		/**
		 * 是否对刚体的移动范围加以约束
		 */
		get enableLimit():boolean;
		set enableLimit(value:boolean);

		/**
		 * 启用约束后，刚体移动范围的下限，是距离anchor的偏移量
		 */
		get lowerTranslation():number;
		set lowerTranslation(value:number);

		/**
		 * 启用约束后，刚体移动范围的上限，是距离anchor的偏移量
		 */
		get upperTranslation():number;
		set upperTranslation(value:number);
	}

	/**
	 * 滑轮关节：它将两个物体接地(ground)并彼此连接，当一个物体上升，另一个物体就会下降
	 */
	class PulleyJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]自身刚体链接点，是相对于自身刚体的左上角位置偏移
		 */
		selfAnchor:any[];

		/**
		 * [首次设置有效]链接刚体链接点，是相对于otherBody的左上角位置偏移
		 */
		otherAnchor:any[];

		/**
		 * [首次设置有效]滑轮上与节点selfAnchor相连接的节点，是相对于自身刚体的左上角位置偏移
		 */
		selfGroundPoint:any[];

		/**
		 * [首次设置有效]滑轮上与节点otherAnchor相连接的节点，是相对于otherBody的左上角位置偏移
		 */
		otherGroundPoint:any[];

		/**
		 * [首次设置有效]两刚体移动距离比率
		 */
		ratio:number;

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * @override 
		 */
		protected _createJoint():void;
	}

	/**
	 * 旋转关节强制两个物体共享一个锚点，两个物体相对旋转
	 */
	class RevoluteJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体，可不设置
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移
		 */
		anchor:any[];

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		private _enableMotor:any;

		/**
		 * 启用马达后，可以达到的最大旋转速度
		 */
		private _motorSpeed:any;

		/**
		 * 启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转
		 */
		private _maxMotorTorque:any;

		/**
		 * 是否对刚体的旋转范围加以约束
		 */
		private _enableLimit:any;

		/**
		 * 启用约束后，刚体旋转范围的下限弧度
		 */
		private _lowerAngle:any;

		/**
		 * 启用约束后，刚体旋转范围的上限弧度
		 */
		private _upperAngle:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		get enableMotor():boolean;
		set enableMotor(value:boolean);

		/**
		 * 启用马达后，可以达到的最大旋转速度
		 */
		get motorSpeed():number;
		set motorSpeed(value:number);

		/**
		 * 启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转
		 */
		get maxMotorTorque():number;
		set maxMotorTorque(value:number);

		/**
		 * 是否对刚体的旋转范围加以约束
		 */
		get enableLimit():boolean;
		set enableLimit(value:boolean);

		/**
		 * 启用约束后，刚体旋转范围的下限弧度
		 */
		get lowerAngle():number;
		set lowerAngle(value:number);

		/**
		 * 启用约束后，刚体旋转范围的上限弧度
		 */
		get upperAngle():number;
		set upperAngle(value:number);
	}

	/**
	 * 焊接关节：焊接关节的用途是使两个物体不能相对运动，受到关节的限制，两个刚体的相对位置和角度都保持不变，看上去像一个整体
	 */
	class WeldJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移
		 */
		anchor:any[];

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		private _frequency:any;

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		private _dampingRatio:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		get frequency():number;
		set frequency(value:number);

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		get damping():number;
		set damping(value:number);
	}

	/**
	 * 轮子关节：围绕节点旋转，包含弹性属性，使得刚体在节点位置发生弹性偏移
	 */
	class WheelJoint extends JointBase  {

		/**
		 * @private 
		 */
		private static _temp:any;

		/**
		 * [首次设置有效]关节的自身刚体
		 */
		selfBody:RigidBody;

		/**
		 * [首次设置有效]关节的连接刚体
		 */
		otherBody:RigidBody;

		/**
		 * [首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移
		 */
		anchor:any[];

		/**
		 * [首次设置有效]两个刚体是否可以发生碰撞，默认为false
		 */
		collideConnected:boolean;

		/**
		 * [首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右
		 */
		axis:any[];

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		private _frequency:any;

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		private _dampingRatio:any;

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		private _enableMotor:any;

		/**
		 * 启用马达后，可以达到的最大旋转速度
		 */
		private _motorSpeed:any;

		/**
		 * 启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转
		 */
		private _maxMotorTorque:any;

		/**
		 * 是否对刚体的移动范围加以约束
		 */
		private _enableLimit:any;

		/**
		 * 启用约束后，刚体移动范围的下限，是距离anchor的偏移量
		 */
		private _lowerTranslation:any;

		/**
		 * 启用约束后，刚体移动范围的上限，是距离anchor的偏移量
		 */
		private _upperTranslation:any;

		/**
		 * @override 
		 */
		protected _createJoint():void;

		/**
		 * 弹簧系统的震动频率，可以视为弹簧的弹性系数，通常频率应该小于时间步长频率的一半
		 */
		get frequency():number;
		set frequency(value:number);

		/**
		 * 刚体在回归到节点过程中受到的阻尼比，建议取值0~1
		 */
		get damping():number;
		set damping(value:number);

		/**
		 * 是否开启马达，开启马达可使目标刚体运动
		 */
		get enableMotor():boolean;
		set enableMotor(value:boolean);

		/**
		 * 启用马达后，可以达到的最大旋转速度
		 */
		get motorSpeed():number;
		set motorSpeed(value:number);

		/**
		 * 启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转
		 */
		get maxMotorTorque():number;
		set maxMotorTorque(value:number);

		/**
		 * 是否对刚体的移动范围加以约束
		 */
		get enableLimit():boolean;
		set enableLimit(value:boolean);

		/**
		 * 启用约束后，刚体移动范围的下限，是距离anchor的偏移量
		 */
		get lowerTranslation():number;
		set lowerTranslation(value:number);

		/**
		 * 启用约束后，刚体移动范围的上限，是距离anchor的偏移量
		 */
		get upperTranslation():number;
		set upperTranslation(value:number);
	}

	/**
	 * 2D物理引擎，使用Box2d驱动
	 */
	class Physics extends EventDispatcher  {

		/**
		 * 2D游戏默认单位为像素，物理默认单位为米，此值设置了像素和米的转换比率，默认50像素=1米
		 */
		static PIXEL_RATIO:number;

		/**
		 * @private 
		 */
		private static _I:any;

		/**
		 * Box2d引擎的全局引用，更多属性和api请参考 http://box2d.org
		 */
		box2d:any;

		/**
		 * [只读]物理世界引用，更多属性请参考官网
		 */
		world:any;

		/**
		 * 旋转迭代次数，增大数字会提高精度，但是会降低性能
		 */
		velocityIterations:number;

		/**
		 * 位置迭代次数，增大数字会提高精度，但是会降低性能
		 */
		positionIterations:number;

		/**
		 * @private 是否已经激活
		 */
		private _enabled:any;

		/**
		 * @private 根容器
		 */
		private _worldRoot:any;

		/**
		 * @private 空的body节点，给一些不需要节点的关节使用
		 */
		_emptyBody:any;

		/**
		 * @private 
		 */
		_eventList:any[];

		/**
		 * 全局物理单例
		 */
		static get I():Physics;

		constructor();

		/**
		 * 开启物理世界
		 * options值参考如下：
		 * allowSleeping:true,
		 * gravity:10,
		 * customUpdate:false 自己控制物理更新时机，自己调用Physics.update
		 */
		static enable(options?:any):void;

		/**
		 * 开启物理世界
		 * options值参考如下：
		 * allowSleeping:true,
		 * gravity:10,
		 * customUpdate:false 自己控制物理更新时机，自己调用Physics.update
		 */
		start(options?:any):void;
		private _update:any;
		private _sendEvent:any;

		/**
		 * @private 
		 */
		_createBody(def:any):any;

		/**
		 * @private 
		 */
		_removeBody(body:any):void;

		/**
		 * @private 
		 */
		_createJoint(def:any):any;

		/**
		 * @private 
		 */
		_removeJoint(joint:any):void;

		/**
		 * 停止物理世界
		 */
		stop():void;

		/**
		 * 设置是否允许休眠，休眠可以提高稳定性和性能，但通常会牺牲准确性
		 */
		get allowSleeping():boolean;
		set allowSleeping(value:boolean);

		/**
		 * 物理世界重力环境，默认值为{x:0,y:1}
		 * 如果修改y方向重力方向向上，可以直接设置gravity.y=-1;
		 */
		get gravity():any;
		set gravity(value:any);

		/**
		 * 获得刚体总数量
		 */
		getBodyCount():number;

		/**
		 * 获得碰撞总数量
		 */
		getContactCount():number;

		/**
		 * 获得关节总数量
		 */
		getJointCount():number;

		/**
		 * 物理世界根容器，将根据此容器作为物理世界坐标世界，进行坐标变换，默认值为stage
		 * 设置特定容器后，就可整体位移物理对象，保持物理世界不变。
		 * 注意，仅会在 set worldRoot 时平移一次，其他情况请配合 updatePhysicsByWorldRoot 函数使用
		 */
		get worldRoot():Sprite;
		set worldRoot(value:Sprite);

		/**
		 * 设定 worldRoot 后，手动触发物理世界更新
		 */
		updatePhysicsByWorldRoot():void;
	}

	/**
	 * 物理辅助线，调用PhysicsDebugDraw.enable()开启，或者通过IDE设置打开
	 */
	class PhysicsDebugDraw extends Sprite  {

		/**
		 * @private 
		 */
		m_drawFlags:number;

		/**
		 * @private 
		 */
		static box2d:any;

		/**
		 * @private 
		 */
		static DrawString_s_color:any;

		/**
		 * @private 
		 */
		static DrawStringWorld_s_p:any;

		/**
		 * @private 
		 */
		static DrawStringWorld_s_cc:any;

		/**
		 * @private 
		 */
		static DrawStringWorld_s_color:any;

		/**
		 * @private 
		 */
		world:any;

		/**
		 * @private 
		 */
		private _camera:any;

		/**
		 * @private 
		 */
		private static _canvas:any;

		/**
		 * @private 
		 */
		private static _inited:any;

		/**
		 * @private 
		 */
		private _mG:any;

		/**
		 * @private 
		 */
		private _textSp:any;

		/**
		 * @private 
		 */
		private _textG:any;

		/**
		 * @private 
		 */
		static init():void;

		constructor();

		/**
		 * @private 
		 * @override 
		 */
		render(ctx:Context,x:number,y:number):void;

		/**
		 * @private 
		 */
		private lineWidth:any;

		/**
		 * @private 
		 */
		private _renderToGraphic:any;

		/**
		 * @private 
		 */
		SetFlags(flags:number):void;

		/**
		 * @private 
		 */
		GetFlags():number;

		/**
		 * @private 
		 */
		AppendFlags(flags:number):void;

		/**
		 * @private 
		 */
		ClearFlags(flags:any):void;

		/**
		 * @private 
		 */
		PushTransform(xf:any):void;

		/**
		 * @private 
		 */
		PopTransform(xf:any):void;

		/**
		 * @private 
		 */
		DrawPolygon(vertices:any,vertexCount:any,color:any):void;

		/**
		 * @private 
		 */
		DrawSolidPolygon(vertices:any,vertexCount:any,color:any):void;

		/**
		 * @private 
		 */
		DrawCircle(center:any,radius:any,color:any):void;

		/**
		 * @private 
		 */
		DrawSolidCircle(center:any,radius:any,axis:any,color:any):void;

		/**
		 * @private 
		 */
		DrawParticles(centers:any,radius:any,colors:any,count:any):void;

		/**
		 * @private 
		 */
		DrawSegment(p1:any,p2:any,color:any):void;

		/**
		 * @private 
		 */
		DrawTransform(xf:any):void;

		/**
		 * @private 
		 */
		DrawPoint(p:any,size:any,color:any):void;

		/**
		 * @private 
		 */
		DrawString(x:any,y:any,message:any):void;

		/**
		 * @private 
		 */
		DrawStringWorld(x:any,y:any,message:any):void;

		/**
		 * @private 
		 */
		DrawAABB(aabb:any,color:any):void;

		/**
		 * @private 
		 */
		static I:PhysicsDebugDraw;

		/**
		 * 激活物理辅助线
		 * @param flags 位标记值，其值是AND的结果，其值有-1:显示形状，2:显示关节，4:显示AABB包围盒,8:显示broad-phase pairs,16:显示质心
		 * @return 返回一个Sprite对象，本对象用来显示物理辅助线
		 */
		static enable(flags?:number):PhysicsDebugDraw;
	}

	/**
	 * 2D多边形碰撞体，暂时不支持凹多边形，如果是凹多边形，先手动拆分为多个凸多边形
	 * 节点个数最多是b2_maxPolygonVertices，这数值默认是8，所以点的数量不建议超过8个，也不能小于3个
	 */
	class PolygonCollider extends ColliderBase  {

		/**
		 * 相对节点的x轴偏移
		 */
		private _x:any;

		/**
		 * 相对节点的y轴偏移
		 */
		private _y:any;

		/**
		 * 用逗号隔开的点的集合，格式：x,y,x,y ...
		 */
		private _points:any;

		/**
		 * @override 
		 */
		protected getDef():any;
		private _setShape:any;

		/**
		 * 相对节点的x轴偏移
		 */
		get x():number;
		set x(value:number);

		/**
		 * 相对节点的y轴偏移
		 */
		get y():number;
		set y(value:number);

		/**
		 * 用逗号隔开的点的集合，格式：x,y,x,y ...
		 */
		get points():string;
		set points(value:string);
	}

	/**
	 * 2D刚体，显示对象通过RigidBody和物理世界进行绑定，保持物理和显示对象之间的位置同步
	 * 物理世界的位置变化会自动同步到显示对象，显示对象本身的位移，旋转（父对象位移无效）也会自动同步到物理世界
	 * 由于引擎限制，暂时不支持以下情形：
	 * 1.不支持绑定节点缩放
	 * 2.不支持绑定节点的父节点缩放和旋转
	 * 3.不支持实时控制父对象位移，IDE内父对象位移是可以的
	 * 如果想整体位移物理世界，可以Physics.I.worldRoot=场景，然后移动场景即可
	 * 可以通过IDE-"项目设置" 开启物理辅助线显示，或者通过代码PhysicsDebugDraw.enable();
	 */
	class RigidBody extends Component  {

		/**
		 * 刚体类型，支持三种类型static，dynamic和kinematic类型，默认为dynamic类型
		 * static为静态类型，静止不动，不受重力影响，质量无限大，可以通过节点移动，旋转，缩放进行控制
		 * dynamic为动态类型，受重力影响
		 * kinematic为运动类型，不受重力影响，可以通过施加速度或者力的方式使其运动
		 */
		protected _type:string;

		/**
		 * 是否允许休眠，允许休眠能提高性能
		 */
		protected _allowSleep:boolean;

		/**
		 * 角速度，设置会导致旋转
		 */
		protected _angularVelocity:number;

		/**
		 * 旋转速度阻尼系数，范围可以在0到无穷大之间，0表示没有阻尼，无穷大表示满阻尼，通常阻尼的值应该在0到0.1之间
		 */
		protected _angularDamping:number;

		/**
		 * 线性运动速度，比如{x:10,y:10}
		 */
		protected _linearVelocity:any;

		/**
		 * 线性速度阻尼系数，范围可以在0到无穷大之间，0表示没有阻尼，无穷大表示满阻尼，通常阻尼的值应该在0到0.1之间
		 */
		protected _linearDamping:number;

		/**
		 * 是否高速移动的物体，设置为true，可以防止高速穿透
		 */
		protected _bullet:boolean;

		/**
		 * 是否允许旋转，如果不希望刚体旋转，这设置为false
		 */
		protected _allowRotation:boolean;

		/**
		 * 重力缩放系数，设置为0为没有重力
		 */
		protected _gravityScale:number;

		/**
		 * [只读] 指定了该主体所属的碰撞组，默认为0，碰撞规则如下：
		 * 1.如果两个对象group相等
		 * group值大于零，它们将始终发生碰撞
		 * group值小于零，它们将永远不会发生碰撞
		 * group值等于0，则使用规则3
		 * 2.如果group值不相等，则使用规则3
		 * 3.每个刚体都有一个category类别，此属性接收位字段，范围为[1,2^31]范围内的2的幂
		 * 每个刚体也都有一个mask类别，指定与其碰撞的类别值之和（值是所有category按位AND的值）
		 */
		group:number;

		/**
		 * [只读]碰撞类别，使用2的幂次方值指定，有32种不同的碰撞类别可用
		 */
		category:number;

		/**
		 * [只读]指定冲突位掩码碰撞的类别，category位操作的结果
		 */
		mask:number;

		/**
		 * [只读]自定义标签
		 */
		label:string;

		/**
		 * [只读]原始刚体
		 */
		protected _body:any;
		private _createBody:any;

		/**
		 * 获取对象某属性的get set方法
		 * 通过其本身无法获取该方法，只能从原型上获取
		 * @param obj 
		 * @param prop 
		 * @param accessor 
		 */
		private accessGetSetFunc:any;

		/**
		 * 重置Collider
		 * @param resetShape 是否先重置形状，比如缩放导致碰撞体变化
		 */
		private resetCollider:any;

		/**
		 * @private 同步物理坐标到游戏坐标
		 */
		private _sysPhysicToNode:any;

		/**
		 * @private 同步节点坐标及旋转到物理世界
		 */
		private _sysNodeToPhysic:any;

		/**
		 * @private 同步节点坐标到物理世界
		 */
		private _sysPosToPhysic:any;

		/**
		 * @private 
		 */
		private _overSet:any;

		/**
		 * 获得原始body对象
		 */
		getBody():any;
		_getOriBody():any;

		/**
		 * [只读]获得原始body对象
		 */
		get body():any;

		/**
		 * 对刚体施加力
		 * @param position 施加力的点，如{x:100,y:100}，全局坐标
		 * @param force 施加的力，如{x:0.1,y:0.1}
		 */
		applyForce(position:any,force:any):void;

		/**
		 * 从中心点对刚体施加力，防止对象旋转
		 * @param force 施加的力，如{x:0.1,y:0.1}
		 */
		applyForceToCenter(force:any):void;

		/**
		 * 施加速度冲量，添加的速度冲量会与刚体原有的速度叠加，产生新的速度
		 * @param position 施加力的点，如{x:100,y:100}，全局坐标
		 * @param impulse 施加的速度冲量，如{x:0.1,y:0.1}
		 */
		applyLinearImpulse(position:any,impulse:any):void;

		/**
		 * 施加速度冲量，添加的速度冲量会与刚体原有的速度叠加，产生新的速度
		 * @param impulse 施加的速度冲量，如{x:0.1,y:0.1}
		 */
		applyLinearImpulseToCenter(impulse:any):void;

		/**
		 * 对刚体施加扭矩，使其旋转
		 * @param torque 施加的扭矩
		 */
		applyTorque(torque:number):void;

		/**
		 * 设置速度，比如{x:10,y:10}
		 * @param velocity 
		 */
		setVelocity(velocity:any):void;

		/**
		 * 设置角度
		 * @param value 单位为弧度
		 */
		setAngle(value:any):void;

		/**
		 * 获得刚体质量
		 */
		getMass():number;

		/**
		 * 获得质心的相对节点0,0点的位置偏移
		 */
		getCenter():any;

		/**
		 * 获得质心的世界坐标，相对于Physics.I.worldRoot节点
		 */
		getWorldCenter():any;

		/**
		 * 刚体类型，支持三种类型static，dynamic和kinematic类型
		 * static为静态类型，静止不动，不受重力影响，质量无限大，可以通过节点移动，旋转，缩放进行控制
		 * dynamic为动态类型，接受重力影响
		 * kinematic为运动类型，不受重力影响，可以通过施加速度或者力的方式使其运动
		 */
		get type():string;
		set type(value:string);

		/**
		 * 重力缩放系数，设置为0为没有重力
		 */
		get gravityScale():number;
		set gravityScale(value:number);

		/**
		 * 是否允许旋转，如果不希望刚体旋转，这设置为false
		 */
		get allowRotation():boolean;
		set allowRotation(value:boolean);

		/**
		 * 是否允许休眠，允许休眠能提高性能
		 */
		get allowSleep():boolean;
		set allowSleep(value:boolean);

		/**
		 * 旋转速度阻尼系数，范围可以在0到无穷大之间，0表示没有阻尼，无穷大表示满阻尼，通常阻尼的值应该在0到0.1之间
		 */
		get angularDamping():number;
		set angularDamping(value:number);

		/**
		 * 角速度，设置会导致旋转
		 */
		get angularVelocity():number;
		set angularVelocity(value:number);

		/**
		 * 线性速度阻尼系数，范围可以在0到无穷大之间，0表示没有阻尼，无穷大表示满阻尼，通常阻尼的值应该在0到0.1之间
		 */
		get linearDamping():number;
		set linearDamping(value:number);

		/**
		 * 线性运动速度，比如{x:5,y:5}
		 */
		get linearVelocity():any;
		set linearVelocity(value:any);

		/**
		 * 是否高速移动的物体，设置为true，可以防止高速穿透
		 */
		get bullet():boolean;
		set bullet(value:boolean);
	}

	/**
	 * <code>Render</code> 是渲染管理类。它是一个单例，可以使用 Laya.render 访问。
	 */
	class Render  {
		static supportWebGLPlusAnimation:boolean;
		static supportWebGLPlusRendering:boolean;

		/**
		 * 是否是加速器 只读
		 */
		static isConchApp:boolean;

		/**
		 * 表示是否是 3D 模式。
		 */
		static is3DMode:boolean;

		/**
		 * 自定义帧循环
		 */
		static _customRequestAnimationFrame:any;

		/**
		 * 帧循环函数
		 */
		static _loopFunction:any;
		static _Render:Render;
		static customRequestAnimationFrame(value:any,loopFun:any):void;

		/**
		 * 初始化引擎。
		 * @param width 游戏窗口宽度。
		 * @param height 游戏窗口高度。
		 */

		constructor(width:number,height:number,mainCanv:HTMLCanvas);

		/**
		 * @private 
		 */
		private _timeId:any;

		/**
		 * @private 
		 */
		private _onVisibilitychange:any;
		initRender(canvas:HTMLCanvas,w:number,h:number):boolean;

		/**
		 * @private 
		 */
		private _replaceWebglcall:any;

		/**
		 * @private 
		 */
		private _enterFrame:any;

		/**
		 * 目前使用的渲染器。
		 */
		static get context():Context;

		/**
		 * 渲染使用的原生画布引用。
		 */
		static get canvas():any;
	}

	/**
	 * @author laya
	 */
	class RenderInfo  {

		/**
		 * 当前帧的开始时间
		 */
		static loopStTm:number;

		/**
		 * 主舞台 <code>Stage</code> 渲染次数计数。
		 */
		static loopCount:number;
	}

	interface _RenderFunction{
(sp:Sprite,ctx:Context,x:number,y:number):void	}


	/**
	 * @private 精灵渲染器
	 */
	class RenderSprite  {

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */
		static INIT:number;

		/**
		 * @private 
		 */
		static renders:RenderSprite[];

		/**
		 * @private 
		 */
		protected static NORENDER:RenderSprite;
		private static _initRenderFun:any;
		private static _getTypeRender:any;

		constructor(type:number,next:RenderSprite|null);
		protected onCreate(type:number):void;
		static tempUV:any[];
		static tmpTarget(ctx:Context,rt:RenderTexture2D,w:number,h:number):void;
		static recycleTarget(rt:RenderTexture2D):void;
		static setBlendMode(blendMode:string):void;
	}

	/**
	 * <code>BaseTexture</code> 纹理的父类，抽象类，不允许实例。
	 */
	class BaseTexture extends Bitmap  {

		/**
		 * 是否使用mipLevel
		 */
		get mipmap():boolean;

		/**
		 * 纹理格式
		 */
		get format():number;

		/**
		 * 纹理横向循环模式。
		 */
		get wrapModeU():number;
		set wrapModeU(value:number);

		/**
		 * 纹理纵向循环模式。
		 */
		get wrapModeV():number;
		set wrapModeV(value:number);

		/**
		 * 缩小过滤器
		 */
		get filterMode():FilterMode;
		set filterMode(value:FilterMode);

		/**
		 * 各向异性等级
		 */
		get anisoLevel():number;
		set anisoLevel(value:number);

		/**
		 * 获取mipmap数量。
		 */
		get mipmapCount():number;
		set mipmapCount(value:number);
		get defaulteTexture():BaseTexture;

		/**
		 * 创建一个 <code>BaseTexture</code> 实例。
		 */

		constructor(format:number,mipMap:boolean);

		/**
		 * 处理资源
		 * @inheritDoc 
		 * @override 
		 */
		protected _disposeResource():void;

		/**
		 * 通过基础数据生成mipMap。
		 */
		generateMipmap():void;

		/**
		 * @deprecated use TextureFormat.FORMAT_R8G8B8 instead.
		 */
		static FORMAT_R8G8B8:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_R8G8B8A8 instead.
		 */
		static FORMAT_R8G8B8A8:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_ALPHA8 instead.
		 */
		static FORMAT_ALPHA8:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_DXT1 instead.
		 */
		static FORMAT_DXT1:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_DXT5 instead.
		 */
		static FORMAT_DXT5:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_ETC1RGB instead.
		 */
		static FORMAT_ETC1RGB:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_PVRTCRGB_2BPPV instead.
		 */
		static FORMAT_PVRTCRGB_2BPPV:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_PVRTCRGBA_2BPPV instead.
		 */
		static FORMAT_PVRTCRGBA_2BPPV:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_PVRTCRGB_4BPPV instead.
		 */
		static FORMAT_PVRTCRGB_4BPPV:number;

		/**
		 * @deprecated use TextureFormat.FORMAT_PVRTCRGBA_4BPPV instead.
		 */
		static FORMAT_PVRTCRGBA_4BPPV:number;

		/**
		 * @deprecated use RenderTextureFormat.R16G16B16A16 instead.
		 */
		static RENDERTEXTURE_FORMAT_RGBA_HALF_FLOAT:number;

		/**
		 * @deprecated use TextureFormat.R32G32B32A32 instead.
		 */
		static FORMAT_R32G32B32A32:number;

		/**
		 * @deprecated use RenderTextureDepthFormat.DEPTH_16 instead.
		 */
		static FORMAT_DEPTH_16:number;

		/**
		 * @deprecated use RenderTextureDepthFormat.STENCIL_8 instead.
		 */
		static FORMAT_STENCIL_8:number;

		/**
		 * @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_16_8 instead.
		 */
		static FORMAT_DEPTHSTENCIL_16_8:number;

		/**
		 * @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_NONE instead.
		 */
		static FORMAT_DEPTHSTENCIL_NONE:number;

		/**
		 * @deprecated use FilterMode.Point instead.
		 */
		static FILTERMODE_POINT:number;

		/**
		 * @deprecated use FilterMode.Bilinear instead.
		 */
		static FILTERMODE_BILINEAR:number;

		/**
		 * @deprecated use FilterMode.Trilinear instead.
		 */
		static FILTERMODE_TRILINEAR:number;

		/**
		 * @deprecated use WarpMode.Repeat instead.
		 */
		static WARPMODE_REPEAT:number;

		/**
		 * @deprecated use WarpMode.Clamp instead.
		 */
		static WARPMODE_CLAMP:number;
	}

	/**
	 * @private <code>Bitmap</code> 图片资源类。
	 */
	class Bitmap extends Resource  {

		/**
		 * @private 
		 */
		protected _width:number;

		/**
		 * @private 
		 */
		protected _height:number;

		/**
		 * 获取宽度。
		 */
		get width():number;
		set width(width:number);

		/**
		 * *
		 * 获取高度。
		 */
		get height():number;
		set height(height:number);

		/**
		 * 创建一个 <code>Bitmap</code> 实例。
		 */

		constructor();
	}

	/**
	 * @private Context扩展类
	 */
	class Context  {
		static ENUM_TEXTALIGN_DEFAULT:number;
		static ENUM_TEXTALIGN_CENTER:number;
		static ENUM_TEXTALIGN_RIGHT:number;
		static _SUBMITVBSIZE:number;
		static _MAXSIZE:number;
		private static _MAXVERTNUM:any;
		static MAXCLIPRECT:Rectangle;
		static _COUNT:number;
		private static SEGNUM:any;
		private static _contextcount:any;
		private _drawTexToDrawTri_Vert:any;
		private _drawTexToDrawTri_Index:any;
		private _tempUV:any;
		private _drawTriUseAbsMatrix:any;
		static __init__():void;

		/**
		 * @private 
		 */
		drawImage(...args:any[]):void;

		/**
		 * @private 
		 */
		getImageData(...args:any[]):any;

		/**
		 * @private 
		 */
		measureText(text:string):any;

		/**
		 * @private 
		 */
		setTransform(...args:any[]):void;

		/**
		 * @private 
		 */
		$transform(a:number,b:number,c:number,d:number,tx:number,ty:number):void;

		/**
		 * @private 
		 */
		get lineJoin():string;

		/**
		 * @private 
		 */
		set lineJoin(value:string);

		/**
		 * @private 
		 */
		get lineCap():string;

		/**
		 * @private 
		 */
		set lineCap(value:string);

		/**
		 * @private 
		 */
		get miterLimit():string;

		/**
		 * @private 
		 */
		set miterLimit(value:string);

		/**
		 * @private 
		 */
		clearRect(x:number,y:number,width:number,height:number):void;

		/**
		 * @private 
		 */

		/**
		 * @private 
		 */
		drawTexture2(x:number,y:number,pivotX:number,pivotY:number,m:Matrix,args2:any[]):void;
		transformByMatrix(matrix:Matrix,tx:number,ty:number):void;
		saveTransform(matrix:Matrix):void;
		restoreTransform(matrix:Matrix):void;
		drawRect(x:number,y:number,width:number,height:number,fillColor:any,lineColor:any,lineWidth:number):void;
		alpha(value:number):void;
		drawCurves(x:number,y:number,points:any[],lineColor:any,lineWidth:number):void;
		private _fillAndStroke:any;

		/**
		 * Math.PI*2的结果缓存
		 */
		static PI2:number;
		static set2DRenderConfig():void;
		private _other:any;
		private _renderNextSubmitIndex:any;
		private _path:any;
		private _width:any;
		private _height:any;
		private _renderCount:any;
		meshlist:any[];
		private _transedPoints:any;
		private _temp4Points:any;
		private _clipID_Gen:any;
		private _lastMat_a:any;
		private _lastMat_b:any;
		private _lastMat_c:any;
		private _lastMat_d:any;

		/**
		 * 所cacheAs精灵
		 * 对于cacheas bitmap的情况，如果图片还没准备好，需要有机会重画，所以要保存sprite。例如在图片
		 * 加载完成后，调用repaint
		 */
		sprite:Sprite|null;
		private _fillColor:any;
		private _flushCnt:any;
		private defTexture:any;
		drawTexAlign:boolean;
		isMain:boolean;

		constructor();
		clearBG(r:number,g:number,b:number,a:number):void;

		/**
		 * 释放占用内存
		 * @param keepRT 是否保留rendertarget
		 */
		private _releaseMem:any;

		/**
		 * 释放所有资源
		 * @param keepRT 是否保留rendertarget
		 */
		destroy(keepRT?:boolean):void;
		clear():void;

		/**
		 * 设置ctx的size，这个不允许直接设置，必须是canvas调过来的。所以这个函数里也不用考虑canvas相关的东西
		 * @param w 
		 * @param h 
		 */
		size(w:number,h:number):void;

		/**
		 * 当前canvas请求保存渲染结果。
		 * 实现：
		 * 如果value==true，就要给_target赋值
		 * @param value 
		 */
		set asBitmap(value:boolean);

		/**
		 * 获得当前矩阵的缩放值
		 * 避免每次都计算getScaleX
		 * @return 
		 */
		getMatScaleX():number;
		getMatScaleY():number;
		setFillColor(color:number):void;
		getFillColor():number;
		set fillStyle(value:any);
		get fillStyle():any;
		set globalAlpha(value:number);
		get globalAlpha():number;
		set textAlign(value:string);
		get textAlign():string;
		set textBaseline(value:string);
		get textBaseline():string;
		set globalCompositeOperation(value:string);
		get globalCompositeOperation():string;
		set strokeStyle(value:any);
		get strokeStyle():any;
		translate(x:number,y:number):void;
		set lineWidth(value:number);
		get lineWidth():number;
		save():void;
		restore():void;
		set font(str:string);
		fillText(txt:string|WordText,x:number,y:number,fontStr:string,color:string,align:string,lineWidth?:number,borderColor?:string):void;
		drawText(text:string|WordText,x:number,y:number,font:string,color:string,textAlign:string):void;
		fillWords(words:HTMLChar[],x:number,y:number,fontStr:string,color:string):void;
		strokeWord(text:string|WordText,x:number,y:number,font:string,color:string,lineWidth:number,textAlign:string):void;
		fillBorderText(txt:string|WordText,x:number,y:number,font:string,color:string,borderColor:string,lineWidth:number,textAlign:string):void;
		fillBorderWords(words:HTMLChar[],x:number,y:number,font:string,color:string,borderColor:string,lineWidth:number):void;
		private _fillRect:any;
		fillRect(x:number,y:number,width:number,height:number,fillStyle:any):void;
		fillTexture(texture:Texture,x:number,y:number,width:number,height:number,type:string,offset:Point,other:any):void;

		/**
		 * 反正只支持一种filter，就不要叫setFilter了，直接叫setColorFilter
		 * @param value 
		 */
		setColorFilter(filter:ColorFilter):void;
		drawTexture(tex:Texture,x:number,y:number,width:number,height:number):void;
		drawTextures(tex:Texture,pos:any[],tx:number,ty:number):void;

		/**
		 * 为drawTexture添加一个新的submit。类型是 SubmitTexture
		 * @param vbSize 
		 * @param alpha 
		 * @param webGLImg 
		 * @param tex 
		 */
		private _drawTextureAddSubmit:any;
		submitDebugger():void;
		private isSameClipInfo:any;
		drawCallOptimize(enable:boolean):boolean;

		/**
		 * 转换4个顶点。为了效率这个不做任何检查。需要调用者的配合。
		 * @param a 输入。8个元素表示4个点
		 * @param out 输出
		 */
		transform4Points(a:any[],m:Matrix,out:any[]):void;

		/**
		 * pt所描述的多边形完全在clip外边，整个被裁掉了
		 * @param pt 
		 * @return 
		 */
		clipedOff(pt:any[]):boolean;

		/**
		 * 应用当前矩阵。把转换后的位置放到输出数组中。
		 * @param x 
		 * @param y 
		 * @param w 
		 * @param h 
		 * @param italicDeg 倾斜角度，单位是度。0度无，目前是下面不动。以后要做成可调的
		 */
		transformQuad(x:number,y:number,w:number,h:number,italicDeg:number,m:Matrix,out:any[]):void;
		pushRT():void;
		popRT():void;
		useRT(rt:RenderTexture2D):void;

		/**
		 * 异步执行rt的restore函数
		 * @param rt 
		 */
		RTRestore(rt:RenderTexture2D):void;

		/**
		 * 强制拒绝submit合并
		 * 例如切换rt的时候
		 */
		breakNextMerge():void;
		private _repaintSprite:any;

		/**
		 * @param tex 
		 * @param x 
		 * @param y 
		 * @param width 
		 * @param height 
		 * @param transform 图片本身希望的矩阵
		 * @param tx 节点的位置
		 * @param ty 
		 * @param alpha 
		 */
		drawTextureWithTransform(tex:Texture,x:number,y:number,width:number,height:number,transform:Matrix|null,tx:number,ty:number,alpha:number,blendMode:string|null,colorfilter?:ColorFilter|null,uv?:number[]):void;

		/**
		 * * 把ctx中的submits提交。结果渲染到target上
		 * @param ctx 
		 * @param target 
		 */
		private _flushToTarget:any;
		drawCanvas(canvas:HTMLCanvas,x:number,y:number,width:number,height:number):void;
		drawTarget(rt:RenderTexture2D,x:number,y:number,width:number,height:number,m:Matrix,shaderValue:Value2D,uv?:ArrayLike<number>|null,blend?:number):boolean;
		drawTriangles(tex:Texture,x:number,y:number,vertices:Float32Array,uvs:Float32Array,indices:Uint16Array,matrix:Matrix,alpha:number,color:ColorFilter,blendMode:string,colorNum?:number):void;
		transform(a:number,b:number,c:number,d:number,tx:number,ty:number):void;
		setTransformByMatrix(value:Matrix):void;
		rotate(angle:number):void;
		scale(scaleX:number,scaleY:number):void;
		clipRect(x:number,y:number,width:number,height:number):void;

		/**
		 * 从setIBVB改为drawMesh
		 * type 参数不知道是干什么的，先删掉。offset好像跟attribute有关，删掉
		 * @param x 
		 * @param y 
		 * @param ib 
		 * @param vb 
		 * @param numElement 
		 * @param mat 
		 * @param shader 
		 * @param shaderValues 
		 * @param startIndex 
		 * @param offset 
		 */
		drawMesh(x:number,y:number,ib:IndexBuffer2D,vb:VertexBuffer2D,numElement:number,mat:Matrix,shader:Shader,shaderValues:Value2D,startIndex?:number):void;
		addRenderObject(o:ISubmit):void;

		/**
		 * @param start 
		 * @param end 
		 */
		submitElement(start:number,end:number):number;
		flush():number;

		/**
		 * *****************************************start矢量绘制**************************************************
		 */
		beginPath(convex?:boolean):void;
		closePath():void;

		/**
		 * 添加一个path。
		 * @param points [x,y,x,y....]	这个会被保存下来，所以调用者需要注意复制。
		 * @param close 是否闭合
		 * @param convex 是否是凸多边形。convex的优先级是这个最大。fill的时候的次之。其实fill的时候不应该指定convex，因为可以多个path
		 * @param dx 需要添加的平移。这个需要在应用矩阵之前应用。
		 * @param dy 
		 */
		addPath(points:any[],close:boolean,convex:boolean,dx:number,dy:number):void;
		fill():void;
		private addVGSubmit:any;
		stroke():void;
		moveTo(x:number,y:number):void;

		/**
		 * @param x 
		 * @param y 
		 * @param b 是否应用矩阵
		 */
		lineTo(x:number,y:number):void;
		arcTo(x1:number,y1:number,x2:number,y2:number,r:number):void;
		arc(cx:number,cy:number,r:number,startAngle:number,endAngle:number,counterclockwise?:boolean,b?:boolean):void;
		quadraticCurveTo(cpx:number,cpy:number,x:number,y:number):void;

		/**
		 * 把颜色跟当前设置的alpha混合
		 * @return 
		 */
		mixRGBandAlpha(color:number):number;
		strokeRect(x:number,y:number,width:number,height:number,parameterLineWidth:number):void;
		clip():void;

		/**
		 * *****************************************end矢量绘制**************************************************
		 */
		drawParticle(x:number,y:number,pt:any):void;
		private _getPath:any;

		/**
		 * 获取canvas
		 */
		get canvas():HTMLCanvas;
		private static tmpuv1:any;

		/**
		 * 专用函数。通过循环创建来水平填充
		 * @param tex 
		 * @param bmpid 
		 * @param uv 希望循环的部分的uv
		 * @param oriw 
		 * @param orih 
		 * @param x 
		 * @param y 
		 * @param w 
		 */
		private _fillTexture_h:any;

		/**
		 * 专用函数。通过循环创建来垂直填充
		 * @param tex 
		 * @param imgid 
		 * @param uv 
		 * @param oriw 
		 * @param orih 
		 * @param x 
		 * @param y 
		 * @param h 
		 */
		private _fillTexture_v:any;
		private static tmpUV:any;
		private static tmpUVRect:any;
		drawTextureWithSizeGrid(tex:Texture,tx:number,ty:number,width:number,height:number,sizeGrid:any[],gx:number,gy:number):void;
	}

enum FilterMode {
    /**点过滤。*/
    Point = 0,
    /**双线性过滤。*/
    Bilinear = 1,
    /**三线性过滤。*/
    Trilinear = 2
}

	/**
	 * <code>HTMLCanvas</code> 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。
	 */
	class HTMLCanvas extends Bitmap  {
		private _ctx:any;

		/**
		 * @inheritDoc 
		 */
		get source():HTMLCanvasElement;

		/**
		 * 根据指定的类型，创建一个 <code>HTMLCanvas</code> 实例。
		 */

		constructor(createCanvas?:boolean);

		/**
		 * 清空画布内容。
		 */
		clear():void;

		/**
		 * 销毁。
		 * @override 
		 */
		destroy():void;

		/**
		 * 释放。
		 */
		release():void;

		/**
		 * Canvas 渲染上下文。
		 */
		get context():Context;

		/**
		 * 获取 Canvas 渲染上下文。
		 * @param contextID 上下文ID.
		 * @param other 
		 * @return Canvas 渲染上下文 Context 对象。
		 */
		getContext(contextID:string,other?:any):Context;

		/**
		 * 获取内存大小。
		 * @return 内存大小。
		 */
		getMemSize():number;

		/**
		 * 设置宽高。
		 * @param w 宽度。
		 * @param h 高度。
		 */
		size(w:number,h:number):void;

		/**
		 * 获取texture实例
		 */
		getTexture():Texture|null|RenderTexture2D;

		/**
		 * 把图片转换为base64信息
		 * @param type "image/png"
		 * @param encoderOptions 质量参数，取值范围为0-1
		 */
		toBase64(type:string,encoderOptions:number):string|null;
		toBase64Async(type:string,encoderOptions:number,callBack:Function):void;
	}

	/**
	 * @private <p> <code>HTMLImage</code> 用于创建 HTML Image 元素。</p>
<p>请使用 <code>HTMLImage.create()<code>获取新实例，不要直接使用 <code>new HTMLImage<code> 。</p>
	 */
	class HTMLImage extends Bitmap  {

		/**
		 * <p><b>不支持canvas了，所以备Texture2D替换了</p>
		 * <p>创建一个 <code>HTMLImage</code> 实例。</p>
		 * <p>请使用 <code>HTMLImage.create()<code>创建实例，不要直接使用 <code>new HTMLImage<code> 。</p>
		 */
		static create:Function;
	}

	interface ICreateResource{
		_setCreateURL(url:string):void;
	}


	interface IDestroy{
		destroyed:boolean;
		destroy():void;
	}


	interface ISingletonElement{
		_getIndexInList():number;
		_setIndexInList(index:number):void;
	}


	/**
	 * <code>RenderTexture</code> 类用于创建渲染目标。
	 */
	class RenderTexture2D extends BaseTexture  {

		/**
		 * @private 
		 */
		private static _currentActive:any;
		private _lastRT:any;
		private _lastWidth:any;
		private _lastHeight:any;
		private static rtStack:any;
		static defuv:any[];
		static flipyuv:any[];

		/**
		 * 获取当前激活的Rendertexture
		 */
		static get currentActive():RenderTexture2D;

		/**
		 * @private 
		 */
		private _frameBuffer:any;

		/**
		 * @private 
		 */
		private _depthStencilBuffer:any;

		/**
		 * @private 
		 */
		private _depthStencilFormat:any;

		/**
		 * 获取深度格式。
		 * @return 深度格式。
		 */
		get depthStencilFormat():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get defaulteTexture():BaseTexture;
		getIsReady():boolean;

		/**
		 * 获取宽度。
		 */
		get sourceWidth():number;

		/**
		 * *
		 * 获取高度。
		 */
		get sourceHeight():number;

		/**
		 * 获取offsetX。
		 */
		get offsetX():number;

		/**
		 * *
		 * 获取offsetY
		 */
		get offsetY():number;

		/**
		 * @param width 宽度。
		 * @param height 高度。
		 * @param format 纹理格式。
		 * @param depthStencilFormat 深度格式。
创建一个 <code>RenderTexture</code> 实例。
		 */

		constructor(width:number,height:number,format?:number,depthStencilFormat?:number);

		/**
		 * @private 
		 */
		private _create:any;

		/**
		 * 生成mipMap。
		 * @override 
		 */
		generateMipmap():void;

		/**
		 * 保存当前的RT信息。
		 */
		static pushRT():void;

		/**
		 * 恢复上次保存的RT信息
		 */
		static popRT():void;

		/**
		 * 开始绑定。
		 */
		start():void;

		/**
		 * 结束绑定。
		 */
		end():void;

		/**
		 * 恢复上一次的RenderTarge.由于使用自己保存的，所以如果被外面打断了的话，会出错。
		 */
		restore():void;
		clear(r?:number,g?:number,b?:number,a?:number):void;

		/**
		 * 获得像素数据。
		 * @param x X像素坐标。
		 * @param y Y像素坐标。
		 * @param width 宽度。
		 * @param height 高度。
		 * @return 像素数据。
		 */
		getData(x:number,y:number,width:number,height:number):Uint8Array;

		/**
		 * native多线程
		 */
		getDataAsync(x:number,y:number,width:number,height:number,callBack:Function):void;
		recycle():void;
	}

enum RenderTextureFormat {
    /**RGB格式,每个通道8位。*/
    R8G8B8 = 0,
    /**RGBA格式,每个通道8位。*/
    R8G8B8A8 = 1,
    /**Alpha格式,8位。*/
    Alpha8 = 2,
    /**RGBA格式,每个通道16位。*/
    R16G16B16A16 = 14,
    /**深度格式。*/
    Depth = 15,
    /**阴影贴图格式格式。*/
    ShadowMap = 16
}

enum RenderTextureDepthFormat {
    /**深度格式_DEPTH_16。*/
    DEPTH_16 = 0,
    /**深度格式_STENCIL_8。*/
    STENCIL_8 = 1,
    /**深度格式_DEPTHSTENCIL_24_8。*/
    DEPTHSTENCIL_24_8 = 2,
    /**深度格式_DEPTHSTENCIL_NONE。*/
    DEPTHSTENCIL_NONE = 3,
    /**深度格式_DEPTH_32。*/
    DEPTH_32 = 4,
    /** @deprecated*/
    DEPTHSTENCIL_16_8 = 2
}

enum RTDEPTHATTACHMODE {
    RENDERBUFFER = 0,
    TEXTURE = 1
}

	/**
	 * <code>Resource</code> 资源存取类。
	 */
	class Resource extends EventDispatcher implements ICreateResource,IDestroy  {

		/**
		 * @private 
		 */
		private static _uniqueIDCounter:any;

		/**
		 * @private 
		 */
		private static _idResourcesMap:any;

		/**
		 * @private 
		 */
		private static _urlResourcesMap:any;

		/**
		 * @private 以字节为单位。
		 */
		private static _cpuMemory:any;

		/**
		 * @private 以字节为单位。
		 */
		private static _gpuMemory:any;

		/**
		 * 当前内存，以字节为单位。
		 */
		static get cpuMemory():number;

		/**
		 * 当前显存，以字节为单位。
		 */
		static get gpuMemory():number;

		/**
		 * 通过资源ID返回已载入资源。
		 * @param id 资源ID
		 * @return 资源 <code>Resource</code> 对象。
		 */
		static getResourceByID(id:number):Resource;

		/**
		 * 通过url返回已载入资源。
		 * @param url 资源URL
		 * @param index 索引
		 * @return 资源 <code>Resource</code> 对象。
		 */
		static getResourceByURL(url:string,index?:number):Resource;

		/**
		 * 销毁当前没有被使用的资源,该函数会忽略lock=true的资源。
		 * @param group 指定分组。
		 */
		static destroyUnusedResources():void;

		/**
		 * @private 
		 */
		protected _id:number;

		/**
		 * @private 
		 */
		private _url:any;

		/**
		 * @private 
		 */
		private _cpuMemory:any;

		/**
		 * @private 
		 */
		private _gpuMemory:any;

		/**
		 * @private 
		 */
		private _destroyed:any;

		/**
		 * @private 
		 */
		protected _referenceCount:number;

		/**
		 * 是否加锁，如果true为不能使用自动释放机制。
		 */
		lock:boolean;

		/**
		 * 名称。
		 */
		name:string;

		/**
		 * 获取唯一标识ID,通常用于识别。
		 */
		get id():number;

		/**
		 * 获取资源的URL地址。
		 * @return URL地址。
		 */
		get url():string;

		/**
		 * 内存大小。
		 */
		get cpuMemory():number;

		/**
		 * 显存大小。
		 */
		get gpuMemory():number;

		/**
		 * 是否已处理。
		 */
		get destroyed():boolean;

		/**
		 * 获取资源的引用计数。
		 */
		get referenceCount():number;

		/**
		 * 创建一个 <code>Resource</code> 实例。
		 */

		constructor();

		/**
		 * @private 
		 */
		_setCreateURL(url:string):void;

		/**
		 * @private 
		 */
		protected _recoverResource():void;

		/**
		 * @private 
		 */
		protected _disposeResource():void;

		/**
		 * @private 
		 */
		protected _activeResource():void;

		/**
		 * 销毁资源,销毁后资源不能恢复。
		 */
		destroy():void;
	}

	/**
	 * 资源加载完成后调度。
	 * @eventType Event.READY
	 */

	/**
	 * <code>Texture</code> 是一个纹理处理类。
	 */
	class Texture extends EventDispatcher  {

		/**
		 * @private 默认 UV 信息。
		 */
		static DEF_UV:Float32Array;

		/**
		 * @private 
		 */
		static NO_UV:Float32Array;

		/**
		 * @private 反转 UV 信息。
		 */
		static INV_UV:Float32Array;

		/**
		 * @private 
		 */
		private static _rect1:any;

		/**
		 * @private 
		 */
		private static _rect2:any;

		/**
		 * @private uv的范围
		 */
		uvrect:any[];

		/**
		 * @private 
		 */
		private _destroyed:any;

		/**
		 * @private 
		 */
		private _bitmap:any;

		/**
		 * @private 
		 */
		private _referenceCount:any;

		/**
		 * 沿 X 轴偏移量。
		 */
		offsetX:number;

		/**
		 * 沿 Y 轴偏移量。
		 */
		offsetY:number;

		/**
		 * @private 
		 */
		private _w:any;

		/**
		 * @private 
		 */
		private _h:any;

		/**
		 * 原始宽度（包括被裁剪的透明区域）。
		 */
		sourceWidth:number;

		/**
		 * 原始高度（包括被裁剪的透明区域）。
		 */
		sourceHeight:number;

		/**
		 * 图片地址
		 */
		url:string;

		/**
		 * @private 
		 */
		scaleRate:number;

		/**
		 * 平移 UV。
		 * @param offsetX 沿 X 轴偏移量。
		 * @param offsetY 沿 Y 轴偏移量。
		 * @param uv 需要平移操作的的 UV。
		 * @return 平移后的UV。
		 */
		static moveUV(offsetX:number,offsetY:number,uv:any[]):any[];

		/**
		 * 根据指定资源和坐标、宽高、偏移量等创建 <code>Texture</code> 对象。
		 * @param source 绘图资源 Texture2D 或者 Texture对象。
		 * @param x 起始绝对坐标 x 。
		 * @param y 起始绝对坐标 y 。
		 * @param width 宽绝对值。
		 * @param height 高绝对值。
		 * @param offsetX X 轴偏移量（可选）。	就是[x,y]相对于原始小图片的位置。一般都是正的，表示裁掉了空白边的大小，如果是负的一般表示加了保护边
		 * @param offsetY Y 轴偏移量（可选）。
		 * @param sourceWidth 原始宽度，包括被裁剪的透明区域（可选）。
		 * @param sourceHeight 原始高度，包括被裁剪的透明区域（可选）。
		 * @return <code>Texture</code> 对象。
		 */
		static create(source:Texture2D|Texture,x:number,y:number,width:number,height:number,offsetX?:number,offsetY?:number,sourceWidth?:number,sourceHeight?:number):Texture;

		/**
		 * 截取Texture的一部分区域，生成新的Texture，如果两个区域没有相交，则返回null。
		 * @param texture 目标Texture。
		 * @param x 相对于目标Texture的x位置。
		 * @param y 相对于目标Texture的y位置。
		 * @param width 截取的宽度。
		 * @param height 截取的高度。
		 * @return 返回一个新的Texture。
		 */
		static createFromTexture(texture:Texture,x:number,y:number,width:number,height:number):Texture;
		get uv():ArrayLike<number>;
		set uv(value:ArrayLike<number>);

		/**
		 * 实际宽度。
		 */
		get width():number;
		set width(value:number);

		/**
		 * 实际高度。
		 */
		get height():number;
		set height(value:number);

		/**
		 * 获取位图。
		 * @return 位图。
		 */
		get bitmap():Texture2D|Texture|RenderTexture;

		/**
		 * 设置位图。
		 * @param 位图 。
		 */
		set bitmap(value:Texture2D|Texture|RenderTexture);

		/**
		 * 获取是否已经销毁。
		 * @return 是否已经销毁。
		 */
		get destroyed():boolean;

		/**
		 * 创建一个 <code>Texture</code> 实例。
		 * @param bitmap 位图资源。
		 * @param uv UV 数据信息。
		 */

		constructor(bitmap?:Texture2D|Texture|RenderTexture,uv?:ArrayLike<number>,sourceWidth?:number,sourceHeight?:number);

		/**
		 * @private 
		 */
		private _onLoaded:any;

		/**
		 * 获取是否可以使用。
		 */
		getIsReady():boolean;

		/**
		 * 设置此对象的位图资源、UV数据信息。
		 * @param bitmap 位图资源
		 * @param uv UV数据信息
		 */
		setTo(bitmap?:Texture2D|Texture|RenderTexture,uv?:ArrayLike<number>,sourceWidth?:number,sourceHeight?:number):void;

		/**
		 * 加载指定地址的图片。
		 * @param url 图片地址。
		 * @param complete 加载完成回调
		 */
		load(url:string,complete?:Handler):void;
		getTexturePixels(x:number,y:number,width:number,height:number):Uint8Array;

		/**
		 * 获取Texture上的某个区域的像素点
		 * @param x 
		 * @param y 
		 * @param width 
		 * @param height 
		 * @return 返回像素点集合
		 */
		getPixels(x:number,y:number,width:number,height:number):Uint8Array;

		/**
		 * 通过url强制恢复bitmap。
		 */
		recoverBitmap(onok?:() =>void):void;

		/**
		 * 强制释放Bitmap,无论是否被引用。
		 */
		disposeBitmap():void;

		/**
		 * 销毁纹理。
		 */
		destroy(force?:boolean):void;
	}

	/**
	 * <code>Texture2D</code> 类用于生成2D纹理。
	 */
	class Texture2D extends BaseTexture  {

		/**
		 * Texture2D资源。
		 */
		static TEXTURE2D:string;

		/**
		 * 纯灰色纹理。
		 */
		static grayTexture:Texture2D;

		/**
		 * 纯白色纹理。
		 */
		static whiteTexture:Texture2D;

		/**
		 * 纯黑色纹理。
		 */
		static blackTexture:Texture2D;

		/**
		 * 错误纹理
		 */
		static erroTextur:Texture2D;

		/**
		 * 加载Texture2D。
		 * @param url Texture2D地址。
		 * @param complete 完成回掉。
		 */
		static load(url:string,complete:Handler):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get defaulteTexture():BaseTexture;

		/**
		 * 创建一个 <code>Texture2D</code> 实例。
		 * @param width 宽。
		 * @param height 高。
		 * @param format 贴图格式。
		 * @param mipmap 是否生成mipmap。
		 * @param canRead 是否可读像素,如果为true,会在内存保留像素数据。
		 */

		constructor(width?:number,height?:number,format?:TextureFormat,mipmap?:boolean,canRead?:boolean);

		/**
		 * 通过图片源填充纹理,可为HTMLImageElement、HTMLCanvasElement、HTMLVideoElement、ImageBitmap、ImageData,
		 * 设置之后纹理宽高可能会发生变化。
		 */
		loadImageSource(source:any,premultiplyAlpha?:boolean):void;

		/**
		 * 通过像素填充纹理。
		 * @param pixels 像素。
		 * @param miplevel 层级。
		 */
		setPixels(pixels:Uint8Array|Uint16Array|Float32Array,miplevel?:number):void;

		/**
		 * 通过像素填充部分纹理。
		 * @param x X轴像素起点。
		 * @param y Y轴像素起点。
		 * @param width 像素宽度。
		 * @param height 像素高度。
		 * @param pixels 像素数组。
		 * @param miplevel 层级。
		 */
		setSubPixels(x:number,y:number,width:number,height:number,pixels:Uint8Array|Uint16Array|Float32Array,miplevel?:number):void;

		/**
		 * 通过压缩数据填充纹理。
		 * @param data 压缩数据。
		 * @param miplevel 层级。
		 */
		setCompressData(data:ArrayBuffer):void;

		/**
		 * 返回图片像素。
		 * @return 图片像素。
		 */
		getPixels():Uint8Array|Uint16Array|Float32Array;
	}

enum TextureDecodeFormat {
    /** 常规解码方式,直接采样纹理颜色。*/
    Normal = 0,
    /** 按照RGBM方式解码并计算最终RGB颜色。 */
    RGBM = 1
}

enum TextureFormat {
    /**纹理格式_R8G8B8。*/
    R8G8B8 = 0,
    /**纹理格式_R8G8B8A8。*/
    R8G8B8A8 = 1,
    /**RGB格式纹理,R通道5位，G通道6位，B通道5位。*/
    R5G6B5 = 16,
    /**纹理格式_ALPHA8。*/
    Alpha8 = 2,
    /**纹理格式_DXT1。*/
    DXT1 = 3,
    /**纹理格式_DXT5。*/
    DXT5 = 4,
    /**纹理格式_ETC2RGB。*/
    ETC1RGB = 5,
    ETC2RGB = 6,
    ETC2RGBA = 7,
    /**纹理格式_ETC2RGB_PUNCHTHROUGHALPHA。*/
    /**纹理格式_PVRTCRGB_2BPPV。*/
    ETC2RGB_Alpha8 = 8,
    ETC2SRGB = 28,
    PVRTCRGB_2BPPV = 9,
    /**纹理格式_PVRTCRGBA_2BPPV。*/
    PVRTCRGBA_2BPPV = 10,
    /**纹理格式_PVRTCRGB_4BPPV。*/
    PVRTCRGB_4BPPV = 11,
    /**纹理格式_PVRTCRGBA_4BPPV。*/
    PVRTCRGBA_4BPPV = 12,
    /**RGBA格式纹理,每个通道32位浮点数。*/
    R32G32B32A32 = 15,
    /**RGBA格式纹理，每个通道16位浮点数。 */
    R16G16B16A16 = 17,
    /**ASTC 4x4*/
    ASTC4x4 = 18,
    /**ASTC sRGB 4x4 */
    ASTC4x4SRGB = 23,
    /**ASTC 6x6*/
    ASTC6x6 = 19,
    /**ASTC  6x6*/
    ASTC6x6SRGB = 24,
    /**ASTC 8x8 */
    ASTC8x8 = 20,
    ASTC8x8SRGB = 25,
    /**ASTC 10x10 */
    ASTC10x10 = 21,
    ASTC10x10SRGB = 26,
    /**ASTC 12x12 */
    ASTC12x12 = 22,
    ASTC12x12SRGB = 27,
    /**ktx图片 */
    KTXTEXTURE = -1,
    /**pvr图片 */
    PVRTEXTURE = -2
}

	/**
	 * <code>VideoTexture</code> 多媒体纹理
	 */
	class VideoTexture extends BaseTexture  {

		/**
		 * videoTexture对象池
		 */
		static _videoTexturePool:Array<VideoTexture>;
		private _video:any;
		private _needUpdate:any;

		/**
		 * 创建VideoTexture对象，
		 */

		constructor();

		/**
		 * 获得绑定的资源Video
		 * return HTMLVideoElement
		 */
		get video():any;

		/**
		 * @value 输入Video资源
		 */
		set video(value:any);

		/**
		 * 开始播放视频
		 */
		videoPlay():void;

		/**
		 * 暂停播放视频
		 */
		videoPause():void;
		destroy():void;
	}

	/**
	 * WebGLRTMgr 管理WebGLRenderTarget的创建和回收
	 * TODO 需求不大，管理成本高。先去掉。
	 */
	class WebGLRTMgr  {
		private static dict:any;

		/**
		 * 获得一个renderTarget
		 * 暂时先按照严格大小判断。
		 * @param w 
		 * @param h 
		 * @return 
		 */
		static getRT(w:number,h:number):RenderTexture2D;

		/**
		 * 回收一个renderTarget
		 * @param rt 
		 */
		static releaseRT(rt:RenderTexture2D):void;
	}

enum WarpMode {
    /** 循环平铺。*/
    Repeat = 0,
    /** 超过UV边界后采用最后一个像素。*/
    Clamp = 1,
    /** 镜像采样 */
    Mirrored = 2
}
	class SpineAssetManager extends spine.AssetManager  {

		constructor(pathPrefix:string,downloader:any,textureDic:any);
	}
	class SpineGLTexture extends Texture  {

		constructor(tex:Texture2D|Texture);
		getImage():Object;
		setFilters(minFilter:spine.TextureFilter,magFilter:spine.TextureFilter):void;
		setWraps(uWrap:spine.TextureWrap,vWrap:spine.TextureWrap):void;
	}

	/**
	 * 动画开始播放调度
	 * @eventType Event.PLAYED
	 */

	/**
	 * 动画停止播放调度
	 * @eventType Event.STOPPED
	 */

	/**
	 * 动画暂停播放调度
	 * @eventType Event.PAUSED
	 */

	/**
	 * 自定义事件。
	 * @eventType Event.LABEL
	 */

	/**
	 * spine动画由<code>SpineTemplet</code>，<code>SpineSkeletonRender</code>，<code>SpineSkeleton</code>三部分组成。
	 */
	class SpineSkeleton extends Sprite  {
		static stopped:number;
		static paused:number;
		static playing:number;
		private _templet:any;
		private timeKeeper:any;
		private skeleton:any;
		private state:any;
		private stateData:any;
		private currentPlayTime:any;
		private skeletonRenderer:any;
		_ins:SpineSkeleton;

		/**
		 * 播放速率
		 */
		private _playbackRate:any;
		private trackIndex:any;

		/**
		 * 创建一个Skeleton对象
		 * @param templet 骨骼动画模板
		 */

		constructor(templet?:SpineTempletBase);
		init(templet:SpineTempletBase):void;

		/**
		 * 播放动画
		 * @param nameOrIndex 动画名字或者索引
		 * @param loop 是否循环播放
		 * @param force false,如果要播的动画跟上一个相同就不生效,true,强制生效
		 * @param start 起始时间
		 * @param end 结束时间
		 * @param freshSkin 是否刷新皮肤数据
		 * @param playAudio 是否播放音频
		 */
		play(nameOrIndex:any,loop:boolean,force?:boolean,start?:number,end?:number,freshSkin?:boolean,playAudio?:boolean):void;
		private _update:any;

		/**
		 * 得到当前动画的数量
		 * @return 当前动画的数量
		 */
		getAnimNum():number;

		/**
		 * 得到指定动画的名字
		 * @param index 动画的索引
		 */
		getAniNameByIndex(index:number):string;

		/**
		 * 通过名字得到插槽的引用
		 * @param slotName 
		 */
		getSlotByName(slotName:string):spine.Slot;

		/**
		 * 设置动画播放速率
		 * @param value 1为标准速率
		 */
		playbackRate(value:number):void;

		/**
		 * 通过名字显示一套皮肤
		 * @param name 皮肤的名字
		 */
		showSkinByName(name:string):void;

		/**
		 * 通过索引显示一套皮肤
		 * @param skinIndex 皮肤索引
		 */
		showSkinByIndex(skinIndex:number):void;

		/**
		 * 停止动画
		 */
		stop():void;

		/**
		 * 暂停动画的播放
		 */
		paused():void;

		/**
		 * 恢复动画的播放
		 */
		resume():void;

		/**
		 * 销毁当前动画
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 得到动画模板的引用
		 * @return templet
		 */
		get templet():SpineTempletBase;

		/**
		 * 添加一个动画
		 * @param nameOrIndex 动画名字或者索引
		 * @param loop 是否循环播放
		 * @param delay 延迟调用，可以为负数
		 */
		addAnimation(nameOrIndex:any,loop?:boolean,delay?:number):void;

		/**
		 * 设置当动画被改变时，存储混合(交叉淡出)的持续时间
		 * @param fromNameOrIndex 
		 * @param toNameOrIndex 
		 * @param duration 
		 */
		setMix(fromNameOrIndex:any,toNameOrIndex:any,duration:number):void;

		/**
		 * 获取骨骼信息(spine.Bone)
		 * 注意: 获取到的是spine运行时的骨骼信息(spine.Bone)，不适用引擎的方法
		 * @param boneName 
		 */
		getBoneByName(boneName:string):spine.Bone;

		/**
		 * 获取Skeleton(spine.Skeleton)
		 */
		getSkeleton():Skeleton;

		/**
		 * 替换插槽皮肤
		 * @param slotName 
		 * @param attachmentName 
		 */
		setSlotAttachment(slotName:string,attachmentName:string):void;

		/**
		 * 设置当前播放位置
		 * @param value 当前时间
		 */
		set currentTime(value:number);

		/**
		 * 获取当前播放状态
		 * @return 当前播放状态
		 */
		get playState():number;
	}
	class SpineSkeletonRenderer  {
		static QUAD_TRIANGLES:number[];
		premultipliedAlpha:boolean;
		vertexEffect:spine.VertexEffect;
		private tempColor:any;
		private tempColor2:any;
		private vertices:any;
		private vertexSize:any;
		private twoColorTint:any;
		private renderable:any;
		private clipper:any;
		private temp:any;
		private temp2:any;
		private temp3:any;
		private temp4:any;

		constructor(twoColorTint?:boolean);
		draw(skeleton:Skeleton,slotRangeStart:number,slotRangeEnd:number,spineSkeletonIns:SpineSkeleton,textureList:any):void;
	}

	/**
	 * 数据解析完成后的调度。
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 数据解析错误后的调度。
	 * @eventType Event.ERROR
	 */
	class SpineTemplet extends SpineTempletBase  {

		/**
		 * Spine动画模板类
		 * @param ver spine资源版本号
		 */

		constructor(ver:SpineVersion);
		loadAni(jsonOrSkelUrl:string):void;

		/**
		 * 创建动画
		 * @return 
		 */
		buildArmature():SpineSkeleton;

		/**
		 * 通过索引得动画名称
		 * @param index 
		 * @return 
		 */
		getAniNameByIndex(index:number):string;

		/**
		 * 通过皮肤名字得到皮肤索引
		 * @param skinName 皮肤名称
		 * @return 
		 */
		getSkinIndexByName(skinName:string):number;

		/**
		 * 释放纹理
		 * @override 
		 */
		destroy():void;
	}

enum SpineVersion {
    "v3_7" = "v3_7",
    "v3_8" = "v3_8",
    "v4_0" = "v4_0"
}

enum SpineFormat {
    "json" = "json",
    "binary" = "binary"
}

	/**
	 * Spine动画模板基类
	 */
	class SpineTempletBase extends Resource  {
		private _templet:any;
		private _isDestroyed:any;
		skeletonData:spine.SkeletonData;
		private _layaPremultipliedAlpha:any;
		private _spinePremultipliedAlpha:any;

		constructor();
		get templet():SpineTempletBase;
		set templet(value:SpineTempletBase);
		get isDestroyed():boolean;
		set isDestroyed(value:boolean);
		get spinePremultipliedAlpha():boolean;
		set spinePremultipliedAlpha(value:boolean);

		/**
		 * 创建动画
		 * @return 
		 */
		buildArmature():SpineSkeleton;

		/**
		 * 通过索引得动画名称
		 * @param index 
		 * @return 
		 */
		getAniNameByIndex(index:number):string;

		/**
		 * 通过皮肤名字得到皮肤索引
		 * @param skinName 皮肤名称
		 * @return 
		 */
		getSkinIndexByName(skinName:string):number;

		/**
		 * 释放纹理
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * @private 
	 */
	class System  {

		/**
		 * 替换指定名称的定义。用来动态更改类的定义。
		 * @param name 属性名。
		 * @param classObj 属性值。
		 */
		static changeDefinition(name:string,classObj:any):void;
	}

	/**
	 * 广告插件
	 * @author 小松
	 * @date -2018-09-19
	 */
	class AdvImage extends Image  {

		/**
		 * 广告列表数据*
		 */
		private advsListArr:any;

		/**
		 * 资源列表请求地址*
		 */
		private resUrl:any;

		/**
		 * 加载请求实例*
		 */
		private _http:any;

		/**
		 * 广告列表信息*
		 */
		private _data:any;

		/**
		 * 每6分钟重新请求一次新广告列表*
		 */
		private _resquestTime:any;

		/**
		 * 微信跳转appid*
		 */
		private _appid:any;

		/**
		 * 播放索引*
		 */
		private _playIndex:any;

		/**
		 * 轮播间隔时间*
		 */
		private _lunboTime:any;

		constructor(skin?:string);

		/**
		 * 设置导量加载地址*
		 */
		private setLoadUrl:any;
		private init:any;
		private initEvent:any;
		private onAdvsImgClick:any;
		private revertAdvsData:any;

		/**
		 * 当前小游戏环境是否支持游戏跳转功能*
		 */
		isSupportJump():boolean;

		/**
		 * 跳转游戏
		 * @param callBack Function 回调参数说明：type 0 跳转成功；1跳转失败；2跳转接口调用成功
		 */
		private jumptoGame:any;
		private updateAdvsInfo:any;
		private onLunbo:any;

		/**
		 * 获取轮播数据*
		 */
		private getCurrentAppidObj:any;

		/**
		 * 获取广告列表数据信息
		 */
		private onGetAdvsListData:any;

		/**
		 * 生成指定范围的随机数
		 * @param minNum 最小值
		 * @param maxNum 最大值
		 */
		static randRange(minNum:number,maxNum:number):number;

		/**
		 * @private 请求出错侦的听处理函数。
		 * @param e 事件对象。
		 */
		private _onError:any;

		/**
		 * @private 请求消息返回的侦听处理函数。
		 * @param e 事件对象。
		 */
		private _onLoad:any;

		/**
		 * @private 请求错误的处理函数。
		 * @param message 错误信息。
		 */
		private error:any;

		/**
		 * @private 请求成功完成的处理函数。
		 */
		private complete:any;

		/**
		 * 转换数据*
		 */
		private getAdvsQArr:any;

		/**
		 * @private 清除当前请求。
		 */
		private clear:any;

		/**
		 * @override 
		 * @param destroyChild 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * <code>AutoBitmap</code> 类是用于表示位图图像或绘制图形的显示对象。
	 * <p>封装了位置，宽高及九宫格的处理，供UI组件使用。</p>
	 */
	class AutoBitmap extends Graphics  {

		/**
		 * @private 是否自动缓存命令
		 */
		autoCacheCmd:boolean;

		/**
		 * @private 宽度
		 */
		private _width:any;

		/**
		 * @private 高度
		 */
		private _height:any;

		/**
		 * @private 源数据
		 */
		private _source:any;

		/**
		 * @private 网格数据
		 */
		private _sizeGrid:any;

		/**
		 * @private 
		 */
		protected _isChanged:boolean;
		uv:number[];
		private _drawGridCmd:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy():void;

		/**
		 * 当前实例的有效缩放网格数据。
		 * <p>如果设置为null,则在应用任何缩放转换时，将正常缩放整个显示对象。</p>
		 * <p>数据格式：[上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)]。
		 * <ul><li>例如：[4,4,4,4,1]</li></ul></p>
		 * <p> <code>sizeGrid</code> 的值如下所示：
		 * <ol>
		 * <li>上边距</li>
		 * <li>右边距</li>
		 * <li>下边距</li>
		 * <li>左边距</li>
		 * <li>是否重复填充(值为0：不重复填充，1：重复填充)</li>
		 * </ol></p>
		 * <p>当定义 <code>sizeGrid</code> 属性时，该显示对象被分割到以 <code>sizeGrid</code> 数据中的"上边距,右边距,下边距,左边距" 组成的矩形为基础的具有九个区域的网格中，该矩形定义网格的中心区域。网格的其它八个区域如下所示：
		 * <ul>
		 * <li>矩形上方的区域</li>
		 * <li>矩形外的右上角</li>
		 * <li>矩形左侧的区域</li>
		 * <li>矩形右侧的区域</li>
		 * <li>矩形外的左下角</li>
		 * <li>矩形下方的区域</li>
		 * <li>矩形外的右下角</li>
		 * <li>矩形外的左上角</li>
		 * </ul>
		 * 同时也支持3宫格，比如0,4,0,4,1为水平3宫格，4,0,4,0,1为垂直3宫格，3宫格性能比9宫格高。
		 * </p>
		 */
		get sizeGrid():number[];
		set sizeGrid(value:number[]);

		/**
		 * 表示显示对象的宽度，以像素为单位。
		 */
		get width():number;
		set width(value:number);

		/**
		 * 表示显示对象的高度，以像素为单位。
		 */
		get height():number;
		set height(value:number);

		/**
		 * 对象的纹理资源。
		 * @see laya.resource.Texture
		 */
		get source():Texture;
		set source(value:Texture);

		/**
		 * @private 
		 */
		protected _setChanged():void;
		private _createDrawTexture:any;

		/**
		 * @private 修改纹理资源。
		 */
		protected changeSource():void;
		private drawBitmap:any;
		private static getTexture:any;

		/**
		 * 由于可能有其他的graphic命令，因此不能用原来的直接clear()的方法
		 */
		private _setDrawGridCmd:any;
	}

	/**
	 * <code>Box</code> 类是一个控件容器类。
	 */
	class Box extends UIComponent implements IBox  {
		private _bgColor:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 背景颜色
		 */
		get bgColor():string;
		set bgColor(value:string);
		private _onResize:any;
	}

	/**
	 * 当按钮的选中状态（ <code>selected</code> 属性）发生改变时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>Button</code> 组件用来表示常用的多态按钮。 <code>Button</code> 组件可显示文本标签、图标或同时显示两者。	 *
	 * <p>可以是单态，两态和三态，默认三态(up,over,down)。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>Button</code> 实例。</caption>
package
{
import laya.ui.Button;
import laya.utils.Handler;
public class Button_Example
{
public function Button_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/button.png", Handler.create(this,onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
trace("资源加载完成！");
var button:Button = new Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,并传入它的皮肤。
button.x = 100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
button.y = 100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
button.clickHandler = new Handler(this, onClickButton,[button]);//设置 button 的点击事件处理器。
Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
}
private function onClickButton(button:Button):void
{
trace("按钮button被点击了！");
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete()
{
    console.log("资源加载完成！");
    var button = new laya.ui.Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,传入它的皮肤skin和标签label。
    button.x =100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
    button.y =100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
    button.clickHandler = laya.utils.Handler.create(this,onClickButton,[button],false);//设置 button 的点击事件处理函数。
    Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
}
function onClickButton(button)
{
    console.log("按钮被点击了。",button);
}
	 * @example import Button=laya.ui.Button;
import Handler=laya.utils.Handler;
class Button_Example{
    constructor()
    {
        Laya.init(640, 800);
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load("resource/ui/button.png", laya.utils.Handler.create(this,this.onLoadComplete));//加载资源。
    }
    private onLoadComplete()
    {
        var button:Button = new Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,并传入它的皮肤。
        button.x = 100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
        button.y = 100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
        button.clickHandler = new Handler(this, this.onClickButton,[button]);//设置 button 的点击事件处理器。
        Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
    }
    private onClickButton(button:Button):void
    {
        console.log("按钮button被点击了！")
    }
}
	 */
	class Button extends UIComponent implements ISelect  {

		/**
		 * 按钮状态集。
		 */
		protected static stateMap:any;

		/**
		 * 指定按钮按下时是否是切换按钮的显示状态。
		 * @example 以下示例代码，创建了一个 <code>Button</code> 实例，并设置为切换按钮。
		 * @example package
{
	import laya.ui.Button;
	import laya.utils.Handler;
	public class Button_toggle
	{
		public function Button_toggle()
		{
			Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
			Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
			Laya.loader.load("resource/ui/button.png", Handler.create(this,onLoadComplete));
		}
		private function onLoadComplete():void
		{
			trace("资源加载完成！");
			var button:Button = new Button("resource/ui/button.png","label");//创建一个 Button 实例对象 button ,传入它的皮肤skin和标签label。
			button.x = 100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
			button.y = 100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
			button.toggle = true;//设置 button 对象为切换按钮。
			button.clickHandler = new Handler(this, onClickButton,[button]);//设置 button 的点击事件处理器。
			Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
 		}
		private function onClickButton(button:Button):void
		{
			trace("button.selected = "+ button.selected);
		}
	}
}
		 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete()
{
    console.log("资源加载完成！");
    var button = new laya.ui.Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,传入它的皮肤skin和标签label。
    button.x =100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
    button.y =100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
    button.toggle = true;//设置 button 对象为切换按钮。
    button.clickHandler = laya.utils.Handler.create(this,onClickButton,[button],false);//设置 button 的点击事件处理器。
    Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
}
function onClickButton(button)
{
    console.log("button.selected = ",button.selected);
}
		 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("button.png", null,null, null, null, null);//加载资源
function loadComplete() {
    console.log("资源加载完成！");
    var button:laya.ui.Button = new laya.ui.Button("button.png", "label");//创建一个 Button 类的实例对象 button ,传入它的皮肤skin和标签label。
    button.x = 100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
    button.y = 100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
    button.toggle = true;//设置 button 对象为切换按钮。
    button.clickHandler = laya.utils.Handler.create(this, onClickButton, [button], false);//设置 button 的点击事件处理器。
    Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
}
function onClickButton(button) {
    console.log("button.selected = ", button.selected);
}
		 */
		toggle:boolean;

		/**
		 * @private 
		 */
		protected _bitmap:AutoBitmap;

		/**
		 * @private 按钮上的文本。
		 */
		protected _text:Text;

		/**
		 * @private 按钮文本标签的颜色值。
		 */
		protected _labelColors:any[];

		/**
		 * @private 按钮文本标签描边的颜色值。
		 */
		protected _strokeColors:any[];

		/**
		 * @private 按钮的状态值。
		 */
		protected _state:number;

		/**
		 * @private 表示按钮的选中状态。
		 */
		protected _selected:boolean;

		/**
		 * @private 按钮的皮肤资源。
		 */
		protected _skin:string;

		/**
		 * @private 指定此显示对象是否自动计算并改变大小等属性。
		 */
		protected _autoSize:boolean;

		/**
		 * @private 按钮的状态数。
		 */
		protected _stateNum:number;

		/**
		 * @private 源数据。
		 */
		protected _sources:any[];

		/**
		 * @private 按钮的点击事件函数。
		 */
		protected _clickHandler:Handler;

		/**
		 * @private 
		 */
		protected _stateChanged:boolean;

		/**
		 * 创建一个新的 <code>Button</code> 类实例。
		 * @param skin 皮肤资源地址。
		 * @param label 按钮的文本内容。
		 */

		constructor(skin?:string,label?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @private 
		 */
		protected createText():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;

		/**
		 * 对象的 <code>Event.MOUSE_OVER、Event.MOUSE_OUT、Event.MOUSE_DOWN、Event.MOUSE_UP、Event.CLICK</code> 事件侦听处理函数。
		 * @param e Event 对象。
		 */
		protected onMouse(e:Event):void;

		/**
		 * <p>对象的皮肤资源地址。</p>
		 * 支持单态，两态和三态，用 <code>stateNum</code> 属性设置
		 * <p>对象的皮肤地址，以字符串表示。</p>
		 * @see #stateNum
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * <p>指定对象的状态值，以数字表示。</p>
		 * <p>默认值为3。此值决定皮肤资源图片的切割方式。</p>
		 * <p><b>取值：</b>
		 * <li>1：单态。图片不做切割，按钮的皮肤状态只有一种。</li>
		 * <li>2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为
		 * 弹起状态皮肤、
		 * 按下和经过及选中状态皮肤。</li>
		 * <li>3：三态。图片将以竖直方向被等比切割为3部分，从上向下，依次为
		 * 弹起状态皮肤、
		 * 经过状态皮肤、
		 * 按下和选中状态皮肤</li>
		 * </p>
		 */
		get stateNum():number;
		set stateNum(value:number);

		/**
		 * @private 对象的资源切片发生改变。
		 */
		protected changeClips():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * 按钮的文本内容。
		 */
		get label():string;
		set label(value:string);

		/**
		 * 表示按钮的选中状态。
		 * <p>如果值为true，表示该对象处于选中状态。否则该对象处于未选中状态。</p>
		 * @implements 
		 */
		get selected():boolean;
		set selected(value:boolean);

		/**
		 * 对象的状态值。
		 * @see #stateMap
		 */
		protected get state():number;
		protected set state(value:number);

		/**
		 * @private 改变对象的状态。
		 */
		protected changeState():void;

		/**
		 * 表示按钮各个状态下的文本颜色。
		 * <p><b>格式:</b> "upColor,overColor,downColor,disableColor"。</p>
		 */
		get labelColors():string;
		set labelColors(value:string);

		/**
		 * 表示按钮各个状态下的描边颜色。
		 * <p><b>格式:</b> "upColor,overColor,downColor,disableColor"。</p>
		 */
		get strokeColors():string;
		set strokeColors(value:string);

		/**
		 * 表示按钮文本标签的边距。
		 * <p><b>格式：</b>"上边距,右边距,下边距,左边距"。</p>
		 */
		get labelPadding():string;
		set labelPadding(value:string);

		/**
		 * 表示按钮文本标签的字体大小。
		 * @see laya.display.Text.fontSize()
		 */
		get labelSize():number;
		set labelSize(value:number);

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * 默认值0，表示不描边。
		 * @see laya.display.Text.stroke()
		 */
		get labelStroke():number;
		set labelStroke(value:number);

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * 默认值为 "#000000"（黑色）;
		 * @see laya.display.Text.strokeColor()
		 */
		get labelStrokeColor():string;
		set labelStrokeColor(value:string);

		/**
		 * 表示按钮文本标签是否为粗体字。
		 * @see laya.display.Text.bold()
		 */
		get labelBold():boolean;
		set labelBold(value:boolean);

		/**
		 * 表示按钮文本标签的字体名称，以字符串形式表示。
		 * @see laya.display.Text.font()
		 */
		get labelFont():string;
		set labelFont(value:string);

		/**
		 * 标签对齐模式，默认为居中对齐。
		 */
		get labelAlign():string;
		set labelAlign(value:string);

		/**
		 * 对象的点击事件处理器函数（无默认参数）。
		 * @implements 
		 */
		get clickHandler():Handler;
		set clickHandler(value:Handler);

		/**
		 * 按钮文本标签 <code>Text</code> 控件。
		 */
		get text():Text;

		/**
		 * <p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 图标x,y偏移，格式：100,100
		 */
		get iconOffset():string;
		set iconOffset(value:string);

		/**
		 * @private 
		 */
		protected _setStateChanged():void;
	}

	/**
	 * 当按钮的选中状态（ <code>selected</code> 属性）发生改变时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>CheckBox</code> 组件显示一个小方框，该方框内可以有选中标记。
	 * <code>CheckBox</code> 组件还可以显示可选的文本标签，默认该标签位于 CheckBox 右侧。
	 * <p><code>CheckBox</code> 使用 <code>dataSource</code>赋值时的的默认属性是：<code>selected</code>。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>CheckBox</code> 实例。</caption>
package
{
import laya.ui.CheckBox;
import laya.utils.Handler;
public class CheckBox_Example
{
public function CheckBox_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/check.png", Handler.create(this,onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
trace("资源加载完成！");
var checkBox:CheckBox = new CheckBox("resource/ui/check.png", "这个是一个CheckBox组件。");//创建一个 CheckBox 类的实例对象 checkBox ,传入它的皮肤skin和标签label。
checkBox.x = 100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
checkBox.y = 100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
checkBox.clickHandler = new Handler(this, onClick, [checkBox]);//设置 checkBox 的点击事件处理器。
Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
}
private function onClick(checkBox:CheckBox):void
{
trace("输出选中状态: checkBox.selected = " + checkBox.selected);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load("resource/ui/check.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete()
{
    console.log("资源加载完成！");
    var checkBox:laya.ui.CheckBox= new laya.ui.CheckBox("resource/ui/check.png", "这个是一个CheckBox组件。");//创建一个 CheckBox 类的类的实例对象 checkBox ,传入它的皮肤skin和标签label。
    checkBox.x =100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
    checkBox.y =100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
    checkBox.clickHandler = new laya.utils.Handler(this,this.onClick,[checkBox],false);//设置 checkBox 的点击事件处理器。
    Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
}
function onClick(checkBox)
{
    console.log("checkBox.selected = ",checkBox.selected);
}
	 * @example import CheckBox= laya.ui.CheckBox;
import Handler=laya.utils.Handler;
class CheckBox_Example{
    constructor()
    {
        Laya.init(640, 800);
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load("resource/ui/check.png", Handler.create(this,this.onLoadComplete));//加载资源。
    }
    private onLoadComplete()
    {
        var checkBox:CheckBox = new CheckBox("resource/ui/check.png", "这个是一个CheckBox组件。");//创建一个 CheckBox 类的实例对象 checkBox ,传入它的皮肤skin和标签label。
        checkBox.x = 100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
        checkBox.y = 100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
        checkBox.clickHandler = new Handler(this, this.onClick,[checkBox]);//设置 checkBox 的点击事件处理器。
        Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
    }
    private onClick(checkBox:CheckBox):void
    {
        console.log("输出选中状态: checkBox.selected = " + checkBox.selected);
    }
}
	 */
	class CheckBox extends Button  {

		/**
		 * 创建一个新的 <code>CheckBox</code> 组件实例。
		 * @param skin 皮肤资源地址。
		 * @param label 文本标签的内容。
		 */

		constructor(skin?:string,label?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected preinitialize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;
	}

	/**
	 * 图片加载完成后调度。
	 * @eventType Event.LOADED
	 */

	/**
	 * 当前帧发生变化后调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <p> <code>Clip</code> 类是位图切片动画。</p>
	 * <p> <code>Clip</code> 可将一张图片，按横向分割数量 <code>clipX</code> 、竖向分割数量 <code>clipY</code> ，
	 * 或横向分割每个切片的宽度 <code>clipWidth</code> 、竖向分割每个切片的高度 <code>clipHeight</code> ，
	 * 从左向右，从上到下，分割组合为一个切片动画。</p>
	 * Image和Clip组件是唯一支持异步加载的两个组件，比如clip.skin = "abc/xxx.png"，其他UI组件均不支持异步加载。
	 * @example <caption>以下示例代码，创建了一个 <code>Clip</code> 实例。</caption>
package
{
import laya.ui.Clip;
public class Clip_Example
{
private var clip:Clip;
public function Clip_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
onInit();
}
private function onInit():void
{
clip = new Clip("resource/ui/clip_num.png", 10, 1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
clip.autoPlay = true;//设置 clip 动画自动播放。
clip.interval = 100;//设置 clip 动画的播放时间间隔。
clip.x = 100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
clip.y = 100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
clip.on(Event.CLICK, this, onClick);//给 clip 添加点击事件函数侦听。
Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
}
private function onClick():void
{
trace("clip 的点击事件侦听处理函数。clip.total="+ clip.total);
if (clip.isPlaying == true)
{
clip.stop();//停止动画。
}else {
clip.play();//播放动画。
}
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var clip;
Laya.loader.load("resource/ui/clip_num.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete() {
    console.log("资源加载完成！");
    clip = new laya.ui.Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
    clip.autoPlay = true;//设置 clip 动画自动播放。
    clip.interval = 100;//设置 clip 动画的播放时间间隔。
    clip.x =100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
    clip.y =100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
    clip.on(Event.CLICK,this,onClick);//给 clip 添加点击事件函数侦听。
    Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
}
function onClick()
{
    console.log("clip 的点击事件侦听处理函数。");
    if(clip.isPlaying == true)
    {
        clip.stop();
    }else {
        clip.play();
    }
}
	 * @example import Clip = laya.ui.Clip;
import Handler = laya.utils.Handler;
class Clip_Example {
    private clip: Clip;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.onInit();
    }
    private onInit(): void {
        this.clip = new Clip("resource/ui/clip_num.png", 10, 1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
        this.clip.autoPlay = true;//设置 clip 动画自动播放。
        this.clip.interval = 100;//设置 clip 动画的播放时间间隔。
        this.clip.x = 100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
        this.clip.y = 100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
        this.clip.on(laya.events.Event.CLICK, this, this.onClick);//给 clip 添加点击事件函数侦听。
        Laya.stage.addChild(this.clip);//将此 clip 对象添加到显示列表。
    }
    private onClick(): void {
        console.log("clip 的点击事件侦听处理函数。clip.total=" + this.clip.total);
        if (this.clip.isPlaying == true) {
            this.clip.stop();//停止动画。
        } else {
            this.clip.play();//播放动画。
        }
    }
}
	 */
	class Clip extends UIComponent  {

		/**
		 * @private 
		 */
		protected _sources:any[];

		/**
		 * @private 
		 */
		protected _bitmap:AutoBitmap;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _clipX:number;

		/**
		 * @private 
		 */
		protected _clipY:number;

		/**
		 * @private 
		 */
		protected _clipWidth:number;

		/**
		 * @private 
		 */
		protected _clipHeight:number;

		/**
		 * @private 
		 */
		protected _autoPlay:boolean;

		/**
		 * @private 
		 */
		protected _interval:number;

		/**
		 * @private 
		 */
		protected _complete:Handler;

		/**
		 * @private 
		 */
		protected _isPlaying:boolean;

		/**
		 * @private 
		 */
		protected _index:number;

		/**
		 * @private 
		 */
		protected _clipChanged:boolean;

		/**
		 * @private 
		 */
		protected _group:string;

		/**
		 * @private 
		 */
		protected _toIndex:number;

		/**
		 * 创建一个新的 <code>Clip</code> 示例。
		 * @param url 资源类库名或者地址
		 * @param clipX x方向分割个数
		 * @param clipY y方向分割个数
		 */

		constructor(url?:string,clipX?:number,clipY?:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 销毁对象并释放加载的皮肤资源。
		 */
		dispose():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @private 
		 * @override 
		 */
		protected _onDisplay(e?:boolean):void;

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * X轴（横向）切片数量。
		 */
		get clipX():number;
		set clipX(value:number);

		/**
		 * Y轴(竖向)切片数量。
		 */
		get clipY():number;
		set clipY(value:number);

		/**
		 * 横向分割时每个切片的宽度，与 <code>clipX</code> 同时设置时优先级高于 <code>clipX</code> 。
		 */
		get clipWidth():number;
		set clipWidth(value:number);

		/**
		 * 竖向分割时每个切片的高度，与 <code>clipY</code> 同时设置时优先级高于 <code>clipY</code> 。
		 */
		get clipHeight():number;
		set clipHeight(value:number);

		/**
		 * @private 改变切片的资源、切片的大小。
		 */
		protected changeClip():void;

		/**
		 * @private 加载切片图片资源完成函数。
		 * @param url 资源地址。
		 * @param img 纹理。
		 */
		protected loadComplete(url:string,img:Texture):void;

		/**
		 * 源数据。
		 */
		get sources():any[];
		set sources(value:any[]);

		/**
		 * 资源分组。
		 */
		get group():string;
		set group(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * <p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * 当前帧索引。
		 */
		get index():number;
		set index(value:number);

		/**
		 * 切片动画的总帧数。
		 */
		get total():number;

		/**
		 * 表示是否自动播放动画，若自动播放值为true,否则值为false;
		 * <p>可控制切片动画的播放、停止。</p>
		 */
		get autoPlay():boolean;
		set autoPlay(value:boolean);

		/**
		 * 表示动画播放间隔时间(以毫秒为单位)。
		 */
		get interval():number;
		set interval(value:number);

		/**
		 * 表示动画的当前播放状态。
		 * 如果动画正在播放中，则为true，否则为flash。
		 */
		get isPlaying():boolean;
		set isPlaying(value:boolean);

		/**
		 * 播放动画。
		 * @param from 开始索引
		 * @param to 结束索引，-1为不限制
		 */
		play(from?:number,to?:number):void;

		/**
		 * @private 
		 */
		protected _loop():void;

		/**
		 * 停止动画。
		 */
		stop():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * <code>AutoBitmap</code> 位图实例。
		 */
		get bitmap():AutoBitmap;

		/**
		 * @private 
		 */
		protected _setClipChanged():void;
	}

	/**
	 * 选择项改变后调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>ColorPicker</code> 组件将显示包含多个颜色样本的列表，用户可以从中选择颜色。
	 * @example <caption>以下示例代码，创建了一个 <code>ColorPicker</code> 实例。</caption>
package
{
import laya.ui.ColorPicker;
import laya.utils.Handler;
public class ColorPicker_Example
{
public function ColorPicker_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/color.png", Handler.create(this,onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
trace("资源加载完成！");
var colorPicket:ColorPicker = new ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
colorPicket.skin = "resource/ui/color.png";//设置 colorPicket 的皮肤。
colorPicket.x = 100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
colorPicket.y = 100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
colorPicket.changeHandler = new Handler(this, onChangeColor,[colorPicket]);//设置 colorPicket 的颜色改变回调函数。
Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
}
private function onChangeColor(colorPicket:ColorPicker):void
{
trace("当前选择的颜色： " + colorPicket.selectedColor);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load("resource/ui/color.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete()
{
    console.log("资源加载完成！");
    var colorPicket = new laya.ui.ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
    colorPicket.skin = "resource/ui/color.png";//设置 colorPicket 的皮肤。
    colorPicket.x = 100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
    colorPicket.y = 100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
    colorPicket.changeHandler = laya.utils.Handler.create(this, onChangeColor,[colorPicket],false);//设置 colorPicket 的颜色改变回调函数。
    Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
}
function onChangeColor(colorPicket)
{
    console.log("当前选择的颜色： " + colorPicket.selectedColor);
}
	 * @example import ColorPicker = laya.ui.ColorPicker;
import Handler = laya.utils.Handler;
class ColorPicker_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load("resource/ui/color.png", Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        console.log("资源加载完成！");
        var colorPicket: ColorPicker = new ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
        colorPicket.skin = "resource/ui/color.png";//设置 colorPicket 的皮肤。
        colorPicket.x = 100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
        colorPicket.y = 100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
        colorPicket.changeHandler = new Handler(this, this.onChangeColor, [colorPicket]);//设置 colorPicket 的颜色改变回调函数。
        Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
    }
    private onChangeColor(colorPicket: ColorPicker): void {
        console.log("当前选择的颜色： " + colorPicket.selectedColor);
    }
}
	 */
	class ColorPicker extends UIComponent  {

		/**
		 * 当颜色发生改变时执行的函数处理器。
		 * 默认返回参数color：颜色值字符串。
		 */
		changeHandler:Handler;

		/**
		 * @private 指定每个正方形的颜色小格子的宽高（以像素为单位）。
		 */
		protected _gridSize:number;

		/**
		 * @private 表示颜色样本列表面板的背景颜色值。
		 */
		protected _bgColor:string;

		/**
		 * @private 表示颜色样本列表面板的边框颜色值。
		 */
		protected _borderColor:string;

		/**
		 * @private 表示颜色样本列表面板选择或输入的颜色值。
		 */
		protected _inputColor:string;

		/**
		 * @private 表示颜色输入框的背景颜色值。
		 */
		protected _inputBgColor:string;

		/**
		 * @private 表示颜色样本列表面板。
		 */
		protected _colorPanel:Box;

		/**
		 * @private 表示颜色网格。
		 */
		protected _colorTiles:Sprite;

		/**
		 * @private 表示颜色块显示对象。
		 */
		protected _colorBlock:Sprite;

		/**
		 * @private 表示颜色输入框控件 <code>Input</code> 。
		 */
		protected _colorInput:Input;

		/**
		 * @private 表示点击后显示颜色样本列表面板的按钮控件 <code>Button</code> 。
		 */
		protected _colorButton:Button;

		/**
		 * @private 表示颜色值列表。
		 */
		protected _colors:any[];

		/**
		 * @private 表示选择的颜色值。
		 */
		protected _selectedColor:string;

		/**
		 * @private 
		 */
		protected _panelChanged:boolean;

		constructor(createChildren?:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;
		private onPanelMouseDown:any;

		/**
		 * 改变颜色样本列表面板。
		 */
		protected changePanel():void;

		/**
		 * 颜色样本列表面板的显示按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		private onColorButtonClick:any;

		/**
		 * 打开颜色样本列表面板。
		 */
		open():void;

		/**
		 * 关闭颜色样本列表面板。
		 */
		close():void;

		/**
		 * 舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		private removeColorBox:any;

		/**
		 * 小格子色块的 <code>Event.KEY_DOWN</code> 事件侦听处理函数。
		 */
		private onColorFieldKeyDown:any;

		/**
		 * 颜色值输入框 <code>Event.CHANGE</code> 事件侦听处理函数。
		 */
		private onColorInputChange:any;

		/**
		 * 小格子色块的 <code>Event.CLICK</code> 事件侦听处理函数。
		 */
		private onColorTilesClick:any;

		/**
		 * @private 小格子色块的 <code>Event.MOUSE_MOVE</code> 事件侦听处理函数。
		 */
		private onColorTilesMouseMove:any;

		/**
		 * 通过鼠标位置取对应的颜色块的颜色值。
		 */
		protected getColorByMouse():string;

		/**
		 * 绘制颜色块。
		 * @param color 需要绘制的颜色块的颜色值。
		 */
		private drawBlock:any;

		/**
		 * 表示选择的颜色值。
		 */
		get selectedColor():string;
		set selectedColor(value:string);

		/**
		 * @copy laya.ui.Button#skin
		 */
		get skin():string;
		set skin(value:string);

		/**
		 * 改变颜色。
		 */
		private changeColor:any;

		/**
		 * 表示颜色样本列表面板的背景颜色值。
		 */
		get bgColor():string;
		set bgColor(value:string);

		/**
		 * 表示颜色样本列表面板的边框颜色值。
		 */
		get borderColor():string;
		set borderColor(value:string);

		/**
		 * 表示颜色样本列表面板选择或输入的颜色值。
		 */
		get inputColor():string;
		set inputColor(value:string);

		/**
		 * 表示颜色输入框的背景颜色值。
		 */
		get inputBgColor():string;
		set inputBgColor(value:string);

		/**
		 * @private 
		 */
		protected _setPanelChanged():void;
	}

	/**
	 * 当用户更改 <code>ComboBox</code> 组件中的选定内容时调度。
	 * @eventType laya.events.Event
selectedIndex属性变化时调度。
	 */

	/**
	 * <code>ComboBox</code> 组件包含一个下拉列表，用户可以从该列表中选择单个值。
	 * @example <caption>以下示例代码，创建了一个 <code>ComboBox</code> 实例。</caption>
package
{
import laya.ui.ComboBox;
import laya.utils.Handler;
public class ComboBox_Example
{
public function ComboBox_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/button.png", Handler.create(this,onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
trace("资源加载完成！");
var comboBox:ComboBox = new ComboBox("resource/ui/button.png", "item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
comboBox.x = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
comboBox.y = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
comboBox.selectHandler = new Handler(this, onSelect);//设置 comboBox 选择项改变时执行的处理器。
Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
}
private function onSelect(index:int):void
{
trace("当前选中的项对象索引： ",index);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
function loadComplete() {
    console.log("资源加载完成！");
    var comboBox = new laya.ui.ComboBox("resource/ui/button.png", "item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
    comboBox.x = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
    comboBox.y = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
    comboBox.selectHandler = new laya.utils.Handler(this, onSelect);//设置 comboBox 选择项改变时执行的处理器。
    Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
}
function onSelect(index)
{
    console.log("当前选中的项对象索引： ",index);
}
	 * @example import ComboBox = laya.ui.ComboBox;
import Handler = laya.utils.Handler;
class ComboBox_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load("resource/ui/button.png", Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        console.log("资源加载完成！");
        var comboBox: ComboBox = new ComboBox("resource/ui/button.png", "item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
        comboBox.x = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
        comboBox.y = 100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
        comboBox.selectHandler = new Handler(this, this.onSelect);//设置 comboBox 选择项改变时执行的处理器。
        Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
    }
    private onSelect(index: number): void {
        console.log("当前选中的项对象索引： ", index);
    }
}
	 */
	class ComboBox extends UIComponent  {

		/**
		 * @private 
		 */
		protected _visibleNum:number;

		/**
		 * @private 
		 */
		protected _button:Button;

		/**
		 * @private 
		 */
		protected _list:List;

		/**
		 * @private 
		 */
		protected _isOpen:boolean;

		/**
		 * @private 
		 */
		protected _itemColors:any[];

		/**
		 * @private 
		 */
		protected _itemSize:number;

		/**
		 * @private 
		 */
		protected _labels:any[];

		/**
		 * @private 
		 */
		protected _selectedIndex:number;

		/**
		 * @private 
		 */
		protected _selectHandler:Handler;

		/**
		 * @private 
		 */
		protected _itemHeight:number;

		/**
		 * @private 
		 */
		protected _listHeight:number;

		/**
		 * @private 
		 */
		protected _listChanged:boolean;

		/**
		 * @private 
		 */
		protected _itemChanged:boolean;

		/**
		 * @private 
		 */
		protected _scrollBarSkin:string;

		/**
		 * @private 
		 */
		protected _isCustomList:boolean;

		/**
		 * 渲染项，用来显示下拉列表展示对象
		 */
		itemRender:any;

		/**
		 * 创建一个新的 <code>ComboBox</code> 组件实例。
		 * @param skin 皮肤资源地址。
		 * @param labels 下拉列表的标签集字符串。以逗号做分割，如"item0,item1,item2,item3,item4,item5"。
		 */

		constructor(skin?:string,labels?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;
		private _createList:any;
		private _setListEvent:any;

		/**
		 * @private 
		 */
		private onListDown:any;
		private onScrollBarDown:any;
		private onButtonMouseDown:any;

		/**
		 * @copy laya.ui.Button#skin
		 */
		get skin():string;
		set skin(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * @private 
		 */
		protected changeList():void;

		/**
		 * @private 下拉列表的鼠标事件响应函数。
		 */
		protected onlistItemMouse(e:Event,index:number):void;

		/**
		 * @private 
		 */
		private switchTo:any;

		/**
		 * 更改下拉列表的打开状态。
		 */
		protected changeOpen():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * 标签集合字符串。
		 */
		get labels():string;
		set labels(value:string);

		/**
		 * 更改下拉列表。
		 */
		protected changeItem():void;

		/**
		 * 表示选择的下拉列表项的索引。
		 */
		get selectedIndex():number;
		set selectedIndex(value:number);
		private changeSelected:any;

		/**
		 * 改变下拉列表的选择项时执行的处理器(默认返回参数index:int)。
		 */
		get selectHandler():Handler;
		set selectHandler(value:Handler);

		/**
		 * 表示选择的下拉列表项的的标签。
		 */
		get selectedLabel():string;
		set selectedLabel(value:string);

		/**
		 * 获取或设置没有滚动条的下拉列表中可显示的最大行数。
		 */
		get visibleNum():number;
		set visibleNum(value:number);

		/**
		 * 下拉列表项颜色。
		 * <p><b>格式：</b>"悬停或被选中时背景颜色,悬停或被选中时标签颜色,标签颜色,边框颜色,背景颜色"</p>
		 */
		get itemColors():string;
		set itemColors(value:string);

		/**
		 * 下拉列表项标签的字体大小。
		 */
		get itemSize():number;
		set itemSize(value:number);

		/**
		 * 表示下拉列表的打开状态。
		 */
		get isOpen():boolean;
		set isOpen(value:boolean);
		private _onStageMouseWheel:any;

		/**
		 * 关闭下拉列表。
		 */
		protected removeList(e:Event):void;

		/**
		 * 滚动条皮肤。
		 */
		get scrollBarSkin():string;
		set scrollBarSkin(value:string);

		/**
		 * <p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * 获取对 <code>ComboBox</code> 组件所包含的 <code>VScrollBar</code> 滚动条组件的引用。
		 */
		get scrollBar():VScrollBar;

		/**
		 * 获取对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的引用。
		 */
		get button():Button;

		/**
		 * 获取对 <code>ComboBox</code> 组件所包含的 <code>List</code> 列表组件的引用。
		 */
		get list():List;
		set list(value:List);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本标签颜色。
		 * <p><b>格式：</b>upColor,overColor,downColor,disableColor</p>
		 */
		get labelColors():string;
		set labelColors(value:string);

		/**
		 * 获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本边距。
		 * <p><b>格式：</b>上边距,右边距,下边距,左边距</p>
		 */
		get labelPadding():string;
		set labelPadding(value:string);

		/**
		 * 获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的标签字体大小。
		 */
		get labelSize():number;
		set labelSize(value:number);

		/**
		 * 表示按钮文本标签是否为粗体字。
		 * @see laya.display.Text#bold
		 */
		get labelBold():boolean;
		set labelBold(value:boolean);

		/**
		 * 表示按钮文本标签的字体名称，以字符串形式表示。
		 * @see laya.display.Text#font
		 */
		get labelFont():string;
		set labelFont(value:string);

		/**
		 * 表示按钮的状态值。
		 * @see laya.ui.Button#stateNum
		 */
		get stateNum():number;
		set stateNum(value:number);
	}

	/**
	 * <code>Dialog</code> 组件是一个弹出对话框，实现对话框弹出，拖动，模式窗口功能。
	 * 可以通过UIConfig设置弹出框背景透明度，模式窗口点击边缘是否关闭等
	 * 通过设置zOrder属性，可以更改弹出的层次
	 * 通过设置popupEffect和closeEffect可以设置弹出效果和关闭效果，如果不想有任何弹出关闭效果，可以设置前述属性为空
	 * @example <caption>以下示例代码，创建了一个 <code>Dialog</code> 实例。</caption>
package
{
import laya.ui.Dialog;
import laya.utils.Handler;
public class Dialog_Example
{
private var dialog:Dialog_Instance;
public function Dialog_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load("resource/ui/btn_close.png", Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
dialog = new Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
dialog.dragArea = "0,0,150,50";//设置 dialog 的拖拽区域。
dialog.show();//显示 dialog。
dialog.closeHandler = new Handler(this, onClose);//设置 dialog 的关闭函数处理器。
}
private function onClose(name:String):void
{
if (name == Dialog.CLOSE)
{
trace("通过点击 name 为" + name +"的组件，关闭了dialog。");
}
}
}
}
import laya.ui.Button;
import laya.ui.Dialog;
import laya.ui.Image;
class Dialog_Instance extends Dialog
{
function Dialog_Instance():void
{
var bg:Image = new Image("resource/ui/bg.png");
bg.sizeGrid = "40,10,5,10";
bg.width = 150;
bg.height = 250;
addChild(bg);
var image:Image = new Image("resource/ui/image.png");
addChild(image);
var button:Button = new Button("resource/ui/btn_close.png");
button.name = Dialog.CLOSE;//设置button的name属性值。
button.x = 0;
button.y = 0;
addChild(button);
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var dialog;
Laya.loader.load("resource/ui/btn_close.png", laya.utils.Handler.create(this, loadComplete));//加载资源
(function (_super) {//新建一个类Dialog_Instance继承自laya.ui.Dialog。
    function Dialog_Instance() {
        Dialog_Instance.__super.call(this);//初始化父类
        var bg = new laya.ui.Image("resource/ui/bg.png");//新建一个 Image 类的实例 bg 。
        bg.sizeGrid = "10,40,10,5";//设置 bg 的网格信息。
        bg.width = 150;//设置 bg 的宽度。
        bg.height = 250;//设置 bg 的高度。
        this.addChild(bg);//将 bg 添加到显示列表。
        var image = new laya.ui.Image("resource/ui/image.png");//新建一个 Image 类的实例 image 。
        this.addChild(image);//将 image 添加到显示列表。
        var button = new laya.ui.Button("resource/ui/btn_close.png");//新建一个 Button 类的实例 bg 。
        button.name = laya.ui.Dialog.CLOSE;//设置 button 的 name 属性值。
        button.x = 0;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
        button.y = 0;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
        this.addChild(button);//将 button 添加到显示列表。
    };
    Laya.class(Dialog_Instance,"mypackage.dialogExample.Dialog_Instance",_super);//注册类Dialog_Instance。
})(laya.ui.Dialog);
function loadComplete() {
    console.log("资源加载完成！");
    dialog = new mypackage.dialogExample.Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
    dialog.dragArea = "0,0,150,50";//设置 dialog 的拖拽区域。
    dialog.show();//显示 dialog。
    dialog.closeHandler = new laya.utils.Handler(this, onClose);//设置 dialog 的关闭函数处理器。
}
function onClose(name) {
    if (name == laya.ui.Dialog.CLOSE) {
        console.log("通过点击 name 为" + name + "的组件，关闭了dialog。");
    }
}
	 * @example import Dialog = laya.ui.Dialog;
import Handler = laya.utils.Handler;
class Dialog_Example {
    private dialog: Dialog_Instance;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load("resource/ui/btn_close.png", Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        this.dialog = new Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
        this.dialog.dragArea = "0,0,150,50";//设置 dialog 的拖拽区域。
        this.dialog.show();//显示 dialog。
        this.dialog.closeHandler = new Handler(this, this.onClose);//设置 dialog 的关闭函数处理器。
    }
    private onClose(name: string): void {
        if (name == Dialog.CLOSE) {
            console.log("通过点击 name 为" + name + "的组件，关闭了dialog。");
        }
    }
}
import Button = laya.ui.Button;
class Dialog_Instance extends Dialog {
    Dialog_Instance(): void {
        var bg: laya.ui.Image = new laya.ui.Image("resource/ui/bg.png");
        bg.sizeGrid = "40,10,5,10";
        bg.width = 150;
        bg.height = 250;
        this.addChild(bg);
        var image: laya.ui.Image = new laya.ui.Image("resource/ui/image.png");
        this.addChild(image);
        var button: Button = new Button("resource/ui/btn_close.png");
        button.name = Dialog.CLOSE;//设置button的name属性值。
        button.x = 0;
        button.y = 0;
        this.addChild(button);
    }
}
	 */
	class Dialog extends View  {

		/**
		 * 对话框内的某个按钮命名为close，点击此按钮则会关闭
		 */
		static CLOSE:string;

		/**
		 * 对话框内的某个按钮命名为cancel，点击此按钮则会关闭
		 */
		static CANCEL:string;

		/**
		 * 对话框内的某个按钮命名为sure，点击此按钮则会关闭
		 */
		static SURE:string;

		/**
		 * 对话框内的某个按钮命名为no，点击此按钮则会关闭
		 */
		static NO:string;

		/**
		 * 对话框内的某个按钮命名为yes，点击此按钮则会关闭
		 */
		static YES:string;

		/**
		 * 对话框内的某个按钮命名为ok，点击此按钮则会关闭
		 */
		static OK:string;

		/**
		 * @private 表示对话框管理器。
		 */
		private static _manager:any;

		/**
		 * 对话框管理容器，所有的对话框都在该容器内，并且受管理器管理，可以自定义自己的管理器，来更改窗口管理的流程。
		 * 任意对话框打开和关闭，都会触发管理类的open和close事件
		 */
		static get manager():DialogManager;
		static set manager(value:DialogManager);

		/**
		 * 对话框被关闭时会触发的回调函数处理器。
		 * <p>回调函数参数为用户点击的按钮名字name:String。</p>
		 */
		closeHandler:Handler;

		/**
		 * 弹出对话框效果，可以设置一个效果代替默认的弹出效果，如果不想有任何效果，可以赋值为null
		 * 全局默认弹出效果可以通过manager.popupEffect修改
		 */
		popupEffect:Handler;

		/**
		 * 关闭对话框效果，可以设置一个效果代替默认的关闭效果，如果不想有任何效果，可以赋值为null
		 * 全局默认关闭效果可以通过manager.closeEffect修改
		 */
		closeEffect:Handler;

		/**
		 * 组名称
		 */
		group:string;

		/**
		 * 是否是模式窗口
		 */
		isModal:boolean;

		/**
		 * 是否显示弹出效果
		 */
		isShowEffect:boolean;

		/**
		 * 指定对话框是否居中弹。<p>如果值为true，则居中弹出，否则，则根据对象坐标显示，默认为true。</p>
		 */
		isPopupCenter:boolean;

		/**
		 * 关闭类型，点击name为"close"，"cancel"，"sure"，"no"，"yes"，"no"的按钮时，会自动记录点击按钮的名称
		 */
		closeType:string;

		/**
		 * @private 
		 */
		private _dragArea:any;

		constructor();

		/**
		 * @private 提取拖拽区域
		 */
		protected _dealDragArea():void;

		/**
		 * 用来指定对话框的拖拽区域。默认值为"0,0,0,0"。
		 * <p><b>格式：</b>构成一个矩形所需的 x,y,width,heith 值，用逗号连接为字符串。
		 * 例如："0,0,100,200"。</p>
		 * @see #includeExamplesSummary 请参考示例
		 */
		get dragArea():string;
		set dragArea(value:string);

		/**
		 * @private 
		 */
		private _onMouseDown:any;

		/**
		 * @private 处理默认点击事件
		 */
		protected _onClick(e:Event):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		open(closeOther?:boolean,param?:any):void;

		/**
		 * 关闭对话框。
		 * @param type 关闭的原因，会传递给onClosed函数
		 * @override 
		 */
		close(type?:string):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 显示对话框（以非模式窗口方式显示）。
		 * @param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		 * @param showEffect 是否显示弹出效果
		 */
		show(closeOther?:boolean,showEffect?:boolean):void;

		/**
		 * 显示对话框（以模式窗口方式显示）。
		 * @param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		 * @param showEffect 是否显示弹出效果
		 */
		popup(closeOther?:boolean,showEffect?:boolean):void;

		/**
		 * @private 
		 */
		protected _open(modal:boolean,closeOther:boolean,showEffect:boolean):void;

		/**
		 * 弹出框的显示状态；如果弹框处于显示中，则为true，否则为false;
		 */
		get isPopup():boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set zOrder(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get zOrder():number;

		/**
		 * 设置锁定界面，在界面未准备好前显示锁定界面，准备完毕后则移除锁定层，如果为空则什么都不显示
		 * @param view 锁定界面内容
		 */
		static setLockView(view:UIComponent):void;

		/**
		 * 锁定所有层，显示加载条信息，防止下面内容被点击
		 */
		static lock(value:boolean):void;

		/**
		 * 关闭所有对话框。
		 */
		static closeAll():void;

		/**
		 * 根据组获取对话框集合
		 * @param group 组名称
		 * @return 对话框数组
		 */
		static getDialogsByGroup(group:string):any[];

		/**
		 * 根据组关闭所有弹出框
		 * @param group 需要关闭的组名称
		 */
		static closeByGroup(group:string):any[];
	}

	/**
	 * 打开任意窗口后调度。
	 * @eventType Event.OPEN
	 */

	/**
	 * 关闭任意窗口后调度。
	 * @eventType Event.CLOSE
	 */

	/**
	 * <code>DialogManager</code> 对话框管理容器，所有的对话框都在该容器内，并且受管理器管理。
	 * 任意对话框打开和关闭，都会出发管理类的open和close事件
	 * 可以通过UIConfig设置弹出框背景透明度，模式窗口点击边缘是否关闭，点击窗口是否切换层次等
	 * 通过设置对话框的zOrder属性，可以更改弹出的层次
	 */
	class DialogManager extends Sprite  {

		/**
		 * 遮罩层
		 */
		maskLayer:Sprite;

		/**
		 * 锁屏层
		 */
		lockLayer:Sprite;

		/**
		 * @private 全局默认弹出对话框效果，可以设置一个效果代替默认的弹出效果，如果不想有任何效果，可以赋值为null
		 */
		popupEffect:(dialog:Dialog) =>void;

		/**
		 * @private 全局默认关闭对话框效果，可以设置一个效果代替默认的关闭效果，如果不想有任何效果，可以赋值为null
		 */
		closeEffect:(dialog:Dialog) =>void;

		/**
		 * 全局默认关闭对话框效果，可以设置一个效果代替默认的关闭效果，如果不想有任何效果，可以赋值为null
		 */
		popupEffectHandler:Handler;

		/**
		 * 全局默认弹出对话框效果，可以设置一个效果代替默认的弹出效果，如果不想有任何效果，可以赋值为null
		 */
		closeEffectHandler:Handler;

		/**
		 * 创建一个新的 <code>DialogManager</code> 类实例。
		 */

		constructor();
		private _closeOnSide:any;

		/**
		 * 设置锁定界面，如果为空则什么都不显示
		 */
		setLockView(value:UIComponent):void;

		/**
		 * @private 
		 */
		private _onResize:any;
		private _centerDialog:any;

		/**
		 * 显示对话框
		 * @param dialog 需要显示的对象框 <code>Dialog</code> 实例。
		 * @param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
		 * @param showEffect 是否显示弹出效果
		 */
		open(dialog:Dialog,closeOther?:boolean,showEffect?:boolean):void;

		/**
		 * @private 
		 */
		private _clearDialogEffect:any;

		/**
		 * 执行打开对话框。
		 * @param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
		 */
		doOpen(dialog:Dialog):void;

		/**
		 * 锁定所有层，显示加载条信息，防止双击
		 */
		lock(value:boolean):void;

		/**
		 * 关闭对话框。
		 * @param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
		 */
		close(dialog:Dialog):void;

		/**
		 * 执行关闭对话框。
		 * @param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
		 */
		doClose(dialog:Dialog):void;

		/**
		 * 关闭所有的对话框。
		 */
		closeAll():void;

		/**
		 * @private 
		 */
		private _closeAll:any;

		/**
		 * 根据组获取所有对话框
		 * @param group 组名称
		 * @return 对话框数组
		 */
		getDialogsByGroup(group:string):any[];

		/**
		 * 根据组关闭所有弹出框
		 * @param group 需要关闭的组名称
		 * @return 需要关闭的对话框数组
		 */
		closeByGroup(group:string):any[];
	}

	/**
	 * 字体切片，简化版的位图字体，只需设置一个切片图片和文字内容即可使用，效果同位图字体
	 * 使用方式：设置位图字体皮肤skin，设置皮肤对应的字体内容sheet（如果多行，可以使用空格换行），示例：
	 * fontClip.skin = "font1.png";//设置皮肤
	 * fontClip.sheet = "abc123 456";//设置皮肤对应的内容，空格换行。此皮肤为2行5列（显示时skin会被等分为2行5列），第一行对应的文字为"abc123"，第二行为"456"
	 * fontClip.value = "a1326";//显示"a1326"文字
	 */
	class FontClip extends Clip  {

		/**
		 * 数值
		 */
		protected _valueArr:string;

		/**
		 * 文字内容数组*
		 */
		protected _indexMap:any;

		/**
		 * 位图字体内容*
		 */
		protected _sheet:string;

		/**
		 * @private 
		 */
		protected _direction:string;

		/**
		 * X方向间隙
		 */
		protected _spaceX:number;

		/**
		 * Y方向间隙
		 */
		protected _spaceY:number;

		/**
		 * @private 水平对齐方式
		 */
		private _align:any;

		/**
		 * @private 显示文字宽
		 */
		private _wordsW:any;

		/**
		 * @private 显示文字高
		 */
		private _wordsH:any;

		/**
		 * @param skin 位图字体皮肤
		 * @param sheet 位图字体内容，空格代表换行
		 */

		constructor(skin?:string,sheet?:string);

		/**
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * 资源加载完毕
		 */
		private _onClipLoaded:any;

		/**
		 * 设置位图字体内容，空格代表换行。比如"abc123 456"，代表第一行对应的文字为"abc123"，第二行为"456"
		 */
		get sheet():string;
		set sheet(value:string);

		/**
		 * 设置位图字体的显示内容
		 */
		get value():string;
		set value(value:string);

		/**
		 * 布局方向。
		 * <p>默认值为"horizontal"。</p>
		 * <p><b>取值：</b>
		 * <li>"horizontal"：表示水平布局。</li>
		 * <li>"vertical"：表示垂直布局。</li>
		 * </p>
		 */
		get direction():string;
		set direction(value:string);

		/**
		 * X方向文字间隙
		 */
		get spaceX():number;
		set spaceX(value:number);

		/**
		 * Y方向文字间隙
		 */
		get spaceY():number;
		set spaceY(value:number);
		set align(v:string);

		/**
		 * 水平对齐方式
		 */
		get align():string;

		/**
		 * 渲染数值
		 */
		protected changeValue():void;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * @param destroyChild 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;
	}

	/**
	 * <code>HBox</code> 是一个水平布局容器类。
	 */
	class HBox extends LayoutBox  {

		/**
		 * 无对齐。
		 */
		static NONE:string;

		/**
		 * 居顶部对齐。
		 */
		static TOP:string;

		/**
		 * 居中对齐。
		 */
		static MIDDLE:string;

		/**
		 * 居底部对齐。
		 */
		static BOTTOM:string;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected sortItem(items:any[]):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected changeItems():void;
	}

	/**
	 * 使用 <code>HScrollBar</code> （水平 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	 * @example <caption>以下示例代码，创建了一个 <code>HScrollBar</code> 实例。</caption>
package
{
import laya.ui.HScrollBar;
import laya.utils.Handler;
public class HScrollBar_Example
{
private var hScrollBar:HScrollBar;
public function HScrollBar_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/hscroll.png", "resource/ui/hscroll$bar.png", "resource/ui/hscroll$down.png", "resource/ui/hscroll$up.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
hScrollBar = new HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
hScrollBar.skin = "resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
hScrollBar.x = 100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
hScrollBar.y = 100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
hScrollBar.changeHandler = new Handler(this, onChange);//设置 hScrollBar 的滚动变化处理器。
Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
}
private function onChange(value:Number):void
{
trace("滚动条的位置： value=" + value);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var hScrollBar;
var res  = ["resource/ui/hscroll.png", "resource/ui/hscroll$bar.png", "resource/ui/hscroll$down.png", "resource/ui/hscroll$up.png"];
Laya.loader.load(res,laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete() {
    console.log("资源加载完成！");
    hScrollBar = new laya.ui.HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
    hScrollBar.skin = "resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
    hScrollBar.x = 100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
    hScrollBar.y = 100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
    hScrollBar.changeHandler = new laya.utils.Handler(this, onChange);//设置 hScrollBar 的滚动变化处理器。
    Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
}
function onChange(value)
{
    console.log("滚动条的位置： value=" + value);
}
	 * @example import HScrollBar = laya.ui.HScrollBar;
import Handler = laya.utils.Handler;
class HScrollBar_Example {
    private hScrollBar: HScrollBar;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/hscroll.png", "resource/ui/hscroll$bar.png", "resource/ui/hscroll$down.png", "resource/ui/hscroll$up.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        this.hScrollBar = new HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
        this.hScrollBar.skin = "resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
        this.hScrollBar.x = 100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
        this.hScrollBar.y = 100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
        this.hScrollBar.changeHandler = new Handler(this, this.onChange);//设置 hScrollBar 的滚动变化处理器。
        Laya.stage.addChild(this.hScrollBar);//将此 hScrollBar 对象添加到显示列表。
    }
    private onChange(value: number): void {
        console.log("滚动条的位置： value=" + value);
    }
}
	 */
	class HScrollBar extends ScrollBar  {

		/**
		 * @override 
		 * @inheritDoc 
		 */
		protected initialize():void;
	}

	/**
	 * 使用 <code>HSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	 * <p> <code>HSlider</code> 控件采用水平方向。滑块轨道从左向右扩展，而标签位于轨道的顶部或底部。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>HSlider</code> 实例。</caption>
package
{
import laya.ui.HSlider;
import laya.utils.Handler;
public class HSlider_Example
{
private var hSlider:HSlider;
public function HSlider_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/hslider.png", "resource/ui/hslider$bar.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
hSlider = new HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
hSlider.skin = "resource/ui/hslider.png";//设置 hSlider 的皮肤。
hSlider.min = 0;//设置 hSlider 最低位置值。
hSlider.max = 10;//设置 hSlider 最高位置值。
hSlider.value = 2;//设置 hSlider 当前位置值。
hSlider.tick = 1;//设置 hSlider 刻度值。
hSlider.x = 100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
hSlider.y = 100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
hSlider.changeHandler = new Handler(this, onChange);//设置 hSlider 位置变化处理器。
Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
}
private function onChange(value:Number):void
{
trace("滑块的位置： value=" + value);
}
}
}
	 * @example Laya.init(640, 800, "canvas");//设置游戏画布宽高、渲染模式
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var hSlider;
var res = ["resource/ui/hslider.png", "resource/ui/hslider$bar.png"];
Laya.loader.load(res, laya.utils.Handler.create(this, onLoadComplete));
function onLoadComplete() {
    console.log("资源加载完成！");
    hSlider = new laya.ui.HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
    hSlider.skin = "resource/ui/hslider.png";//设置 hSlider 的皮肤。
    hSlider.min = 0;//设置 hSlider 最低位置值。
    hSlider.max = 10;//设置 hSlider 最高位置值。
    hSlider.value = 2;//设置 hSlider 当前位置值。
    hSlider.tick = 1;//设置 hSlider 刻度值。
    hSlider.x = 100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
    hSlider.y = 100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
    hSlider.changeHandler = new laya.utils.Handler(this, onChange);//设置 hSlider 位置变化处理器。
    Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
}
function onChange(value)
{
    console.log("滑块的位置： value=" + value);
}
	 * @example import Handler = laya.utils.Handler;
import HSlider = laya.ui.HSlider;
class HSlider_Example {
    private hSlider: HSlider;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/hslider.png", "resource/ui/hslider$bar.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        this.hSlider = new HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
        this.hSlider.skin = "resource/ui/hslider.png";//设置 hSlider 的皮肤。
        this.hSlider.min = 0;//设置 hSlider 最低位置值。
        this.hSlider.max = 10;//设置 hSlider 最高位置值。
        this.hSlider.value = 2;//设置 hSlider 当前位置值。
        this.hSlider.tick = 1;//设置 hSlider 刻度值。
        this.hSlider.x = 100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
        this.hSlider.y = 100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
        this.hSlider.changeHandler = new Handler(this, this.onChange);//设置 hSlider 位置变化处理器。
        Laya.stage.addChild(this.hSlider);//把 hSlider 添加到显示列表。
    }
    private onChange(value: number): void {
        console.log("滑块的位置： value=" + value);
    }
}
	 * @see laya.ui.Slider
	 */
	class HSlider extends Slider  {

		/**
		 * 创建一个 <code>HSlider</code> 类实例。
		 * @param skin 皮肤。
		 */

		constructor(skin?:string);
	}

	interface IBox{
	}


	interface IItem{

		/**
		 * 初始化列表项。
		 */
		initItems():void;
	}


	/**
	 * 资源加载完成后调度。
	 * @eventType Event.LOADED
	 */

	/**
	 * <code>Image</code> 类是用于表示位图图像或绘制图形的显示对象。
	 * Image和Clip组件是唯一支持异步加载的两个组件，比如img.skin = "abc/xxx.png"，其他UI组件均不支持异步加载。
	 * @example <caption>以下示例代码，创建了一个新的 <code>Image</code> 实例，设置了它的皮肤、位置信息，并添加到舞台上。</caption>
package
{
import laya.ui.Image;
public class Image_Example
{
public function Image_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
onInit();
}
private function onInit():void
{
var bg:Image = new Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
bg.x = 100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
bg.y = 100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
bg.sizeGrid = "40,10,5,10";//设置 bg 对象的网格信息。
bg.width = 150;//设置 bg 对象的宽度。
bg.height = 250;//设置 bg 对象的高度。
Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
var image:Image = new Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
image.x = 100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
image.y = 100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
onInit();
function onInit() {
    var bg = new laya.ui.Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
    bg.x = 100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
    bg.y = 100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
    bg.sizeGrid = "40,10,5,10";//设置 bg 对象的网格信息。
    bg.width = 150;//设置 bg 对象的宽度。
    bg.height = 250;//设置 bg 对象的高度。
    Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
    var image = new laya.ui.Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
    image.x = 100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
    image.y = 100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
    Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
}
	 * @example class Image_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.onInit();
    }
    private onInit(): void {
        var bg: laya.ui.Image = new laya.ui.Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
        bg.x = 100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
        bg.y = 100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
        bg.sizeGrid = "40,10,5,10";//设置 bg 对象的网格信息。
        bg.width = 150;//设置 bg 对象的宽度。
        bg.height = 250;//设置 bg 对象的高度。
        Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
        var image: laya.ui.Image = new laya.ui.Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
        image.x = 100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
        image.y = 100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
        Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
    }
}
	 * @see laya.ui.AutoBitmap
	 */
	class Image extends UIComponent  {

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _group:string;

		/**
		 * 创建一个 <code>Image</code> 实例。
		 * @param skin 皮肤资源地址。
		 */

		constructor(skin?:string|null);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 销毁对象并释放加载的皮肤资源。
		 */
		dispose():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * <p>对象的皮肤地址，以字符串表示。</p>
		 * <p>如果资源未加载，则先加载资源，加载完成后应用于此对象。</p>
		 * <b>注意：</b>资源加载完成后，会自动缓存至资源库中。
		 */
		get skin():string;
		set skin(value:string);

		/**
		 * @copy laya.ui.AutoBitmap#source
		 */
		get source():Texture;
		set source(value:Texture);

		/**
		 * 资源分组。
		 */
		get group():string;
		set group(value:string);

		/**
		 * @private 设置皮肤资源。
		 */
		protected setSource(url:string,img?:any):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * <p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"。</li></ul></p>
		 * @see laya.ui.AutoBitmap#sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;
	}

	interface IRender{

		/**
		 * 渲染项。
		 */
		itemRender:any;
	}


	interface ISelect{

		/**
		 * 一个布尔值，表示是否被选择。
		 */
		selected:boolean;

		/**
		 * 对象的点击事件回掉函数处理器。
		 */
		clickHandler:Handler;
	}


	/**
	 * 文本内容发生改变后调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <p> <code>Label</code> 类用于创建显示对象以显示文本。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>Label</code> 实例。</caption>
package
{
import laya.ui.Label;
public class Label_Example
{
public function Label_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
onInit();
}
private function onInit():void
{
var label:Label = new Label();//创建一个 Label 类的实例对象 label 。
label.font = "Arial";//设置 label 的字体。
label.bold = true;//设置 label 显示为粗体。
label.leading = 4;//设置 label 的行间距。
label.wordWrap = true;//设置 label 自动换行。
label.padding = "10,10,10,10";//设置 label 的边距。
label.color = "#ff00ff";//设置 label 的颜色。
label.text = "Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
label.x = 100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
label.y = 100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
label.width = 300;//设置 label 的宽度。
label.height = 200;//设置 label 的高度。
Laya.stage.addChild(label);//将 label 添加到显示列表。
var passwordLabel:Label = new Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
passwordLabel.asPassword = true;//设置 passwordLabel 的显示反式为密码显示。
passwordLabel.x = 100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
passwordLabel.y = 350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
passwordLabel.width = 300;//设置 passwordLabel 的宽度。
passwordLabel.color = "#000000";//设置 passwordLabel 的文本颜色。
passwordLabel.bgColor = "#ccffff";//设置 passwordLabel 的背景颜色。
passwordLabel.fontSize = 20;//设置 passwordLabel 的文本字体大小。
Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
onInit();
function onInit(){
    var label = new laya.ui.Label();//创建一个 Label 类的实例对象 label 。
    label.font = "Arial";//设置 label 的字体。
    label.bold = true;//设置 label 显示为粗体。
    label.leading = 4;//设置 label 的行间距。
    label.wordWrap = true;//设置 label 自动换行。
    label.padding = "10,10,10,10";//设置 label 的边距。
    label.color = "#ff00ff";//设置 label 的颜色。
    label.text = "Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
    label.x = 100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
    label.y = 100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
    label.width = 300;//设置 label 的宽度。
    label.height = 200;//设置 label 的高度。
    Laya.stage.addChild(label);//将 label 添加到显示列表。
    var passwordLabel = new laya.ui.Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
    passwordLabel.asPassword = true;//设置 passwordLabel 的显示反式为密码显示。
    passwordLabel.x = 100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
    passwordLabel.y = 350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
    passwordLabel.width = 300;//设置 passwordLabel 的宽度。
    passwordLabel.color = "#000000";//设置 passwordLabel 的文本颜色。
    passwordLabel.bgColor = "#ccffff";//设置 passwordLabel 的背景颜色。
    passwordLabel.fontSize = 20;//设置 passwordLabel 的文本字体大小。
    Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
}
	 * @example import Label = laya.ui.Label;
class Label_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        this.onInit();
    }
    private onInit(): void {
        var label: Label = new Label();//创建一个 Label 类的实例对象 label 。
        label.font = "Arial";//设置 label 的字体。
        label.bold = true;//设置 label 显示为粗体。
        label.leading = 4;//设置 label 的行间距。
        label.wordWrap = true;//设置 label 自动换行。
        label.padding = "10,10,10,10";//设置 label 的边距。
        label.color = "#ff00ff";//设置 label 的颜色。
        label.text = "Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
        label.x = 100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
        label.y = 100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
        label.width = 300;//设置 label 的宽度。
        label.height = 200;//设置 label 的高度。
        Laya.stage.addChild(label);//将 label 添加到显示列表。
        var passwordLabel: Label = new Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
        passwordLabel.asPassword = true;//设置 passwordLabel 的显示反式为密码显示。
        passwordLabel.x = 100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
        passwordLabel.y = 350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
        passwordLabel.width = 300;//设置 passwordLabel 的宽度。
        passwordLabel.color = "#000000";//设置 passwordLabel 的文本颜色。
        passwordLabel.bgColor = "#ccffff";//设置 passwordLabel 的背景颜色。
        passwordLabel.fontSize = 20;//设置 passwordLabel 的文本字体大小。
        Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
    }
}
	 * @see laya.display.Text
	 */
	class Label extends UIComponent  {

		/**
		 * @private 文本 <code>Text</code> 实例。
		 */
		protected _tf:Text;

		/**
		 * 创建一个新的 <code>Label</code> 实例。
		 * @param text 文本内容字符串。
		 */

		constructor(text?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @override 
		 * @inheritDoc 
		 */
		protected createChildren():void;

		/**
		 * 当前文本内容字符串。
		 * @see laya.display.Text.text
		 */
		get text():string;
		set text(value:string);

		/**
		 * @copy laya.display.Text#changeText()
		 */
		changeText(text:string):void;

		/**
		 * @copy laya.display.Text#wordWrap
		 */
		get wordWrap():boolean;

		/**
		 * @copy laya.display.Text#wordWrap
		 */
		set wordWrap(value:boolean);

		/**
		 * @copy laya.display.Text#color
		 */
		get color():string;
		set color(value:string);

		/**
		 * @copy laya.display.Text#font
		 */
		get font():string;
		set font(value:string);

		/**
		 * @copy laya.display.Text#align
		 */
		get align():string;
		set align(value:string);

		/**
		 * @copy laya.display.Text#valign
		 */
		get valign():string;
		set valign(value:string);

		/**
		 * @copy laya.display.Text#bold
		 */
		get bold():boolean;
		set bold(value:boolean);

		/**
		 * @copy laya.display.Text#italic
		 */
		get italic():boolean;
		set italic(value:boolean);

		/**
		 * @copy laya.display.Text#leading
		 */
		get leading():number;
		set leading(value:number);

		/**
		 * @copy laya.display.Text#fontSize
		 */
		get fontSize():number;
		set fontSize(value:number);

		/**
		 * <p>边距信息</p>
		 * <p>"上边距，右边距，下边距 , 左边距（边距以像素为单位）"</p>
		 * @see laya.display.Text.padding
		 */
		get padding():string;
		set padding(value:string);

		/**
		 * @copy laya.display.Text#bgColor
		 */
		get bgColor():string;
		set bgColor(value:string);

		/**
		 * @copy laya.display.Text#borderColor
		 */
		get borderColor():string;
		set borderColor(value:string);

		/**
		 * @copy laya.display.Text#stroke
		 */
		get stroke():number;
		set stroke(value:number);

		/**
		 * @copy laya.display.Text#strokeColor
		 */
		get strokeColor():string;
		set strokeColor(value:string);

		/**
		 * 文本控件实体 <code>Text</code> 实例。
		 */
		get textField():Text;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * @copy laya.display.Text#overflow
		 */
		get overflow():string;

		/**
		 * @copy laya.display.Text#overflow
		 */
		set overflow(value:string);

		/**
		 * @copy laya.display.Text#underline
		 */
		get underline():boolean;

		/**
		 * @copy laya.display.Text#underline
		 */
		set underline(value:boolean);

		/**
		 * @copy laya.display.Text#underlineColor
		 */
		get underlineColor():string;

		/**
		 * @copy laya.display.Text#underlineColor
		 */
		set underlineColor(value:string);
	}

	/**
	 * <code>LayoutBox</code> 是一个布局容器类。
	 */
	class LayoutBox extends Box  {

		/**
		 * @private 
		 */
		protected _space:number;

		/**
		 * @private 
		 */
		protected _align:string;

		/**
		 * @private 
		 */
		protected _itemChanged:boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		addChild(child:Node):Node;
		private onResize:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		addChildAt(child:Node,index:number):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		removeChildAt(index:number):Node;

		/**
		 * 刷新。
		 */
		refresh():void;

		/**
		 * 改变子对象的布局。
		 */
		protected changeItems():void;

		/**
		 * 子对象的间隔。
		 */
		get space():number;
		set space(value:number);

		/**
		 * 子对象对齐方式。
		 */
		get align():string;
		set align(value:string);

		/**
		 * 排序项目列表。可通过重写改变默认排序规则。
		 * @param items 项目列表。
		 */
		protected sortItem(items:any[]):void;
		protected _setItemChanged():void;
	}

	/**
	 * 当对象的 <code>selectedIndex</code> 属性发生变化时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * 渲染列表的单元项对象时调度。
	 * @eventType Event.RENDER
	 */

	/**
	 * <code>List</code> 控件可显示项目列表。默认为垂直方向列表。可通过UI编辑器自定义列表。
	 * @example <caption>以下示例代码，创建了一个 <code>List</code> 实例。</caption>
package
{
import laya.ui.List;
import laya.utils.Handler;
public class List_Example
{
public function List_Example()
{
Laya.init(640, 800, "false");//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"], Handler.create(this, onLoadComplete));
}
private function onLoadComplete():void
{
var arr:Array = [];//创建一个数组，用于存贮列表的数据信息。
for (var i:int = 0; i &lt; 20; i++)
{
arr.push({label: "item" + i});
}
var list:List = new List();//创建一个 List 类的实例对象 list 。
list.itemRender = Item;//设置 list 的单元格渲染器。
list.repeatX = 1;//设置 list 的水平方向单元格数量。
list.repeatY = 10;//设置 list 的垂直方向单元格数量。
list.vScrollBarSkin = "resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
list.array = arr;//设置 list 的列表数据源。
list.pos(100, 100);//设置 list 的位置。
list.selectEnable = true;//设置 list 可选。
list.selectHandler = new Handler(this, onSelect);//设置 list 改变选择项执行的处理器。
Laya.stage.addChild(list);//将 list 添加到显示列表。
}
private function onSelect(index:int):void
{
trace("当前选择的项目索引： index= ", index);
}
}
}
import laya.ui.Box;
import laya.ui.Label;
class Item extends Box
{
public function Item()
{
graphics.drawRect(0, 0, 100, 20,null, "#ff0000");
var label:Label = new Label();
label.text = "100000";
label.name = "label";//设置 label 的name属性值。
label.size(100, 20);
addChild(label);
}
}
	 * @example (function (_super){
    function Item(){
        Item.__super.call(this);//初始化父类
        this.graphics.drawRect(0, 0, 100, 20, "#ff0000");
        var label = new laya.ui.Label();//创建一个 Label 类的实例对象 label 。
        label.text = "100000";//设置 label 的文本内容。
        label.name = "label";//设置 label 的name属性值。
        label.size(100, 20);//设置 label 的宽度、高度。
        this.addChild(label);//将 label 添加到显示列表。
    };
    Laya.class(Item,"mypackage.listExample.Item",_super);//注册类 Item 。
})(laya.ui.Box);
 Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
var res = ["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"];
Laya.loader.load(res, new laya.utils.Handler(this, onLoadComplete));//加载资源。
 function onLoadComplete() {
    var arr = [];//创建一个数组，用于存贮列表的数据信息。
    for (var i = 0; i &lt; 20; i++) {
        arr.push({label: "item" + i});
    }
     var list = new laya.ui.List();//创建一个 List 类的实例对象 list 。
    list.itemRender = mypackage.listExample.Item;//设置 list 的单元格渲染器。
    list.repeatX = 1;//设置 list 的水平方向单元格数量。
    list.repeatY = 10;//设置 list 的垂直方向单元格数量。
    list.vScrollBarSkin = "resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
    list.array = arr;//设置 list 的列表数据源。
    list.pos(100, 100);//设置 list 的位置。
    list.selectEnable = true;//设置 list 可选。
    list.selectHandler = new laya.utils.Handler(this, onSelect);//设置 list 改变选择项执行的处理器。
    Laya.stage.addChild(list);//将 list 添加到显示列表。
}
 function onSelect(index)
{
    console.log("当前选择的项目索引： index= ", index);
}
	 * @example import List = laya.ui.List;
import Handler = laya.utils.Handler;
public class List_Example {
    public List_Example() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"], Handler.create(this, this.onLoadComplete));
    }
    private onLoadComplete(): void {
        var arr= [];//创建一个数组，用于存贮列表的数据信息。
        for (var i: number = 0; i &lt; 20; i++)
        {
            arr.push({ label: "item" + i });
        }
        var list: List = new List();//创建一个 List 类的实例对象 list 。
        list.itemRender = Item;//设置 list 的单元格渲染器。
        list.repeatX = 1;//设置 list 的水平方向单元格数量。
        list.repeatY = 10;//设置 list 的垂直方向单元格数量。
        list.vScrollBarSkin = "resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
        list.array = arr;//设置 list 的列表数据源。
        list.pos(100, 100);//设置 list 的位置。
        list.selectEnable = true;//设置 list 可选。
        list.selectHandler = new Handler(this, this.onSelect);//设置 list 改变选择项执行的处理器。
        Laya.stage.addChild(list);//将 list 添加到显示列表。
    }
    private onSelect(index: number): void {
        console.log("当前选择的项目索引： index= ", index);
    }
}
import Box = laya.ui.Box;
import Label = laya.ui.Label;
class Item extends Box {
    constructor() {
        this.graphics.drawRect(0, 0, 100, 20, null, "#ff0000");
        var label: Label = new Label();
        label.text = "100000";
        label.name = "label";//设置 label 的name属性值。
        label.size(100, 20);
        this.addChild(label);
    }
}
	 */
	class List extends Box implements IRender,IItem  {

		/**
		 * 改变 <code>List</code> 的选择项时执行的处理器，(默认返回参数： 项索引（index:int）)。
		 */
		selectHandler:Handler|null;

		/**
		 * 单元格渲染处理器(默认返回参数cell:Box,index:int)。
		 */
		renderHandler:Handler|null;

		/**
		 * 单元格鼠标事件处理器(默认返回参数e:Event,index:int)。
		 */
		mouseHandler:Handler|null;

		/**
		 * 指定是否可以选择，若值为true则可以选择，否则不可以选择。 @default false
		 */
		selectEnable:boolean;

		/**
		 * 最大分页数。
		 */
		totalPage:number;

		/**
		 * @private 
		 */
		protected _content:Box;

		/**
		 * @private 
		 */
		protected _scrollBar:ScrollBar|null;

		/**
		 * @private 
		 */
		protected _itemRender:any;

		/**
		 * @private 
		 */
		protected _repeatX:number;

		/**
		 * @private 
		 */
		protected _repeatY:number;

		/**
		 * @private 
		 */
		protected _repeatX2:number;

		/**
		 * @private 
		 */
		protected _repeatY2:number;

		/**
		 * @private 
		 */
		protected _spaceX:number;

		/**
		 * @private 
		 */
		protected _spaceY:number;

		/**
		 * @private 
		 */
		protected _cells:Box[];

		/**
		 * @private 
		 */
		protected _array:any[]|null;

		/**
		 * @private 
		 */
		protected _startIndex:number;

		/**
		 * @private 
		 */
		protected _selectedIndex:number;

		/**
		 * @private 
		 */
		protected _page:number;

		/**
		 * @private 
		 */
		protected _isVertical:boolean;

		/**
		 * @private 
		 */
		protected _cellSize:number;

		/**
		 * @private 
		 */
		protected _cellOffset:number;

		/**
		 * @private 
		 */
		protected _isMoved:boolean;

		/**
		 * 是否缓存内容，如果数据源较少，并且list内无动画，设置此属性为true能大大提高性能
		 */
		cacheContent:boolean;

		/**
		 * @private 
		 */
		protected _createdLine:number;

		/**
		 * @private 
		 */
		protected _cellChanged:boolean;

		/**
		 * @private 
		 */
		protected _offset:Point;

		/**
		 * @private 
		 */
		protected _usedCache:string|null;

		/**
		 * @private 
		 */
		protected _elasticEnabled:boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set cacheAs(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get cacheAs():string;
		private onScrollStart:any;
		private onScrollEnd:any;

		/**
		 * 获取对 <code>List</code> 组件所包含的内容容器 <code>Box</code> 组件的引用。
		 */
		get content():Box;

		/**
		 * 垂直方向滚动条皮肤。
		 */
		get vScrollBarSkin():string;
		set vScrollBarSkin(value:string);
		private _removePreScrollBar:any;

		/**
		 * 水平方向滚动条皮肤。
		 */
		get hScrollBarSkin():string;
		set hScrollBarSkin(value:string);

		/**
		 * 获取对 <code>List</code> 组件所包含的滚动条 <code>ScrollBar</code> 组件的引用。
		 */
		get scrollBar():ScrollBar|null;
		set scrollBar(value:ScrollBar|null);

		/**
		 * 单元格渲染器。
		 * <p><b>取值：</b>
		 * <ol>
		 * <li>单元格类对象。</li>
		 * <li> UI 的 JSON 描述。</li>
		 * </ol></p>
		 * @implements 
		 */
		get itemRender():any;
		set itemRender(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * 水平方向显示的单元格数量。
		 */
		get repeatX():number;
		set repeatX(value:number);

		/**
		 * 垂直方向显示的单元格数量。
		 */
		get repeatY():number;
		set repeatY(value:number);

		/**
		 * 水平方向显示的单元格之间的间距（以像素为单位）。
		 */
		get spaceX():number;
		set spaceX(value:number);

		/**
		 * 垂直方向显示的单元格之间的间距（以像素为单位）。
		 */
		get spaceY():number;
		set spaceY(value:number);

		/**
		 * @private 更改单元格的信息。
在此销毁、创建单元格，并设置单元格的位置等属性。相当于此列表内容发送改变时调用此函数。
		 */
		protected changeCells():void;
		private _getOneCell:any;
		private _createItems:any;
		protected createItem():Box;

		/**
		 * @private 添加单元格。
		 * @param cell 需要添加的单元格对象。
		 */
		protected addCell(cell:Box):void;

		/**
		 * 初始化单元格信息。
		 */
		initItems():void;

		/**
		 * 设置可视区域大小。
		 * <p>以（0，0，width参数，height参数）组成的矩形区域为可视区域。</p>
		 * @param width 可视区域宽度。
		 * @param height 可视区域高度。
		 */
		setContentSize(width:number,height:number):void;

		/**
		 * @private 单元格的鼠标事件侦听处理函数。
		 */
		protected onCellMouse(e:Event):void;

		/**
		 * @private 改变单元格的可视状态。
		 * @param cell 单元格对象。
		 * @param visable 是否显示。
		 * @param index 单元格的属性 <code>index</code> 值。
		 */
		protected changeCellState(cell:Box,visible:boolean,index:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _sizeChanged():void;

		/**
		 * @private 滚动条的 <code>Event.CHANGE</code> 事件侦听处理函数。
		 */
		protected onScrollBarChange(e?:Event|null):void;
		private posCell:any;

		/**
		 * 表示当前选择的项索引。selectedIndex值更改会引起list重新渲染
		 */
		get selectedIndex():number;
		set selectedIndex(value:number);

		/**
		 * @private 改变单元格的选择状态。
		 */
		protected changeSelectStatus():void;

		/**
		 * 当前选中的单元格数据源。
		 */
		get selectedItem():any;
		set selectedItem(value:any);

		/**
		 * 获取或设置当前选择的单元格对象。
		 */
		get selection():Box;
		set selection(value:Box);

		/**
		 * 当前显示的单元格列表的开始索引。
		 */
		get startIndex():number;
		set startIndex(value:number);

		/**
		 * @private 渲染单元格列表。
		 */
		protected renderItems(from?:number,to?:number):void;

		/**
		 * 渲染一个单元格。
		 * @param cell 需要渲染的单元格对象。
		 * @param index 单元格索引。
		 */
		protected renderItem(cell:Box,index:number):void;
		private _bindData:any;

		/**
		 * 列表数据源。
		 */
		get array():any[];
		private _preLen:any;
		set array(value:any[]);

		/**
		 * 更新数据源，不刷新list，只增加滚动长度
		 * @param array 数据源
		 */
		updateArray(array:any[]):void;

		/**
		 * 列表的当前页码。
		 */
		get page():number;
		set page(value:number);

		/**
		 * 列表的数据总个数。
		 */
		get length():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 单元格集合。
		 */
		get cells():Box[];

		/**
		 * 是否开启橡皮筋效果
		 */
		get elasticEnabled():boolean;
		set elasticEnabled(value:boolean);

		/**
		 * 刷新列表数据源。
		 */
		refresh():void;

		/**
		 * 获取单元格数据源。
		 * @param index 单元格索引。
		 */
		getItem(index:number):any;

		/**
		 * 修改单元格数据源。
		 * @param index 单元格索引。
		 * @param source 单元格数据源。
		 */
		changeItem(index:number,source:any):void;

		/**
		 * 设置单元格数据源。
		 * @param index 单元格索引。
		 * @param source 单元格数据源。
		 */
		setItem(index:number,source:any):void;

		/**
		 * 添加单元格数据源。
		 * @param source 数据源。
		 */
		addItem(source:any):void;

		/**
		 * 添加单元格数据源到对应的数据索引处。
		 * @param souce 单元格数据源。
		 * @param index 索引。
		 */
		addItemAt(souce:any,index:number):void;

		/**
		 * 通过数据源索引删除单元格数据源。
		 * @param index 需要删除的数据源索引值。
		 */
		deleteItem(index:number):void;

		/**
		 * 通过可视单元格索引，获取单元格。
		 * @param index 可视单元格索引。
		 * @return 单元格对象。
		 */
		getCell(index:number):Box|null;

		/**
		 * <p>滚动列表，以设定的数据索引对应的单元格为当前可视列表的第一项。</p>
		 * @param index 单元格在数据列表中的索引。
		 */
		scrollTo(index:number):void;

		/**
		 * <p>缓动滚动列表，以设定的数据索引对应的单元格为当前可视列表的第一项。</p>
		 * @param index 单元格在数据列表中的索引。
		 * @param time 缓动时间。
		 * @param complete 缓动结束回掉
		 */
		tweenTo(index:number,time?:number,complete?:Handler|null):void;

		/**
		 * @private 
		 */
		protected _setCellChanged():void;

		/**
		 * @override 
		 */
		protected commitMeasure():void;
	}

	/**
	 * <code>Panel</code> 是一个面板容器类。
	 */
	class Panel extends Box  {

		/**
		 * @private 
		 */
		protected _content:Box;

		/**
		 * @private 
		 */
		protected _vScrollBar:VScrollBar;

		/**
		 * @private 
		 */
		protected _hScrollBar:HScrollBar;

		/**
		 * @private 
		 */
		protected _scrollChanged:boolean;

		/**
		 * @private 
		 */
		protected _usedCache:string;

		/**
		 * @private 
		 */
		protected _elasticEnabled:boolean;

		/**
		 * 创建一个新的 <code>Panel</code> 类实例。
		 * <p>在 <code>Panel</code> 构造函数中设置属性width、height的值都为100。</p>
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroyChildren():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		addChild(child:Node):Node;

		/**
		 * @private 子对象的 <code>Event.RESIZE</code> 事件侦听处理函数。
		 */
		private onResize:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		addChildAt(child:Node,index:number):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		removeChild(child:Node):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		removeChildAt(index:number):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		removeChildren(beginIndex?:number,endIndex?:number):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		getChildAt(index:number):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		getChildByName(name:string):Node;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		getChildIndex(child:Node):number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get numChildren():number;

		/**
		 * @private 
		 */
		private changeScroll:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _sizeChanged():void;

		/**
		 * @private 获取内容宽度（以像素为单位）。
		 */
		get contentWidth():number;

		/**
		 * @private 获取内容高度（以像素为单位）。
		 */
		get contentHeight():number;

		/**
		 * @private 设置内容的宽度、高度（以像素为单位）。
		 * @param width 宽度。
		 * @param height 高度。
		 */
		private setContentSize:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * 垂直方向滚动条皮肤。
		 */
		get vScrollBarSkin():string;
		set vScrollBarSkin(value:string);

		/**
		 * 水平方向滚动条皮肤。
		 */
		get hScrollBarSkin():string;
		set hScrollBarSkin(value:string);

		/**
		 * 垂直方向滚动条对象。
		 */
		get vScrollBar():ScrollBar;

		/**
		 * 水平方向滚动条对象。
		 */
		get hScrollBar():ScrollBar;

		/**
		 * 获取内容容器对象。
		 */
		get content():Sprite;

		/**
		 * @private 滚动条的<code><code>Event.MOUSE_DOWN</code>事件侦听处理函数。</code>事件侦听处理函数。
		 * @param scrollBar 滚动条对象。
		 * @param e Event 对象。
		 */
		protected onScrollBarChange(scrollBar:ScrollBar):void;

		/**
		 * <p>滚动内容容器至设定的垂直、水平方向滚动条位置。</p>
		 * @param x 水平方向滚动条属性value值。滚动条位置数字。
		 * @param y 垂直方向滚动条属性value值。滚动条位置数字。
		 */
		scrollTo(x?:number,y?:number):void;

		/**
		 * 刷新滚动内容。
		 */
		refresh():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set cacheAs(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get cacheAs():string;

		/**
		 * 是否开启橡皮筋效果
		 */
		get elasticEnabled():boolean;
		set elasticEnabled(value:boolean);
		private onScrollStart:any;
		private onScrollEnd:any;

		/**
		 * @private 
		 */
		protected _setScrollChanged():void;
	}

	/**
	 * 值发生改变后调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>ProgressBar</code> 组件显示内容的加载进度。
	 * @example <caption>以下示例代码，创建了一个新的 <code>ProgressBar</code> 实例，设置了它的皮肤、位置、宽高、网格等信息，并添加到舞台上。</caption>
package
{
import laya.ui.ProgressBar;
import laya.utils.Handler;
public class ProgressBar_Example
{
private var progressBar:ProgressBar;
public function ProgressBar_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/progress.png", "resource/ui/progress$bar.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
progressBar = new ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
progressBar.x = 100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
progressBar.y = 100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
progressBar.value = 0.3;//设置 progressBar 的进度值。
progressBar.width = 200;//设置 progressBar 的宽度。
progressBar.height = 50;//设置 progressBar 的高度。
progressBar.sizeGrid = "5,10,5,10";//设置 progressBar 的网格信息。
progressBar.changeHandler = new Handler(this, onChange);//设置 progressBar 的value值改变时执行的处理器。
Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
Laya.timer.once(3000, this, changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
}
private function changeValue():void
{
trace("改变进度条的进度值。");
progressBar.value = 0.6;
}
private function onChange(value:Number):void
{
trace("进度发生改变： value=" ,value);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var res = ["resource/ui/progress.png", "resource/ui/progress$bar.png"];
Laya.loader.load(res, laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete()
{
    progressBar = new laya.ui.ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
    progressBar.x = 100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
    progressBar.y = 100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
    progressBar.value = 0.3;//设置 progressBar 的进度值。
    progressBar.width = 200;//设置 progressBar 的宽度。
    progressBar.height = 50;//设置 progressBar 的高度。
    progressBar.sizeGrid = "10,5,10,5";//设置 progressBar 的网格信息。
    progressBar.changeHandler = new laya.utils.Handler(this, onChange);//设置 progressBar 的value值改变时执行的处理器。
    Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
    Laya.timer.once(3000, this, changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
}
function changeValue()
{
    console.log("改变进度条的进度值。");
    progressBar.value = 0.6;
}
function onChange(value)
{
    console.log("进度发生改变： value=" ,value);
}
	 * @example import ProgressBar = laya.ui.ProgressBar;
import Handler = laya.utils.Handler;
class ProgressBar_Example {
    private progressBar: ProgressBar;
    public ProgressBar_Example() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/progress.png", "resource/ui/progress$bar.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        this.progressBar = new ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
        this.progressBar.x = 100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
        this.progressBar.y = 100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
        this.progressBar.value = 0.3;//设置 progressBar 的进度值。
        this.progressBar.width = 200;//设置 progressBar 的宽度。
        this.progressBar.height = 50;//设置 progressBar 的高度。
        this.progressBar.sizeGrid = "5,10,5,10";//设置 progressBar 的网格信息。
        this.progressBar.changeHandler = new Handler(this, this.onChange);//设置 progressBar 的value值改变时执行的处理器。
        Laya.stage.addChild(this.progressBar);//将 progressBar 添加到显示列表。
        Laya.timer.once(3000, this, this.changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
    }
    private changeValue(): void {
        console.log("改变进度条的进度值。");
        this.progressBar.value = 0.6;
    }
    private onChange(value: number): void {
        console.log("进度发生改变： value=", value);
    }
}
	 */
	class ProgressBar extends UIComponent  {

		/**
		 * 当 <code>ProgressBar</code> 实例的 <code>value</code> 属性发生变化时的函数处理器。
		 * <p>默认返回参数<code>value</code> 属性（进度值）。</p>
		 */
		changeHandler:Handler;

		/**
		 * @private 
		 */
		protected _bg:Image;

		/**
		 * @private 
		 */
		protected _bar:Image;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _value:number;

		/**
		 * 创建一个新的 <code>ProgressBar</code> 类实例。
		 * @param skin 皮肤地址。
		 */

		constructor(skin?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * 当前的进度量。
		 * <p><b>取值：</b>介于0和1之间。</p>
		 */
		get value():number;
		set value(num:number);

		/**
		 * @private 更改进度值的显示。
		 */
		protected changeValue():void;

		/**
		 * 获取进度条对象。
		 */
		get bar():Image;

		/**
		 * 获取背景条对象。
		 */
		get bg():Image;

		/**
		 * <p>当前 <code>ProgressBar</code> 实例的进度条背景位图（ <code>Image</code> 实例）的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;
	}

	/**
	 * <code>Radio</code> 控件使用户可在一组互相排斥的选择中做出一种选择。
	 * 用户一次只能选择 <code>Radio</code> 组中的一个成员。选择未选中的组成员将取消选择该组中当前所选的 <code>Radio</code> 控件。
	 * @see laya.ui.RadioGroup
	 */
	class Radio extends Button  {

		/**
		 * @private 
		 */
		protected _value:any;

		/**
		 * 创建一个新的 <code>Radio</code> 类实例。
		 * @param skin 皮肤。
		 * @param label 标签。
		 */

		constructor(skin?:string,label?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @override 
		 */
		protected preinitialize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;

		/**
		 * @private 对象的<code>Event.CLICK</code>事件侦听处理函数。
		 */
		protected onClick(e:Event):void;

		/**
		 * 获取或设置 <code>Radio</code> 关联的可选用户定义值。
		 */
		get value():any;
		set value(obj:any);
	}

	/**
	 * 当 <code>Group</code> 实例的 <code>selectedIndex</code> 属性发生变化时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>RadioGroup</code> 控件定义一组 <code>Radio</code> 控件，这些控件相互排斥；
	 * 因此，用户每次只能选择一个 <code>Radio</code> 控件。
	 * @example <caption>以下示例代码，创建了一个 <code>RadioGroup</code> 实例。</caption>
package
{
import laya.ui.Radio;
import laya.ui.RadioGroup;
import laya.utils.Handler;
public class RadioGroup_Example
{
public function RadioGroup_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/radio.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
var radioGroup:RadioGroup = new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
radioGroup.pos(100, 100);//设置 radioGroup 的位置信息。
radioGroup.labels = "item0,item1,item2";//设置 radioGroup 的标签集。
radioGroup.skin = "resource/ui/radio.png";//设置 radioGroup 的皮肤。
radioGroup.space = 10;//设置 radioGroup 的项间隔距离。
radioGroup.selectHandler = new Handler(this, onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
}
private function onSelect(index:int):void
{
trace("当前选择的单选按钮索引: index= ", index);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load(["resource/ui/radio.png"], laya.utils.Handler.create(this, onLoadComplete));
function onLoadComplete() {
    var radioGroup= new laya.ui.RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
    radioGroup.pos(100, 100);//设置 radioGroup 的位置信息。
    radioGroup.labels = "item0,item1,item2";//设置 radioGroup 的标签集。
    radioGroup.skin = "resource/ui/radio.png";//设置 radioGroup 的皮肤。
    radioGroup.space = 10;//设置 radioGroup 的项间隔距离。
    radioGroup.selectHandler = new laya.utils.Handler(this, onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
    Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
}
function onSelect(index) {
    console.log("当前选择的单选按钮索引: index= ", index);
}
	 * @example import Radio = laya.ui.Radio;
import RadioGroup = laya.ui.RadioGroup;
import Handler = laya.utils.Handler;
class RadioGroup_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/radio.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        var radioGroup: RadioGroup = new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
        radioGroup.pos(100, 100);//设置 radioGroup 的位置信息。
        radioGroup.labels = "item0,item1,item2";//设置 radioGroup 的标签集。
        radioGroup.skin = "resource/ui/radio.png";//设置 radioGroup 的皮肤。
        radioGroup.space = 10;//设置 radioGroup 的项间隔距离。
        radioGroup.selectHandler = new Handler(this, this.onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
        Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
    }
    private onSelect(index: number): void {
        console.log("当前选择的单选按钮索引: index= ", index);
    }
}
	 */
	class RadioGroup extends UIGroup  {

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createItem(skin:string,label:string):Sprite;
	}

	/**
	 * 自适应缩放容器，容器设置大小后，容器大小始终保持stage大小，子内容按照原始最小宽高比缩放
	 */
	class ScaleBox extends Box  {
		private _oldW:any;
		private _oldH:any;

		/**
		 * @override 
		 */
		onEnable():void;

		/**
		 * @override 
		 */
		onDisable():void;
		private onResize:any;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;
	}

	/**
	 * 滚动条滑块位置发生变化后调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * 开始滑动。
	 * @eventType laya.events.Event
	 */

	/**
	 * 结束滑动。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>ScrollBar</code> 组件是一个滚动条组件。
	 * <p>当数据太多以至于显示区域无法容纳时，最终用户可以使用 <code>ScrollBar</code> 组件控制所显示的数据部分。</p>
	 * <p> 滚动条由四部分组成：两个箭头按钮、一个轨道和一个滑块。 </p>	 *
	 * @see laya.ui.VScrollBar
	 * @see laya.ui.HScrollBar
	 */
	class ScrollBar extends UIComponent  {

		/**
		 * 滚动衰减系数
		 */
		rollRatio:number;

		/**
		 * 滚动变化时回调，回传value参数。
		 */
		changeHandler:Handler;

		/**
		 * 是否缩放滑动条，默认值为true。
		 */
		scaleBar:boolean;

		/**
		 * 一个布尔值，指定是否自动隐藏滚动条(无需滚动时)，默认值为false。
		 */
		autoHide:boolean;

		/**
		 * 橡皮筋效果极限距离，0为没有橡皮筋效果。
		 */
		elasticDistance:number;

		/**
		 * 橡皮筋回弹时间，单位为毫秒。
		 */
		elasticBackTime:number;

		/**
		 * 上按钮
		 */
		upButton:Button;

		/**
		 * 下按钮
		 */
		downButton:Button;

		/**
		 * 滑条
		 */
		slider:Slider;

		/**
		 * @private 
		 */
		protected _showButtons:boolean;

		/**
		 * @private 
		 */
		protected _scrollSize:number;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _thumbPercent:number;

		/**
		 * @private 
		 */
		protected _target:Sprite;

		/**
		 * @private 
		 */
		protected _lastPoint:Point;

		/**
		 * @private 
		 */
		protected _lastOffset:number;

		/**
		 * @private 
		 */
		protected _checkElastic:boolean;

		/**
		 * @private 
		 */
		protected _isElastic:boolean;

		/**
		 * @private 
		 */
		protected _value:number;

		/**
		 * @private 
		 */
		protected _hide:boolean;

		/**
		 * @private 
		 */
		protected _clickOnly:boolean;

		/**
		 * @private 
		 */
		protected _offsets:any[];

		/**
		 * @private 
		 */
		protected _touchScrollEnable:boolean;

		/**
		 * @private 
		 */
		protected _mouseWheelEnable:boolean;

		/**
		 * 创建一个新的 <code>ScrollBar</code> 实例。
		 * @param skin 皮肤资源地址。
		 */

		constructor(skin?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @override 
		 */
		protected initialize():void;

		/**
		 * @private 滑块位置发生改变的处理函数。
		 */
		protected onSliderChange():void;

		/**
		 * @private 向上和向下按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		protected onButtonMouseDown(e:Event):void;

		/**
		 * @private 
		 */
		protected startLoop(isUp:boolean):void;

		/**
		 * @private 
		 */
		protected slide(isUp:boolean):void;

		/**
		 * @private 舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		protected onStageMouseUp(e:Event):void;

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * @private 更改对象的皮肤及位置。
		 */
		protected changeScrollBar():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _sizeChanged():void;

		/**
		 * @private 
		 */
		private resetPositions:any;

		/**
		 * @private 
		 */
		protected resetButtonPosition():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * 设置滚动条信息。
		 * @param min 滚动条最小位置值。
		 * @param max 滚动条最大位置值。
		 * @param value 滚动条当前位置值。
		 */
		setScroll(min:number,max:number,value:number):void;

		/**
		 * 获取或设置表示最高滚动位置的数字。
		 */
		get max():number;
		set max(value:number);

		/**
		 * 获取或设置表示最低滚动位置的数字。
		 */
		get min():number;
		set min(value:number);

		/**
		 * 获取或设置表示当前滚动位置的数字。
		 */
		get value():number;
		set value(v:number);

		/**
		 * 一个布尔值，指示滚动条是否为垂直滚动。如果值为true，则为垂直滚动，否则为水平滚动。
		 * <p>默认值为：true。</p>
		 */
		get isVertical():boolean;
		set isVertical(value:boolean);

		/**
		 * <p>当前实例的 <code>Slider</code> 实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * 获取或设置一个值，该值表示按下滚动条轨道时页面滚动的增量。
		 */
		get scrollSize():number;
		set scrollSize(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 获取或设置一个值，该值表示滑条长度比例，值为：（0-1）。
		 */
		get thumbPercent():number;
		set thumbPercent(value:number);

		/**
		 * 设置滚动对象。
		 * @see laya.ui.TouchScroll#target
		 */
		get target():Sprite;
		set target(value:Sprite);

		/**
		 * 是否隐藏滚动条，不显示滚动条，但是可以正常滚动，默认为false。
		 */
		get hide():boolean;
		set hide(value:boolean);

		/**
		 * 一个布尔值，指定是否显示向上、向下按钮，默认值为true。
		 */
		get showButtons():boolean;
		set showButtons(value:boolean);

		/**
		 * 一个布尔值，指定是否开启触摸，默认值为true。
		 */
		get touchScrollEnable():boolean;
		set touchScrollEnable(value:boolean);

		/**
		 * 一个布尔值，指定是否滑轮滚动，默认值为true。
		 */
		get mouseWheelEnable():boolean;
		set mouseWheelEnable(value:boolean);

		/**
		 * @private 
		 */
		protected onTargetMouseWheel(e:Event):void;
		isLockedFun:Function;

		/**
		 * @private 
		 */
		protected onTargetMouseDown(e:Event):void;
		startDragForce():void;
		private cancelDragOp:any;
		triggerDownDragLimit:Function;
		triggerUpDragLimit:Function;
		private checkTriggers:any;
		get lastOffset():number;
		startTweenMoveForce(lastOffset:number):void;

		/**
		 * @private 
		 */
		protected loop():void;

		/**
		 * @private 
		 */
		protected onStageMouseUp2(e:Event):void;

		/**
		 * @private 
		 */
		private elasticOver:any;

		/**
		 * @private 
		 */
		protected tweenMove(maxDistance:number):void;

		/**
		 * 停止滑动。
		 */
		stopScroll():void;

		/**
		 * 滚动的刻度值，滑动数值为tick的整数倍。默认值为1。
		 */
		get tick():number;
		set tick(value:number);
	}

	/**
	 * 移动滑块位置时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * 移动滑块位置完成（用户鼠标抬起）后调度。
	 * @eventType 
	 * @eventType laya.events.EventD
	 */

	/**
	 * 使用 <code>Slider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	 * <p>滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。</p>
	 * <p>滑块允许最小值和最大值之间特定间隔内的值。滑块还可以使用数据提示显示其当前值。</p>
	 * @see laya.ui.HSlider
	 * @see laya.ui.VSlider
	 */
	class Slider extends UIComponent  {

		/**
		 * @private 获取对 <code>Slider</code> 组件所包含的 <code>Label</code> 组件的引用。
		 */
		static label:Label;

		/**
		 * 数据变化处理器。
		 * <p>默认回调参数为滑块位置属性 <code>value</code>属性值：Number 。</p>
		 */
		changeHandler:Handler;

		/**
		 * 一个布尔值，指示是否为垂直滚动。如果值为true，则为垂直方向，否则为水平方向。
		 * <p>默认值为：true。</p>
		 * @default true
		 */
		isVertical:boolean;

		/**
		 * 一个布尔值，指示是否显示标签。
		 * @default true
		 */
		showLabel:boolean;

		/**
		 * @private 
		 */
		protected _allowClickBack:boolean;

		/**
		 * @private 
		 */
		protected _max:number;

		/**
		 * @private 
		 */
		protected _min:number;

		/**
		 * @private 
		 */
		protected _tick:number;

		/**
		 * @private 
		 */
		protected _value:number;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _bg:Image;

		/**
		 * @private 
		 */
		protected _progress:Image;

		/**
		 * @private 
		 */
		protected _bar:Button;

		/**
		 * @private 
		 */
		protected _tx:number;

		/**
		 * @private 
		 */
		protected _ty:number;

		/**
		 * @private 
		 */
		protected _maxMove:number;

		/**
		 * @private 
		 */
		protected _globalSacle:Point;

		/**
		 * 创建一个新的 <code>Slider</code> 类示例。
		 * @param skin 皮肤。
		 */

		constructor(skin?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;

		/**
		 * @private 滑块的的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		protected onBarMouseDown(e:Event):void;

		/**
		 * @private 显示标签。
		 */
		protected showValueText():void;

		/**
		 * @private 隐藏标签。
		 */
		protected hideValueText():void;

		/**
		 * @private 
		 */
		private mouseUp:any;

		/**
		 * @private 
		 */
		private mouseMove:any;

		/**
		 * @private 
		 */
		protected sendChangeEvent(type?:string):void;

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * @private 设置滑块的位置信息。
		 */
		protected setBarPoint():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureWidth():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected measureHeight():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected _sizeChanged():void;

		/**
		 * <p>当前实例的背景图（ <code>Image</code> ）和滑块按钮（ <code>Button</code> ）实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * 设置滑动条的信息。
		 * @param min 滑块的最小值。
		 * @param max 滑块的最小值。
		 * @param value 滑块的当前值。
		 */
		setSlider(min:number,max:number,value:number):void;

		/**
		 * 滑动的刻度值，滑动数值为tick的整数倍。默认值为1。
		 */
		get tick():number;
		set tick(value:number);

		/**
		 * @private 改变滑块的位置值。
		 */
		changeValue():void;

		/**
		 * 获取或设置表示最高位置的数字。 默认值为100。
		 */
		get max():number;
		set max(value:number);

		/**
		 * 获取或设置表示最低位置的数字。 默认值为0。
		 */
		get min():number;
		set min(value:number);

		/**
		 * 获取或设置表示当前滑块位置的数字。
		 */
		get value():number;
		set value(num:number);

		/**
		 * 一个布尔值，指定是否允许通过点击滑动条改变 <code>Slider</code> 的 <code>value</code> 属性值。
		 */
		get allowClickBack():boolean;
		set allowClickBack(value:boolean);

		/**
		 * @private 滑动条的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		 */
		protected onBgMouseDown(e:Event):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * 表示滑块按钮的引用。
		 */
		get bar():Button;
	}

	/**
	 * <code>Styles</code> 定义了组件常用的样式属性。
	 */
	class Styles  {

		/**
		 * 默认九宫格信息。
		 * @see laya.ui.AutoBitmap#sizeGrid
		 */
		static defaultSizeGrid:any[];

		/**
		 * 标签颜色。
		 */
		static labelColor:string;

		/**
		 * 标签的边距。
		 * <p><b>格式：</b>[上边距，右边距，下边距，左边距]。</p>
		 */
		static labelPadding:any[];

		/**
		 * 标签的边距。
		 * <p><b>格式：</b>[上边距，右边距，下边距，左边距]。</p>
		 */
		static inputLabelPadding:any[];

		/**
		 * 按钮皮肤的状态数，支持1,2,3三种状态值。
		 */
		static buttonStateNum:number;

		/**
		 * 按钮标签颜色。
		 * <p><b>格式：</b>[upColor,overColor,downColor,disableColor]。</p>
		 */
		static buttonLabelColors:any[];

		/**
		 * 下拉框项颜色。
		 * <p><b>格式：</b>[overBgColor,overLabelColor,outLabelColor,borderColor,bgColor]。</p>
		 */
		static comboBoxItemColors:any[];

		/**
		 * 滚动条的最小值。
		 */
		static scrollBarMinNum:number;

		/**
		 * 长按按钮，等待时间，使其可激活连续滚动。
		 */
		static scrollBarDelayTime:number;
	}

	/**
	 * 当 <code>Group</code> 实例的 <code>selectedIndex</code> 属性发生变化时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>Tab</code> 组件用来定义选项卡按钮组。	 *
	 * <p>属性：<code>selectedIndex</code> 的默认值为-1。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>Tab</code> 实例。</caption>
package
{
import laya.ui.Tab;
import laya.utils.Handler;
public class Tab_Example
{
public function Tab_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/tab.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
var tab:Tab = new Tab();//创建一个 Tab 类的实例对象 tab 。
tab.skin = "resource/ui/tab.png";//设置 tab 的皮肤。
tab.labels = "item0,item1,item2";//设置 tab 的标签集。
tab.x = 100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
tab.y = 100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
tab.selectHandler = new Handler(this, onSelect);//设置 tab 的选择项发生改变时执行的处理器。
Laya.stage.addChild(tab);//将 tab 添到显示列表。
}
private function onSelect(index:int):void
{
trace("当前选择的表情页索引: index= ", index);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load(["resource/ui/tab.png"], laya.utils.Handler.create(this, onLoadComplete));
function onLoadComplete() {
    var tab = new laya.ui.Tab();//创建一个 Tab 类的实例对象 tab 。
    tab.skin = "resource/ui/tab.png";//设置 tab 的皮肤。
    tab.labels = "item0,item1,item2";//设置 tab 的标签集。
    tab.x = 100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
    tab.y = 100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
    tab.selectHandler = new laya.utils.Handler(this, onSelect);//设置 tab 的选择项发生改变时执行的处理器。
    Laya.stage.addChild(tab);//将 tab 添到显示列表。
}
function onSelect(index) {
    console.log("当前选择的标签页索引: index= ", index);
}
	 * @example import Tab = laya.ui.Tab;
import Handler = laya.utils.Handler;
class Tab_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/tab.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        var tab: Tab = new Tab();//创建一个 Tab 类的实例对象 tab 。
        tab.skin = "resource/ui/tab.png";//设置 tab 的皮肤。
        tab.labels = "item0,item1,item2";//设置 tab 的标签集。
        tab.x = 100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
        tab.y = 100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
        tab.selectHandler = new Handler(this, this.onSelect);//设置 tab 的选择项发生改变时执行的处理器。
        Laya.stage.addChild(tab);//将 tab 添到显示列表。
    }
    private onSelect(index: number): void {
        console.log("当前选择的表情页索引: index= ", index);
    }
}
	 */
	class Tab extends UIGroup  {

		/**
		 * @private 
		 * @inheritDoc 
		 * @override 
		 */
		protected createItem(skin:string,label:string):Sprite;
	}

	/**
	 * <code>TextArea</code> 类用于创建显示对象以显示和输入文本。
	 * @example <caption>以下示例代码，创建了一个 <code>TextArea</code> 实例。</caption>
package
{
import laya.ui.TextArea;
import laya.utils.Handler;
public class TextArea_Example
{
public function TextArea_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/input.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
var textArea:TextArea = new TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
textArea.skin = "resource/ui/input.png";//设置 textArea 的皮肤。
textArea.sizeGrid = "4,4,4,4";//设置 textArea 的网格信息。
textArea.color = "#008fff";//设置 textArea 的文本颜色。
textArea.font = "Arial";//设置 textArea 的字体。
textArea.bold = true;//设置 textArea 的文本显示为粗体。
textArea.fontSize = 20;//设置 textArea 的文本字体大小。
textArea.wordWrap = true;//设置 textArea 的文本自动换行。
textArea.x = 100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
textArea.y = 100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
textArea.width = 300;//设置 textArea 的宽度。
textArea.height = 200;//设置 textArea 的高度。
Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load(["resource/ui/input.png"], laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete() {
    var textArea = new laya.ui.TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
    textArea.skin = "resource/ui/input.png";//设置 textArea 的皮肤。
    textArea.sizeGrid = "4,4,4,4";//设置 textArea 的网格信息。
    textArea.color = "#008fff";//设置 textArea 的文本颜色。
    textArea.font = "Arial";//设置 textArea 的字体。
    textArea.bold = true;//设置 textArea 的文本显示为粗体。
    textArea.fontSize = 20;//设置 textArea 的文本字体大小。
    textArea.wordWrap = true;//设置 textArea 的文本自动换行。
    textArea.x = 100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
    textArea.y = 100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
    textArea.width = 300;//设置 textArea 的宽度。
    textArea.height = 200;//设置 textArea 的高度。
    Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
}
	 * @example import TextArea = laya.ui.TextArea;
import Handler = laya.utils.Handler;
class TextArea_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/input.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
     private onLoadComplete(): void {
        var textArea: TextArea = new TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
        textArea.skin = "resource/ui/input.png";//设置 textArea 的皮肤。
        textArea.sizeGrid = "4,4,4,4";//设置 textArea 的网格信息。
        textArea.color = "#008fff";//设置 textArea 的文本颜色。
        textArea.font = "Arial";//设置 textArea 的字体。
        textArea.bold = true;//设置 textArea 的文本显示为粗体。
        textArea.fontSize = 20;//设置 textArea 的文本字体大小。
        textArea.wordWrap = true;//设置 textArea 的文本自动换行。
        textArea.x = 100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
        textArea.y = 100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
        textArea.width = 300;//设置 textArea 的宽度。
        textArea.height = 200;//设置 textArea 的高度。
        Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
    }
}
	 */
	class TextArea extends TextInput  {

		/**
		 * @private 
		 */
		protected _vScrollBar:VScrollBar;

		/**
		 * @private 
		 */
		protected _hScrollBar:HScrollBar;

		/**
		 * <p>创建一个新的 <code>TextArea</code> 示例。</p>
		 * @param text 文本内容字符串。
		 */

		constructor(text?:string);
		private _onTextChange:any;

		/**
		 * @param destroyChild 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @override 
		 */
		protected initialize():void;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * 垂直滚动条皮肤
		 */
		get vScrollBarSkin():string;
		set vScrollBarSkin(value:string);

		/**
		 * 水平滚动条皮肤
		 */
		get hScrollBarSkin():string;
		set hScrollBarSkin(value:string);
		protected onVBarChanged(e:Event):void;
		protected onHBarChanged(e:Event):void;

		/**
		 * 垂直滚动条实体
		 */
		get vScrollBar():VScrollBar;

		/**
		 * 水平滚动条实体
		 */
		get hScrollBar():HScrollBar;

		/**
		 * 垂直滚动最大值
		 */
		get maxScrollY():number;

		/**
		 * 垂直滚动值
		 */
		get scrollY():number;

		/**
		 * 水平滚动最大值
		 */
		get maxScrollX():number;

		/**
		 * 水平滚动值
		 */
		get scrollX():number;
		private changeScroll:any;

		/**
		 * 滚动到某个位置
		 */
		scrollTo(y:number):void;
	}

	/**
	 * 输入文本后调度。
	 * @eventType Event.INPUT
	 */

	/**
	 * 在输入框内敲回车键后调度。
	 * @eventType Event.ENTER
	 */

	/**
	 * 当获得输入焦点后调度。
	 * @eventType Event.FOCUS
	 */

	/**
	 * 当失去输入焦点后调度。
	 * @eventType Event.BLUR
	 */

	/**
	 * <code>TextInput</code> 类用于创建显示对象以显示和输入文本。
	 * @example <caption>以下示例代码，创建了一个 <code>TextInput</code> 实例。</caption>
package
{
import laya.display.Stage;
import laya.ui.TextInput;
import laya.utils.Handler;
public class TextInput_Example
{
public function TextInput_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/input.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
var textInput:TextInput = new TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
textInput.skin = "resource/ui/input.png";//设置 textInput 的皮肤。
textInput.sizeGrid = "4,4,4,4";//设置 textInput 的网格信息。
textInput.color = "#008fff";//设置 textInput 的文本颜色。
textInput.font = "Arial";//设置 textInput 的文本字体。
textInput.bold = true;//设置 textInput 的文本显示为粗体。
textInput.fontSize = 30;//设置 textInput 的字体大小。
textInput.wordWrap = true;//设置 textInput 的文本自动换行。
textInput.x = 100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
textInput.y = 100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
textInput.width = 300;//设置 textInput 的宽度。
textInput.height = 200;//设置 textInput 的高度。
Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
Laya.loader.load(["resource/ui/input.png"], laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete() {
    var textInput = new laya.ui.TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.skin = "resource/ui/input.png";//设置 textInput 的皮肤。
    textInput.sizeGrid = "4,4,4,4";//设置 textInput 的网格信息。
    textInput.color = "#008fff";//设置 textInput 的文本颜色。
    textInput.font = "Arial";//设置 textInput 的文本字体。
    textInput.bold = true;//设置 textInput 的文本显示为粗体。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.x = 100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
	 * @example import Stage = laya.display.Stage;
import TextInput = laya.ui.TextInput;
import Handler = laya.utils.Handler;
class TextInput_Example {
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/input.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        var textInput: TextInput = new TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
        textInput.skin = "resource/ui/input.png";//设置 textInput 的皮肤。
        textInput.sizeGrid = "4,4,4,4";//设置 textInput 的网格信息。
        textInput.color = "#008fff";//设置 textInput 的文本颜色。
        textInput.font = "Arial";//设置 textInput 的文本字体。
        textInput.bold = true;//设置 textInput 的文本显示为粗体。
        textInput.fontSize = 30;//设置 textInput 的字体大小。
        textInput.wordWrap = true;//设置 textInput 的文本自动换行。
        textInput.x = 100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
        textInput.y = 100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
        textInput.width = 300;//设置 textInput 的宽度。
        textInput.height = 200;//设置 textInput 的高度。
        Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
    }
}
	 */
	class TextInput extends Label  {

		/**
		 * @private 
		 */
		protected _bg:AutoBitmap;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * 创建一个新的 <code>TextInput</code> 类实例。
		 * @param text 文本内容。
		 */

		constructor(text?:string);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected preinitialize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @private 
		 */
		private _onFocus:any;

		/**
		 * @private 
		 */
		private _onBlur:any;

		/**
		 * @private 
		 */
		private _onInput:any;

		/**
		 * @private 
		 */
		private _onEnter:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected initialize():void;

		/**
		 * 表示此对象包含的文本背景 <code>AutoBitmap</code> 组件实例。
		 */
		get bg():AutoBitmap;
		set bg(value:AutoBitmap);

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * <p>当前实例的背景图（ <code>AutoBitmap</code> ）实例的有效缩放网格数据。</p>
		 * <p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		 * <ul><li>例如："4,4,4,4,1"</li></ul></p>
		 * @see laya.ui.AutoBitmap.sizeGrid
		 */
		get sizeGrid():string;
		set sizeGrid(value:string);

		/**
		 * 当前文本内容字符串。
		 * @see laya.display.Text.text
		 * @override 
		 */
		set text(value:string);

		/**
		 * @override 
		 */
		get text():string;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * <p>指示当前是否是文本域。</p>
		 * 值为true表示当前是文本域，否则不是文本域。
		 */
		get multiline():boolean;
		set multiline(value:boolean);

		/**
		 * 设置可编辑状态。
		 */
		set editable(value:boolean);
		get editable():boolean;

		/**
		 * 选中输入框内的文本。
		 */
		select():void;

		/**
		 * 限制输入的字符。
		 */
		get restrict():string;
		set restrict(pattern:string);

		/**
		 * @copy laya.display.Input#prompt
		 */
		get prompt():string;
		set prompt(value:string);

		/**
		 * @copy laya.display.Input#promptColor
		 */
		get promptColor():string;
		set promptColor(value:string);

		/**
		 * @copy laya.display.Input#maxChars
		 */
		get maxChars():number;
		set maxChars(value:number);

		/**
		 * @copy laya.display.Input#focus
		 */
		get focus():boolean;
		set focus(value:boolean);

		/**
		 * @copy laya.display.Input#type
		 */
		get type():string;
		set type(value:string);
		setSelection(startIndex:number,endIndex:number):void;
	}

	/**
	 * 鼠标提示管理类
	 */
	class TipManager extends UIComponent  {
		static offsetX:number;
		static offsetY:number;
		static tipTextColor:string;
		static tipBackColor:string;
		static tipDelay:number;
		private _tipBox:any;
		private _tipText:any;
		private _defaultTipHandler:any;

		constructor();

		/**
		 * @private 
		 */
		private _onStageHideTip:any;

		/**
		 * @private 
		 */
		private _onStageShowTip:any;

		/**
		 * @private 
		 */
		private _showTip:any;

		/**
		 * @private 
		 */
		private _onStageMouseDown:any;

		/**
		 * @private 
		 */
		private _onStageMouseMove:any;

		/**
		 * @private 
		 */
		private _showToStage:any;

		/**
		 * 关闭所有鼠标提示
		 */
		closeAll():void;

		/**
		 * 显示显示对象类型的tip
		 */
		showDislayTip(tip:Sprite):void;

		/**
		 * @private 
		 */
		private _showDefaultTip:any;

		/**
		 * 默认鼠标提示函数
		 */
		get defaultTipHandler():Function;
		set defaultTipHandler(value:Function);
	}

	/**
	 * 实例的 <code>selectedIndex</code> 属性发生变化时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * 节点打开关闭时触发。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>Tree</code> 控件使用户可以查看排列为可扩展树的层次结构数据。
	 * @example package
{
	import laya.ui.Tree;
	import laya.utils.Browser;
	import laya.utils.Handler;
 	public class Tree_Example
	{
 		public function Tree_Example()
		{
			Laya.init(640, 800);
			Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
			Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder.png", "resource/ui/clip_tree_arrow.png"], Handler.create(this, onLoadComplete));
		}
 		private function onLoadComplete():void
		{
			var xmlString:String;//创建一个xml字符串，用于存储树结构数据。
			xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
			var domParser:* = new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
			var xml:* = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
 			var tree:Tree = new Tree();//创建一个 Tree 类的实例对象 tree 。
			tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
			tree.itemRender = Item;//设置 tree 的项渲染器。
			tree.xml = xml;//设置 tree 的树结构数据。
			tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
			tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
			tree.width = 200;//设置 tree 的宽度。
			tree.height = 100;//设置 tree 的高度。
			Laya.stage.addChild(tree);//将 tree 添加到显示列表。
		}
	}
}
 import laya.ui.Box;
import laya.ui.Clip;
import laya.ui.Label;
class Item extends Box
{
	public function Item()
	{
		this.name = "render";
		this.right = 0;
		this.left = 0;
 		var selectBox:Clip = new Clip("resource/ui/clip_selectBox.png", 1, 2);
		selectBox.name = "selectBox";
		selectBox.height = 24;
		selectBox.x = 13;
		selectBox.y = 0;
		selectBox.left = 12;
		addChild(selectBox);
 		var folder:Clip = new Clip("resource/ui/clip_tree_folder.png", 1, 3);
		folder.name = "folder";
		folder.x = 14;
		folder.y = 4;
		addChild(folder);
 		var label:Label = new Label("treeItem");
		label.name = "label";
		label.color = "#ffff00";
		label.width = 150;
		label.height = 22;
		label.x = 33;
		label.y = 1;
		label.left = 33;
		label.right = 0;
		addChild(label);
 		var arrow:Clip = new Clip("resource/ui/clip_tree_arrow.png", 1, 2);
		arrow.name = "arrow";
		arrow.x = 0;
		arrow.y = 5;
		addChild(arrow);
	}
 }
	 * @example Laya.init(640, 800);//设置游戏画布宽高、渲染模式
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var res = ["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder.png", "resource/ui/clip_tree_arrow.png"];
Laya.loader.load(res, new laya.utils.Handler(this, onLoadComplete));
function onLoadComplete() {
    var xmlString;//创建一个xml字符串，用于存储树结构数据。
    xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
    var domParser = new laya.utils.Browser.window.DOMParser();//创建一个DOMParser实例domParser。
    var xml = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
     var tree = new laya.ui.Tree();//创建一个 Tree 类的实例对象 tree 。
    tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
    tree.itemRender = mypackage.treeExample.Item;//设置 tree 的项渲染器。
    tree.xml = xml;//设置 tree 的树结构数据。
    tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
    tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
    tree.width = 200;//设置 tree 的宽度。
    tree.height = 100;//设置 tree 的高度。
    Laya.stage.addChild(tree);//将 tree 添加到显示列表。
}
(function (_super) {
    function Item() {
        Item.__super.call(this);//初始化父类。
        this.right = 0;
        this.left = 0;
         var selectBox = new laya.ui.Clip("resource/ui/clip_selectBox.png", 1, 2);
        selectBox.name = "selectBox";//设置 selectBox 的name 为“selectBox”时，将被识别为树结构的项的背景。2帧：悬停时背景、选中时背景。
        selectBox.height = 24;
        selectBox.x = 13;
        selectBox.y = 0;
        selectBox.left = 12;
        this.addChild(selectBox);//需要使用this.访问父类的属性或方法。
         var folder = new laya.ui.Clip("resource/ui/clip_tree_folder.png", 1, 3);
        folder.name = "folder";//设置 folder 的name 为“folder”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
        folder.x = 14;
        folder.y = 4;
        this.addChild(folder);
         var label = new laya.ui.Label("treeItem");
        label.name = "label";//设置 label 的name 为“label”时，此值将用于树结构数据赋值。
        label.color = "#ffff00";
        label.width = 150;
        label.height = 22;
        label.x = 33;
        label.y = 1;
        label.left = 33;
        label.right = 0;
        this.addChild(label);
         var arrow = new laya.ui.Clip("resource/ui/clip_tree_arrow.png", 1, 2);
        arrow.name = "arrow";//设置 arrow 的name 为“arrow”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
        arrow.x = 0;
        arrow.y = 5;
        this.addChild(arrow);
    };
    Laya.class(Item,"mypackage.treeExample.Item",_super);//注册类 Item 。
})(laya.ui.Box);
	 * @example import Tree = laya.ui.Tree;
import Browser = laya.utils.Browser;
import Handler = laya.utils.Handler;
class Tree_Example {
     constructor() {
        Laya.init(640, 800);
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder * . * png", "resource/ui/clip_tree_arrow.png"], Handler.create(this, this.onLoadComplete));
    }
    private onLoadComplete(): void {
        var xmlString: String;//创建一个xml字符串，用于存储树结构数据。
        xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc  * label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
        var domParser: any = new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
        var xml: any = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
         var tree: Tree = new Tree();//创建一个 Tree 类的实例对象 tree 。
        tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
        tree.itemRender = Item;//设置 tree 的项渲染器。
        tree.xml = xml;//设置 tree 的树结构数据。
        tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
        tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
        tree.width = 200;//设置 tree 的宽度。
        tree.height = 100;//设置 tree 的高度。
        Laya.stage.addChild(tree);//将 tree 添加到显示列表。
    }
}
import Box = laya.ui.Box;
import Clip = laya.ui.Clip;
import Label = laya.ui.Label;
class Item extends Box {
    constructor() {
        super();
        this.name = "render";
        this.right = 0;
        this.left = 0;
        var selectBox: Clip = new Clip("resource/ui/clip_selectBox.png", 1, 2);
        selectBox.name = "selectBox";
        selectBox.height = 24;
        selectBox.x = 13;
        selectBox.y = 0;
        selectBox.left = 12;
        this.addChild(selectBox);
         var folder: Clip = new Clip("resource/ui/clip_tree_folder.png", 1, 3);
        folder.name = "folder";
        folder.x = 14;
        folder.y = 4;
        this.addChild(folder);
         var label: Label = new Label("treeItem");
        label.name = "label";
        label.color = "#ffff00";
        label.width = 150;
        label.height = 22;
        label.x = 33;
        label.y = 1;
        label.left = 33;
        label.right = 0;
        this.addChild(label);
         var arrow: Clip = new Clip("resource/ui/clip_tree_arrow.png", 1, 2);
        arrow.name = "arrow";
        arrow.x = 0;
        arrow.y = 5;
        this.addChild(arrow);
    }
}
	 */
	class Tree extends Box implements IRender  {

		/**
		 * @private 
		 */
		protected _list:List;

		/**
		 * @private 
		 */
		protected _source:any[];

		/**
		 * @private 
		 */
		protected _renderHandler:Handler;

		/**
		 * @private 
		 */
		protected _spaceLeft:number;

		/**
		 * @private 
		 */
		protected _spaceBottom:number;

		/**
		 * @private 
		 */
		protected _keepStatus:boolean;

		/**
		 * 创建一个新的 <code>Tree</code> 类实例。
		 * <p>在 <code>Tree</code> 构造函数中设置属性width、height的值都为200。</p>
		 */

		constructor();

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @override 
		 */
		protected createChildren():void;

		/**
		 * @private 此对象包含的<code>List</code>实例的<code>Event.CHANGE</code>事件侦听处理函数。
		 */
		protected onListChange(e?:Event):void;

		/**
		 * 数据源发生变化后，是否保持之前打开状态，默认为true。
		 * <p><b>取值：</b>
		 * <li>true：保持之前打开状态。</li>
		 * <li>false：不保持之前打开状态。</li>
		 * </p>
		 */
		get keepStatus():boolean;
		set keepStatus(value:boolean);

		/**
		 * 列表数据源，只包含当前可视节点数据。
		 */
		get array():any[];
		set array(value:any[]);

		/**
		 * 数据源，全部节点数据。
		 */
		get source():any[];

		/**
		 * 此对象包含的<code>List</code>实例对象。
		 */
		get list():List;

		/**
		 * 此对象包含的<code>List</code>实例的单元格渲染器。
		 * <p><b>取值：</b>
		 * <ol>
		 * <li>单元格类对象。</li>
		 * <li> UI 的 JSON 描述。</li>
		 * </ol></p>
		 * @implements 
		 */
		get itemRender():any;
		set itemRender(value:any);

		/**
		 * 滚动条皮肤。
		 */
		get scrollBarSkin():string;
		set scrollBarSkin(value:string);

		/**
		 * 滚动条
		 */
		get scrollBar():ScrollBar;

		/**
		 * 单元格鼠标事件处理器。
		 * <p>默认返回参数（e:Event,index:int）。</p>
		 */
		get mouseHandler():Handler;
		set mouseHandler(value:Handler);

		/**
		 * <code>Tree</code> 实例的渲染处理器。
		 */
		get renderHandler():Handler;
		set renderHandler(value:Handler);

		/**
		 * 左侧缩进距离（以像素为单位）。
		 */
		get spaceLeft():number;
		set spaceLeft(value:number);

		/**
		 * 每一项之间的间隔距离（以像素为单位）。
		 */
		get spaceBottom():number;
		set spaceBottom(value:number);

		/**
		 * 表示当前选择的项索引。
		 */
		get selectedIndex():number;
		set selectedIndex(value:number);

		/**
		 * 当前选中的项对象的数据源。
		 */
		get selectedItem():any;
		set selectedItem(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get height():number;

		/**
		 * @private 获取数据源集合。
		 */
		protected getArray():any[];

		/**
		 * @private 获取项对象的深度。
		 */
		protected getDepth(item:any,num?:number):number;

		/**
		 * @private 获取项对象的上一级的打开状态。
		 */
		protected getParentOpenStatus(item:any):boolean;

		/**
		 * @private 渲染一个项对象。
		 * @param cell 一个项对象。
		 * @param index 项的索引。
		 */
		protected renderItem(cell:Box,index:number):void;

		/**
		 * @private 
		 */
		private onArrowClick:any;

		/**
		 * 设置指定项索引的项对象的打开状态。
		 * @param index 项索引。
		 * @param isOpen 是否处于打开状态。
		 */
		setItemState(index:number,isOpen:boolean):void;

		/**
		 * 刷新项列表。
		 */
		fresh():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * xml结构的数据源。
		 */
		set xml(value:XMLDocument);

		/**
		 * @private 解析并处理XML类型的数据源。
		 */
		protected parseXml(xml:ChildNode,source:any[],nodeParent:any,isRoot:boolean):void;

		/**
		 * @private 处理数据项的打开状态。
		 */
		protected parseOpenStatus(oldSource:any[],newSource:any[]):void;

		/**
		 * @private 判断两个项对象在树结构中的父节点是否相同。
		 * @param item1 项对象。
		 * @param item2 项对象。
		 * @return 如果父节点相同值为true，否则值为false。
		 */
		protected isSameParent(item1:any,item2:any):boolean;

		/**
		 * 表示选择的树节点项的<code>path</code>属性值。
		 */
		get selectedPath():string;

		/**
		 * 更新项列表，显示指定键名的数据项。
		 * @param key 键名。
		 */
		filter(key:string):void;

		/**
		 * @private 获取数据源中指定键名的值。
		 */
		private getFilterSource:any;
	}

	/**
	 * <code>Component</code> 是ui控件类的基类。
	 * <p>生命周期：preinitialize > createChildren > initialize > 组件构造函数</p>
	 */
	class UIComponent extends Sprite  {

		/**
		 * X锚点，值为0-1，设置anchorX值最终通过pivotX值来改变节点轴心点。
		 */
		protected _anchorX:number;

		/**
		 * Y锚点，值为0-1，设置anchorY值最终通过pivotY值来改变节点轴心点。
		 */
		protected _anchorY:number;

		/**
		 * @private 控件的数据源。
		 */
		protected _dataSource:any;

		/**
		 * @private 鼠标悬停提示
		 */
		protected _toolTip:any;

		/**
		 * @private 标签
		 */
		protected _tag:any;

		/**
		 * @private 禁用
		 */
		protected _disabled:boolean;

		/**
		 * @private 变灰
		 */
		protected _gray:boolean;

		/**
		 * @private 相对布局组件
		 */
		protected _widget:Widget;

		/**
		 * <p>创建一个新的 <code>Component</code> 实例。</p>
		 */

		constructor(createChildren?:boolean);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * <p>预初始化。</p>
		 * 子类可在此函数内设置、修改属性默认值
		 */
		protected preinitialize():void;

		/**
		 * <p>创建并添加控件子节点。</p>
		 * 子类可在此函数内创建并添加子节点。
		 */
		protected createChildren():void;

		/**
		 * <p>控件初始化。</p>
		 * 在此子对象已被创建，可以对子对象进行修改。
		 */
		protected initialize():void;

		/**
		 * <p>表示显示对象的宽度，以像素为单位。</p>
		 * <p><b>注：</b>当值为0时，宽度为自适应大小。</p>
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		get_width():number;

		/**
		 * <p>显示对象的实际显示区域宽度（以像素为单位）。</p>
		 */
		protected measureWidth():number;

		/**
		 * <p>立即执行影响宽高度量的延迟调用函数。</p>
		 * <p>使用 <code>runCallLater</code> 函数，立即执行影响宽高度量的延迟运行函数(使用 <code>callLater</code> 设置延迟执行函数)。</p>
		 * @see #callLater()
		 * @see #runCallLater()
		 */
		protected commitMeasure():void;

		/**
		 * <p>表示显示对象的高度，以像素为单位。</p>
		 * <p><b>注：</b>当值为0时，高度为自适应大小。</p>
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		get_height():number;

		/**
		 * <p>显示对象的实际显示区域高度（以像素为单位）。</p>
		 */
		protected measureHeight():number;

		/**
		 * @implements 数据赋值，通过对UI赋值来控制UI显示逻辑。</p>
<p>简单赋值会更改组件的默认属性，使用大括号可以指定组件的任意属性进行赋值。</p>
		 * @example //默认属性赋值
dataSource = {label1: "改变了label", checkbox1: true};//(更改了label1的text属性值，更改checkbox1的selected属性)。
//任意属性赋值
dataSource = {label2: {text:"改变了label",size:14}, checkbox2: {selected:true,x:10}};
		 */
		get dataSource():any;
		get_dataSource():any;
		set dataSource(value:any);
		set_dataSource(value:any):void;

		/**
		 * <p>从组件顶边到其内容区域顶边之间的垂直距离（以像素为单位）。</p>
		 */
		get top():number;
		get_top():number;
		set top(value:number);
		set_top(value:number):void;

		/**
		 * <p>从组件底边到其内容区域底边之间的垂直距离（以像素为单位）。</p>
		 */
		get bottom():number;
		get_bottom():number;
		set bottom(value:number);
		set_bottom(value:number):void;

		/**
		 * <p>从组件左边到其内容区域左边之间的水平距离（以像素为单位）。</p>
		 */
		get left():number;
		set left(value:number);

		/**
		 * <p>从组件右边到其内容区域右边之间的水平距离（以像素为单位）。</p>
		 */
		get right():number;
		set right(value:number);

		/**
		 * <p>在父容器中，此对象的水平方向中轴线与父容器的水平方向中心线的距离（以像素为单位）。</p>
		 */
		get centerX():number;
		set centerX(value:number);

		/**
		 * <p>在父容器中，此对象的垂直方向中轴线与父容器的垂直方向中心线的距离（以像素为单位）。</p>
		 */
		get centerY():number;
		set centerY(value:number);
		protected _sizeChanged():void;

		/**
		 * <p>对象的标签。</p>
		 * 冗余字段，可以用来储存数据。
		 */
		get tag():any;
		set tag(value:any);

		/**
		 * <p>鼠标悬停提示。</p>
		 * <p>可以赋值为文本 <code>String</code> 或函数 <code>Handler</code> ，用来实现自定义样式的鼠标提示和参数携带等。</p>
		 * @example private var _testTips:TestTipsUI = new TestTipsUI();
private function testTips():void {
//简单鼠标提示
btn2.toolTip = "这里是鼠标提示&lt;b&gt;粗体&lt;/b&gt;&lt;br&gt;换行";
//自定义的鼠标提示
btn1.toolTip = showTips1;
//带参数的自定义鼠标提示
clip.toolTip = new Handler(this,showTips2, ["clip"]);
}
private function showTips1():void {
_testTips.label.text = "这里是按钮[" + btn1.label + "]";
tip.addChild(_testTips);
}
private function showTips2(name:String):void {
_testTips.label.text = "这里是" + name;
tip.addChild(_testTips);
}
		 */
		get toolTip():any;
		set toolTip(value:any);

		/**
		 * 对象的 <code>Event.MOUSE_OVER</code> 事件侦听处理函数。
		 */
		private onMouseOver:any;

		/**
		 * 对象的 <code>Event.MOUSE_OUT</code> 事件侦听处理函数。
		 */
		private onMouseOut:any;

		/**
		 * 是否变灰。
		 */
		get gray():boolean;
		set gray(value:boolean);

		/**
		 * 是否禁用页面，设置为true后，会变灰并且禁用鼠标。
		 */
		get disabled():boolean;
		set disabled(value:boolean);

		/**
		 * @private <p>获取对象的布局样式。请不要直接修改此对象</p>
		 */
		private _getWidget:any;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set scaleX(value:number);

		/**
		 * @override 
		 */
		set_scaleX(value:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get scaleX():number;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set scaleY(value:number);

		/**
		 * @override 
		 */
		set_scaleY(value:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get scaleY():number;

		/**
		 * @private 
		 */
		protected onCompResize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set width(value:number);

		/**
		 * @override 
		 */
		set_width(value:number):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set height(value:number);

		/**
		 * @override 
		 */
		set_height(value:number):void;

		/**
		 * X锚点，值为0-1，设置anchorX值最终通过pivotX值来改变节点轴心点。
		 */
		get anchorX():number;
		get_anchorX():number;
		set anchorX(value:number);
		set_anchorX(value:number):void;

		/**
		 * Y锚点，值为0-1，设置anchorY值最终通过pivotY值来改变节点轴心点。
		 */
		get anchorY():number;
		get_anchorY():number;
		set anchorY(value:number);
		set_anchorY(value:number):void;

		/**
		 * @param child 
		 * @override 
		 */
		protected _childChanged(child?:Node):void;
	}

	/**
	 * <code>UIEvent</code> 类用来定义UI组件类的事件类型。
	 */
	class UIEvent extends Event  {

		/**
		 * 显示提示信息。
		 */
		static SHOW_TIP:string;

		/**
		 * 隐藏提示信息。
		 */
		static HIDE_TIP:string;
	}

	/**
	 * 当 <code>Group</code> 实例的 <code>selectedIndex</code> 属性发生变化时调度。
	 * @eventType laya.events.Event
	 */

	/**
	 * <code>Group</code> 是一个可以自动布局的项集合控件。
	 * <p> <code>Group</code> 的默认项对象为 <code>Button</code> 类实例。
	 * <code>Group</code> 是 <code>Tab</code> 和 <code>RadioGroup</code> 的基类。</p>
	 */
	class UIGroup extends Box implements IItem  {

		/**
		 * 改变 <code>Group</code> 的选择项时执行的处理器，(默认返回参数： 项索引（index:int）)。
		 */
		selectHandler:Handler;

		/**
		 * @private 
		 */
		protected _items:ISelect[];

		/**
		 * @private 
		 */
		protected _selectedIndex:number;

		/**
		 * @private 
		 */
		protected _skin:string;

		/**
		 * @private 
		 */
		protected _direction:string;

		/**
		 * @private 
		 */
		protected _space:number;

		/**
		 * @private 
		 */
		protected _labels:string;

		/**
		 * @private 
		 */
		protected _labelColors:string;

		/**
		 * @private 
		 */
		private _labelFont:any;

		/**
		 * @private 
		 */
		protected _labelStrokeColor:string;

		/**
		 * @private 
		 */
		protected _strokeColors:string;

		/**
		 * @private 
		 */
		protected _labelStroke:number;

		/**
		 * @private 
		 */
		protected _labelSize:number;

		/**
		 * @private 
		 */
		protected _labelBold:boolean;

		/**
		 * @private 
		 */
		protected _labelPadding:string;

		/**
		 * @private 
		 */
		protected _labelAlign:string;

		/**
		 * @private 
		 */
		protected _stateNum:number;

		/**
		 * @private 
		 */
		protected _labelChanged:boolean;

		/**
		 * 创建一个新的 <code>Group</code> 类实例。
		 * @param labels 标签集字符串。以逗号做分割，如"item0,item1,item2,item3,item4,item5"。
		 * @param skin 皮肤。
		 */

		constructor(labels?:string,skin?:string);

		/**
		 * @override 
		 */
		protected preinitialize():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * 添加一个项对象，返回此项对象的索引id。
		 * @param item 需要添加的项对象。
		 * @param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		 * @return 
		 */
		addItem(item:ISelect,autoLayOut?:boolean):number;

		/**
		 * 删除一个项对象。
		 * @param item 需要删除的项对象。
		 * @param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		 */
		delItem(item:ISelect,autoLayOut?:boolean):void;

		/**
		 * 初始化项对象们。
		 */
		initItems():void;

		/**
		 * @private 项对象的点击事件侦听处理函数。
		 * @param index 项索引。
		 */
		protected itemClick(index:number):void;

		/**
		 * 表示当前选择的项索引。默认值为-1。
		 */
		get selectedIndex():number;
		set selectedIndex(value:number);

		/**
		 * @private 通过对象的索引设置项对象的 <code>selected</code> 属性值。
		 * @param index 需要设置的项对象的索引。
		 * @param selected 表示项对象的选中状态。
		 */
		protected setSelect(index:number,selected:boolean):void;

		/**
		 * @copy laya.ui.Image#skin
		 */
		get skin():string;
		set skin(value:string);
		protected _skinLoaded():void;

		/**
		 * 标签集合字符串。以逗号做分割，如"item0,item1,item2,item3,item4,item5"。
		 */
		get labels():string;
		set labels(value:string);

		/**
		 * @private 创建一个项显示对象。
		 * @param skin 项对象的皮肤。
		 * @param label 项对象标签。
		 */
		protected createItem(skin:string,label:string):Sprite;

		/**
		 * @copy laya.ui.Button#labelColors()
		 */
		get labelColors():string;
		set labelColors(value:string);

		/**
		 * <p>描边宽度（以像素为单位）。</p>
		 * 默认值0，表示不描边。
		 * @see laya.display.Text.stroke()
		 */
		get labelStroke():number;
		set labelStroke(value:number);

		/**
		 * <p>描边颜色，以字符串表示。</p>
		 * 默认值为 "#000000"（黑色）;
		 * @see laya.display.Text.strokeColor()
		 */
		get labelStrokeColor():string;
		set labelStrokeColor(value:string);

		/**
		 * <p>表示各个状态下的描边颜色。</p>
		 * @see laya.display.Text.strokeColor()
		 */
		get strokeColors():string;
		set strokeColors(value:string);

		/**
		 * 表示按钮文本标签的字体大小。
		 */
		get labelSize():number;
		set labelSize(value:number);

		/**
		 * 表示按钮的状态值，以数字表示，默认为3态。
		 * @see laya.ui.Button#stateNum
		 */
		get stateNum():number;
		set stateNum(value:number);

		/**
		 * 表示按钮文本标签是否为粗体字。
		 */
		get labelBold():boolean;
		set labelBold(value:boolean);

		/**
		 * 表示按钮文本标签的字体名称，以字符串形式表示。
		 * @see laya.display.Text.font()
		 */
		get labelFont():string;
		set labelFont(value:string);

		/**
		 * 表示按钮文本标签的边距。
		 * <p><b>格式：</b>"上边距,右边距,下边距,左边距"。</p>
		 */
		get labelPadding():string;
		set labelPadding(value:string);

		/**
		 * 布局方向。
		 * <p>默认值为"horizontal"。</p>
		 * <p><b>取值：</b>
		 * <li>"horizontal"：表示水平布局。</li>
		 * <li>"vertical"：表示垂直布局。</li>
		 * </p>
		 */
		get direction():string;
		set direction(value:string);

		/**
		 * 项对象们之间的间隔（以像素为单位）。
		 */
		get space():number;
		set space(value:number);

		/**
		 * @private 更改项对象的属性值。
		 */
		protected changeLabels():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected commitMeasure():void;

		/**
		 * 项对象们的存放数组。
		 */
		get items():ISelect[];

		/**
		 * 获取或设置当前选择的项对象。
		 */
		get selection():ISelect;
		set selection(value:ISelect);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;

		/**
		 * @private 
		 */
		protected _setLabelChanged():void;
	}
	class UILib  {
		static __init__():void;
	}

	/**
	 * <code>UIUtils</code> 是文本工具集。
	 */
	class UIUtils  {
		private static grayFilter:any;

		/**
		 * 需要替换的转义字符表
		 */
		static escapeSequence:any;

		/**
		 * 用字符串填充数组，并返回数组副本。
		 * @param arr 源数组对象。
		 * @param str 用逗号连接的字符串。如"p1,p2,p3,p4"。
		 * @param type 如果值不为null，则填充的是新增值得类型。
		 * @return 填充后的数组。
		 */
		static fillArray(arr:any[],str:string,type?:typeof Number|typeof String):any[];

		/**
		 * 转换uint类型颜色值为字符型颜色值。
		 * @param color uint颜色值。
		 * @return 字符型颜色值。
		 */
		static toColor(color:number):string;

		/**
		 * 给指定的目标显示对象添加或移除灰度滤镜。
		 * @param traget 目标显示对象。
		 * @param isGray 如果值true，则添加灰度滤镜，否则移除灰度滤镜。
		 */
		static gray(traget:Sprite,isGray?:boolean):void;

		/**
		 * 给指定的目标显示对象添加滤镜。
		 * @param target 目标显示对象。
		 * @param filter 滤镜对象。
		 */
		static addFilter(target:Sprite,filter:IFilter):void;

		/**
		 * 移除目标显示对象的指定类型滤镜。
		 * @param target 目标显示对象。
		 * @param filterType 滤镜类型。
		 */
		static clearFilter(target:Sprite,filterType:new () => any):void;

		/**
		 * 获取当前要替换的转移字符
		 * @param word 
		 * @return 
		 */
		private static _getReplaceStr:any;

		/**
		 * 替换字符串中的转义字符
		 * @param str 
		 */
		static adptString(str:string):string;

		/**
		 * @private 
		 */
		private static _funMap:any;

		/**
		 * @private 根据字符串，返回函数表达式
		 */
		static getBindFun(value:string):Function;
	}

	/**
	 * <code>VBox</code> 是一个垂直布局容器类。
	 */
	class VBox extends LayoutBox  {

		/**
		 * 无对齐。
		 */
		static NONE:string;

		/**
		 * 左对齐。
		 */
		static LEFT:string;

		/**
		 * 居中对齐。
		 */
		static CENTER:string;

		/**
		 * 右对齐。
		 */
		static RIGHT:string;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get width():number;

		/**
		 * 兼容以前的changeItems逻辑，是否在发生变动时，使用 sortItem 排序所有item
		 */
		isSortItem:boolean;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		protected changeItems():void;
	}

	/**
	 * <code>View</code> 是一个视图类，2.0开始，更改继承至Scene类，相对于Scene，增加相对布局功能。
	 */
	class View extends Scene  {

		/**
		 * @private 兼容老版本
		 */
		static uiMap:any;

		/**
		 * @private 相对布局组件
		 */
		protected _widget:Widget;

		/**
		 * @private 控件的数据源。
		 */
		protected _dataSource:any;

		/**
		 * X锚点，值为0-1，设置anchorX值最终通过pivotX值来改变节点轴心点。
		 */
		protected _anchorX:number;

		/**
		 * Y锚点，值为0-1，设置anchorY值最终通过pivotY值来改变节点轴心点。
		 */
		protected _anchorY:number;
		static __init__():void;

		constructor();

		/**
		 * @private 兼容老版本
注册组件类映射。
<p>用于扩展组件及修改组件对应关系。</p>
		 * @param key 组件类的关键字。
		 * @param compClass 组件类对象。
		 */
		static regComponent(key:string,compClass:new () => any):void;

		/**
		 * @private 兼容老版本
注册UI视图类的逻辑处理类。
注册runtime解析。
		 * @param key UI视图类的关键字。
		 * @param compClass UI视图类对应的逻辑处理类。
		 */
		static regViewRuntime(key:string,compClass:new () => any):void;

		/**
		 * @private 兼容老版本
注册UI配置信息，比如注册一个路径为"test/TestPage"的页面，UI内容是IDE生成的json
		 * @param url UI的路径
		 * @param json UI内容
		 */
		static regUI(url:string,json:any):void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		destroy(destroyChild?:boolean):void;

		/**
		 * @private 
		 */
		changeData(key:string):void;

		/**
		 * <p>从组件顶边到其内容区域顶边之间的垂直距离（以像素为单位）。</p>
		 */
		get top():number;
		set top(value:number);

		/**
		 * <p>从组件底边到其内容区域底边之间的垂直距离（以像素为单位）。</p>
		 */
		get bottom():number;
		set bottom(value:number);

		/**
		 * <p>从组件左边到其内容区域左边之间的水平距离（以像素为单位）。</p>
		 */
		get left():number;
		set left(value:number);

		/**
		 * <p>从组件右边到其内容区域右边之间的水平距离（以像素为单位）。</p>
		 */
		get right():number;
		set right(value:number);

		/**
		 * <p>在父容器中，此对象的水平方向中轴线与父容器的水平方向中心线的距离（以像素为单位）。</p>
		 */
		get centerX():number;
		set centerX(value:number);

		/**
		 * <p>在父容器中，此对象的垂直方向中轴线与父容器的垂直方向中心线的距离（以像素为单位）。</p>
		 */
		get centerY():number;
		set centerY(value:number);

		/**
		 * X锚点，值为0-1，设置anchorX值最终通过pivotX值来改变节点轴心点。
		 */
		get anchorX():number;
		set anchorX(value:number);

		/**
		 * Y锚点，值为0-1，设置anchorY值最终通过pivotY值来改变节点轴心点。
		 */
		get anchorY():number;
		set anchorY(value:number);

		/**
		 * @private 
		 * @override 
		 */
		protected _sizeChanged():void;

		/**
		 * @private <p>获取对象的布局样式。请不要直接修改此对象</p>
		 */
		private _getWidget:any;

		/**
		 * @private 兼容老版本
		 */
		protected loadUI(path:string):void;

		/**
		 * @implements #dataSource
		 */
		get dataSource():any;
		set dataSource(value:any);
	}

	/**
	 * <code>ViewStack</code> 类用于视图堆栈类，用于视图的显示等设置处理。
	 */
	class ViewStack extends Box implements IItem  {

		/**
		 * @private 
		 */
		protected _items:any[];

		/**
		 * @private 
		 */
		protected _setIndexHandler:Handler;

		/**
		 * @private 
		 */
		protected _selectedIndex:number;

		/**
		 * 批量设置视图对象。
		 * @param views 视图对象数组。
		 */
		setItems(views:any[]):void;

		/**
		 * 添加视图。
		 * 添加视图对象，并设置此视图对象的<code>name</code> 属性。
		 * @param view 需要添加的视图对象。
		 */
		addItem(view:Node):void;

		/**
		 * 初始化视图对象集合。
		 */
		initItems():void;

		/**
		 * 表示当前视图索引。
		 */
		get selectedIndex():number;
		set selectedIndex(value:number);

		/**
		 * @private 通过对象的索引设置项对象的 <code>selected</code> 属性值。
		 * @param index 需要设置的对象的索引。
		 * @param selected 表示对象的选中状态。
		 */
		protected setSelect(index:number,selected:boolean):void;

		/**
		 * 获取或设置当前选择的项对象。
		 */
		get selection():Node;
		set selection(value:Node);

		/**
		 * 索引设置处理器。
		 * <p>默认回调参数：index:int</p>
		 */
		get setIndexHandler():Handler;
		set setIndexHandler(value:Handler);

		/**
		 * @private 设置属性<code>selectedIndex</code>的值。
		 * @param index 选中项索引值。
		 */
		protected setIndex(index:number):void;

		/**
		 * 视图集合数组。
		 */
		get items():any[];

		/**
		 * @inheritDoc 
		 * @override 
		 */
		set dataSource(value:any);

		/**
		 * @inheritDoc 
		 * @override 
		 */
		get dataSource():any;
	}

	/**
	 * 使用 <code>VScrollBar</code> （垂直 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	 * @example <caption>以下示例代码，创建了一个 <code>VScrollBar</code> 实例。</caption>
package
{
import laya.ui.vScrollBar;
import laya.ui.VScrollBar;
import laya.utils.Handler;
public class VScrollBar_Example
{
private var vScrollBar:VScrollBar;
public function VScrollBar_Example()
{
Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"], Handler.create(this, onLoadComplete));
}
private function onLoadComplete():void
{
vScrollBar = new VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
vScrollBar.skin = "resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
vScrollBar.x = 100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
vScrollBar.y = 100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
vScrollBar.changeHandler = new Handler(this, onChange);//设置 vScrollBar 的滚动变化处理器。
Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
}
private function onChange(value:Number):void
{
trace("滚动条的位置： value=" + value);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var vScrollBar;
var res = ["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"];
Laya.loader.load(res, laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete() {
    vScrollBar = new laya.ui.VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
    vScrollBar.skin = "resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
    vScrollBar.x = 100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
    vScrollBar.y = 100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
    vScrollBar.changeHandler = new laya.utils.Handler(this, onChange);//设置 vScrollBar 的滚动变化处理器。
    Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
}
function onChange(value) {
    console.log("滚动条的位置： value=" + value);
}
	 * @example import VScrollBar = laya.ui.VScrollBar;
import Handler = laya.utils.Handler;
class VScrollBar_Example {
    private vScrollBar: VScrollBar;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高、渲染模式。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png"], Handler.create(this, this.onLoadComplete));
    }
    private onLoadComplete(): void {
        this.vScrollBar = new VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
        this.vScrollBar.skin = "resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
        this.vScrollBar.x = 100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
        this.vScrollBar.y = 100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
        this.vScrollBar.changeHandler = new Handler(this, this.onChange);//设置 vScrollBar 的滚动变化处理器。
        Laya.stage.addChild(this.vScrollBar);//将此 vScrollBar 对象添加到显示列表。
    }
    private onChange(value: number): void {
        console.log("滚动条的位置： value=" + value);
    }
}
	 */
	class VScrollBar extends ScrollBar  {
	}

	/**
	 * 使用 <code>VSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	 * <p> <code>VSlider</code> 控件采用垂直方向。滑块轨道从下往上扩展，而标签位于轨道的左右两侧。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>VSlider</code> 实例。</caption>
package
{
import laya.ui.HSlider;
import laya.ui.VSlider;
import laya.utils.Handler;
public class VSlider_Example
{
private var vSlider:VSlider;
public function VSlider_Example()
{
Laya.init(640, 800);//设置游戏画布宽高。
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
Laya.loader.load(["resource/ui/vslider.png", "resource/ui/vslider$bar.png"], Handler.create(this, onLoadComplete));//加载资源。
}
private function onLoadComplete():void
{
vSlider = new VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
vSlider.skin = "resource/ui/vslider.png";//设置 vSlider 的皮肤。
vSlider.min = 0;//设置 vSlider 最低位置值。
vSlider.max = 10;//设置 vSlider 最高位置值。
vSlider.value = 2;//设置 vSlider 当前位置值。
vSlider.tick = 1;//设置 vSlider 刻度值。
vSlider.x = 100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
vSlider.y = 100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
vSlider.changeHandler = new Handler(this, onChange);//设置 vSlider 位置变化处理器。
Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
}
private function onChange(value:Number):void
{
trace("滑块的位置： value=" + value);
}
}
}
	 * @example Laya.init(640, 800);//设置游戏画布宽高
Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
var vSlider;
Laya.loader.load(["resource/ui/vslider.png", "resource/ui/vslider$bar.png"], laya.utils.Handler.create(this, onLoadComplete));//加载资源。
function onLoadComplete() {
    vSlider = new laya.ui.VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
    vSlider.skin = "resource/ui/vslider.png";//设置 vSlider 的皮肤。
    vSlider.min = 0;//设置 vSlider 最低位置值。
    vSlider.max = 10;//设置 vSlider 最高位置值。
    vSlider.value = 2;//设置 vSlider 当前位置值。
    vSlider.tick = 1;//设置 vSlider 刻度值。
    vSlider.x = 100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
    vSlider.y = 100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
    vSlider.changeHandler = new laya.utils.Handler(this, onChange);//设置 vSlider 位置变化处理器。
    Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
}
function onChange(value) {
    console.log("滑块的位置： value=" + value);
}
	 * @example import HSlider = laya.ui.HSlider;
import VSlider = laya.ui.VSlider;
import Handler = laya.utils.Handler;
class VSlider_Example {
    private vSlider: VSlider;
    constructor() {
        Laya.init(640, 800);//设置游戏画布宽高。
        Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
        Laya.loader.load(["resource/ui/vslider.png", "resource/ui/vslider$bar.png"], Handler.create(this, this.onLoadComplete));//加载资源。
    }
    private onLoadComplete(): void {
        this.vSlider = new VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
        this.vSlider.skin = "resource/ui/vslider.png";//设置 vSlider 的皮肤。
        this.vSlider.min = 0;//设置 vSlider 最低位置值。
        this.vSlider.max = 10;//设置 vSlider 最高位置值。
        this.vSlider.value = 2;//设置 vSlider 当前位置值。
        this.vSlider.tick = 1;//设置 vSlider 刻度值。
        this.vSlider.x = 100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
        this.vSlider.y = 100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
        this.vSlider.changeHandler = new Handler(this, this.onChange);//设置 vSlider 位置变化处理器。
        Laya.stage.addChild(this.vSlider);//把 vSlider 添加到显示列表。
    }
    private onChange(value: number): void {
        console.log("滑块的位置： value=" + value);
    }
}
	 * @see laya.ui.Slider
	 */
	class VSlider extends Slider  {
	}

	/**
	 * 相对布局插件
	 */
	class Widget extends Component  {

		/**
		 * 一个已初始化的 <code>Widget</code> 实例。
		 */
		static EMPTY:Widget;
		private _top:any;
		private _bottom:any;
		private _left:any;
		private _right:any;
		private _centerX:any;
		private _centerY:any;

		/**
		 * @override 
		 */
		onReset():void;

		/**
		 * 父容器的 <code>Event.RESIZE</code> 事件侦听处理函数。
		 */
		protected _onParentResize():void;

		/**
		 * <p>重置对象的 <code>X</code> 轴（水平方向）布局。</p>
		 * @private 
		 */
		resetLayoutX():boolean;

		/**
		 * <p>重置对象的 <code>Y</code> 轴（垂直方向）布局。</p>
		 * @private 
		 */
		resetLayoutY():boolean;

		/**
		 * 重新计算布局
		 */
		resetLayout():void;

		/**
		 * 表示距顶边的距离（以像素为单位）。
		 */
		get top():number;
		set top(value:number);

		/**
		 * 表示距底边的距离（以像素为单位）。
		 */
		get bottom():number;
		set bottom(value:number);

		/**
		 * 表示距左边的距离（以像素为单位）。
		 */
		get left():number;
		set left(value:number);

		/**
		 * 表示距右边的距离（以像素为单位）。
		 */
		get right():number;
		set right(value:number);

		/**
		 * 表示距水平方向中心轴的距离（以像素为单位）。
		 */
		get centerX():number;
		set centerX(value:number);

		/**
		 * 表示距垂直方向中心轴的距离（以像素为单位）。
		 */
		get centerY():number;
		set centerY(value:number);
	}

	/**
	 * 微信开放数据展示组件，直接实例本组件，即可根据组件宽高，位置，以最优的方式显示开放域数据
	 */
	class WXOpenDataViewer extends UIComponent  {

		constructor();

		/**
		 * @override 
		 */
		onEnable():void;

		/**
		 * @override 
		 */
		onDisable():void;
		private _onLoop:any;

		/**
		 * @override 
		 */
		set width(value:number);

		/**
		 * @override 
		 */
		get width():number;

		/**
		 * @override 
		 */
		set height(value:number);

		/**
		 * @override 
		 */
		get height():number;

		/**
		 * @override 
		 */
		set x(value:number);

		/**
		 * @override 
		 */
		get x():number;

		/**
		 * @override 
		 */
		set y(value:number);

		/**
		 * @override 
		 */
		get y():number;
		private _postMsg:any;

		/**
		 * 向开放数据域发送消息
		 */
		postMsg(msg:any):void;
	}

	/**
	 * <code>Browser</code> 是浏览器代理类。封装浏览器及原生 js 提供的一些功能。
	 */
	class Browser  {

		/**
		 * 浏览器代理信息。
		 */
		static userAgent:string;

		/**
		 * 表示是否在移动设备，包括IOS和安卓等设备内。
		 */
		static onMobile:boolean;

		/**
		 * 表示是否在 IOS 设备内。
		 */
		static onIOS:boolean;

		/**
		 * 表示是否在 Mac 设备。
		 */
		static onMac:boolean;

		/**
		 * 表示是否在 IPhone 设备内。
		 */
		static onIPhone:boolean;

		/**
		 * 表示是否在 IPad 设备内。
		 */
		static onIPad:boolean;

		/**
		 * 表示是否在 Android 设备内。
		 */
		static onAndroid:boolean;

		/**
		 * 表示是否在 Windows Phone 设备内。
		 */
		static onWP:boolean;

		/**
		 * 表示是否在 QQ 浏览器内。
		 */
		static onQQBrowser:boolean;

		/**
		 * 表示是否在移动端 QQ 或 QQ 浏览器内。
		 */
		static onMQQBrowser:boolean;

		/**
		 * 表示是否在 Safari 内。
		 */
		static onSafari:boolean;

		/**
		 * 表示是否在 IE 浏览器内
		 */
		static onIE:boolean;

		/**
		 * 表示是否在 微信 内
		 */
		static onWeiXin:boolean;

		/**
		 * 表示是否在 PC 端。
		 */
		static onPC:boolean;

		/**
		 * 微信小游戏 *
		 */
		static onMiniGame:boolean;

		/**
		 * 百度小游戏 *
		 */
		static onBDMiniGame:boolean;

		/**
		 * 小米戏小游戏 *
		 */
		static onKGMiniGame:boolean;

		/**
		 * OPPO小游戏 *
		 */
		static onQGMiniGame:boolean;

		/**
		 * VIVO小游戏 *
		 */
		static onVVMiniGame:boolean;

		/**
		 * 阿里小游戏 *
		 */
		static onAlipayMiniGame:boolean;

		/**
		 * *手机QQ小游戏
		 */
		static onQQMiniGame:boolean;

		/**
		 * * BILIBILI小游戏
		 */
		static onBLMiniGame:boolean;

		/**
		 * 字节跳动小游戏
		 */
		static onTTMiniGame:boolean;

		/**
		 * 华为快游戏
		 */
		static onHWMiniGame:boolean;

		/**
		 * 淘宝小程序
		 */
		static onTBMiniGame:boolean;

		/**
		 * @private 
		 */
		static onFirefox:boolean;

		/**
		 * @private 
		 */
		static onEdge:boolean;

		/**
		 * @private 
		 */
		static onLayaRuntime:boolean;

		/**
		 * 表示是否支持WebAudio
		 */
		static supportWebAudio:boolean;

		/**
		 * 表示是否支持LocalStorage
		 */
		static supportLocalStorage:boolean;

		/**
		 * 全局离线画布（非主画布）。主要用来测量字体、获取image数据。
		 */
		static canvas:HTMLCanvas;

		/**
		 * 全局离线画布上绘图的环境（非主画布）。
		 */
		static context:CanvasRenderingContext2D;

		/**
		 * @private 
		 */
		private static _window:any;

		/**
		 * @private 
		 */
		private static _document:any;

		/**
		 * @private 
		 */
		private static _container:any;

		/**
		 * @private 
		 */
		private static _pixelRatio:any;

		/**
		 * @private 
		 */
		static mainCanvas:HTMLCanvas;

		/**
		 * @private 
		 */
		private static hanzi:any;

		/**
		 * @private 
		 */
		private static fontMap:any;

		/**
		 * @private 
		 */
		static measureText:Function;

		/**
		 * 获取是否为小游戏环境
		 * @returns onMiniGame || onBDMiniGame || onQGMiniGame || onKGMiniGame || onVVMiniGame || onAlipayMiniGame || onQQMiniGame || onBLMiniGame || onTTMiniGame || onHWMiniGame || onTBMiniGame
		 */
		static get _isMiniGame():boolean;

		/**
		 * 创建浏览器原生节点。
		 * @param type 节点类型。
		 * @return 创建的节点对象的引用。
		 */
		static createElement(type:string):any;

		/**
		 * 返回 Document 对象中拥有指定 id 的第一个对象的引用。
		 * @param type 节点id。
		 * @return 节点对象。
		 */
		static getElementById(type:string):any;

		/**
		 * 移除指定的浏览器原生节点对象。
		 * @param type 节点对象。
		 */
		static removeElement(ele:any):void;

		/**
		 * 获取浏览器当前时间戳，单位为毫秒。
		 */
		static now():number;

		/**
		 * 浏览器窗口可视宽度。
		 * 通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerWidth(包含滚动条宽度) > document.body.clientWidth(不包含滚动条宽度)，如果前者为0或为空，则选择后者。
		 */
		static get clientWidth():number;

		/**
		 * 浏览器窗口可视高度。
		 * 通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerHeight(包含滚动条高度) > document.body.clientHeight(不包含滚动条高度) > document.documentElement.clientHeight(不包含滚动条高度)，如果前者为0或为空，则选择后者。
		 */
		static get clientHeight():number;

		/**
		 * 浏览器窗口物理宽度。考虑了设备像素比。
		 */
		static get width():number;

		/**
		 * 浏览器窗口物理高度。考虑了设备像素比。
		 */
		static get height():number;

		/**
		 * 获得设备像素比。
		 */
		static get pixelRatio():number;

		/**
		 * 画布容器，用来盛放画布的容器。方便对画布进行控制
		 */
		static get container():any;
		static set container(value:any);

		/**
		 * 浏览器原生 window 对象的引用。
		 */
		static get window():any;

		/**
		 * 浏览器原生 document 对象的引用。
		 */
		static get document():any;
	}

	/**
	 * <p> <code>Byte</code> 类提供用于优化读取、写入以及处理二进制数据的方法和属性。</p>
	 * <p> <code>Byte</code> 类适用于需要在字节层访问数据的高级开发人员。</p>
	 */
	class Byte  {

		/**
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。通过 <code>getSystemEndian</code> 可以获取当前系统的字节序。</p>
		 * <p> <code>BIG_ENDIAN</code> ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。<br/>
		 * <code>LITTLE_ENDIAN</code> ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 */
		static BIG_ENDIAN:string;

		/**
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。通过 <code>getSystemEndian</code> 可以获取当前系统的字节序。</p>
		 * <p> <code>LITTLE_ENDIAN</code> ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。<br/>
		 * <code>BIG_ENDIAN</code> ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。</p>
		 */
		static LITTLE_ENDIAN:string;

		/**
		 * @private 
		 */
		private static _sysEndian:any;

		/**
		 * @private 是否为小端数据。
		 */
		protected _xd_:boolean;

		/**
		 * @private 
		 */
		private _allocated_:any;

		/**
		 * @private 原始数据。
		 */
		protected _d_:any;

		/**
		 * @private DataView
		 */
		protected _u8d_:any;

		/**
		 * @private 
		 */
		protected _pos_:number;

		/**
		 * @private 
		 */
		protected _length:number;

		/**
		 * <p>获取当前主机的字节序。</p>
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。</p>
		 * <p> <code>BIG_ENDIAN</code> ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。<br/>
		 * <code>LITTLE_ENDIAN</code> ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 * @return 当前系统的字节序。
		 */
		static getSystemEndian():string;

		/**
		 * 创建一个 <code>Byte</code> 类的实例。
		 * @param data 用于指定初始化的元素数目，或者用于初始化的TypedArray对象、ArrayBuffer对象。如果为 null ，则预分配一定的内存空间，当可用空间不足时，优先使用这部分内存，如果还不够，则重新分配所需内存。
		 */

		constructor(data?:any);

		/**
		 * 获取此对象的 ArrayBuffer 数据，数据只包含有效数据部分。
		 */
		get buffer():ArrayBuffer;

		/**
		 * <p> <code>Byte</code> 实例的字节序。取值为：<code>BIG_ENDIAN</code> 或 <code>BIG_ENDIAN</code> 。</p>
		 * <p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。通过 <code>getSystemEndian</code> 可以获取当前系统的字节序。</p>
		 * <p> <code>BIG_ENDIAN</code> ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。<br/>
		 *   <code>LITTLE_ENDIAN</code> ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
		 */
		get endian():string;
		set endian(value:string);

		/**
		 * <p> <code>Byte</code> 对象的长度（以字节为单位）。</p>
		 * <p>如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧；如果将长度设置为小于当前长度的值，将会截断该字节数组。</p>
		 * <p>如果要设置的长度大于当前已分配的内存空间的字节长度，则重新分配内存空间，大小为以下两者较大者：要设置的长度、当前已分配的长度的2倍，并将原有数据拷贝到新的内存空间中；如果要设置的长度小于当前已分配的内存空间的字节长度，也会重新分配内存空间，大小为要设置的长度，并将原有数据从头截断为要设置的长度存入新的内存空间中。</p>
		 */
		set length(value:number);
		get length():number;

		/**
		 * @private 
		 */
		private _resizeBuffer:any;

		/**
		 * @private <p>常用于解析固定格式的字节流。</p>
<p>先从字节流的当前字节偏移位置处读取一个 <code>Uint16</code> 值，然后以此值为长度，读取此长度的字符串。</p>
		 * @return 读取的字符串。
		 */
		getString():string;

		/**
		 * <p>常用于解析固定格式的字节流。</p>
		 * <p>先从字节流的当前字节偏移位置处读取一个 <code>Uint16</code> 值，然后以此值为长度，读取此长度的字符串。</p>
		 * @return 读取的字符串。
		 */
		readString():string;

		/**
		 * @private <p>从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Float32Array</code> 对象并返回此对象。</p>
<p><b>注意：</b>返回的 Float32Array 对象，在 JavaScript 环境下，是原生的 HTML5 Float32Array 对象，对此对象的读取操作都是基于运行此程序的当前主机字节序，此顺序可能与实际数据的字节序不同，如果使用此对象进行读取，需要用户知晓实际数据的字节序和当前主机字节序，如果相同，可正常读取，否则需要用户对实际数据(Float32Array.buffer)包装一层 DataView ，使用 DataView 对象可按照指定的字节序进行读取。</p>
		 * @param start 开始位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Float32Array 对象。
		 */
		getFloat32Array(start:number,len:number):any;

		/**
		 * 从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Float32Array</code> 对象并返回此对象。
		 * @param start 开始位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Float32Array 对象。
		 */
		readFloat32Array(start:number,len:number):any;

		/**
		 * @private 从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Uint8Array</code> 对象并返回此对象。
		 * @param start 开始位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Uint8Array 对象。
		 */
		getUint8Array(start:number,len:number):Uint8Array;

		/**
		 * 从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Uint8Array</code> 对象并返回此对象。
		 * @param start 开始位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Uint8Array 对象。
		 */
		readUint8Array(start:number,len:number):Uint8Array;

		/**
		 * @private <p>从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Int16Array</code> 对象并返回此对象。</p>
<p><b>注意：</b>返回的 Int16Array 对象，在 JavaScript 环境下，是原生的 HTML5 Int16Array 对象，对此对象的读取操作都是基于运行此程序的当前主机字节序，此顺序可能与实际数据的字节序不同，如果使用此对象进行读取，需要用户知晓实际数据的字节序和当前主机字节序，如果相同，可正常读取，否则需要用户对实际数据(Int16Array.buffer)包装一层 DataView ，使用 DataView 对象可按照指定的字节序进行读取。</p>
		 * @param start 开始读取的字节偏移量位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Int16Array 对象。
		 */
		getInt16Array(start:number,len:number):any;

		/**
		 * 从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Int16Array</code> 对象并返回此对象。
		 * @param start 开始读取的字节偏移量位置。
		 * @param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
		 * @return 读取的 Uint8Array 对象。
		 */
		readInt16Array(start:number,len:number):any;

		/**
		 * @private 从字节流的当前字节偏移位置处读取一个 IEEE 754 单精度（32 位）浮点数。
		 * @return 单精度（32 位）浮点数。
		 */
		getFloat32():number;

		/**
		 * 从字节流的当前字节偏移位置处读取一个 IEEE 754 单精度（32 位）浮点数。
		 * @return 单精度（32 位）浮点数。
		 */
		readFloat32():number;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 IEEE 754 双精度（64 位）浮点数。
		 * @return 双精度（64 位）浮点数。
		 */
		getFloat64():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 IEEE 754 双精度（64 位）浮点数。
		 * @return 双精度（64 位）浮点数。
		 */
		readFloat64():number;

		/**
		 * 在字节流的当前字节偏移量位置处写入一个 IEEE 754 单精度（32 位）浮点数。
		 * @param value 单精度（32 位）浮点数。
		 */
		writeFloat32(value:number):void;

		/**
		 * 在字节流的当前字节偏移量位置处写入一个 IEEE 754 双精度（64 位）浮点数。
		 * @param value 双精度（64 位）浮点数。
		 */
		writeFloat64(value:number):void;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 Int32 值。
		 * @return Int32 值。
		 */
		getInt32():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 Int32 值。
		 * @return Int32 值。
		 */
		readInt32():number;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 Uint32 值。
		 * @return Uint32 值。
		 */
		getUint32():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 Uint32 值。
		 * @return Uint32 值。
		 */
		readUint32():number;

		/**
		 * 在字节流的当前字节偏移量位置处写入指定的 Int32 值。
		 * @param value 需要写入的 Int32 值。
		 */
		writeInt32(value:number):void;

		/**
		 * 在字节流的当前字节偏移量位置处写入 Uint32 值。
		 * @param value 需要写入的 Uint32 值。
		 */
		writeUint32(value:number):void;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 Int16 值。
		 * @return Int16 值。
		 */
		getInt16():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 Int16 值。
		 * @return Int16 值。
		 */
		readInt16():number;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 Uint16 值。
		 * @return Uint16 值。
		 */
		getUint16():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 Uint16 值。
		 * @return Uint16 值。
		 */
		readUint16():number;

		/**
		 * 在字节流的当前字节偏移量位置处写入指定的 Uint16 值。
		 * @param value 需要写入的Uint16 值。
		 */
		writeUint16(value:number):void;

		/**
		 * 在字节流的当前字节偏移量位置处写入指定的 Int16 值。
		 * @param value 需要写入的 Int16 值。
		 */
		writeInt16(value:number):void;

		/**
		 * @private 从字节流的当前字节偏移量位置处读取一个 Uint8 值。
		 * @return Uint8 值。
		 */
		getUint8():number;

		/**
		 * 从字节流的当前字节偏移量位置处读取一个 Uint8 值。
		 * @return Uint8 值。
		 */
		readUint8():number;

		/**
		 * 在字节流的当前字节偏移量位置处写入指定的 Uint8 值。
		 * @param value 需要写入的 Uint8 值。
		 */
		writeUint8(value:number):void;

		/**
		 * @private 读取指定长度的 UTF 型字符串。
		 * @param len 需要读取的长度。
		 * @return 读取的字符串。
		 */
		private _rUTF:any;

		/**
		 * @private 读取 <code>len</code> 参数指定的长度的字符串。
		 * @param len 要读取的字符串的长度。
		 * @return 指定长度的字符串。
		 */
		getCustomString(len:number):string;

		/**
		 * @private 读取 <code>len</code> 参数指定的长度的字符串。
		 * @param len 要读取的字符串的长度。
		 * @return 指定长度的字符串。
		 */
		readCustomString(len:number):string;

		/**
		 * 移动或返回 Byte 对象的读写指针的当前位置（以字节为单位）。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
		 */
		get pos():number;
		set pos(value:number);

		/**
		 * 可从字节流的当前位置到末尾读取的数据的字节数。
		 */
		get bytesAvailable():number;

		/**
		 * 清除字节数组的内容，并将 length 和 pos 属性重置为 0。调用此方法将释放 Byte 实例占用的内存。
		 */
		clear():void;

		/**
		 * <p>将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的字为字符串添加前缀。</p>
		 * <p>对应的读取方法为： getUTFBytes 。</p>
		 * @param value 要写入的字符串。
		 */
		writeUTFBytes(value:string):void;

		/**
		 * <p>将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节。</p>
		 * <p>对应的读取方法为： getUTFString 。</p>
		 * @param value 要写入的字符串值。
		 */
		writeUTFString(value:string):void;

		/**
		 * <p>将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 32 位整数），然后写入表示字符串字符的字节。</p>
		 * @param value 要写入的字符串值。
		 */
		writeUTFString32(value:string):void;

		/**
		 * @private 读取 UTF-8 字符串。
		 * @return 读取的字符串。
		 */
		readUTFString():string;

		/**
		 * @private 
		 */
		readUTFString32():string;

		/**
		 * <p>从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是一个无符号的短整型（以此字节表示要读取的长度）。</p>
		 * <p>对应的写入方法为： writeUTFString 。</p>
		 * @return 读取的字符串。
		 */
		getUTFString():string;

		/**
		 * @private 读字符串，必须是 writeUTFBytes 方法写入的字符串。
		 * @param len 要读的buffer长度，默认将读取缓冲区全部数据。
		 * @return 读取的字符串。
		 */
		readUTFBytes(len?:number):string;

		/**
		 * <p>从字节流中读取一个由 length 参数指定的长度的 UTF-8 字节序列，并返回一个字符串。</p>
		 * <p>一般读取的是由 writeUTFBytes 方法写入的字符串。</p>
		 * @param len 要读的buffer长度，默认将读取缓冲区全部数据。
		 * @return 读取的字符串。
		 */
		getUTFBytes(len?:number):string;

		/**
		 * <p>在字节流中写入一个字节。</p>
		 * <p>使用参数的低 8 位。忽略高 24 位。</p>
		 * @param value 
		 */
		writeByte(value:number):void;

		/**
		 * <p>从字节流中读取带符号的字节。</p>
		 * <p>返回值的范围是从 -128 到 127。</p>
		 * @return 介于 -128 和 127 之间的整数。
		 */
		readByte():number;

		/**
		 * @private 从字节流中读取带符号的字节。
		 */
		getByte():number;

		/**
		 * <p>将指定 arraybuffer 对象中的以 offset 为起始偏移量， length 为长度的字节序列写入字节流。</p>
		 * <p>如果省略 length 参数，则使用默认长度 0，该方法将从 offset 开始写入整个缓冲区；如果还省略了 offset 参数，则写入整个缓冲区。</p>
		 * <p>如果 offset 或 length 小于0，本函数将抛出异常。</p>
		 * @param arraybuffer 需要写入的 Arraybuffer 对象。
		 * @param offset Arraybuffer 对象的索引的偏移量（以字节为单位）
		 * @param length 从 Arraybuffer 对象写入到 Byte 对象的长度（以字节为单位）
		 */
		writeArrayBuffer(arraybuffer:any,offset?:number,length?:number):void;

		/**
		 * 读取ArrayBuffer数据
		 * @param length 
		 * @return 
		 */
		readArrayBuffer(length:number):ArrayBuffer;
	}

	/**
	 * @private 对象缓存统一管理类
	 */
	class CacheManger  {

		/**
		 * 单次清理检测允许执行的时间，单位ms。
		 */
		static loopTimeLimit:number;

		/**
		 * @private 
		 */
		private static _cacheList:any;

		/**
		 * @private 当前检测的索引
		 */
		private static _index:any;

		constructor();

		/**
		 * 注册cache管理函数
		 * @param disposeFunction 释放函数 fun(force:Boolean)
		 * @param getCacheListFunction 获取cache列表函数fun():Array
		 */
		static regCacheByFunction(disposeFunction:Function,getCacheListFunction:Function):void;

		/**
		 * 移除cache管理函数
		 * @param disposeFunction 释放函数 fun(force:Boolean)
		 * @param getCacheListFunction 获取cache列表函数fun():Array
		 */
		static unRegCacheByFunction(disposeFunction:Function,getCacheListFunction:Function):void;

		/**
		 * 强制清理所有管理器
		 */
		static forceDispose():void;

		/**
		 * 开始检测循环
		 * @param waitTime 检测间隔时间
		 */
		static beginCheck(waitTime?:number):void;

		/**
		 * 停止检测循环
		 */
		static stopCheck():void;

		/**
		 * @private 检测函数
		 */
		private static _checkLoop:any;
	}

	/**
	 * @private 
	 */
	class CallLater  {
		static I:CallLater;

		/**
		 * @private 
		 */
		private _pool:any;

		/**
		 * @private 
		 */
		private _map:any;

		/**
		 * @private 
		 */
		private _laters:any;

		/**
		 * @private 
		 */
		private _getHandler:any;

		/**
		 * 延迟执行。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 */
		callLater(caller:any,method:Function,args?:any[]):void;

		/**
		 * 立即执行 callLater 。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 */
		runCallLater(caller:any,method:Function):void;
	}

	/**
	 * <code>ClassUtils</code> 是一个类工具类。
	 */
	class ClassUtils  {

		/**
		 * @private 
		 */
		private static DrawTypeDic:any;

		/**
		 * @private 
		 */
		private static _temParam:any;

		/**
		 * @private 
		 */
		private static _classMap:any;

		/**
		 * @private 
		 */
		private static _tM:any;

		/**
		 * @private 
		 */
		private static _alpha:any;

		/**
		 * 注册 Class 映射，方便在class反射时获取。
		 * @param className 映射的名字或者别名。
		 * @param classDef 类的全名或者类的引用，全名比如:"laya.display.Sprite"。
		 */
		static regClass(className:string,classDef:any):void;

		/**
		 * 根据类名短名字注册类，比如传入[Sprite]，功能同regClass("Sprite",Sprite);
		 * @param classes 类数组
		 */
		static regShortClassName(classes:any[]):void;

		/**
		 * 返回注册的 Class 映射。
		 * @param className 映射的名字。
		 */
		static getRegClass(className:string):any;

		/**
		 * 根据名字返回类对象。
		 * @param className 类名(比如laya.display.Sprite)或者注册的别名(比如Sprite)。
		 * @return 类对象
		 */
		static getClass(className:string):any;

		/**
		 * 根据名称创建 Class 实例。
		 * @param className 类名(比如laya.display.Sprite)或者注册的别名(比如Sprite)。
		 * @return 返回类的实例。
		 */
		static getInstance(className:string):any;

		/**
		 * 根据指定的 json 数据创建节点对象。
		 * 比如:
		 * {
		 *  	"type":"Sprite",
		 *  	"props":{
		 *  		"x":100,
		 *  		"y":50,
		 *  		"name":"item1",
		 *  		"scale":[2,2]
		 *  	},
		 *  	"customProps":{
		 *  		"x":100,
		 *  		"y":50,
		 *  		"name":"item1",
		 *  		"scale":[2,2]
		 *  	},
		 *  	"child":[
		 *  		{
		 *  			"type":"Text",
		 *  			"props":{
		 *  				"text":"this is a test",
		 *  				"var":"label",
		 *  				"rumtime":""
		 *  			}
		 *  		}
		 *  	]
		 * }
		 * @param json json字符串或者Object对象。
		 * @param node node节点，如果为空，则新创建一个。
		 * @param root 根节点，用来设置var定义。
		 * @return 生成的节点。
		 */
		static createByJson(json:any,node?:any,root?:Node,customHandler?:Handler,instanceHandler?:Handler):any;

		/**
		 * @private 
		 */
		private static _getGraphicsFromSprite:any;

		/**
		 * @private 
		 */
		private static _getTransformData:any;

		/**
		 * @private 
		 */
		private static _addGraphicToGraphics:any;

		/**
		 * @private 
		 */
		private static _adptLineData:any;

		/**
		 * @private 
		 */
		private static _adptTextureData:any;

		/**
		 * @private 
		 */
		private static _adptLinesData:any;

		/**
		 * @private 
		 */
		private static _getParams:any;

		/**
		 * @private 
		 */
		private static _getObjVar:any;
	}

	/**
	 * @private <code>ColorUtils</code> 是一个颜色值处理类。
	 */
	class ColorUtils  {

		/**
		 * @private 
		 */
		static _SAVE:any;

		/**
		 * @private 
		 */
		static _SAVE_SIZE:number;

		/**
		 * @private 
		 */
		private static _COLOR_MAP:any;

		/**
		 * @private 
		 */
		private static _DEFAULT:any;

		/**
		 * @private 
		 */
		private static _COLODID:any;

		/**
		 * rgba 取值范围0-1
		 */
		arrColor:any[];

		/**
		 * 字符串型颜色值。
		 */
		strColor:string;

		/**
		 * uint 型颜色值。
		 */
		numColor:number;

		/**
		 * 根据指定的属性值，创建一个 <code>Color</code> 类的实例。
		 * @param value 颜色值，可以是字符串："#ff0000"或者16进制颜色 0xff0000。
		 */

		constructor(value:any);

		/**
		 * @private 
		 */
		static _initDefault():any;

		/**
		 * @private 缓存太大，则清理缓存
		 */
		static _initSaveMap():void;

		/**
		 * 根据指定的属性值，创建并返回一个 <code>Color</code> 类的实例。
		 * @param value 颜色值，可以是字符串："#ff0000"或者16进制颜色 0xff0000。
		 * @return 一个 <code>Color</code> 类的实例。
		 */
		static create(value:any):ColorUtils;
	}

	/**
	 * @private <code>Dragging</code> 类是触摸滑动控件。
	 */
	class Dragging  {

		/**
		 * 被拖动的对象。
		 */
		target:Sprite;

		/**
		 * 缓动衰减系数。
		 */
		ratio:number;

		/**
		 * 单帧最大偏移量。
		 */
		maxOffset:number;

		/**
		 * 滑动范围。
		 */
		area:Rectangle;

		/**
		 * 表示拖动是否有惯性。
		 */
		hasInertia:boolean;

		/**
		 * 橡皮筋最大值。
		 */
		elasticDistance:number;

		/**
		 * 橡皮筋回弹时间，单位为毫秒。
		 */
		elasticBackTime:number;

		/**
		 * 事件携带数据。
		 */
		data:any;
		private _dragging:any;
		private _clickOnly:any;
		private _elasticRateX:any;
		private _elasticRateY:any;
		private _lastX:any;
		private _lastY:any;
		private _offsetX:any;
		private _offsetY:any;
		private _offsets:any;
		private _disableMouseEvent:any;
		private _tween:any;
		private _parent:any;

		/**
		 * 开始拖拽。
		 * @param target 待拖拽的 <code>Sprite</code> 对象。
		 * @param area 滑动范围。
		 * @param hasInertia 拖动是否有惯性。
		 * @param elasticDistance 橡皮筋最大值。
		 * @param elasticBackTime 橡皮筋回弹时间，单位为毫秒。
		 * @param data 事件携带数据。
		 * @param disableMouseEvent 鼠标事件是否有效。
		 * @param ratio 惯性阻尼系数
		 */
		start(target:Sprite,area:Rectangle,hasInertia:boolean,elasticDistance:number,elasticBackTime:number,data:any,disableMouseEvent:boolean,ratio?:number):void;

		/**
		 * 清除计时器。
		 */
		private clearTimer:any;

		/**
		 * 停止拖拽。
		 */
		stop():void;

		/**
		 * 拖拽的循环处理函数。
		 */
		private loop:any;

		/**
		 * 拖拽区域检测。
		 */
		private checkArea:any;

		/**
		 * 移动至设定的拖拽区域。
		 */
		private backToArea:any;

		/**
		 * 舞台的抬起事件侦听函数。
		 * @param e Event 对象。
		 */
		private onStageMouseUp:any;

		/**
		 * 橡皮筋效果检测。
		 */
		private checkElastic:any;

		/**
		 * 移动。
		 */
		private tweenMove:any;

		/**
		 * 结束拖拽。
		 */
		private clear:any;
	}

	/**
	 * <code>Ease</code> 类定义了缓动函数，以便实现 <code>Tween</code> 动画的缓动效果。
	 */
	class Ease  {

		/**
		 * @private 
		 */
		private static HALF_PI:any;

		/**
		 * @private 
		 */
		private static PI2:any;

		/**
		 * 定义无加速持续运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static linearNone(t:number,b:number,c:number,d:number):number;

		/**
		 * 定义无加速持续运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static linearIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 定义无加速持续运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static linearInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 定义无加速持续运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static linearOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static bounceIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static bounceInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static bounceOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始时往后运动，然后反向朝目标移动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param s 指定过冲量，此处数值越大，过冲越大。
		 * @return 指定时间的插补属性的值。
		 */
		static backIn(t:number,b:number,c:number,d:number,s?:number):number;

		/**
		 * 开始运动时是向后跟踪，再倒转方向并朝目标移动，稍微过冲目标，然后再次倒转方向，回来朝目标移动。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param s 指定过冲量，此处数值越大，过冲越大。
		 * @return 指定时间的插补属性的值。
		 */
		static backInOut(t:number,b:number,c:number,d:number,s?:number):number;

		/**
		 * 开始运动时是朝目标移动，稍微过冲，再倒转方向回来朝着目标。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param s 指定过冲量，此处数值越大，过冲越大。
		 * @return 指定时间的插补属性的值。
		 */
		static backOut(t:number,b:number,c:number,d:number,s?:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * 其中的运动由按照指数方式衰减的正弦波来定义。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param a 指定正弦波的幅度。
		 * @param p 指定正弦波的周期。
		 * @return 指定时间的插补属性的值。
		 */
		static elasticIn(t:number,b:number,c:number,d:number,a?:number,p?:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * 其中的运动由按照指数方式衰减的正弦波来定义。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param a 指定正弦波的幅度。
		 * @param p 指定正弦波的周期。
		 * @return 指定时间的插补属性的值。
		 */
		static elasticInOut(t:number,b:number,c:number,d:number,a?:number,p?:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * 其中的运动由按照指数方式衰减的正弦波来定义。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @param a 指定正弦波的幅度。
		 * @param p 指定正弦波的周期。
		 * @return 指定时间的插补属性的值。
		 */
		static elasticOut(t:number,b:number,c:number,d:number,a?:number,p?:number):number;

		/**
		 * 以零速率开始运动，然后在执行时加快运动速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static strongIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static strongInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static strongOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static sineInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以零速率开始运动，然后在执行时加快运动速度。
		 * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static sineIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static sineOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以零速率开始运动，然后在执行时加快运动速度。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quintIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quintInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quintOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quartIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quartInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quartOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static cubicIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static cubicInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static cubicOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quadIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quadInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static quadOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * 其中每个时间间隔是剩余距离减去一个固定比例部分。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static expoIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * 其中每个时间间隔是剩余距离减去一个固定比例部分。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static expoInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * 其中每个时间间隔是剩余距离减去一个固定比例部分。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static expoOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * 缓动方程的运动加速会产生突然的速率变化。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static circIn(t:number,b:number,c:number,d:number):number;

		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * 缓动方程的运动加速会产生突然的速率变化。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static circInOut(t:number,b:number,c:number,d:number):number;

		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * 缓动方程的运动加速会产生突然的速率变化。
		 * @param t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param b 指定动画属性的初始值。
		 * @param c 指定动画属性的更改总计。
		 * @param d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		static circOut(t:number,b:number,c:number,d:number):number;
	}
	class FontInfo  {
		static EMPTY:FontInfo;
		private static _cache:any;
		private static _gfontID:any;
		private static _lastFont:any;
		private static _lastFontInfo:any;

		/**
		 * 解析字体模型
		 * @param font 
		 */
		static Parse(font:string):FontInfo;

		constructor(font:string|null);

		/**
		 * 设置字体格式
		 * @param value 
		 */
		setFont(value:string):void;
	}

	/**
	 * Graphics动画解析器
	 * @private 
	 */
	class GraphicAnimation extends FrameAnimation  {

		/**
		 * @private 
		 */
		animationList:any[];

		/**
		 * @private 
		 */
		animationDic:any;

		/**
		 * @private 
		 */
		protected _nodeList:any[];

		/**
		 * @private 
		 */
		protected _nodeDefaultProps:any;

		/**
		 * @private 
		 */
		protected _gList:any[];

		/**
		 * @private 
		 */
		protected _nodeIDAniDic:any;

		/**
		 * @private 
		 */
		protected static _drawTextureCmd:any[];

		/**
		 * @private 
		 */
		protected static _temParam:any[];

		/**
		 * @private 
		 */
		private static _I:any;

		/**
		 * @private 
		 */
		private static _rootMatrix:any;

		/**
		 * @private 
		 */
		private _rootNode:any;

		/**
		 * @private 
		 */
		protected _nodeGDic:any;

		/**
		 * @private 
		 */
		private _parseNodeList:any;

		/**
		 * @private 
		 */
		private _calGraphicData:any;

		/**
		 * @private 
		 */
		private _createGraphicData:any;

		/**
		 * @private 
		 */
		protected _createFrameGraphic(frame:number):any;
		protected _updateNodeGraphic(node:any,frame:number,parentTransfrom:Matrix,g:Graphics,alpha?:number):void;
		protected _updateNodeGraphic2(node:any,frame:number,g:Graphics):void;

		/**
		 * @private 
		 * @override 
		 */
		protected _calculateKeyFrames(node:any):void;

		/**
		 * @private 
		 */
		protected getNodeDataByID(nodeID:number):any;

		/**
		 * @private 
		 */
		protected _getParams(obj:any,params:any[],frame:number,obj2:any):any[];

		/**
		 * @private 
		 */
		private _getObjVar:any;
		private static _tempMt:any;

		/**
		 * @private 
		 */
		protected _getTextureByUrl(url:string):any;

		/**
		 * @private 
		 */
		setAniData(uiView:any,aniName?:string):void;
		parseByData(aniData:any):any;

		/**
		 * @private 
		 */
		setUpAniData(uiView:any):void;

		/**
		 * @private 
		 */
		protected _clear():void;
		static parseAnimationByData(animationObject:any):any;
		static parseAnimationData(aniData:any):any;
	}

	/**
	 * <code>HalfFloatUtils</code> 类用于创建HalfFloat工具。
	 */
	class HalfFloatUtils  {

		/**
		 * round a number to a half float number bits.
		 * @param num 
		 */
		static roundToFloat16Bits(num:number):number;

		/**
		 * convert a half float number bits to a number.
		 * @param float16bits - half float number bits
		 */
		static convertToNumber(float16bits:number):number;
	}

	/**
	 * <p><code>Handler</code> 是事件处理器类。</p>
	 * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
	 * <p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
	 */
	class Handler  {

		/**
		 * @private handler对象池
		 */
		protected static _pool:Handler[];

		/**
		 * @private 
		 */
		private static _gid:any;

		/**
		 * 执行域(this)。
		 */
		caller:Object|null;

		/**
		 * 处理方法。
		 */
		method:Function|null;

		/**
		 * 参数。
		 */
		args:any[]|null;

		/**
		 * 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。
		 */
		once:boolean;

		/**
		 * @private 
		 */
		protected _id:number;

		/**
		 * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
		 * @param caller 执行域。
		 * @param method 处理函数。
		 * @param args 函数参数。
		 * @param once 是否只执行一次。
		 */

		constructor(caller?:Object|null,method?:Function|null,args?:any[]|null,once?:boolean);

		/**
		 * 设置此对象的指定属性值。
		 * @param caller 执行域(this)。
		 * @param method 回调方法。
		 * @param args 携带的参数。
		 * @param once 是否只执行一次，如果为true，执行后执行recover()进行回收。
		 * @return 返回 handler 本身。
		 */
		setTo(caller:any,method:Function|null,args:any[]|null,once?:boolean):Handler;

		/**
		 * 执行处理器。
		 */
		run():any;

		/**
		 * 执行处理器，并携带额外数据。
		 * @param data 附加的回调数据，可以是单数据或者Array(作为多参)。
		 */
		runWith(data:any):any;

		/**
		 * 清理对象引用。
		 */
		clear():Handler;

		/**
		 * 清理并回收到 Handler 对象池内。
		 */
		recover():void;

		/**
		 * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
		 * @param caller 执行域(this)。
		 * @param method 回调方法。
		 * @param args 携带的参数。
		 * @param once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
		 * @return 返回创建的handler实例。
		 */
		static create(caller:any,method:Function|null,args?:any[]|null,once?:boolean):Handler;
	}

	/**
	 * 鼠标点击区域，可以设置绘制一系列矢量图作为点击区域和非点击区域（目前只支持圆形，矩形，多边形）
	 */
	class HitArea  {

		/**
		 * @private 
		 */
		private static _cmds:any;

		/**
		 * @private 
		 */
		private static _rect:any;

		/**
		 * @private 
		 */
		private static _ptPoint:any;

		/**
		 * @private 
		 */
		private _hit:any;

		/**
		 * @private 
		 */
		private _unHit:any;

		/**
		 * 检测对象是否包含指定的点。
		 * @param x 点的 X 轴坐标值（水平位置）。
		 * @param y 点的 Y 轴坐标值（垂直位置）。
		 * @return 如果包含指定的点，则值为 true；否则为 false。
		 */
		contains(x:number,y:number):boolean;

		/**
		 * 可点击区域，可以设置绘制一系列矢量图作为点击区域（目前只支持圆形，矩形，多边形）
		 */
		get hit():Graphics;
		set hit(value:Graphics);

		/**
		 * 不可点击区域，可以设置绘制一系列矢量图作为非点击区域（目前只支持圆形，矩形，多边形）
		 */
		get unHit():Graphics;
		set unHit(value:Graphics);
	}

	/**
	 * @private <code>HTMLChar</code> 是一个 HTML 字符类。
	 */
	class HTMLChar  {
		private static _isWordRegExp:any;

		/**
		 * x坐标
		 */
		x:number;

		/**
		 * y坐标
		 */
		y:number;

		/**
		 * 宽
		 */
		width:number;

		/**
		 * 高
		 */
		height:number;

		/**
		 * 表示是否是正常单词(英文|.|数字)。
		 */
		isWord:boolean;

		/**
		 * 字符。
		 */
		char:string|null;

		/**
		 * 字符数量。
		 */
		charNum:number;

		/**
		 * CSS 样式。
		 */
		style:any;

		/**
		 * 创建实例
		 */

		constructor();

		/**
		 * 根据指定的字符、宽高、样式，创建一个 <code>HTMLChar</code> 类的实例。
		 * @param char 字符。
		 * @param w 宽度。
		 * @param h 高度。
		 * @param style CSS 样式。
		 */
		setData(char:string,w:number,h:number,style:any):HTMLChar;

		/**
		 * 重置
		 */
		reset():HTMLChar;

		/**
		 * 回收
		 */
		recover():void;

		/**
		 * 创建
		 */
		static create():HTMLChar;
	}

	/**
	 * @author laya
	 */
	class IStatRender  {

		/**
		 * 显示性能统计信息。
		 * @param x X轴显示位置。
		 * @param y Y轴显示位置。
		 */
		show(x?:number,y?:number):void;

		/**
		 * 激活性能统计
		 */
		enable():void;

		/**
		 * 隐藏性能统计信息。
		 */
		hide():void;

		/**
		 * 点击性能统计显示区域的处理函数。
		 */
		set_onclick(fn:Function):void;
		isCanvasRender():boolean;
		renderNotCanvas(ctx:any,x:number,y:number):void;
	}

	/**
	 * <code>Log</code> 类用于在界面内显示日志记录信息。
	 * 注意：在加速器内不可使用
	 */
	class Log  {

		/**
		 * @private 
		 */
		private static _logdiv:any;

		/**
		 * @private 
		 */
		private static _btn:any;

		/**
		 * @private 
		 */
		private static _count:any;

		/**
		 * 最大打印数量，超过这个数量，则自动清理一次，默认为50次
		 */
		static maxCount:number;

		/**
		 * 是否自动滚动到底部，默认为true
		 */
		static autoScrollToBottom:boolean;

		/**
		 * 激活Log系统，使用方法Laya.init(800,600,Laya.Log);
		 */
		static enable():void;

		/**
		 * 隐藏/显示日志面板
		 */
		static toggle():void;

		/**
		 * 增加日志内容。
		 * @param value 需要增加的日志内容。
		 */
		static print(value:string):void;

		/**
		 * 清理日志
		 */
		static clear():void;
	}

	/**
	 * <code>Mouse</code> 类用于控制鼠标光标样式。
	 */
	class Mouse  {

		/**
		 * @private 
		 */
		private static _style:any;

		/**
		 * @private 
		 */
		private static _preCursor:any;

		/**
		 * 设置鼠标样式
		 * @param cursorStr 例如auto move no-drop col-resize
all-scroll pointer not-allowed row-resize
crosshair progress e-resize ne-resize
default text n-resize nw-resize
help vertical-text s-resize se-resize
inherit wait w-resize sw-resize
		 */
		static set cursor(cursorStr:string);
		static get cursor():string;

		/**
		 * 隐藏鼠标
		 */
		static hide():void;

		/**
		 * 显示鼠标
		 */
		static show():void;
	}
	class PerformancePlugin  {
		static _enable:boolean;
		static PERFORMANCE_LAYA:string;
		static PERFORMANCE_LAYA_3D:string;
		static PERFORMANCE_LAYA_2D:string;
		static PERFORMANCE_LAYA_3D_PRERENDER:string;
		static PERFORMANCE_LAYA_3D_UPDATESCRIPT:string;
		static PERFORMANCE_LAYA_3D_PHYSICS:string;
		static PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE:string;
		static PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION:string;
		static PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS:string;
		static PERFORMANCE_LAYA_3D_RENDER:string;
		static PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP:string;
		static PERFORMANCE_LAYA_3D_RENDER_CLUSTER:string;
		static PERFORMANCE_LAYA_3D_RENDER_CULLING:string;
		static PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE:string;
		static PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE:string;
		static PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER:string;
		static PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT:string;
		static PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS:string;
		static setPerformanceDataTool(tool:any):void;
		static begainSample(path:string):void;
		static endSample(path:string):number;
		static expoertFile(path:string):any;
		static showFunSampleFun(path:string):void;
		static set enable(value:boolean);
		static get enable():boolean;
		static set enableDataExport(value:boolean);
		static get enableDataExport():boolean;
	}

	/**
	 * <p> <code>Pool</code> 是对象池类，用于对象的存储、重复使用。</p>
	 * <p>合理使用对象池，可以有效减少对象创建的开销，避免频繁的垃圾回收，从而优化游戏流畅度。</p>
	 */
	class Pool  {

		/**
		 * @private 
		 */
		private static _CLSID:any;

		/**
		 * @private 
		 */
		private static POOLSIGN:any;

		/**
		 * @private 对象存放池。
		 */
		private static _poolDic:any;

		/**
		 * 根据对象类型标识字符，获取对象池。
		 * @param sign 对象类型标识字符。
		 * @return 对象池。
		 */
		static getPoolBySign(sign:string):any[];

		/**
		 * 清除对象池的对象。
		 * @param sign 对象类型标识字符。
		 */
		static clearBySign(sign:string):void;

		/**
		 * 将对象放到对应类型标识的对象池中。
		 * @param sign 对象类型标识字符。
		 * @param item 对象。
		 */
		static recover(sign:string,item:any):void;

		/**
		 * 根据类名进行回收，如果类有类名才进行回收，没有则不回收
		 * @param instance 类的具体实例
		 */
		static recoverByClass(instance:any):void;

		/**
		 * 返回类的唯一标识
		 */
		private static _getClassSign:any;

		/**
		 * 根据类名回收类的实例
		 * @param instance 类的具体实例
		 */
		static createByClass<T>(cls:new () => T):T;

		/**
		 * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
		 * <p>当对象池中无此类型标识的对象时，则根据传入的类型，创建一个新的对象返回。</p>
		 * @param sign 对象类型标识字符。
		 * @param cls 用于创建该类型对象的类。
		 * @return 此类型标识的一个对象。
		 */
		static getItemByClass<T>(sign:string,cls:new () => T):T;

		/**
		 * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
		 * <p>当对象池中无此类型标识的对象时，则使用传入的创建此类型对象的函数，新建一个对象返回。</p>
		 * @param sign 对象类型标识字符。
		 * @param createFun 用于创建该类型对象的方法。
		 * @param caller this对象
		 * @return 此类型标识的一个对象。
		 */
		static getItemByCreateFun(sign:string,createFun:Function,caller?:any):any;

		/**
		 * 根据传入的对象类型标识字符，获取对象池中已存储的此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
		 * @param sign 对象类型标识字符。
		 * @return 对象池中此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
		 */
		static getItem(sign:string):any;
	}

	/**
	 * @private 基于个数的对象缓存管理器
	 */
	class PoolCache  {

		/**
		 * 对象在Pool中的标识
		 */
		sign:string;

		/**
		 * 允许缓存的最大数量
		 */
		maxCount:number;

		/**
		 * 获取缓存的对象列表
		 * @return 
		 */
		getCacheList():any[];

		/**
		 * 尝试清理缓存
		 * @param force 是否强制清理
		 */
		tryDispose(force:boolean):void;

		/**
		 * 添加对象缓存管理
		 * @param sign 对象在Pool中的标识
		 * @param maxCount 允许缓存的最大数量
		 */
		static addPoolCacheManager(sign:string,maxCount?:number):void;
	}

	/**
	 * @private 
	 */
	class RunDriver  {
		static createShaderCondition:Function;

		/**
		 * 用于改变 WebGL宽高信息。
		 */
		static changeWebGLSize:Function;
	}

	/**
	 * @private 场景辅助类
	 */
	class SceneUtils  {

		/**
		 * @private 
		 */
		private static _funMap:any;

		/**
		 * @private 
		 */
		private static _parseWatchData:any;

		/**
		 * @private 
		 */
		private static _parseKeyWord:any;
		static __init():void;

		/**
		 * @private 根据字符串，返回函数表达式
		 */
		static getBindFun(value:string):Function;

		/**
		 * @private 通过视图数据创建视图。
		 * @param uiView 视图数据信息。
		 */
		static createByData(root:any,uiView:any):any;
		static createInitTool():InitTool;

		/**
		 * 根据UI数据实例化组件。
		 * @param uiView UI数据。
		 * @param comp 组件本体，如果为空，会新创建一个。
		 * @param view 组件所在的视图实例，用来注册var全局变量，如果值为空则不注册。
		 * @return 一个 Component 对象。
		 */
		static createComp(uiView:any,comp?:any,view?:any,dataMap?:any[],initTool?:InitTool):any;

		/**
		 * @private 设置组件的属性值。
		 * @param comp 组件实例。
		 * @param prop 属性名称。
		 * @param value 属性值。
		 * @param view 组件所在的视图实例，用来注册var全局变量，如果值为空则不注册。
		 */
		private static setCompValue:any;

		/**
		 * @private 通过组建UI数据，获取组件实例。
		 * @param json UI数据。
		 * @return Component 对象。
		 */
		static getCompInstance(json:any):any;
	}

	/**
	 * @private 场景辅助类
	 */
	class InitTool  {

		/**
		 * @private 
		 */
		private _nodeRefList:any;

		/**
		 * @private 
		 */
		private _initList:any;
		private _loadList:any;
		reset():void;
		recover():void;
		static create():InitTool;
		addLoadRes(url:string,type?:string):void;

		/**
		 * @private 
		 */
		addNodeRef(node:any,prop:string,referStr:string):void;

		/**
		 * @private 
		 */
		setNodeRef():void;

		/**
		 * @private 
		 */
		getReferData(referStr:string):any;

		/**
		 * @private 
		 */
		addInitItem(item:any):void;

		/**
		 * @private 
		 */
		doInits():void;

		/**
		 * @private 
		 */
		finish():void;

		/**
		 * @private 
		 */
		beginLoad(scene:Scene):void;
	}

	/**
	 * <p> <code>Stat</code> 是一个性能统计面板，可以实时更新相关的性能参数。</p>
	 * <p>参与统计的性能参数如下（所有参数都是每大约1秒进行更新）：<br/>
	 * FPS(WebGL)：WebGL 模式下的帧频，也就是每秒显示的帧数，值越高、越稳定，感觉越流畅；<br/>
	 * Sprite：统计所有渲染节点（包括容器）数量，它的大小会影响引擎进行节点遍历、数据组织和渲染的效率。其值越小，游戏运行效率越高；<br/>
	 * DrawCall：此值是决定性能的重要指标，其值越小，游戏运行效率越高。Canvas模式下表示每大约1秒的图像绘制次数；WebGL模式下表示每大约1秒的渲染提交批次，每次准备数据并通知GPU渲染绘制的过程称为1次DrawCall，在每次DrawCall中除了在通知GPU的渲染上比较耗时之外，切换材质与shader也是非常耗时的操作；<br/>
	 * CurMem：Canvas模式下，表示内存占用大小，值越小越好，过高会导致游戏闪退；WebGL模式下，表示内存与显存的占用，值越小越好；<br/>
	 * Shader：是 WebGL 模式独有的性能指标，表示每大约1秒 Shader 提交次数，值越小越好；<br/>
	 * Canvas：由三个数值组成，只有设置 CacheAs 后才会有值，默认为0/0/0。从左到右数值的意义分别为：每帧重绘的画布数量 / 缓存类型为"normal"类型的画布数量 / 缓存类型为"bitmap"类型的画布数量。</p>
	 */
	class Stat  {

		/**
		 * 每秒帧数。
		 */
		static FPS:number;

		/**
		 * 主舞台 <code>Stage</code> 渲染次数计数。
		 */
		static loopCount:number;

		/**
		 * 着色器请求次数。
		 */
		static shaderCall:number;

		/**
		 * 渲染批次。
		 */
		static renderBatches:number;

		/**
		 * 节省的渲染批次。
		 */
		static savedRenderBatches:number;

		/**
		 * 三角形面数。
		 */
		static trianglesFaces:number;

		/**
		 * 精灵<code>Sprite</code> 的数量。
		 */
		static spriteCount:number;

		/**
		 * 精灵渲染使用缓存<code>Sprite</code> 的数量。
		 */
		static spriteRenderUseCacheCount:number;

		/**
		 * 视锥剔除次数。
		 */
		static frustumCulling:number;

		/**
		 * 八叉树节点剔除次数。
		 */
		static octreeNodeCulling:number;

		/**
		 * 画布 canvas 使用标准渲染的次数。
		 */
		static canvasNormal:number;

		/**
		 * 画布 canvas 使用位图渲染的次数。
		 */
		static canvasBitmap:number;

		/**
		 * 画布 canvas 缓冲区重绘次数。
		 */
		static canvasReCache:number;

		/**
		 * 表示当前使用的是否为慢渲染模式。
		 */
		static renderSlow:boolean;

		/**
		 * 资源管理器所管理资源的累计内存,以字节为单位。
		 */
		static gpuMemory:number;
		static cpuMemory:number;

		/**
		 * 显示性能统计信息。
		 * @param x X轴显示位置。
		 * @param y Y轴显示位置。
		 */
		static show(x?:number,y?:number):void;

		/**
		 * 激活性能统计
		 */
		static enable():void;

		/**
		 * 隐藏性能统计信息。
		 */
		static hide():void;

		/**
		 * @private 清零性能统计计算相关的数据。
		 */
		static clear():void;

		/**
		 * 点击性能统计显示区域的处理函数。
		 */
		static set onclick(fn:Function);
	}

	/**
	 * 显示Stat的结果。由于stat会引入很多的循环引用，所以把显示部分拆开
	 * @author laya
	 */
	class StatUI extends IStatRender  {
		private static _fontSize:any;
		private _txt:any;
		private _leftText:any;
		private _canvas:any;
		private _ctx:any;
		private _first:any;
		private _vx:any;
		private _width:any;
		private _height:any;
		private _view:any;

		/**
		 * @override 显示性能统计信息。
		 * @param x X轴显示位置。
		 * @param y Y轴显示位置。
		 */
		show(x?:number,y?:number):void;
		private createUIPre:any;
		private createUI:any;

		/**
		 * @override 激活性能统计
		 */
		enable():void;

		/**
		 * @override 隐藏性能统计信息。
		 */
		hide():void;

		/**
		 * @override 点击性能统计显示区域的处理函数。
		 */
		set_onclick(fn:(this:GlobalEventHandlers,ev:MouseEvent) =>any):void;

		/**
		 * @private 性能统计参数计算循环处理函数。
		 */
		loop():void;
		private renderInfoPre:any;
		private renderInfo:any;

		/**
		 * @override 
		 */
		isCanvasRender():boolean;

		/**
		 * @override 非canvas模式的渲染
		 */
		renderNotCanvas(ctx:any,x:number,y:number):void;
	}

	/**
	 * @private <code>StringKey</code> 类用于存取字符串对应的数字。
	 */
	class StringKey  {
		private _strsToID:any;
		private _idToStrs:any;
		private _length:any;

		/**
		 * 添加一个字符。
		 * @param str 字符，将作为key 存储相应生成的数字。
		 * @return 此字符对应的数字。
		 */
		add(str:string):number;

		/**
		 * 获取指定字符对应的ID。
		 * @param str 字符。
		 * @return 此字符对应的ID。
		 */
		getID(str:string):number;

		/**
		 * 根据指定ID获取对应字符。
		 * @param id ID。
		 * @return 此id对应的字符。
		 */
		getName(id:number):string;
	}

	/**
	 * 整个缓动结束的时候会调度
	 * @eventType Event.COMPLETE
	 */

	/**
	 * 当缓动到达标签时会调度。
	 * @eventType Event.LABEL
	 */

	/**
	 * <code>TimeLine</code> 是一个用来创建时间轴动画的类。
	 */
	class TimeLine extends EventDispatcher  {
		private _labelDic:any;
		private _tweenDic:any;
		private _tweenDataList:any;
		private _endTweenDataList:any;
		private _currTime:any;
		private _lastTime:any;
		private _startTime:any;

		/**
		 * 当前动画数据播放到第几个了
		 */
		private _index:any;

		/**
		 * 为TWEEN创建属于自己的唯一标识，方便管理
		 */
		private _gidIndex:any;

		/**
		 * 保留所有对象第一次注册动画时的状态（根据时间跳转时，需要把对象的恢复，再计算接下来的状态）
		 */
		private _firstTweenDic:any;

		/**
		 * 是否需要排序
		 */
		private _startTimeSort:any;
		private _endTimeSort:any;

		/**
		 * 是否循环
		 */
		private _loopKey:any;

		/**
		 * 缩放动画播放的速度。
		 */
		scale:number;
		private _frameRate:any;
		private _frameIndex:any;
		private _total:any;

		/**
		 * 控制一个对象，从当前点移动到目标点。
		 * @param target 要控制的对象。
		 * @param props 要控制对象的属性。
		 * @param duration 对象TWEEN的时间。
		 * @param ease 缓动类型
		 * @param offset 相对于上一个对象，偏移多长时间（单位：毫秒）。
		 */
		static to(target:any,props:any,duration:number,ease?:Function,offset?:number):TimeLine;

		/**
		 * 从 props 属性，缓动到当前状态。
		 * @param target target 目标对象(即将更改属性值的对象)
		 * @param props 要控制对象的属性
		 * @param duration 对象TWEEN的时间
		 * @param ease 缓动类型
		 * @param offset 相对于上一个对象，偏移多长时间（单位：毫秒）
		 */
		static from(target:any,props:any,duration:number,ease?:Function,offset?:number):TimeLine;

		/**
		 * 控制一个对象，从当前点移动到目标点。
		 * @param target 要控制的对象。
		 * @param props 要控制对象的属性。
		 * @param duration 对象TWEEN的时间。
		 * @param ease 缓动类型
		 * @param offset 相对于上一个对象，偏移多长时间（单位：毫秒）。
		 */
		to(target:any,props:any,duration:number,ease?:Function,offset?:number):TimeLine;

		/**
		 * 从 props 属性，缓动到当前状态。
		 * @param target target 目标对象(即将更改属性值的对象)
		 * @param props 要控制对象的属性
		 * @param duration 对象TWEEN的时间
		 * @param ease 缓动类型
		 * @param offset 相对于上一个对象，偏移多长时间（单位：毫秒）
		 */
		from(target:any,props:any,duration:number,ease?:Function,offset?:number):TimeLine;

		/**
		 * @private 
		 */
		private _create:any;

		/**
		 * 在时间队列中加入一个标签。
		 * @param label 标签名称。
		 * @param offset 标签相对于上个动画的偏移时间(单位：毫秒)。
		 */
		addLabel(label:string,offset:number):TimeLine;

		/**
		 * 移除指定的标签
		 * @param label 
		 */
		removeLabel(label:string):void;

		/**
		 * 动画从整个动画的某一时间开始。
		 * @param time (单位：毫秒)。
		 */
		gotoTime(time:number):void;

		/**
		 * 从指定的标签开始播。
		 * @param Label 标签名。
		 */
		gotoLabel(Label:string):void;

		/**
		 * 暂停整个动画。
		 */
		pause():void;

		/**
		 * 恢复暂停动画的播放。
		 */
		resume():void;

		/**
		 * 播放动画。
		 * @param timeOrLabel 开启播放的时间点或标签名。
		 * @param loop 是否循环播放。
		 */
		play(timeOrLabel?:any,loop?:boolean):void;

		/**
		 * 更新当前动画。
		 */
		private _update:any;

		/**
		 * 指定的动画索引处的动画播放完成后，把此动画从列表中删除。
		 * @param index 
		 */
		private _animComplete:any;

		/**
		 * @private 
		 */
		private _complete:any;

		/**
		 * @private 得到帧索引
		 */
		get index():number;

		/**
		 * @private 设置帧索引
		 */
		set index(value:number);

		/**
		 * 得到总帧数。
		 */
		get total():number;

		/**
		 * 重置所有对象，复用对象的时候使用。
		 */
		reset():void;

		/**
		 * 彻底销毁此对象。
		 */
		destroy():void;
	}

	/**
	 * <code>Timer</code> 是时钟管理类。它是一个单例，不要手动实例化此类，应该通过 Laya.timer 访问。
	 */
	class Timer  {

		/**
		 * @private 
		 */
		static gSysTimer:Timer;

		/**
		 * @private 
		 */
		private static _pool:any;

		/**
		 * @private 
		 */
		static _mid:number;

		/**
		 * 时针缩放。
		 */
		scale:number;

		/**
		 * 当前帧开始的时间。
		 */
		currTimer:number;

		/**
		 * 当前的帧数。
		 */
		currFrame:number;

		/**
		 * @private 
		 */
		private _map:any;

		/**
		 * @private 
		 */
		private _handlers:any;

		/**
		 * @private 
		 */
		private _temp:any;

		/**
		 * @private 
		 */
		private _count:any;

		/**
		 * 创建 <code>Timer</code> 类的一个实例。
		 */

		constructor(autoActive?:boolean);

		/**
		 * 两帧之间的时间间隔,单位毫秒。
		 */
		get delta():number;

		/**
		 * @private 
		 */
		private _clearHandlers:any;

		/**
		 * @private 
		 */
		private _recoverHandler:any;

		/**
		 * @private 
		 */
		private _indexHandler:any;

		/**
		 * 定时执行一次。
		 * @param delay 延迟时间(单位为毫秒)。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		 */
		once(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 定时重复执行。
		 * @param delay 间隔时间(单位毫秒)。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		 * @param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
		 */
		loop(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean,jumpFrame?:boolean):void;

		/**
		 * 定时执行一次(基于帧率)。
		 * @param delay 延迟几帧(单位为帧)。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		 */
		frameOnce(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 定时重复执行(基于帧率)。
		 * @param delay 间隔几帧(单位为帧)。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		 */
		frameLoop(delay:number,caller:any,method:Function,args?:any[],coverBefore?:boolean):void;

		/**
		 * 返回统计信息。
		 */
		toString():string;

		/**
		 * 清理定时器。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 */
		clear(caller:any,method:Function):void;

		/**
		 * 清理对象身上的所有定时器。
		 * @param caller 执行域(this)。
		 */
		clearAll(caller:any):void;

		/**
		 * @private 
		 */
		private _getHandler:any;

		/**
		 * 延迟执行。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 * @param args 回调参数。
		 */
		callLater(caller:any,method:Function,args?:any[]):void;

		/**
		 * 立即执行 callLater 。
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 */
		runCallLater(caller:any,method:Function):void;

		/**
		 * 立即提前执行定时器，执行之后从队列中删除
		 * @param caller 执行域(this)。
		 * @param method 定时器回调函数。
		 */
		runTimer(caller:any,method:Function):void;

		/**
		 * 暂停时钟
		 */
		pause():void;

		/**
		 * 恢复时钟
		 */
		resume():void;
	}

	/**
	 * <code>Tween</code>  是一个缓动类。使用此类能够实现对目标对象属性的渐变。
	 */
	class Tween  {

		/**
		 * @private 
		 */
		private static tweenMap:any;

		/**
		 * @private 
		 */
		private _complete:any;

		/**
		 * @private 
		 */
		private _target:any;

		/**
		 * @private 
		 */
		private _ease:any;

		/**
		 * @private 
		 */
		private _props:any;

		/**
		 * @private 
		 */
		private _duration:any;

		/**
		 * @private 
		 */
		private _delay:any;

		/**
		 * @private 
		 */
		private _startTimer:any;

		/**
		 * @private 
		 */
		private _usedTimer:any;

		/**
		 * @private 
		 */
		private _usedPool:any;

		/**
		 * @private 
		 */
		private _delayParam:any;

		/**
		 * @private 唯一标识，TimeLintLite用到
		 */
		gid:number;

		/**
		 * 更新回调，缓动数值发生变化时，回调变化的值
		 */
		update:Handler;

		/**
		 * 重播次数，如果repeat=0，则表示无限循环播放
		 */
		repeat:number;

		/**
		 * 当前播放次数
		 */
		private _count:any;

		/**
		 * 缓动对象的props属性到目标值。
		 * @param target 目标对象(即将更改属性值的对象)。
		 * @param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
		 * @param duration 花费的时间，单位毫秒。
		 * @param ease 缓动类型，默认为匀速运动。
		 * @param complete 结束回调函数。
		 * @param delay 延迟执行时间。
		 * @param coverBefore 是否覆盖之前的缓动。
		 * @param autoRecover 是否自动回收，默认为true，缓动结束之后自动回收到对象池。
		 * @return 返回Tween对象。
		 */
		static to(target:any,props:any,duration:number,ease?:Function|null,complete?:Handler|null,delay?:number,coverBefore?:boolean,autoRecover?:boolean):Tween;

		/**
		 * 从props属性，缓动到当前状态。
		 * @param target 目标对象(即将更改属性值的对象)。
		 * @param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
		 * @param duration 花费的时间，单位毫秒。
		 * @param ease 缓动类型，默认为匀速运动。
		 * @param complete 结束回调函数。
		 * @param delay 延迟执行时间。
		 * @param coverBefore 是否覆盖之前的缓动。
		 * @param autoRecover 是否自动回收，默认为true，缓动结束之后自动回收到对象池。
		 * @return 返回Tween对象。
		 */
		static from(target:any,props:any,duration:number,ease?:Function,complete?:Handler,delay?:number,coverBefore?:boolean,autoRecover?:boolean):Tween;

		/**
		 * 缓动对象的props属性到目标值。
		 * @param target 目标对象(即将更改属性值的对象)。
		 * @param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
		 * @param duration 花费的时间，单位毫秒。
		 * @param ease 缓动类型，默认为匀速运动。
		 * @param complete 结束回调函数。
		 * @param delay 延迟执行时间。
		 * @param coverBefore 是否覆盖之前的缓动。
		 * @return 返回Tween对象。
		 */
		to(target:any,props:any,duration:number,ease?:Function,complete?:Handler,delay?:number,coverBefore?:boolean):Tween;

		/**
		 * 从props属性，缓动到当前状态。
		 * @param target 目标对象(即将更改属性值的对象)。
		 * @param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
		 * @param duration 花费的时间，单位毫秒。
		 * @param ease 缓动类型，默认为匀速运动。
		 * @param complete 结束回调函数。
		 * @param delay 延迟执行时间。
		 * @param coverBefore 是否覆盖之前的缓动。
		 * @return 返回Tween对象。
		 */
		from(target:any,props:any,duration:number,ease?:Function|null,complete?:Handler|null,delay?:number,coverBefore?:boolean):Tween;
		private firstStart:any;
		private _initProps:any;
		private _beginLoop:any;

		/**
		 * 执行缓动*
		 */
		private _doEase:any;

		/**
		 * 设置当前执行比例*
		 */
		set progress(v:number);

		/**
		 * 立即结束缓动并到终点。
		 */
		complete():void;

		/**
		 * 暂停缓动，可以通过resume或restart重新开始。
		 */
		pause():void;

		/**
		 * 设置开始时间。
		 * @param startTime 开始时间。
		 */
		setStartTime(startTime:number):void;

		/**
		 * 清理指定目标对象上的所有缓动。
		 * @param target 目标对象。
		 */
		static clearAll(target:any):void;

		/**
		 * 清理某个缓动。
		 * @param tween 缓动对象。
		 */
		static clear(tween:Tween):void;

		/**
		 * @private 同clearAll，废弃掉，尽量别用。
		 */
		static clearTween(target:any):void;

		/**
		 * 停止并清理当前缓动。
		 */
		clear():void;

		/**
		 * 回收到对象池。
		 */
		recover():void;
		private _remove:any;

		/**
		 * 重新开始暂停的缓动。
		 */
		restart():void;

		/**
		 * 恢复暂停的缓动。
		 */
		resume():void;
		private static easeNone:any;
	}

	/**
	 * <code>Utils</code> 是工具类。
	 */
	class Utils  {

		/**
		 * @private 
		 */
		static gStage:Stage;

		/**
		 * @private 
		 */
		private static _gid:any;

		/**
		 * @private 
		 */
		private static _pi:any;

		/**
		 * @private 
		 */
		private static _pi2:any;

		/**
		 * @private 
		 */
		protected static _extReg:RegExp;

		/**
		 * 角度转弧度。
		 * @param angle 角度值。
		 * @return 返回弧度值。
		 */
		static toRadian(angle:number):number;

		/**
		 * 弧度转换为角度。
		 * @param radian 弧度值。
		 * @return 返回角度值。
		 */
		static toAngle(radian:number):number;

		/**
		 * 将传入的 uint 类型颜色值转换为字符串型颜色值。
		 * @param color 颜色值。
		 * @return 字符串型颜色值。
		 */
		static toHexColor(color:number):string;

		/**
		 * 获取一个全局唯一ID。
		 */
		static getGID():number;

		/**
		 * 将字符串解析成 XML 对象。
		 * @param value 需要解析的字符串。
		 * @return js原生的XML对象。
		 */
		static parseXMLFromString:Function;

		/**
		 * @private <p>连接数组。和array的concat相比，此方法不创建新对象</p>
<b>注意：</b>若 参数 a 不为空，则会改变参数 source 的值为连接后的数组。
		 * @param source 待连接的数组目标对象。
		 * @param array 待连接的数组对象。
		 * @return 连接后的数组。
		 */
		static concatArray(source:any[],array:any[]):any[];

		/**
		 * @private 清空数组对象。
		 * @param array 数组。
		 * @return 清空后的 array 对象。
		 */
		static clearArray(array:any[]):any[];

		/**
		 * @private 清空source数组，复制array数组的值。
		 * @param source 需要赋值的数组。
		 * @param array 新的数组值。
		 * @return 复制后的数据 source 。
		 */
		static copyArray(source:any[],array:any[]):any[];

		/**
		 * @private 根据传入的显示对象 <code>Sprite</code> 和此显示对象上的 两个点，返回此对象上的两个点在舞台坐标系上组成的最小的矩形区域对象。
		 * @param sprite 显示对象 <code>Sprite</code>。
		 * @param x0 点一的 X 轴坐标点。
		 * @param y0 点一的 Y 轴坐标点。
		 * @param x1 点二的 X 轴坐标点。
		 * @param y1 点二的 Y 轴坐标点。
		 * @return 两个点在舞台坐标系组成的矩形对象 <code>Rectangle</code>。
		 */
		static getGlobalRecByPoints(sprite:Sprite,x0:number,y0:number,x1:number,y1:number):Rectangle;

		/**
		 * 计算传入的显示对象 <code>Sprite</code> 的全局坐标系的坐标和缩放值，返回 <code>Rectangle</code> 对象存放计算出的坐标X值、Y值、ScaleX值、ScaleY值。
		 * @param sprite <code>Sprite</code> 对象。
		 * @return 矩形对象 <code>Rectangle</code>
		 */
		static getGlobalPosAndScale(sprite:Sprite):Rectangle;

		/**
		 * 给传入的函数绑定作用域，返回绑定后的函数。
		 * @param fun 函数对象。
		 * @param scope 函数作用域。
		 * @return 绑定后的函数。
		 */
		static bind(fun:Function,scope:any):Function;

		/**
		 * @private 对传入的数组列表，根据子项的属性 Z 值进行重新排序。返回是否已重新排序的 Boolean 值。
		 * @param array 子对象数组。
		 * @return Boolean 值，表示是否已重新排序。
		 */
		static updateOrder(array:any[]):boolean;

		/**
		 * @private 批量移动点坐标。
		 * @param points 坐标列表。
		 * @param x x轴偏移量。
		 * @param y y轴偏移量。
		 */
		static transPointList(points:any[],x:number,y:number):void;

		/**
		 * 解析一个字符串，并返回一个整数。和JS原生的parseInt不同：如果str为空或者非数字，原生返回NaN，这里返回0。
		 * @param str 要被解析的字符串。
		 * @param radix 表示要解析的数字的基数。默认值为0，表示10进制，其他值介于 2 ~ 36 之间。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数不在上述范围内，则此方法返回 0。
		 * @return 返回解析后的数字。
		 */
		static parseInt(str:string,radix?:number):number;

		/**
		 * @private 
		 */
		static getFileExtension(path:string):string;

		/**
		 * @private 为兼容平台后缀名不能用的特殊兼容TODO：
		 */
		static getFilecompatibleExtension(path:string):string;

		/**
		 * 获取指定区域内相对于窗口左上角的transform。
		 * @param coordinateSpace 坐标空间，不能是Stage引用
		 * @param x 相对于coordinateSpace的x坐标
		 * @param y 相对于coordinateSpace的y坐标
		 * @return 
		 */
		static getTransformRelativeToWindow(coordinateSpace:Sprite,x:number,y:number):any;

		/**
		 * 使DOM元素使用舞台内的某块区域内。
		 * @param dom DOM元素引用
		 * @param coordinateSpace 坐标空间，不能是Stage引用
		 * @param x 相对于coordinateSpace的x坐标
		 * @param y 相对于coordinateSpace的y坐标
		 * @param width 宽度
		 * @param height 高度
		 */
		static fitDOMElementInArea(dom:any,coordinateSpace:Sprite,x:number,y:number,width:number,height:number):void;

		/**
		 * @private 是否是可用的Texture数组
		 * @param textureList 
		 * @return 
		 */
		static isOkTextureList(textureList:any[]):boolean;

		/**
		 * @private 是否是可用的绘图指令数组
		 * @param cmds 
		 * @return 
		 */
		static isOKCmdList(cmds:any[]):boolean;

		/**
		 * 获得URL参数值
		 * @param name 参数名称
		 * @return 参数值
		 */
		static getQueryString(name:string):string;
	}

	/**
	 * @private TODO:
	 */
	class VectorGraphManager  {
		static instance:VectorGraphManager;
		useDic:any;
		shapeDic:any;
		shapeLineDic:any;
		private _id:any;
		private _checkKey:any;
		private _freeIdArray:any;

		constructor();
		static getInstance():VectorGraphManager;

		/**
		 * 得到个空闲的ID
		 * @return 
		 */
		getId():number;

		/**
		 * 添加一个图形到列表中
		 * @param id 
		 * @param shape 
		 */
		addShape(id:number,shape:any):void;

		/**
		 * 添加一个线图形到列表中
		 * @param id 
		 * @param Line 
		 */
		addLine(id:number,Line:any):void;

		/**
		 * 检测一个对象是否在使用中
		 * @param id 
		 */
		getShape(id:number):void;

		/**
		 * 删除一个图形对象
		 * @param id 
		 */
		deleteShape(id:number):void;

		/**
		 * 得到缓存列表
		 * @return 
		 */
		getCacheList():any[];

		/**
		 * 开始清理状态，准备销毁
		 */
		startDispose(key:boolean):void;

		/**
		 * 确认销毁
		 */
		endDispose():void;
	}

	/**
	 * 封装弱引用WeakMap
	 * 如果支持WeakMap，则使用WeakMap，如果不支持，则用Object代替
	 * 注意：如果采用Object，为了防止内存泄漏，则采用定时清理缓存策略
	 * 
	 * 这里的设计是错误的，为了兼容，先不删掉这个类，直接采用Object
	 */
	class WeakObject  {

		/**
		 * 是否支持WeakMap
		 */
		static supportWeakMap:boolean;

		/**
		 * 如果不支持WeakMap，则多少时间清理一次缓存，默认10分钟清理一次
		 */
		static delInterval:number;

		/**
		 * 全局WeakObject单例
		 */
		static I:WeakObject;

		/**
		 * @private 
		 */
		private static _maps:any;

		/**
		 * 清理缓存，回收内存
		 */
		static clearCache():void;

		constructor();

		/**
		 * 设置缓存
		 * @param key kye对象，可被回收
		 * @param value object对象，可被回收
		 */
		set(key:any,value:any):void;

		/**
		 * 获取缓存
		 * @param key kye对象，可被回收
		 */
		get(key:any):any;

		/**
		 * 删除缓存
		 */
		del(key:any):void;

		/**
		 * 是否有缓存
		 */
		has(key:any):boolean;
	}

	/**
	 * @private 
	 */
	class WordText  {
		id:number;
		save:any[];
		toUpperCase:string;
		changed:boolean;
		width:number;
		pageChars:any[];
		startID:number;
		startIDStroke:number;
		lastGCCnt:number;
		splitRender:boolean;
		scalex:number;
		scaley:number;
		setText(txt:string):void;
		toString():string;
		get length():number;
		charCodeAt(i:number):number;
		charAt(i:number):string;

		/**
		 * 自己主动清理缓存，需要把关联的贴图删掉
		 * 不做也可以，textrender会自动清理不用的
		 * TODO 重用
		 */
		cleanCache():void;
	}

	/**
	 * ...
	 * @author ...
	 */
	class BufferState2D extends BufferStateBase  {

		constructor();
	}

	/**
	 * ...
	 * @author ...
	 */
	class BufferStateBase  {

		/**
		 * @private [只读]
		 */
		private _nativeVertexArrayObject:any;

		constructor();

		/**
		 * @private 
		 */
		bind():void;

		/**
		 * @private 
		 */
		unBind():void;

		/**
		 * @private 
		 */
		destroy():void;

		/**
		 * @private 
		 */
		bindForNative():void;

		/**
		 * @private 
		 */
		unBindForNative():void;
	}
	class BlendMode  {
		static activeBlendFunction:Function;
		static NORMAL:string;
		static MASK:string;
		static LIGHTER:string;
		static fns:any[];
		static targetFns:any[];
		static BlendNormal(gl:WebGLRenderingContext):void;
		static BlendAdd(gl:WebGLRenderingContext):void;
		static BlendMultiply(gl:WebGLRenderingContext):void;
		static BlendScreen(gl:WebGLRenderingContext):void;
		static BlendOverlay(gl:WebGLRenderingContext):void;
		static BlendLight(gl:WebGLRenderingContext):void;
		static BlendNormalTarget(gl:WebGLRenderingContext):void;
		static BlendAddTarget(gl:WebGLRenderingContext):void;
		static BlendMultiplyTarget(gl:WebGLRenderingContext):void;
		static BlendScreenTarget(gl:WebGLRenderingContext):void;
		static BlendOverlayTarget(gl:WebGLRenderingContext):void;
		static BlendLightTarget(gl:WebGLRenderingContext):void;
		static BlendMask(gl:WebGLRenderingContext):void;
		static BlendDestinationOut(gl:WebGLRenderingContext):void;
	}
	class DrawStyle  {
		static DEFAULT:DrawStyle;
		_color:ColorUtils;
		static create(value:any):DrawStyle;

		constructor(value:any);
		setValue(value:any):void;
		reset():void;
		toInt():number;
		equal(value:any):boolean;
		toColorStr():string;
	}
	class Path  {
		paths:any[];
		private _curPath:any;

		constructor();
		beginPath(convex:boolean):void;
		closePath():void;
		newPath():void;
		addPoint(pointX:number,pointY:number):void;
		push(points:any[],convex:boolean):void;
		reset():void;
	}

	interface ISaveData{
		isSaveMark():boolean;
		restore(context:Context):void;
	}

	class SaveBase implements ISaveData  {
		static TYPE_ALPHA:number;
		static TYPE_FILESTYLE:number;
		static TYPE_FONT:number;
		static TYPE_LINEWIDTH:number;
		static TYPE_STROKESTYLE:number;
		static TYPE_MARK:number;
		static TYPE_TRANSFORM:number;
		static TYPE_TRANSLATE:number;
		static TYPE_ENABLEMERGE:number;
		static TYPE_TEXTBASELINE:number;
		static TYPE_TEXTALIGN:number;
		static TYPE_GLOBALCOMPOSITEOPERATION:number;
		static TYPE_CLIPRECT:number;
		static TYPE_CLIPRECT_STENCIL:number;
		static TYPE_IBVB:number;
		static TYPE_SHADER:number;
		static TYPE_FILTERS:number;
		static TYPE_FILTERS_TYPE:number;
		static TYPE_COLORFILTER:number;
		private static POOL:any;
		private static _namemap:any;
		private _valueName:any;
		private _value:any;
		private _dataObj:any;
		private _newSubmit:any;

		constructor();
		isSaveMark():boolean;
		restore(context:Context):void;
		static save(context:Context,type:number,dataObj:any,newSubmit:boolean):void;
	}
	class SaveClipRect implements ISaveData  {
		private static POOL:any;
		private _globalClipMatrix:any;
		private _clipInfoID:any;
		incache:boolean;
		isSaveMark():boolean;
		restore(context:Context):void;
		static save(context:Context):void;
	}
	class SaveMark implements ISaveData  {
		private static POOL:any;

		constructor();
		isSaveMark():boolean;
		restore(context:Context):void;
		static Create(context:Context):SaveMark;
	}
	class SaveTransform implements ISaveData  {
		private static POOL:any;

		constructor();
		isSaveMark():boolean;
		restore(context:Context):void;
		static save(context:Context):void;
	}
	class SaveTranslate implements ISaveData  {
		private static POOL:any;
		isSaveMark():boolean;
		restore(context:Context):void;
		static save(context:Context):void;
	}

	/**
	 * 对象 cacheas normal的时候，本质上只是想把submit缓存起来，以后直接执行
	 * 为了避免各种各样的麻烦，这里采用复制相应部分的submit的方法。执行环境还是在原来的context中
	 * 否则包括clip等都非常难以处理
	 */
	class WebGLCacheAsNormalCanvas  {
		submitStartPos:number;
		submitEndPos:number;
		context:Context;
		touches:any[];
		submits:any[];
		sprite:Sprite|null;
		private _pathMesh:any;
		private _triangleMesh:any;
		meshlist:any[];
		private _oldMesh:any;
		private _oldPathMesh:any;
		private _oldTriMesh:any;
		private _oldMeshList:any;
		private cachedClipInfo:any;
		private oldTx:any;
		private oldTy:any;
		private static matI:any;
		invMat:Matrix;

		constructor(ctx:Context,sp:Sprite);
		startRec():void;
		endRec():void;

		/**
		 * 当前缓存是否还有效。例如clip变了就失效了，因为clip太难自动处理
		 * @return 
		 */
		isCacheValid():boolean;
		flushsubmit():void;
		releaseMem():void;
	}

	/**
	 * ...
	 * @author ...
	 */
	class BaseShader extends Resource  {
		static activeShader:BaseShader|null;
		static bindShader:BaseShader;

		constructor();
	}
	class Shader2D  {
		ALPHA:number;
		shader:Shader;
		filters:any[];
		defines:ShaderDefines2D;
		shaderType:number;
		colorAdd:any[];
		fillStyle:DrawStyle;
		strokeStyle:DrawStyle;
		destroy():void;
		static __init__():void;
	}
	class Shader2X extends Shader  {
		_params2dQuick2:any[]|null;
		_shaderValueWidth:number;
		_shaderValueHeight:number;

		constructor(vs:string,ps:string,saveName?:any,nameMap?:any,bindAttrib?:any[]|null);

		/**
		 * @override 
		 */
		protected _disposeResource():void;
		upload2dQuick2(shaderValue:ShaderValue):void;
		_make2dQuick2():any[];
		static create(vs:string,ps:string,saveName?:any,nameMap?:any,bindAttrib?:any[]|null):Shader;
	}
	class ShaderDefines2D extends ShaderDefinesBase  {
		static TEXTURE2D:number;
		static PRIMITIVE:number;
		static FILTERGLOW:number;
		static FILTERBLUR:number;
		static FILTERCOLOR:number;
		static COLORADD:number;
		static WORLDMAT:number;
		static FILLTEXTURE:number;
		static SKINMESH:number;
		static MVP3D:number;
		static NOOPTMASK:number;
		private static __name2int:any;
		private static __int2name:any;
		private static __int2nameMap:any;
		static __init__():void;

		constructor();
		static reg(name:string,value:number):void;
		static toText(value:number,int2name:any[],int2nameMap:any):any;
		static toInt(names:string):number;
	}
	class SkinMeshBuffer  {
		ib:IndexBuffer2D;
		vb:VertexBuffer2D;
		static instance:SkinMeshBuffer;

		constructor();
		static getInstance():SkinMeshBuffer;
		addSkinMesh(skinMesh:any):void;
		reset():void;
	}
	class SkinSV extends Value2D  {
		texcoord:any;
		position:any;
		offsetX:number;
		offsetY:number;

		constructor(type:any);
	}
	class PrimitiveSV extends Value2D  {

		constructor(args:any);
	}
	class TextureSV extends Value2D  {
		u_colorMatrix:any[];
		strength:number;
		blurInfo:any[];
		colorMat:Float32Array;
		colorAlpha:Float32Array;

		constructor(subID?:number);

		/**
		 * @override 
		 */
		clear():void;
	}
	class Value2D  {
		protected static _cache:any[];
		protected static _typeClass:any;
		static TEMPMAT4_ARRAY:any[];
		static _initone(type:number,classT:any):void;
		static __init__():void;
		defines:ShaderDefines2D;
		size:any[];
		alpha:number;
		mmat:any[];
		u_MvpMatrix:any[];
		texture:any;
		ALPHA:number;
		shader:Shader;
		mainID:number;
		subID:number;
		filters:any[];
		textureHost:Texture;
		color:any[];
		colorAdd:any[];
		u_mmat2:any[];
		ref:number;
		protected _attribLocation:any[];
		private _inClassCache:any;
		private _cacheID:any;
		clipMatDir:any[];
		clipMatPos:any[];
		clipOff:any[];

		constructor(mainID:number,subID:number);
		setValue(value:Shader2D):void;
		private _ShaderWithCompile:any;
		upload():void;
		setFilters(value:any[]):void;
		clear():void;
		release():void;
		static create(mainType:number,subType:number):Value2D;
	}
	class Shader extends BaseShader  {
		private static _count:any;
		private _attribInfo:any;
		static SHADERNAME2ID:number;
		static nameKey:StringKey;
		static sharders:any[];
		static getShader(name:any):Shader;
		static create(vs:string,ps:string,saveName?:any,nameMap?:any,bindAttrib?:any[]):Shader;

		/**
		 * 根据宏动态生成shader文件，支持#include?COLOR_FILTER "parts/ColorFilter_ps_logic.glsl";条件嵌入文件
		 * @param name 
		 * @param vs 
		 * @param ps 
		 * @param define 宏定义，格式:{name:value...}
		 * @return 
		 */
		static withCompile(nameID:number,define:any,shaderName:any,createShader:Function):Shader;

		/**
		 * 根据宏动态生成shader文件，支持#include?COLOR_FILTER "parts/ColorFilter_ps_logic.glsl";条件嵌入文件
		 * @param name 
		 * @param vs 
		 * @param ps 
		 * @param define 宏定义，格式:{name:value...}
		 * @return 
		 */
		static withCompile2D(nameID:number,mainID:number,define:any,shaderName:any,createShader:Function,bindAttrib?:any[]):Shader;
		static addInclude(fileName:string,txt:string):void;

		/**
		 * 预编译shader文件，主要是处理宏定义
		 * @param nameID ,一般是特殊宏+shaderNameID*0.0002组成的一个浮点数当做唯一标识
		 * @param vs 
		 * @param ps 
		 */
		static preCompile(nameID:number,vs:string,ps:string,nameMap:any):void;

		/**
		 * 预编译shader文件，主要是处理宏定义
		 * @param nameID ,一般是特殊宏+shaderNameID*0.0002组成的一个浮点数当做唯一标识
		 * @param vs 
		 * @param ps 
		 */
		static preCompile2D(nameID:number,mainID:number,vs:string,ps:string,nameMap:any):void;
		private customCompile:any;
		private _nameMap:any;
		private _vs:any;
		private _ps:any;
		private _curActTexIndex:any;
		private _reCompile:any;
		tag:any;

		/**
		 * 根据vs和ps信息生成shader对象
		 * 把自己存储在 sharders 数组中
		 * @param vs 
		 * @param ps 
		 * @param name :
		 * @param nameMap 帮助里要详细解释为什么需要nameMap
		 */

		constructor(vs:string,ps:string,saveName?:any,nameMap?:any,bindAttrib?:any[]|null);
		protected recreateResource():void;

		/**
		 * @override 
		 */
		protected _disposeResource():void;
		private _compile:any;
		private static _createShader:any;

		/**
		 * 根据变量名字获得
		 * @param name 
		 * @return 
		 */
		getUniform(name:string):any;
		private _uniform1f:any;
		private _uniform1fv:any;
		private _uniform_vec2:any;
		private _uniform_vec2v:any;
		private _uniform_vec3:any;
		private _uniform_vec3v:any;
		private _uniform_vec4:any;
		private _uniform_vec4v:any;
		private _uniformMatrix2fv:any;
		private _uniformMatrix3fv:any;
		private _uniformMatrix4fv:any;
		private _uniform1i:any;
		private _uniform1iv:any;
		private _uniform_ivec2:any;
		private _uniform_ivec2v:any;
		private _uniform_vec3i:any;
		private _uniform_vec3vi:any;
		private _uniform_vec4i:any;
		private _uniform_vec4vi:any;
		private _uniform_sampler2D:any;
		private _uniform_samplerCube:any;
		private _noSetValue:any;
		uploadOne(name:string,value:any):void;
		uploadTexture2D(value:any):void;

		/**
		 * 提交shader到GPU
		 * @param shaderValue 
		 */
		upload(shaderValue:ShaderValue,params?:any[]):void;

		/**
		 * 按数组的定义提交
		 * @param shaderValue 数组格式[name,value,...]
		 */
		uploadArray(shaderValue:any[],length:number,_bufferUsage:any):void;

		/**
		 * 得到编译后的变量及相关预定义
		 * @return 
		 */
		getParams():any[];

		/**
		 * 设置shader里面的attribute绑定到哪个location，必须与mesh2d的对应起来，
		 * 这个必须在编译之前设置。
		 * @param attribDesc 属性描述，格式是 [attributeName, location, attributeName, location ... ]
		 */
		setAttributesLocation(attribDesc:any[]):void;
	}
	class ShaderDefinesBase  {
		private _name2int:any;
		private _int2name:any;
		private _int2nameMap:any;

		constructor(name2int:any,int2name:any[],int2nameMap:any[]);
		add(value:any):number;
		addInt(value:number):number;
		remove(value:any):number;
		isDefine(def:number):boolean;
		getValue():number;
		setValue(value:number):void;
		toNameDic():any;
		static _reg(name:string,value:number,_name2int:any,_int2name:any[]):void;
		static _toText(value:number,_int2name:any[],_int2nameMap:any):any;
		static _toInt(names:string,_name2int:any):number;
	}
	class ShaderValue  {

		constructor();
	}
	class BasePoly  {
		private static tempData:any;

		/**
		 * 构造线的三角形数据。根据一个位置数组生成vb和ib
		 * @param p 
		 * @param indices 
		 * @param lineWidth 
		 * @param indexBase 顶点开始的值，ib中的索引会加上这个
		 * @param outVertex 
		 * @return 
		 */
		static createLine2(p:any[],indices:any[],lineWidth:number,indexBase:number,outVertex:any[],loop:boolean):any[];

		/**
		 * 相邻的两段线，边界会相交，这些交点可以作为三角形的顶点。有两种可选，一种是采用左左,右右交点，一种是采用 左右，左右交点。当两段线夹角很小的时候，如果采用
		 * 左左，右右会产生很长很长的交点，这时候就要采用左右左右交点，相当于把尖角截断。
		 * 当采用左左右右交点的时候，直接用切线的垂线。采用左右左右的时候，用切线
		 * 切线直接采用两个方向的平均值。不能用3-1的方式，那样垂线和下一段可能都在同一方向（例如都在右方）
		 * 注意把重合的点去掉
		 * @param path 
		 * @param color 
		 * @param width 
		 * @param loop 
		 * @param outvb 
		 * @param vbstride 顶点占用几个float,(bytelength/4)
		 * @param outib test:
横线
[100,100, 400,100]
竖线
[100,100, 100,400]
直角
[100,100, 400,100, 400,400]
重合点
[100,100,100,100,400,100]
同一直线上的点
[100,100,100,200,100,3000]
像老式电视的左边不封闭的图形
[98,176,  163,178, 95,66, 175,177, 198,178, 252,56, 209,178,  248,175,  248,266,  209,266, 227,277, 203,280, 188,271,  150,271, 140,283, 122,283, 131,268, 99,268]
		 */
		static createLineTriangle(path:any[],color:number,width:number,loop:boolean,outvb:Float32Array,vbstride:number,outib:Uint16Array):void;
	}
	class Earcut  {
		static earcut(data:any,holeIndices:any,dim:any):any;
		static linkedList(data:any,start:any,end:any,dim:any,clockwise:any):any;
		static filterPoints(start:any,end:any):any;
		static earcutLinked(ear:any,triangles:any,dim:any,minX:any,minY:any,invSize:any,pass?:any):any;
		static isEar(ear:any):any;
		static isEarHashed(ear:any,minX:any,minY:any,invSize:any):boolean;
		static cureLocalIntersections(start:any,triangles:any,dim:any):any;
		static splitEarcut(start:any,triangles:any,dim:any,minX:any,minY:any,invSize:any):void;
		static eliminateHoles(data:any,holeIndices:any,outerNode:any,dim:any):any;
		static compareX(a:any,b:any):any;
		static eliminateHole(hole:any,outerNode:any):void;
		static findHoleBridge(hole:any,outerNode:any):any;
		static indexCurve(start:any,minX:any,minY:any,invSize:any):void;
		static sortLinked(list:any):any;
		static zOrder(x:any,y:any,minX:any,minY:any,invSize:any):any;
		static getLeftmost(start:any):any;
		static pointInTriangle(ax:any,ay:any,bx:any,by:any,cx:any,cy:any,px:any,py:any):boolean;
		static isValidDiagonal(a:any,b:any):boolean;
		static area(p:any,q:any,r:any):any;
		static equals(p1:any,p2:any):boolean;
		static intersects(p1:any,q1:any,p2:any,q2:any):boolean;
		static intersectsPolygon(a:any,b:any):boolean;
		static locallyInside(a:any,b:any):boolean;
		static middleInside(a:any,b:any):boolean;
		static splitPolygon(a:any,b:any):any;
		static insertNode(i:any,x:any,y:any,last:any):any;
		static removeNode(p:any):void;
		static signedArea(data:any,start:any,end:any,dim:any):any;
	}
	class EarcutNode  {
		i:any;
		x:any;
		y:any;
		prev:any;
		next:any;
		z:any;
		prevZ:any;
		nextZ:any;
		steiner:any;

		constructor(i:any,x:any,y:any);
	}

	interface ISubmit{
		renderSubmit():number;
		getRenderType():number;
		releaseRender():void;
	}

	class Submit extends SubmitBase  {
		protected static _poolSize:number;
		protected static POOL:Submit[];

		constructor(renderType?:number);

		/**
		 * @override 
		 */
		renderSubmit():number;

		/**
		 * @override 
		 */
		releaseRender():void;

		/**
		 * create方法只传对submit设置的值
		 */
		static create(context:Context,mesh:Mesh2D,sv:Value2D):Submit;

		/**
		 * 创建一个矢量submit
		 * @param ctx 
		 * @param mesh 
		 * @param numEle 对应drawElement的第二个参数:count
		 * @param offset drawElement的时候的ib的偏移。
		 * @param sv Value2D
		 * @return 
		 */
		static createShape(ctx:Context,mesh:Mesh2D,numEle:number,sv:Value2D):Submit;
	}
	class SubmitBase implements ISubmit  {
		static TYPE_2D:number;
		static TYPE_CANVAS:number;
		static TYPE_CMDSETRT:number;
		static TYPE_CUSTOM:number;
		static TYPE_BLURRT:number;
		static TYPE_CMDDESTORYPRERT:number;
		static TYPE_DISABLESTENCIL:number;
		static TYPE_OTHERIBVB:number;
		static TYPE_PRIMITIVE:number;
		static TYPE_RT:number;
		static TYPE_BLUR_RT:number;
		static TYPE_TARGET:number;
		static TYPE_CHANGE_VALUE:number;
		static TYPE_SHAPE:number;
		static TYPE_TEXTURE:number;
		static TYPE_FILLTEXTURE:number;
		static KEY_ONCE:number;
		static KEY_FILLRECT:number;
		static KEY_DRAWTEXTURE:number;
		static KEY_VG:number;
		static KEY_TRIANGLES:number;
		static RENDERBASE:SubmitBase;
		static ID:number;
		static preRender:ISubmit;
		clipInfoID:number;
		protected _id:number;
		shaderValue:Value2D;
		static __init__():void;

		constructor(renderType?:number);
		getID():number;
		getRenderType():number;
		toString():string;
		renderSubmit():number;
		releaseRender():void;
	}

	/**
	 * cache as normal 模式下的生成的canvas的渲染。
	 */
	class SubmitCanvas extends SubmitBase  {
		canv:Context;
		static POOL:SubmitCanvas[];
		static create(canvas:any,alpha:number,filters:any[]):SubmitCanvas;

		constructor();

		/**
		 * @override 
		 */
		renderSubmit():number;

		/**
		 * @override 
		 */
		releaseRender():void;

		/**
		 * @override 
		 */
		getRenderType():number;
	}
	class SubmitCMD implements ISubmit  {
		static POOL:SubmitCMD[];
		fun:Function;
		args:any[];

		constructor();
		renderSubmit():number;
		getRenderType():number;
		releaseRender():void;
		static create(args:any[],fun:Function,thisobj:any):SubmitCMD;
	}

	/**
	 * ...
	 * @author xie
	 */
	class SubmitKey  {
		blendShader:number;
		submitType:number;
		other:number;

		constructor();
		clear():void;
		copyFrom(src:SubmitKey):void;
		copyFrom2(src:SubmitKey,submitType:number,other:number):void;
		equal3_2(next:SubmitKey,submitType:number,other:number):boolean;
		equal4_2(next:SubmitKey,submitType:number,other:number):boolean;
		equal_3(next:SubmitKey):boolean;
		equal(next:SubmitKey):boolean;
	}
	class SubmitTarget implements ISubmit  {
		shaderValue:Value2D;
		blendType:number;
		srcRT:RenderTexture2D;

		constructor();
		static POOL:SubmitTarget[];
		renderSubmit():number;
		blend():void;
		getRenderType():number;
		releaseRender():void;
		static create(context:Context,mesh:Mesh2D,sv:Value2D,rt:RenderTexture2D):SubmitTarget;
	}
	class SubmitTexture extends SubmitBase  {
		private static _poolSize:any;
		private static POOL:any;

		constructor(renderType?:number);

		/**
		 * @override 
		 */
		releaseRender():void;
		renderSubmit():number;
		static create(context:Context,mesh:Mesh2D,sv:Value2D):SubmitTexture;
	}

	/**
	 * 系统工具。
	 */
	class SystemUtils  {

		/**
		 * 图形设备支持的最大纹理数量。
		 */
		static get maxTextureCount():number;

		/**
		 * 图形设备支持的最大纹理尺寸。
		 */
		static get maxTextureSize():number;

		/**
		 * 图形设备着色器的大致能力等级,类似于DirectX的shader model概念。
		 */
		static get shaderCapailityLevel():number;

		/**
		 * 是否支持纹理格式。
		 * @param format 纹理格式。
		 * @returns 是否支持。
		 */
		static supportTextureFormat(format:number):boolean;

		/**
		 * 是否支持渲染纹理格式。
		 * @param format 渲染纹理格式。
		 * @returns 是否支持。
		 */
		static supportRenderTextureFormat(format:number):boolean;
	}

	/**
	 * 阿拉伯文的转码。把unicode的阿拉伯文字母编码转成他们的老的能描述不同写法的编码。
	 *   这个是从GitHub上 Javascript-Arabic-Reshaper 项目转来的
	 * https://github.com/louy/Javascript-Arabic-Reshaper/blob/master/src/index.js
	 */

	/**
	 * Javascript Arabic Reshaper by Louy Alakkad
	 * https://github.com/louy/Javascript-Arabic-Reshaper
	 * Based on (http://git.io/vsnAd)
	 */
	class ArabicReshaper  {
		private static charsMap:any;
		private static combCharsMap:any;
		private static transChars:any;
		characterMapContains(c:number):boolean;
		getCharRep(c:number):boolean;
		getCombCharRep(c1:number,c2:number):boolean;
		isTransparent(c:number):boolean;
		getOriginalCharsFromCode(code:number):string;

		/**
		 * 转换函数。从normal转到presentB
		 * 这个返回的字符串可以直接按照从左到右的顺序渲染。
		 * 例如
		 * graphics.fillText(convertArabic('سلام'),....)
		 */
		convertArabic(normal:any):string;
		convertArabicBack(apfb:any):string;
	}
	class AtlasGrid  {
		atlasID:number;
		private _width:any;
		private _height:any;
		private _texCount:any;
		private _rowInfo:any;
		private _cells:any;
		_used:number;

		constructor(width?:number,height?:number,id?:number);
		addRect(type:number,width:number,height:number,pt:Point):boolean;
		private _release:any;
		private _init:any;
		private _get:any;
		private _fill:any;
		private _check:any;
		private _clear:any;
	}

	/**
	 * TODO如果占用内存较大,这个结构有很多成员可以临时计算
	 */
	class CharRenderInfo  {
		char:string;
		tex:any;
		deleted:boolean;
		uv:any[];
		pos:number;
		width:number;
		height:number;
		bmpWidth:number;
		bmpHeight:number;
		orix:number;
		oriy:number;
		touchTick:number;
		isSpace:boolean;
		touch():void;
	}
	class CharRender_Canvas extends ICharRender  {
		private static canvas:any;
		private ctx:any;
		private lastScaleX:any;
		private lastScaleY:any;
		private maxTexW:any;
		private maxTexH:any;
		private scaleFontSize:any;
		private showDbgInfo:any;
		private supportImageData:any;

		constructor(maxw:number,maxh:number,scalefont?:boolean,useImageData?:boolean,showdbg?:boolean);

		/**
		 * @override 
		 */
		get canvasWidth():number;

		/**
		 * @override 
		 */
		set canvasWidth(w:number);

		/**
		 * @param font 
		 * @param str 
		 * @override 
		 */
		getWidth(font:string,str:string):number;

		/**
		 * @param sx 
		 * @param sy 
		 * @override 
		 */
		scale(sx:number,sy:number):void;

		/**
		 * TODO stroke
		 * @param char 
		 * @param font 
		 * @param cri 修改里面的width。
		 * @return 
		 * @override 
		 */
		getCharBmp(char:string,font:string,lineWidth:number,colStr:string,strokeColStr:string,cri:CharRenderInfo,margin_left:number,margin_top:number,margin_right:number,margin_bottom:number,rect?:any[]|null):ImageData|null;
		getCharCanvas(char:string,font:string,lineWidth:number,colStr:string,strokeColStr:string,cri:CharRenderInfo,margin_left:number,margin_top:number,margin_right:number,margin_bottom:number):ImageData;
	}
	class CharRender_Native extends ICharRender  {
		private lastFont:any;
		private lastScaleX:any;
		private lastScaleY:any;

		constructor();

		/**
		 * @param font 
		 * @param str 
		 * @override 
		 */
		getWidth(font:string,str:string):number;

		/**
		 * @param sx 
		 * @param sy 
		 * @override 
		 */
		scale(sx:number,sy:number):void;

		/**
		 * TODO stroke
		 * @param char 
		 * @param font 
		 * @param size 返回宽高
		 * @return 
		 * @override 
		 */
		getCharBmp(char:string,font:string,lineWidth:number,colStr:string,strokeColStr:string,size:CharRenderInfo,margin_left:number,margin_top:number,margin_right:number,margin_bottom:number,rect?:any[]|null):ImageData|null;
	}

	/**
	 * ...
	 * @author laoxie
	 */
	class CharSubmitCache  {
		private static __posPool:any;
		private static __nPosPool:any;
		private _data:any;
		private _ndata:any;
		private _tex:any;
		private _imgId:any;
		private _clipid:any;
		private _clipMatrix:any;

		constructor();
		clear():void;
		destroy():void;
		add(ctx:Context,tex:Texture,imgid:number,pos:any[],uv:ArrayLike<number>,color:number):void;
		getPos():any[];
		enable(value:boolean,ctx:Context):void;
		submit(ctx:Context):void;
	}
	class ICharRender  {
		fontsz:number;
		getWidth(font:string,str:string):number;
		scale(sx:number,sy:number):void;
		get canvasWidth():number;
		set canvasWidth(w:number);

		/**
		 * TODO stroke
		 * @param char 
		 * @param font 
		 * @param size 返回宽高
		 * @return 
		 */
		getCharBmp(char:string,font:string,lineWidth:number,colStr:string,strokeColStr:string,size:CharRenderInfo,margin_left:number,margin_top:number,margin_right:number,margin_bottom:number,rect?:any[]|null):ImageData|null;
	}

	/**
	 * 文字贴图的大图集。
	 */
	class TextAtlas  {
		texWidth:number;
		texHeight:number;
		private atlasgrid:any;
		texture:TextTexture|null;
		charMaps:any;
		static atlasGridW:number;

		constructor();
		setProtecteDist(d:number):void;

		/**
		 * 如果返回null，则表示无法加入了
		 * 分配的时候优先选择最接近自己高度的节点
		 * @param w 
		 * @param h 
		 * @return 
		 */
		getAEmpty(w:number,h:number,pt:Point):boolean;

		/**
		 * 大图集格子单元的占用率，老的也算上了。只是表示这个大图集还能插入多少东西。
		 */
		get usedRate():number;
		destroy():void;
		printDebugInfo():void;
	}
	class TextRender  {
		static useOldCharBook:boolean;
		static atlasWidth:number;
		static noAtlas:boolean;
		static forceSplitRender:boolean;
		static forceWholeRender:boolean;
		static scaleFontWithCtx:boolean;
		static standardFontSize:number;
		static destroyAtlasDt:number;
		static checkCleanTextureDt:number;
		static destroyUnusedTextureDt:number;
		static cleanMem:number;
		static isWan1Wan:boolean;
		static showLog:boolean;
		static debugUV:boolean;

		/**
		 * fontSizeInfo
		 * 记录每种字体的像素的大小。标准是32px的字体。由4个byte组成，分别表示[xdist,ydist,w,h]。
		 * xdist,ydist 是像素起点到排版原点的距离，都是正的，表示实际数据往左和上偏多少，如果实际往右和下偏，则算作0，毕竟这个只是一个大概
		 * 例如 [Arial]=0x00002020, 表示宽高都是32
		 */
		private fontSizeInfo:any;
		static atlasWidth2:number;
		private charRender:any;
		private static tmpRI:any;
		private static pixelBBX:any;
		private mapFont:any;
		private fontID:any;
		private fontScaleX:any;
		private fontScaleY:any;
		private _curStrPos:any;
		static textRenderInst:TextRender;
		textAtlases:TextAtlas[];
		private isoTextures:any;
		private bmpData32:any;
		private static imgdtRect:any;
		private lastFont:any;
		private fontSizeW:any;
		private fontSizeH:any;
		private fontSizeOffX:any;
		private fontSizeOffY:any;
		private renderPerChar:any;
		private tmpAtlasPos:any;
		private textureMem:any;
		private fontStr:any;
		static simClean:boolean;

		constructor();

		/**
		 * 设置当前字体，获得字体的大小信息。
		 * @param font 
		 */
		setFont(font:FontInfo):void;

		/**
		 * 从string中取出一个完整的char，例如emoji的话要多个
		 * 会修改 _curStrPos
		 * TODO 由于各种文字中的组合写法，这个需要能扩展，以便支持泰文等
		 * @param str 
		 * @param start 开始位置
		 */
		getNextChar(str:string):string|null;
		filltext(ctx:Context,data:string|WordText,x:number,y:number,fontStr:string,color:string,strokeColor:string,lineWidth:number,textAlign:string,underLine?:number):void;
		fillWords(ctx:Context,data:HTMLChar[],x:number,y:number,fontStr:string|FontInfo,color:string,strokeColor:string|null,lineWidth:number):void;
		_fast_filltext(ctx:Context,data:string|WordText|null,htmlchars:HTMLChar[]|null,x:number,y:number,font:FontInfo,color:string,strokeColor:string|null,lineWidth:number,textAlign:number,underLine?:number):void;

		/**
		 * 画出重新按照贴图顺序分组的文字。
		 * @param samePagesData 
		 * @param startx 保存的数据是相对位置，所以需要加上这个偏移。用相对位置更灵活一些。
		 * @param y 因为这个只能画在一行上所以没有必要保存y。所以这里再把y传进来
		 */
		protected _drawResortedWords(ctx:Context,startx:number,starty:number,samePagesData:any[]):void;

		/**
		 * 检查 txts数组中有没有被释放的资源
		 * @param txts 
		 * @param startid 
		 * @return 
		 */
		hasFreedText(txts:any[]):boolean;
		getCharRenderInfo(str:string,font:FontInfo,color:string,strokeColor:string|null,lineWidth:number,isoTexture?:boolean):CharRenderInfo;

		/**
		 * 添加数据到大图集
		 * @param w 
		 * @param h 
		 * @return 
		 */
		addBmpData(data:ImageData,ri:CharRenderInfo):TextAtlas;

		/**
		 * 清理利用率低的大图集
		 */
		GC():void;

		/**
		 * 尝试清理大图集
		 */
		cleanAtlases():void;
		getCharBmp(c:string):any;

		/**
		 * 检查当前线是否存在数据
		 * @param data 
		 * @param l 
		 * @param sx 
		 * @param ex 
		 * @return 
		 */
		private checkBmpLine:any;

		/**
		 * 根据bmp数据和当前的包围盒，更新包围盒
		 * 由于选择的文字是连续的，所以可以用二分法
		 * @param data 
		 * @param curbbx [l,t,r,b]
		 * @param onlyH 不检查左右
		 */
		private updateBbx:any;
		getFontSizeInfo(font:string):number;
		printDbgInfo():void;
		showAtlas(n:number,bgcolor:string,x:number,y:number,w:number,h:number):Sprite;
		filltext_native(ctx:Context,data:string|WordText,htmlchars:HTMLChar[],x:number,y:number,fontStr:string,color:string,strokeColor:string,lineWidth:number,textAlign:string,underLine?:number):void;
	}
	class TextTexture extends Resource  {
		static gTextRender:ITextRender;
		private static pool:any;
		private static poolLen:any;
		private static cleanTm:any;
		genID:number;
		bitmap:any;
		curUsedCovRate:number;
		curUsedCovRateAtlas:number;
		lastTouchTm:number;
		ri:CharRenderInfo;

		constructor(textureW:number,textureH:number);
		recreateResource():void;

		/**
		 * @param data 
		 * @param x 拷贝位置。
		 * @param y 
		 * @param uv 
		 * @return uv数组  如果uv不为空就返回传入的uv，否则new一个数组
		 */
		addChar(data:ImageData,x:number,y:number,uv?:any[]):any[];

		/**
		 * 玩一玩不支持 getImageData
		 * @param canv 
		 * @param x 
		 * @param y 
		 */
		addCharCanvas(canv:any,x:number,y:number,uv?:any[]):any[];

		/**
		 * 填充白色。调试用。
		 */
		fillWhite():void;
		discard():void;
		static getTextTexture(w:number,h:number):TextTexture;

		/**
		 * @override 
		 */
		destroy():void;

		/**
		 * 定期清理
		 * 为了简单，只有发生 getAPage 或者 discardPage的时候才检测是否需要清理
		 */
		static clean():void;
		touchRect(ri:CharRenderInfo,curloop:number):void;
		get texture():any;
		drawOnScreen(x:number,y:number):void;
	}

	interface ITextRender{
		atlasWidth:number;
		checkCleanTextureDt:number;
		debugUV:boolean;
		isWan1Wan:boolean;
		destroyUnusedTextureDt:number;
	}

	class Buffer  {
		static _bindedVertexBuffer:any;
		static _bindedIndexBuffer:any;
		protected _glBuffer:any;
		protected _buffer:any;
		protected _bufferType:number;
		protected _bufferUsage:number;
		_byteLength:number;
		get bufferUsage():number;

		constructor();

		/**
		 * @private 绕过全局状态判断,例如VAO局部状态设置
		 */
		_bindForVAO():void;

		/**
		 * @private 
		 */
		bind():boolean;

		/**
		 * @private 
		 */
		destroy():void;
	}
	class Buffer2D extends Buffer  {
		static FLOAT32:number;
		static SHORT:number;
		static __int__(gl:WebGLContext):void;
		protected _maxsize:number;
		_upload:boolean;
		protected _uploadSize:number;
		protected _bufferSize:number;
		protected _u8Array:Uint8Array;
		get bufferLength():number;
		set byteLength(value:number);
		setByteLength(value:number):void;

		/**
		 * 在当前的基础上需要多大空间，单位是byte
		 * @param sz 
		 * @return 增加大小之前的写位置。单位是byte
		 */
		needSize(sz:number):number;

		constructor();
		protected _bufferData():void;
		protected _bufferSubData(offset?:number,dataStart?:number,dataLength?:number):void;

		/**
		 * buffer重新分配了，继承类根据需要做相应的处理。
		 */
		protected _checkArrayUse():void;

		/**
		 * 给vao使用的 _bind_upload函数。不要与已经绑定的判断是否相同
		 * @return 
		 */
		_bind_uploadForVAO():boolean;
		_bind_upload():boolean;
		_bind_subUpload(offset?:number,dataStart?:number,dataLength?:number):boolean;

		/**
		 * 重新分配buffer大小，如果nsz比原来的小则什么都不做。
		 * @param nsz buffer大小，单位是byte。
		 * @param copy 是否拷贝原来的buffer的数据。
		 * @return 
		 */
		_resizeBuffer(nsz:number,copy:boolean):Buffer2D;
		append(data:any):void;

		/**
		 * 附加Uint16Array的数据。数据长度是len。byte的话要*2
		 * @param data 
		 * @param len 
		 */
		appendU16Array(data:Uint16Array,len:number):void;
		appendEx(data:any,type:new (buf: any, len: any) => any):void;
		appendEx2(data:any,type:new (buff: any, len: any) => any,dataLen:number,perDataLen?:number):void;
		getBuffer():ArrayBuffer;
		setNeedUpload():void;
		getNeedUpload():boolean;
		upload():boolean;
		subUpload(offset?:number,dataStart?:number,dataLength?:number):boolean;
		protected _disposeResource():void;

		/**
		 * 清理数据。保留ArrayBuffer
		 */
		clear():void;
	}
	class CONST3D2D  {
		static BYTES_PE:number;
		static BYTES_PIDX:number;
		static defaultMatrix4:any[];
		static defaultMinusYMatrix4:any[];
		static uniformMatrix3:any[];
		static _TMPARRAY:any[];
		static _OFFSETX:number;
		static _OFFSETY:number;
	}
	class IndexBuffer2D extends Buffer2D  {
		static create:Function;
		protected _uint16Array:Uint16Array;

		constructor(bufferUsage?:number);

		/**
		 * @override 
		 */
		protected _checkArrayUse():void;
		getUint16Array():Uint16Array;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_bindForVAO():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		bind():boolean;
		destory():void;
		disposeResource():void;
	}
	class InlcudeFile  {
		script:string;
		codes:any;
		funs:any;
		curUseID:number;
		funnames:string;

		constructor(txt:string);
		getWith(name?:string|null):string;
		getFunsScript(funsdef:string):string;
	}
	class MatirxArray  {

		/**
		 * 4*4矩阵数组相乘。
		 * o=a*b;
		 * @param a 4*4矩阵数组。
		 * @param b 4*4矩阵数组。
		 * @param o 4*4矩阵数组。
		 */
		static ArrayMul(a:any[],b:any[],o:any[]):void;
		static copyArray(f:any[],t:any[]):void;
	}

	/**
	 * Mesh2d只是保存数据。描述attribute用的。本身不具有渲染功能。
	 */
	class Mesh2D  {
		_stride:number;
		vertNum:number;
		indexNum:number;
		protected _applied:boolean;
		_vb:VertexBuffer2D;
		_ib:IndexBuffer2D;
		private _vao:any;
		private static _gvaoid:any;
		private _attribInfo:any;
		protected _quadNum:number;
		canReuse:boolean;

		/**
		 * @param stride 
		 * @param vballoc vb预分配的大小。主要是用来提高效率。防止不断的resizebfufer
		 * @param iballoc 
		 */

		constructor(stride:number,vballoc:number,iballoc:number);

		/**
		 * 重新创建一个mesh。复用这个对象的vertex结构，ib对象和attribinfo对象
		 */
		cloneWithNewVB():Mesh2D;

		/**
		 * 创建一个mesh，使用当前对象的vertex结构。vb和ib自己提供。
		 * @return 
		 */
		cloneWithNewVBIB():Mesh2D;

		/**
		 * 获得一个可以写的vb对象
		 */
		getVBW():VertexBuffer2D;

		/**
		 * 获得一个只读vb
		 */
		getVBR():VertexBuffer2D;
		getIBR():IndexBuffer2D;

		/**
		 * 获得一个可写的ib
		 */
		getIBW():IndexBuffer2D;

		/**
		 * 直接创建一个固定的ib。按照固定四边形的索引。
		 * @param var QuadNum
		 */
		createQuadIB(QuadNum:number):void;

		/**
		 * 设置mesh的属性。每3个一组，对应的location分别是0,1,2...
		 * 含义是：type,size,offset
		 * 不允许多流。因此stride是固定的，offset只是在一个vertex之内。
		 * @param attribs 
		 */
		setAttributes(attribs:any[]):void;

		/**
		 * 初始化VAO的配置，只需要执行一次。以后使用的时候直接bind就行
		 * @param gl 
		 */
		private configVAO:any;

		/**
		 * 应用这个mesh
		 * @param gl 
		 */
		useMesh(gl:WebGLRenderingContext):void;
		getEleNum():number;

		/**
		 * 子类实现。用来把自己放到对应的回收池中，以便复用。
		 */
		releaseMesh():void;

		/**
		 * 释放资源。
		 */
		destroy():void;

		/**
		 * 清理vb数据
		 */
		clearVB():void;
	}

	/**
	 * drawImage，fillRect等会用到的简单的mesh。每次添加必然是一个四边形。
	 */
	class MeshParticle2D extends Mesh2D  {
		static const_stride:number;
		private static _fixattriInfo:any;
		private static _POOL:any;
		static __init__():void;

		constructor(maxNum:number);
		setMaxParticleNum(maxNum:number):void;

		/**
		 */
		static getAMesh(maxNum:number):MeshParticle2D;

		/**
		 * 把本对象放到回收池中，以便getMesh能用。
		 * @override 
		 */
		releaseMesh():void;

		/**
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * drawImage，fillRect等会用到的简单的mesh。每次添加必然是一个四边形。
	 */
	class MeshQuadTexture extends Mesh2D  {
		static const_stride:number;
		private static _fixib:any;
		private static _maxIB:any;
		private static _fixattriInfo:any;
		private static _POOL:any;
		static __int__():void;

		constructor();

		/**
		 */
		static getAMesh(mainctx:boolean):MeshQuadTexture;

		/**
		 * 把本对象放到回收池中，以便getMesh能用。
		 * @override 
		 */
		releaseMesh():void;

		/**
		 * @override 
		 */
		destroy():void;

		/**
		 * @param pos 
		 * @param uv 
		 * @param color 
		 * @param clip ox,oy,xx,xy,yx,yy
		 * @param useTex 是否使用贴图。false的话是给fillRect用的
		 */
		addQuad(pos:any[],uv:ArrayLike<number>,color:number,useTex:boolean):void;
	}

	/**
	 * 与MeshQuadTexture基本相同。不过index不是固定的
	 */
	class MeshTexture extends Mesh2D  {
		static const_stride:number;
		private static _fixattriInfo:any;
		private static _POOL:any;
		static __init__():void;

		constructor();

		/**
		 */
		static getAMesh(mainctx:boolean):MeshTexture;
		addData(vertices:Float32Array,uvs:Float32Array,idx:Uint16Array,matrix:Matrix,rgba:number):void;

		/**
		 * 把本对象放到回收池中，以便getMesh能用。
		 * @override 
		 */
		releaseMesh():void;

		/**
		 * @override 
		 */
		destroy():void;
	}

	/**
	 * 用来画矢量的mesh。顶点格式固定为 x,y,rgba
	 */
	class MeshVG extends Mesh2D  {
		static const_stride:number;
		private static _fixattriInfo:any;
		private static _POOL:any;
		static __init__():void;

		constructor();
		static getAMesh(mainctx:boolean):MeshVG;

		/**
		 * 往矢量mesh中添加顶点和index。会把rgba和points在mesh中合并。
		 * @param points 顶点数组，只包含x,y。[x,y,x,y...]
		 * @param rgba rgba颜色
		 * @param ib index数组。
		 */
		addVertAndIBToMesh(ctx:Context,points:any[],rgba:number,ib:any[]):void;

		/**
		 * 把本对象放到回收池中，以便getMesh能用。
		 * @override 
		 */
		releaseMesh():void;

		/**
		 * @override 
		 */
		destroy():void;
	}
	class RenderState2D  {
		static _MAXSIZE:number;

		/**
		 * @private 一个初始化的 <code>Matrix</code> 对象，不允许修改此对象内容。
		 */
		static EMPTYMAT4_ARRAY:number[];
		static TEMPMAT4_ARRAY:number[];
		static worldMatrix4:number[];
		static worldMatrix:Matrix;
		static matWVP:any;
		static worldAlpha:number;
		static worldScissorTest:boolean;
		static worldShaderDefines:ShaderDefines2D;
		static worldFilters:any[];
		static width:number;
		static height:number;
		static mat2MatArray(mat:Matrix,matArray:any[]):any[];
		static restoreTempArray():void;
		static clear():void;
	}

	/**
	 * @private <code>ShaderCompile</code> 类用于实现Shader编译。
	 */
	class ShaderCompile  {
		static IFDEF_NO:number;
		static IFDEF_YES:number;
		static IFDEF_ELSE:number;
		static IFDEF_PARENT:number;
		static _removeAnnotation:RegExp;
		static _reg:RegExp;
		static _splitToWordExps:RegExp;
		static includes:any;
		static shaderParamsMap:any;
		private _nameMap:any;
		private static _parseOne:any;
		static addInclude(fileName:string,txt:string):void;
		static preGetParams(vs:string,ps:string):any;
		static splitToWords(str:string,block:ShaderNode):any[];
		static _clearCR:RegExp;
		defs:Object;

		constructor(vs:string,ps:string,nameMap:any);
		static _splitToWordExps3:RegExp;

		/**
		 * @private 
		 */
		protected _compileToTree(parent:ShaderNode,lines:any[],start:number,includefiles:any[],defs:any):void;
		createShader(define:any,shaderName:any,createShader:Function,bindAttrib:any[]):Shader;
	}
	class ShaderNode  {
		private static __id:any;
		childs:any[];
		text:string;
		parent:ShaderNode;
		name:string;
		noCompile:boolean;
		includefiles:any[];
		condition:any;
		conditionType:number;
		useFuns:string;
		z:number;
		src:string;

		constructor(includefiles:any[]);
		setParent(parent:ShaderNode):void;
		setCondition(condition:string,type:number):void;
		toscript(def:any,out:any[]):any[];
		private _toscript:any;
	}
	class VertexBuffer2D extends Buffer2D  {
		static create:Function;
		_floatArray32:Float32Array;
		_uint32Array:Uint32Array;
		private _vertexStride:any;
		get vertexStride():number;

		constructor(vertexStride:number,bufferUsage:number);
		getFloat32Array():Float32Array;

		/**
		 * 在当前位置插入float数组。
		 * @param data 
		 * @param pos 
		 */
		appendArray(data:any[]):void;

		/**
		 * @override 
		 */
		protected _checkArrayUse():void;
		deleteBuffer():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		_bindForVAO():void;

		/**
		 * @inheritDoc 
		 * @override 
		 */
		bind():boolean;

		/**
		 * @override 
		 */
		destroy():void;
	}
	class VertexArrayObject  {

		constructor();
	}

	/**
	 * @private 
	 */
	class WebGL  {
		static _isWebGL2:boolean;
		static isNativeRender_enable:boolean;
		private static _uint8ArraySlice:any;
		private static _float32ArraySlice:any;
		private static _uint16ArraySlice:any;
		static _nativeRender_enable():void;
		static enable():boolean;
		static inner_enable():boolean;
		static onStageResize(width:number,height:number):void;
	}

	/**
	 * @private 
	 */
	class WebGLContext  {

		/**
		 * 模板写入开关
		 * @param gl 
		 * @param value 
		 */
		static setStencilMask(gl:WebGLRenderingContext,value:boolean):void;
		static getUniformMaxVector():number;
	}

}