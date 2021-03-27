import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Editor } from '@tinymce/tinymce-react';
import {
  TextField,
  Typography,
  makeStyles,
  Theme,
  Box,
  Button,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme: Theme) => ({
  formItem: {
    marginBottom: theme.spacing(3),
  },
}));

const CreatePost: React.FC = () => {
  const classes = useStyles();
  const [content, setContent] = useState<string>(
    '<p>This is the initial content of the post</p>'
  );
  const [postTitle, setPostTitle] = useState<string>('');
  const [filePhoto, setFilePhoto] = useState<FileImage | null>(null);

  const handleEditorChange = (textContent: string): void => {
    setContent(textContent);
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPostTitle(e.target.value);
  };

  const fileChange = (files: any): void => {
    setFilePhoto(files[0]);
  };

  const fileDelete = (): void => {
    setFilePhoto(null);
  };

  const disabledSubmit = (): boolean => {
    if (postTitle && filePhoto) {
      return false;
    }
    return true;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(postTitle, filePhoto?.path, content);
  };

  return (
    <Layout>
      <Typography variant='h2' gutterBottom align='center'>
        Create Post
      </Typography>

      <form noValidate autoComplete='off' onSubmit={submitHandler}>
        <Box className={classes.formItem}>
          <Typography variant='h5' gutterBottom align='center'>
            Post title
          </Typography>
          <TextField
            defaultValue={postTitle}
            label='Post Title'
            variant='outlined'
            onChange={titleHandler}
            fullWidth
          />
        </Box>

        <Box className={classes.formItem}>
          <Typography variant='h5' gutterBottom align='center'>
            Post image
          </Typography>
          <DropzoneArea
            onChange={fileChange}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            filesLimit={1}
            onDelete={fileDelete}
          />
        </Box>

        <Box className={classes.formItem}>
          <Typography variant='h5' gutterBottom align='center'>
            Post content
          </Typography>
          <Editor
            apiKey='wnegqdmcxtqq0akr1i8aylen5krge2hnp53qurj41u1044az'
            initialValue={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste imagetools wordcount',
              ],
              toolbar:
                'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            }}
            onEditorChange={handleEditorChange}
          />
        </Box>

        <Box textAlign='center'>
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            disabled={disabledSubmit()}
          >
            Create Post
          </Button>
        </Box>
      </form>
    </Layout>
  );
};

export default CreatePost;
