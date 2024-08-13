import { useEffect } from 'react';
import { useVerifyMutation } from '../store';

export const useVerify = () => {
    const [verify, verifyResult] = useVerifyMutation();
    const accessTokenExpireDate = parseInt(
        document.cookie.match(`(^|;)\\s*accessTokenExpiresAt\\s*=\\s*([^;]+)`)?.pop() || '',
    );

    useEffect(() => {
        if (accessTokenExpireDate) verify();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoading:
            verifyResult.isLoading || (accessTokenExpireDate && verifyResult.isUninitialized),
        error: verifyResult.error,
    };
};
