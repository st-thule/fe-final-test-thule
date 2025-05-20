import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { Editor } from '@ckeditor/ckeditor5-core';
import type { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload';
import {
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Bookmark,
  ClassicEditor,
  CloudServices,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  RemoveFormat,
  SimpleUploadAdapter,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from 'ckeditor5';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import 'ckeditor5/ckeditor5.css';
import { TypeUpload } from '@shared/constants/type-image';
import { ImageService } from '@shared/services/image.service';

const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

type CkeditorProps = {
  value?: string;
  onChange?: (data: string) => void;
};

const imageService = new ImageService();

export default function Ckeditor({ value = '', onChange }: CkeditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'insertImage',
            'insertTable',
            'highlight',
            'blockQuote',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          CloudServices,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Paragraph,
          RemoveFormat,
          SimpleUploadAdapter,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline,
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
          ],
        },
        initialData: '',
        licenseKey: LICENSE_KEY,
        extraPlugins: [
          function CustomUploadAdapterPlugin(editor: Editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader: FileLoader
            ) => {
              return new S3UploadAdapter(loader, TypeUpload.CONTENT_POST);
            };
          },
        ],
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file',
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={value}
                onChange={(_, editor) => {
                  const data = editor.getData();
                  onChange?.(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------
// Custom Upload Adapter
// --------------------
class S3UploadAdapter implements UploadAdapter {
  loader: FileLoader;
  typeUpload: TypeUpload;

  constructor(loader: FileLoader, typeUpload: TypeUpload) {
    this.loader = loader;
    this.typeUpload = typeUpload;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file: File) =>
        new Promise<{ default: string }>((resolve, reject) => {
          imageService
            .getSignedUrl(this.typeUpload, file.name, file.type)
            .then(
              ({
                signedRequest,
                url,
              }: {
                signedRequest: string;
                url: string;
              }) => {
                imageService
                  .uploadImageToS3(signedRequest, file)
                  .then(() => {
                    resolve({
                      default: url,
                    });
                  })
                  .catch((error: Error) => {
                    reject(error.message);
                  });
              }
            )
            .catch((error: Error) => {
              reject(error.message);
            });
        })
    );
  }

  abort(): void {
    // Implement abort if needed. For now, do nothing.
  }
}
