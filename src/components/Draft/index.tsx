import { convertToRaw, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

interface EditorComponentProps {
  setContent: Dispatch<SetStateAction<string>>;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ setContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rawContentState = convertToRaw(editorState.getCurrentContent());

  const toolbarOptions: EditorProps['toolbar'] = {
    options: [
      'inline',
      'blockType',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'emoji',
      'image',
      'history',
    ],
    blockType: {
      inDropdown: false,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Blockquote', 'Code'],
    },
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(rawContentState));
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName='editor__toolbar'
      wrapperClassName='editor__wrapper'
      editorClassName='editor'
      onEditorStateChange={onEditorStateChange}
      toolbar={toolbarOptions}
    />
  );
};

export default EditorComponent;
