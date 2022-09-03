import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { storage } from './firebase';

export default async function getImage(image: File) {
  const imageRef = ref(storage, `images/${image.name + v4()}`);
  const imageUrl = await uploadBytes(imageRef, image).then(async (img) => {
    toast('Uploaded a blob or file!', { type: 'success' });

    const url = await getDownloadURL(img.ref);
    return url;
  });

  return imageUrl;
}
