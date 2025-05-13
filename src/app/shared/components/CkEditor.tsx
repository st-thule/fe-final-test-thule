/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoJgNARCB0Cs0AYKQIwICwgBxYOy9gQDYUBmEAThQpuyJFNhthS1NKI9yPQS2QgBTAHbIEYYCjDjxUqQgC6kLCyIBDAEawICoA==
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

import React from 'react';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDcyNjcxOTksImp0aSI6IjE2ZTdjYjA1LTBkZGEtNGNhMC05YTdiLTY3MzdhZGVkYzM2NiIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiJlZTEyMjkzOCJ9.dBPyylD96w_ApitJ1joFeabAedU_ECPMLffVa1NrhUHCptJi0y_yHu42fEQRbpmsKnLUpH43zPX6cTIUYhC6RQ';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dtcx3i2qo/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'upload_local_preset';

type CkeditorProps = {
  onChange?: (data: string) => void;
};

export default function Ckeditor({ onChange }: CkeditorProps) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: '45.0.0' });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) return {};

    const {
      ClassicEditor,
      // All required plugins
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BlockQuote,
      Bold,
      Bookmark,
      CloudServices,
      Code,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      Image,
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
      PageBreak,
      Paragraph,
      RemoveFormat,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'showBlocks',
            '|',
            'heading',
            'style',
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
            '|',
            'undo',
            'redo',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          CloudServices,
          Code,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          Image,
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
          PageBreak,
          Paragraph,
          RemoveFormat,
          ShowBlocks,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
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
        style: {
          definitions: [
            {
              name: 'Article category',
              element: 'h3',
              classes: ['category'],
            },
            {
              name: 'Title',
              element: 'h2',
              classes: ['document-title'],
            },
            {
              name: 'Subtitle',
              element: 'h3',
              classes: ['document-subtitle'],
            },
            {
              name: 'Info box',
              element: 'p',
              classes: ['info-box'],
            },
            {
              name: 'CTA Link Primary',
              element: 'a',
              classes: ['button', 'button--green'],
            },
            {
              name: 'CTA Link Secondary',
              element: 'a',
              classes: ['button', 'button--black'],
            },
            {
              name: 'Marker',
              element: 'span',
              classes: ['marker'],
            },
            {
              name: 'Spoiler',
              element: 'span',
              classes: ['spoiler'],
            },
          ],
        },
        licenseKey: LICENSE_KEY,
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
        },
        fontFamily: {
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
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
        initialData: '<p>Type content here</p>',
        extraPlugins: [
          function CustomUploadAdapterPlugin(editor: any) {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader: any
            ) => {
              return new CloudinaryUploadAdapter(loader);
            };
          },
        ],
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <div
      className="editor-container editor-container_classic-editor editor-container_include-style"
      ref={editorContainerRef}
    >
      <div className="editor-container__editor">
        <div ref={editorRef}>
          {ClassicEditor && editorConfig && (
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              onChange={(_, editor) => {
                const data = editor.getData();
                onChange?.(data);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// --------------------
// Custom Upload Adapter
// --------------------

class CloudinaryUploadAdapter {
  loader: any;
  xhr: XMLHttpRequest;

  constructor(loader: any) {
    this.loader = loader;
    this.xhr = new XMLHttpRequest();
  }

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  abort() {
    this.xhr?.abort();
  }

  _initRequest() {
    this.xhr.open('POST', CLOUDINARY_UPLOAD_URL, true);
    this.xhr.responseType = 'json';
  }

  _initListeners(resolve: any, reject: any, file: File) {
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    this.xhr.addEventListener('error', () => reject(genericErrorText));
    this.xhr.addEventListener('abort', () => reject());
    this.xhr.addEventListener('load', () => {
      const response = this.xhr.response;
      if (!response || response.error) {
        return reject(response?.error?.message || genericErrorText);
      }

      resolve({
        default: response.secure_url,
      });
    });
  }

  _sendRequest(file: File) {
    const data = new FormData();
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    data.append('file', file);
    this.xhr.send(data);
  }
}
