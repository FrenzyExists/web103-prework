import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Button,
} from "@headlessui/react";
import TikTokIcon from "../assets/tiktok-brands-solid.svg";
import InstagramIcon from "../assets/instagram-brands-solid.svg";
import TwitchIcon from "../assets/twitch-brands-solid.svg";
import XTwitterIcon from "../assets/x-twitter-brands-solid.svg";
import YoutubeIcon from "../assets/youtube-brands-solid.svg";

import React, { useEffect, useState } from "react";
import { ImageIcon } from "../assets/image-solid";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import MagicButton from "../components/MagicButton";
import MagicInputWithIcon from "../components/MagicInputWithIcon";
import MagicInput from "../components/MagicInput";

const AddCreator = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [tiktokUrl, setTiktokUrl] = useState<string | undefined>(undefined);
  const [xTwitterUrl, setXTwitterUrl] = useState<string | undefined>(undefined);
  const [instagramUrl, setInstagramUrl] = useState<string | undefined>(
    undefined
  );
  const [youTubeUrl, setYouTubeUrl] = useState<string | undefined>(undefined);
  const [twitchUrl, setTwitchUrl] = useState<string | undefined>(undefined);
  // Handle local file uploads
  
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection();
  }, []);
  
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCreator = async () => {
    const { data, error } = await supabase.from('creators').insert([
      {
        name: name,
        description: description,
        image_url: imageSrc,
        tiktok_url: tiktokUrl,
        youtube_url: youTubeUrl,
        instagram_url: instagramUrl,
        twitch_url: twitchUrl,
        twitter_x_url: xTwitterUrl
      }
    ])
    if (error) {
      console.error('Error adding creator:', error);
    } else {
      console.log('Creator added:', data);
      navigate("/all-creators");
    }
  }

  const handleCancelView = async () => {
    navigate("/all-creators")
  }

  const checkConnection = async () => {
    const { data, error } = await supabase.from('creators').select('*').limit(1);
    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('Successfully connected to Supabase:', data);
    }
  };

  // Handle URL input
  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc(event.target.value);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0084C8] ">
      <div className="absolute top-0 left-0 w-full h-auto -z-3">
        <svg
          className="w-full h-auto"
          width="574"
          height="93"
          viewBox="0 0 574 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 61.0907L16.889 60.485C32.778 59.8785 64.556 58.6671 96.333 63.2123C128.111 67.7575 159.889 78.0608 191.667 79.273C223.444 80.4852 255.222 72.6063 287 69.879C318.778 67.1517 350.556 69.5761 382.333 68.9697C414.111 68.3639 445.889 64.7273 477.667 68.0603C509.444 71.3941 541.222 81.6967 557.111 86.8483L574 92"
            stroke="#043A5F"
            strokeWidth="2"
          />
          <path
            d="M0 61.0907L16.889 60.485C32.778 59.8785 64.556 58.6671 96.333 63.2123C128.111 67.7575 159.889 78.0608 191.667 79.273C223.444 80.4852 255.222 72.6063 287 69.879C318.778 67.1517 350.556 69.5761 382.333 68.9697C414.111 68.3639 445.889 64.7273 477.667 68.0603C509.444 71.3941 541.222 81.6967 557.111 86.8483L574 92V0H0V61.0907Z"
            fill="#005792"
          />
        </svg>
      </div>
      <div className="bg-gray-100 w-full max-w-6xl relative mx-auto px-8 border-[#043A5F] border-4 rounded-3xl pb-8 pt-6">
        <Fieldset className="">
          <Legend className="relative mb-10 text-pop-stroke text-7xl font-extrabold">
            Add a Creator
          </Legend>
          <div className="grid grid-cols-3 gap-8 items-start">
            <Field className="">
              <Label className="font-bold text-gray-900 text-2xl">
                Profile Picture
              </Label>

              <div className=" relative flex items-center rounded-lg overflow-hidden">
                <Input
                  type="url"
                  placeholder="Web"
                  onChange={handleUrlInput}
                  className="flex-grow px-4 py-2 text-gray-900 bg-gray-50 border-0 rounded-none rounded-l-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#005792] sm:text-sm sm:leading-6"
                />
                <div className="relative group">
                  <Input
                    type="file"
                    accept="image/*"
                    name="creators[]"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 z-10"
                  />
                  <Button className="w-full h-full px-4 py-2 font-extrabold bg-gray-200 text-gray-900 rounded-none rounded-r-lg border-l-0 shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#005792]  group-hover:bg-gray-300 group-hover:cursor-pointer">
                    Local
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <article className="group relative rounded-3xl outline-none outline-4 outline-gray-300 overflow-hidden">
                  <span className="block w-full  bg-gray-200 aspect-[3/4]">
                    {imageSrc ? (
                      <img
                        src={typeof imageSrc === "string" ? imageSrc : ""}
                        alt="Preview"
                        className="h-full w-full object-cover object-center p-1 rounded-3xl"
                      />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 rounded-full">
                        <span>No Image Selected</span>
                        <div className="w-10 mt-2">
                          <ImageIcon />
                        </div>
                      </div>
                    )}
                  </span>
                </article>
              </div>
            </Field>
            <div className="col-span-2">
              <Field className="mb-6">
                <Label className="font-bold text-gray-900 text-2xl">Name</Label>
                <MagicInput editMode={true} value={name} changeFun={(e) => setName(e.target.value)} notFoundMsg="Unknown" placeholder="John Doe"/>
              </Field>
              <Field className="mb-6">
                <Label className="font-bold text-gray-900 text-2xl">
                  About Me
                </Label>
                <MagicInput isTextArea={true} changeFun={(e) => setDescription(e.target.value)} editMode={true} value={description} notFoundMsg="Data Not Found" placeholder="I am the one, don't weight a ton. Don't need a gun to get respect on the street..."/>
              </Field>
              <Field className="mb-6">
                <Legend className="font-bold text-gray-900 text-2xl mb-2">
                  My Social Media
                </Legend>
                <div className="space-y-8">
                <MagicInputWithIcon notFoundMsg="No Data Found" onChangeFun={(e) => setTiktokUrl(e.target.value)} editMode={true} value={tiktokUrl} placeholder="TikTok" iconSrc={TikTokIcon}/>
                  <MagicInputWithIcon notFoundMsg="No Data Found" onChangeFun={(e) => setInstagramUrl(e.target.value)} editMode={true} value={instagramUrl} placeholder="Instagram" iconSrc={InstagramIcon}/>
                  <MagicInputWithIcon notFoundMsg="No Data Found" onChangeFun={(e) => setYouTubeUrl(e.target.value)} editMode={true} value={youTubeUrl} placeholder="YouTube" iconSrc={YoutubeIcon}/>
                  <MagicInputWithIcon notFoundMsg="No Data Found" onChangeFun={(e) => setXTwitterUrl(e.target.value)} editMode={true} value={xTwitterUrl} placeholder="Twitter X" iconSrc={XTwitterIcon}/>
                  <MagicInputWithIcon notFoundMsg="No Data Found" onChangeFun={(e) => setTwitchUrl(e.target.value)} editMode={true} value={twitchUrl} placeholder="Twitch" iconSrc={TwitchIcon}/>
                </div>
              </Field>
            </div>
          </div>
          <Field>
          <div className="mx-auto grid grid-cols-2 relative">
                <MagicButton onClickFun={handleAddCreator} buttonName="Add Creator" color="blue-900" bg="gray-100"/>
                <MagicButton onClickFun={handleCancelView} buttonName="Cancel" color="red-900" bg="gray-100"/>
              </div>
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default AddCreator;
