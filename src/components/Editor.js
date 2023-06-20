import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const modules = {
    toolbar: false,  // Disable the toolbar
}
const Editor = ({ value, onChange }) => {


    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder="Share your thoughts and let your voice be heard! Leave a Note here......"
            theme="snow"

        />
    );
};

export default Editor;
