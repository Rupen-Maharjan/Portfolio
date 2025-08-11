import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { JwtDecode } from '../../utility/export';

const ProfileImage = () => {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // true when user selects new file or clicks update
  const [hasImage, setHasImage] = useState(false); // true if user has image on server

  useEffect(() => {
    // On mount, fetch existing profile image for user
    const fetchProfileImage = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const decoded = JwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(`http://localhost:3000/api/img/profile/`);

        if (res.data && res.data.data) {
          setPreview(res.data.data);
          setHasImage(true);
          setIsEditing(false); // not editing on load
        }
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
      setFile(selected);
      setIsEditing(true); // now editing since user chose new file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);

      const token = sessionStorage.getItem('token');

      const formData = new FormData();
      formData.append('profile', file);
      formData.append('token', token);
      formData.append('imgType', 'profile');

      const res = await axios.post('http://localhost:3000/api/img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload success:', res.data);
      setLoading(false);
      setHasImage(true);
      setIsEditing(false);  // done editing, show update button now
      setFile(null);        // clear file, since saved
    } catch (error) {
      console.error('Upload failed:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div className="bg-[#1a2233] p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">📷 Profile Image</h2>

      <form onSubmit={handleSubmit}>
        {preview ? (
          <div className="space-y-4">
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-600">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>

            {isEditing ? (
              // Show Save + Cancel when editing (new file selected)
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1 bg-green-600 text-sm rounded text-white"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFile(null);
                    // reset preview to the existing image url if any
                    if (hasImage) {
                      // no change needed, preview already set
                    } else {
                      setPreview(null);
                    }
                  }}
                  className="px-4 py-1 bg-red-600 text-sm rounded text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Show Update button only if not editing but have an image
              hasImage && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    fileInput.current.click();
                  }}
                  className="px-4 py-1 bg-blue-600 text-sm rounded text-white"
                >
                  Update
                </button>
              )
            )}
          </div>
        ) : (
          // No preview - no image uploaded yet
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">No image uploaded</div>
            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="px-4 py-1 bg-blue-600 text-sm rounded text-white w-max"
            >
              Upload Image
            </button>
          </div>
        )}

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          hidden
          ref={fileInput}
          onChange={handleChange}
        />
      </form>
    </motion.div>
  );
};

export default ProfileImage;
