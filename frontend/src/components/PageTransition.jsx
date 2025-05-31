import { motion } from 'framer-motion';
import React from 'react';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            className='w-full' 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;