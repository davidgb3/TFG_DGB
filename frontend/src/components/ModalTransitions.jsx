import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@mui/material';

const ModalTransition = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Modal 
                    open={isOpen} 
                    onClose={onClose}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20, width: '50%' }}
                        animate={{ opacity: 1, scale: 1, width: '100%', y: 0 }}
                        exit={{ opacity: 0, y: -20, width: '50%' }}
                        transition={{ 
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        {children}
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ModalTransition;