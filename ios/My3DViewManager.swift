import Foundation
import SceneKit

class My3DGraphView: UIView {
  var scnView: SCNView!
  var todoBox: SCNNode!
  var inProgressBox: SCNNode!
  var doneBox: SCNNode!
  
  @objc var todoCount: NSNumber = 0 { didSet { updateGraph() } }
  @objc var inProgressCount: NSNumber = 0 { didSet { updateGraph() } }
  @objc var doneCount: NSNumber = 0 { didSet { updateGraph() } }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupScene()
  }
  
  required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
  
  func setupScene() {
    scnView = SCNView(frame: self.bounds)
    scnView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    scnView.backgroundColor = UIColor.clear // Arka plan transparan, Tailwind siyahı görünsün
    scnView.allowsCameraControl = true // Kullanıcı parmağıyla döndürebilsin
    scnView.autoenablesDefaultLighting = true
    self.addSubview(scnView)
    
    let scene = SCNScene()
    
    todoBox = createColumn(color: UIColor.systemRed, positionX: -1.5)
    inProgressBox = createColumn(color: UIColor.systemYellow, positionX: 0)
    doneBox = createColumn(color: UIColor.systemGreen, positionX: 1.5)
    
    scene.rootNode.addChildNode(todoBox)
    scene.rootNode.addChildNode(inProgressBox)
    scene.rootNode.addChildNode(doneBox)
    
    scnView.scene = scene
  }
  
  func createColumn(color: UIColor, positionX: Float) -> SCNNode {
    let geometry = SCNBox(width: 1.0, height: 0.1, length: 1.0, chamferRadius: 0.1)
    geometry.firstMaterial?.diffuse.contents = color
    let node = SCNNode(geometry: geometry)
    node.position = SCNVector3(positionX, 0, 0)
    return node
  }
  
  func updateGraph() {
    SCNTransaction.begin()
    SCNTransaction.animationDuration = 0.6
    
    let todoH = max(todoCount.floatValue, 0.1)
    let inProgH = max(inProgressCount.floatValue, 0.1)
    let doneH = max(doneCount.floatValue, 0.1)
    
    todoBox.geometry = SCNBox(width: 1.0, height: CGFloat(todoH), length: 1.0, chamferRadius: 0.1)
    todoBox.geometry?.firstMaterial?.diffuse.contents = UIColor.systemRed
    todoBox.position.y = todoH / 2.0
    
    inProgressBox.geometry = SCNBox(width: 1.0, height: CGFloat(inProgH), length: 1.0, chamferRadius: 0.1)
    inProgressBox.geometry?.firstMaterial?.diffuse.contents = UIColor.systemYellow
    inProgressBox.position.y = inProgH / 2.0
    
    doneBox.geometry = SCNBox(width: 1.0, height: CGFloat(doneH), length: 1.0, chamferRadius: 0.1)
    doneBox.geometry?.firstMaterial?.diffuse.contents = UIColor.systemGreen
    doneBox.position.y = doneH / 2.0
    
    SCNTransaction.commit()
  }
}

@objc(My3DViewManager)
class My3DViewManager: RCTViewManager {
  override func view() -> UIView! {
    return My3DGraphView()
  }
  override class func requiresMainQueueSetup() -> Bool { return true }
}
