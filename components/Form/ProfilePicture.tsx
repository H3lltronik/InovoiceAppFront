import React, {
    FC,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Modal, ModalElement } from "../Dialog/Modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useStore } from "../../store";
import { Button } from "./Button";
import { changeProfilePicture } from "../../api";
import { fetchImageToBlobText } from "../../lib/lib";

type ProfilePictureProps = {
    children?: React.ReactNode;
};
export const ProfilePictureComponent = (props: any, ref: any) => {
    const cropperRef = useRef<any>(null);
    const modalRef = useRef<ModalElement>(null);
    const profilePicture = useStore((state) => state.user?.profilePicture);
    const setUser = useStore(state => state.setUser)

    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!profilePicture) return;
        setLoading(true);

        (async function () {
            const profPicBlob = await fetchImageToBlobText(profilePicture);
            setSelectedImage(profPicBlob);

            setLoading(false);
        })();
    }, []);

    const closeModal = () => {
        modalRef.current?.closeModal();
    };
    const openModal = () => {
        modalRef.current?.openModal();
    };

    const getActivator = () => {
        return <div className="hidden"></div>;
    };

    const savePicture = async () => {
        setLoading(true);
        const image = await loadPicture();
        const result = await changeProfilePicture(image);
        if (result.data)
            setUser(result.data)

        setLoading(false);
        closeModal();

        if (result.error) console.error("Something went wrong", result.error)
    };

    const loadPicture = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            cropperRef.current.cropper
                .getCroppedCanvas()
                .toBlob((blob: any) => {
                    resolve(blob);
                });
        });
    };

    useImperativeHandle(ref, () => ({
        closeModal,
        openModal,
    }));

    const getImage = (e: any) => {
        const input = e.target as HTMLInputElement;
        let files: any = [];
        files = input.files;

        const filesize = ((files[0].size/1024)/1024); // MB

        if (filesize > 1) {
            alert("Image too big")
            e.target.value = null;
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    return (
        <Modal activator={getActivator()} ref={modalRef}>
                <section
                    className={`dark:text-white text-left absolute bg-white dark:bg-blue-darker p-8 rounded-lg w-4/5 lg:w-msg-modal 
                        max-w-full overflow-hidden theme-transition
                        mt-5 lg:mt-0 left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4`}>
                    {/* Loading backdrop */}
                    {
                        loading?
                        <section className="z-20 h-full absolute bg-black-dark bg-opacity-50 rounded-lg w-msg-modal max-w-full left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"></section>
                        :null
                    }

                    <h2 className="font-bold text-2xl">Change picture</h2>
                    <small className="text-xs text-black dark:text-white-dark">(Up to 1MB)</small>

                    <input onChange={getImage} type="file" accept="image/png, image/jpeg" className="my-5"/>

                    <h2 className="font-bold text-lg mt-4 mb-1">Cropping area</h2>

                    <Cropper
                        className="w-full h-48 lg:h-96"
                        aspectRatio={1 / 1}
                        guides={true}
                        src={selectedImage}
                        ref={cropperRef}
                        viewMode={1}
                        dragMode="move"
                        cropBoxMovable={false}
                        checkCrossOrigin={false}
                    />

                    <div className="flex items-center justify-center gap-3 pt-5">
                        <Button
                            className={`bg-red-dark text-white active:bg-purple-dark hover:bg-purple-light`}
                            onClick={closeModal}>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            className={`bg-purple-dark text-white active:bg-purple-dark hover:bg-purple-light`}
                            onClick={savePicture}>
                            <span>Save picture</span>
                        </Button>
                    </div>
                </section>
        </Modal>
    );
};

export type ProfilePictureElement = {
    closeModal: () => any;
    openModal: () => any;
};
export const ProfilePicture = forwardRef<ModalElement, ProfilePictureProps>(
    ProfilePictureComponent
);
