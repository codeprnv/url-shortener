import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import formatLinks from '@/utils/formatLinks';

interface ModalProps {
  imgUri: string;
  shortLink: string;
}

const QrcodeModal = ({ imgUri, shortLink }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={imgUri} alt='qr-code' className='w-[4rem] object-cover' />
      </DialogTrigger>
      <DialogContent className='max-w-[75vw] bg-[#d0d0d0]'>
        <DialogHeader className='flex items-center justify-center'>
          <DialogTitle className='text-2xl font-bold tracking-wide uppercase'>
            Qr Code
          </DialogTitle>
          <DialogDescription className='flex items-center justify-center'>
            <img
              src={imgUri}
              alt='qr-code'
              className='w-[8rem] rounded-xl object-cover lg:w-[12rem] border-2 shadow-xl'
            />
          </DialogDescription>
          <DialogDescription>
            <p
              className='text-lg text-blue-700 underline hover:cursor-pointer hover:text-blue-500'
              onClick={() => (window.location.href = shortLink)}
            >
              {formatLinks(shortLink)}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QrcodeModal;
