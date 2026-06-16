#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(My3DViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(todoCount, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(inProgressCount, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(doneCount, NSNumber)

@end
