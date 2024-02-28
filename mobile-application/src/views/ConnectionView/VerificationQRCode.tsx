import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

/**
 * VerificationQRCodeProps defines the props for the Verification QR Code component.
 *
 * @property verificationURI - Verification URI
 */
interface VerificationQRCodeProps {
  verificationURI?: string;
}

/**
 * A component to display the verification QR code 
 *
 * @param {VerificationQRCodeProps} props - The props for the Verification QR Code component.
 */
const VerificationQRCode: React.FC<VerificationQRCodeProps> = (props: VerificationQRCodeProps) => (
  <View style={styles.container}>
    <QRCode value={props?.verificationURI} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
});


export default VerificationQRCode;