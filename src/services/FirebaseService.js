import { 
  auth,
  signInWithEmailAndPassword,
  signOut,
  googleAuthProvider, 
  facebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from 'auth/FirebaseAuth';
console.log("authhhhhhhhhhhhhhhhh",auth);

const FirebaseService = {}

FirebaseService.signInEmailRequest = async (email, password) => {
  const loginresponse= await signInWithEmailAndPassword(auth, email, password).then(user => user).catch(err => err);
  return loginresponse;

}

FirebaseService.signOutRequest = async () =>
	await signOut(auth).then(user => user).catch(err => err);

FirebaseService.signInGoogleRequest = async () =>
  await signInWithPopup(auth, googleAuthProvider).then(user => user).catch(err => err);

FirebaseService.signInFacebookRequest = async () =>
  await signInWithPopup(auth, facebookAuthProvider).then(user => user).catch(err => err);

FirebaseService.signUpEmailRequest = async (email, password) =>
	await createUserWithEmailAndPassword(auth, email, password).then(user => user).catch(err => err);	
	
export default FirebaseService