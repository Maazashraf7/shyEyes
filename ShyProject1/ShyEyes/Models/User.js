// src/models/User.js

export default class User {
  constructor(data = {}) {
    this.id = data._id || '';
    this.firstName = data.Name?.firstName || data.firstName || '';
    this.lastName = data.Name?.lastName || data.lastName || '';
    this.fullName = `${this.firstName} ${this.lastName}`.trim();
    this.phoneNo = data.phoneNo || '';
    this.email = data.email || '';
    this.dob = data.dob || '';
    this.age = data.age || '';
    this.gender = data.gender || '';
    this.location = {
      street: data.location?.street || '',
      city: data.location?.city || '',
      state: data.location?.state || '',
      country: data.location?.country || '',
      postalCode: data.location?.postalCode || '',
    };
    this.bio = data.bio || '';
    this.hobbies = data.hobbies || [];
    this.profilePic = data.profilePic || '';
    this.photos = data.photos || [];
    this.status = data.status || 'Active';
    this.isOnline = data.isOnline || false;
  }
}
