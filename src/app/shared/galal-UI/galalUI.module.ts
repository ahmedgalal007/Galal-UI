
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ModalModule} from 'ngx-modialog';
import {BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';

import { AutoCompleteComponent } from './auto-complete';
import { EditorComponent } from './editor';
import {ImageManagerComponent} from './image-manager';
// import { EditorToolbarComponent } from './editor/_trash/editor-toolbar.component';
// import { EditorButtonComponent } from './editor/_trash/editor-button.component';
import {DropdownDirective} from './dropdown.directive';
import { ButtonDirective } from './editor/toolbar/Buttons/button.directive';
import { BarButtonComponent } from './editor/toolbar/Buttons/bar-button.component';
import { ColorPickerComponent } from './editor/toolbar/Buttons/color-picker/color-picker.component';
import { SelectionListComponent } from './editor/toolbar/Buttons/selection-list/selection-list.component';
import { ToolbarButtonComponent } from './editor/toolbar/Buttons/toolbar-button/toolbar-button.component';
import { CompoboxComponent } from './editor/toolbar/Buttons/compobox/compobox.component';
import { GridPickerComponent } from './editor/toolbar/Buttons/grid-picker/grid-picker.component';
import { PopupFormComponent } from './editor/toolbar/Buttons/popup-form/popup-form.component';
import { PopupModalComponent } from './editor/modal';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { TreeViewComponent} from './tree-view/tree-view.component';
import { BrowserViewComponent } from './file-manager/browser-view/browser-view.component';
import { TreeViewFolderComponent } from './tree-view/tree-view-folder.component';
import { TreeViewFileComponent } from './tree-view/tree-view-file.component';
import { BrowserViewItemComponent } from './file-manager/browser-view/browser-view-item/browser-view-item.component';
import { FileIoService } from './file-io.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './file-upload.service';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {ImageCropperComponent} from 'ng2-img-cropper';


@NgModule({
  declarations: [
    AutoCompleteComponent,
    EditorComponent,
    ImageManagerComponent,
    // EditorToolbarComponent,
    // EditorButtonComponent,
    DropdownDirective,
    ButtonDirective,
    BarButtonComponent,
    ColorPickerComponent,
    SelectionListComponent,
    ToolbarButtonComponent,
    CompoboxComponent,
    GridPickerComponent,
    PopupFormComponent,
    PopupModalComponent,
    FileManagerComponent,
    TreeViewComponent,
    BrowserViewComponent,
    TreeViewFolderComponent,
    TreeViewFileComponent,
    BrowserViewItemComponent,
    FileUploadComponent,
    ImageEditorComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalModule.withComponents([ImageManagerComponent, PopupModalComponent]),
    BootstrapModalModule, ImageCropperModule
  ],
  exports: [ColorPickerComponent, BarButtonComponent, DropdownDirective, AutoCompleteComponent,
    EditorComponent, ImageManagerComponent, PopupFormComponent, PopupModalComponent, FileManagerComponent,
    FileUploadComponent, ImageEditorComponent, ImageCropperModule
  ],
  // EditorToolbarComponent, EditorButtonComponent,
  providers: [
    FileIoService, FileUploadService
  ],
  entryComponents: [ImageManagerComponent, ToolbarButtonComponent, ColorPickerComponent,
    SelectionListComponent, CompoboxComponent, GridPickerComponent, PopupFormComponent, PopupModalComponent
  ],
  bootstrap: [],

})
export class GalalUIModule {

}
